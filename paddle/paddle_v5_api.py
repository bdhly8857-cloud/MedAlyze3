import os
os.environ["PADDLE_PDX_DISABLE_MODEL_SOURCE_CHECK"] = "True"
os.environ["FLAGS_use_mkldnn"] = "0"

import cv2
import numpy as np
import yaml
import tempfile
from paddlex import create_pipeline
from PIL import Image, ImageDraw
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
from io import BytesIO

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
DET_MODEL = "PP-OCRv5_server_det"
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
                "limit_side_len": 64,
                "limit_type": "min",
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

# ── إنشاء الـ pipeline ────────────────────────
# سيتم تحميله عند بدء الـ server

def preprocess(image_path):
    img = cv2.imread(image_path)
    h, w = img.shape[:2]
    
    if w < 1200:
        scale = 1200 / w
        img = cv2.resize(img, None, fx=scale, fy=scale,
                        interpolation=cv2.INTER_CUBIC)
    
    denoised = cv2.fastNlMeansDenoisingColored(img, None, 10, 10, 7, 21)
    kernel = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]])
    sharp = cv2.filter2D(denoised, -1, kernel)
    
    out = "preprocessed.jpg"
    cv2.imwrite(out, sharp, [cv2.IMWRITE_JPEG_QUALITY, 95])
    return out

def run_ocr(image_path, min_score=0.5):
    """تشغيل OCR على الصورة وإرجاع النتائج"""
    print(f"\n📄 Processing: {image_path}\n")
    
    results = list(pipeline.predict(image_path))
    
    if not results:
        print("❌ No results.")
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
    
    print(f"✅ Detected {len(filtered)} lines:")
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
    
    img_pil = Image.open(image_path).convert('RGB')
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
        
        # حفظ الصورة مؤقتاً
        temp_path = tempfile.mktemp(suffix='.jpg')
        file.save(temp_path)
        
        # معالجة OCR
        results_data, img_pil = run_ocr(temp_path, min_score)
        
        # حذف الملف المؤقت
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
        return jsonify({"error": str(e)}), 500

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
        
        temp_path = tempfile.mktemp(suffix='.jpg')
        file.save(temp_path)
        
        results_data, img_pil = run_ocr(temp_path, min_score)
        
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
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    print("🚀 Initializing OCR Pipeline...")
    pipeline = create_ocr_pipeline(det_model=DET_MODEL, rec_model=REC_MODEL)
    print("✅ Pipeline ready!")
    
    app.run(host='0.0.0.0', port=5000, debug=False)
