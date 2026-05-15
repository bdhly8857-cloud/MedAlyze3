import os
os.environ["PADDLE_PDX_DISABLE_MODEL_SOURCE_CHECK"] = "True"
os.environ["FLAGS_use_mkldnn"] = "1"
os.environ["FLAGS_allocator_strategy"] = "naive_best_fit"

import cv2
import numpy as np
import yaml
import tempfile
import time
from paddlex import create_pipeline
from PIL import Image, ImageDraw
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
from io import BytesIO
import traceback

# ─────────────────────────────────────────────────────────
# اختار الموديل هنا:
#
# Detection models:
#   PP-OCRv5_server_det   ← أدق (موصى به)
#   PP-OCRv5_mobile_det   ← أسرع وأخف
#
# Recognition models (English):
#   en_PP-OCRv5_mobile_rec  ← إنجليزي فقط (أدق للإنجليزي)
#   PP-OCRv5_server_rec     ← متعدد اللغات
#   PP-OCRv5_mobile_rec     ← متعدد اللغات خفيف
# ─────────────────────────────────────────────────────────
DET_MODEL = "PP-OCRv5_mobile_det"
# REC_MODEL = "en_PP-OCRv5_server_det"
REC_MODEL = "arabic_PP-OCRv5_mobile_rec"

# ── Flask App ──────────────────────────────────────────
app = Flask(__name__)
CORS(app)  # تفعيل CORS للسماح بالطلبات من المتصفح

# Global pipeline instance
pipeline = None

def build_config(det_model, rec_model):
    """بناء الـ config dict بناءً على الموديل المختار"""
    return {
        "pipeline_name": "OCR",
        "text_type": "general",
        "use_doc_preprocessor": False,  # أسرع — مش محتاج doc preprocessing
        "use_textline_orientation": False,
        "SubModules": {
            "TextDetection": {
                "module_name": "text_detection",
                "model_name": det_model,
                "model_dir": None,
                "limit_side_len": 960,
                "limit_type": "max",
                "max_side_limit": 4000,
                "thresh": 0.3,
                "box_thresh": 0.6,
                "unclip_ratio": 1.5
            },
            "TextRecognition": {
                "module_name": "text_recognition",
                "model_name": rec_model,
                "model_dir": None,
                "batch_size": 6,
                "score_thresh": 0.0
            }
        }
    }

def create_ocr_pipeline(det_model=DET_MODEL, rec_model=REC_MODEL):
    """إنشاء الـ pipeline مع الموديل المحدد"""
    config = build_config(det_model, rec_model)
    
    # حفظ الـ config في ملف temp yaml
    tmp = tempfile.NamedTemporaryFile(mode='w', suffix='.yaml',
                                      delete=False, encoding='utf-8')
    yaml.dump(config, tmp, allow_unicode=True)
    tmp.close()
    
    print(f"🤖 Detection  : {det_model}")
    print(f"🤖 Recognition: {rec_model}")
    
    pipeline = create_pipeline(pipeline=tmp.name, device='cpu')
    os.unlink(tmp.name)
    return pipeline

def warm_up_pipeline(p):
    """Run a dummy prediction to warm up the pipeline"""
    print("🔥 Warming up pipeline...")
    try:
        # Create a tiny black image
        dummy_img = np.zeros((100, 100, 3), dtype=np.uint8)
        with tempfile.NamedTemporaryFile(suffix='.jpg', delete=False) as tmp:
            cv2.imwrite(tmp.name, dummy_img)
            temp_path = tmp.name
        
        try:
            list(p.predict(temp_path))
            print("✅ Warm-up complete!")
        finally:
            if os.path.exists(temp_path):
                os.unlink(temp_path)
    except Exception as e:
        print(f"⚠️ Warm-up failed: {e}")

# ── إنشاء الـ pipeline ────────────────────────
# سيتم تحميله عند بدء الـ server

def preprocess(image_path):
    """Robust image preprocessing for OCR - Performance Optimized"""
    img = cv2.imread(image_path)
    if img is None:
        return image_path
        
    h, w = img.shape[:2]
    
    # 1. Resize if too large (Speed optimization)
    # 1000px is usually enough for IDs and significantly faster
    target_size = 1000
    if w > 1500:
        scale = target_size / w
        img = cv2.resize(img, None, fx=scale, fy=scale,
                        interpolation=cv2.INTER_AREA)
    
    # 2. Sharpening (Fast operation)
    # Skipping slow denoising as it adds minutes to CPU processing
    kernel = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])
    sharp = cv2.filter2D(img, -1, kernel)
    
    # Save to a new temp file to avoid modifying original or clashing
    tmp = tempfile.NamedTemporaryFile(suffix='_pre.jpg', delete=False)
    tmp_name = tmp.name
    tmp.close()
    
    cv2.imwrite(tmp_name, sharp, [cv2.IMWRITE_JPEG_QUALITY, 90])
    return tmp_name

def run_ocr(image_path, min_score=0.5):
    """تشغيل OCR على الصورة وإرجاع النتائج"""
    start_time = time.time()
    print(f"\n📄 Processing: {image_path}\n")
    
    # Apply preprocessing
    processed_path = preprocess(image_path)
    prep_time = time.time() - start_time
    
    try:
        results = list(pipeline.predict(processed_path))
        inference_time = time.time() - start_time - prep_time
        
        if not results:
            print(f"❌ No results. (Total: {time.time()-start_time:.2f}s)")
            return None, None
        
        res = results[0]
        rec_texts = res.get('rec_texts', [])
        rec_scores = res.get('rec_scores', [])
        rec_polys = res.get('rec_polys', [])
        
        MIN_SCORE = min_score
        filtered = [(text, score, poly)
                    for text, score, poly in zip(rec_texts, rec_scores, rec_polys)
                    if text.strip() and score >= MIN_SCORE]
        
        if not filtered:
            print("❌ No text detected.")
            return None, None
        
        print(f"✅ Detected {len(filtered)} lines: (Prep: {prep_time:.2f}s, OCR: {inference_time:.2f}s)")
        print("─" * 50)
        
        full_text = []
        results_data = []
        
        for text, score, _ in filtered:
            print(f"  [{score:.2f}] {text}")
            full_text.append(text)
            results_data.append({
                "text": text,
                "confidence": float(score)
            })
        
        print("\n📝 Full Extracted Text:")
        print("─" * 50)
        print("\n".join(full_text))
        
        img_pil = Image.open(processed_path).convert('RGB')
        draw = ImageDraw.Draw(img_pil)
        
        for text, score, poly in filtered:
            if poly is None:
                continue
            points = [tuple(map(int, pt)) for pt in poly]
            draw.polygon(points, outline=(0, 200, 0))
            x = int(points[0][0])
            y = max(int(points[0][1]) - 15, 0)
            draw.text((x, y), f"{text} ({score:.2f})", fill=(255, 0, 0))
        
        return results_data, img_pil
    finally:
        # Clean up processed image if it's different from input
        if processed_path != image_path and os.path.exists(processed_path):
            os.unlink(processed_path)

# ── Flask Routes ───────────────────────────────────────

@app.route('/health', methods=['GET'])
def health():
    """فحص صحة الـ API"""
    return jsonify({
        "status": "healthy",
        "detection_model": DET_MODEL,
        "recognition_model": REC_MODEL
    })

@app.route('/ocr', methods=['POST'])
def ocr():
    """
    OCR endpoint
    Accepts: multipart/form-data with 'image' file
    Optional: min_score (float, default 0.5)
    Returns: JSON with extracted text and confidence scores
    """
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400
        
        file = request.files['image']
        min_score = float(request.form.get('min_score', 0.5))
        
        # Save image to a temporary file safely
        with tempfile.NamedTemporaryFile(suffix='.jpg', delete=False) as tmp_file:
            temp_path = tmp_file.name
            file.save(temp_path)
        
        try:
            # معالجة OCR
            results_data, img_pil = run_ocr(temp_path, min_score)
        finally:
            # Ensure the file is deleted even if OCR fails
            if os.path.exists(temp_path):
                os.unlink(temp_path)
        
        if results_data is None:
            return jsonify({"error": "No text detected"}), 400
        
        full_text = "\n".join([item["text"] for item in results_data])
        
        return jsonify({
            "success": True,
            "results": results_data,
            "full_text": full_text,
            "count": len(results_data)
        })
    
    except Exception as e:
        error_msg = traceback.format_exc()
        print(f"❌ Error in /ocr: {error_msg}")
        return jsonify({"error": str(e), "traceback": error_msg}), 500

@app.route('/ocr_with_image', methods=['POST'])
def ocr_with_image():
    """
    OCR endpoint that returns annotated image
    Accepts: multipart/form-data with 'image' file
    Optional: min_score (float, default 0.5)
    Returns: JSON with text + base64 encoded annotated image
    """
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400
        
        file = request.files['image']
        min_score = float(request.form.get('min_score', 0.5))
        
        # Save image to a temporary file safely
        with tempfile.NamedTemporaryFile(suffix='.jpg', delete=False) as tmp_file:
            temp_path = tmp_file.name
            file.save(temp_path)
        
        try:
            # معالجة OCR
            results_data, img_pil = run_ocr(temp_path, min_score)
        finally:
            # Ensure the file is deleted even if OCR fails
            if os.path.exists(temp_path):
                os.unlink(temp_path)
        
        if results_data is None:
            return jsonify({"error": "No text detected"}), 400
        
        # تحويل الصورة إلى base64
        buffered = BytesIO()
        img_pil.save(buffered, format="JPEG")
        img_base64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
        
        full_text = "\n".join([item["text"] for item in results_data])
        
        return jsonify({
            "success": True,
            "results": results_data,
            "full_text": full_text,
            "count": len(results_data),
            "annotated_image": img_base64
        })
    
    except Exception as e:
        error_msg = traceback.format_exc()
        print(f"❌ Error in /ocr_with_image: {error_msg}")
        return jsonify({"error": str(e), "traceback": error_msg}), 500

if __name__ == "__main__":
    print("🚀 Initializing OCR Pipeline...")
    pipeline = create_ocr_pipeline(det_model=DET_MODEL, rec_model=REC_MODEL)
    warm_up_pipeline(pipeline)
    print("✅ Pipeline ready!")
    
    app.run(host='0.0.0.0', port=5000, debug=False, threaded=False)
