from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os
import uuid
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import threading

app = Flask(__name__, static_folder='public', static_url_path='')
CORS(app)

DB_FILE = 'claims.json'
UPLOAD_FOLDER = 'uploads'

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


def read_db():
    if not os.path.exists(DB_FILE):
        return []
    with open(DB_FILE, 'r', encoding='utf-8') as f:
        try:
            return json.load(f)
        except:
            return []


def write_db(data):
    with open(DB_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def simulate_ai(claim):
    nid = claim.get('nationalId', '')
    ctype = claim.get('cardType', '')

    is_valid_id = len(nid) == 14 and nid.isdigit()
    is_complete = bool(claim.get('fullName') and claim.get('phone') and claim.get('description'))

    if not is_complete or not is_valid_id or ctype == 'Missing':
        return {"status": "Rejected", "aiDecision": "Rejected by AI"}
    if ctype in ['Damaged', 'Invalid']:
        return {"status": "Under Review", "aiDecision": "Under Human Review"}
    return {"status": "Approved", "aiDecision": "Approved by AI"}


def _send_email(claim):
    sender = 'bdhly8857@gmail.com'
    receiver = 'bdhly8857@gmail.com'
    password = 'xzkoxlyzqhrxipek'

    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = receiver
    msg['Subject'] = f"New Claim Submitted: {claim['id']}"

    body = f"""A new claim was submitted!
    
Request ID: {claim['id']}
Name: {claim['fullName']}
National ID: {claim['nationalId']}
Phone: {claim['phone']}
Card Type: {claim['cardType']}
Description: {claim['description']}
AI Decision: {claim['aiDecision']}
Status: {claim['status']}
"""
    msg.attach(MIMEText(body, 'plain', 'utf-8'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender, password)
        server.send_message(msg)
        server.quit()
        print("Email Sent Successfully to", receiver)
    except Exception as e:
        print("Email Failed:", e)


def send_email_notification(claim):
    threading.Thread(target=_send_email, args=(claim,)).start()


@app.route('/')
def index():
    return send_from_directory('public', 'index.html')


@app.route('/api/claims', methods=['POST'])
def add_claim():
    data = request.form.to_dict()
    file = request.files.get('file')
    filename = None
    if file:
        filename = file.filename
        file.save(os.path.join(UPLOAD_FOLDER, filename))

    ai_result = simulate_ai(data)

    new_claim = {
        "id": "CLM-" + uuid.uuid4().hex[:6].upper(),
        "fullName": data.get('fullName', ''),
        "nationalId": data.get('nationalId', ''),
        "phone": data.get('phone', ''),
        "cardType": data.get('cardType', ''),
        "description": data.get('description', ''),
        "fileAttached": bool(file),
        "fileName": filename,
        "status": ai_result['status'],
        "aiDecision": ai_result['aiDecision'],
        "date": datetime.now().isoformat(),
        "isManuallyOverridden": False
    }

    claims = read_db()
    claims.insert(0, new_claim)
    write_db(claims)

    # send email
    send_email_notification(new_claim)

    return jsonify({
        "success": True,
        "requestID": new_claim['id'],
        "status": new_claim['status'],
        "aiDecision": new_claim['aiDecision']
    })


@app.route('/api/claims/track/<query>', methods=['GET'])
def track_claim(query):
    query = query.strip().lower()
    claims = read_db()
    found = [c for c in claims if (c.get('id', '').lower() == query) or (c.get('nationalId', '') == query)]
    return jsonify(found)


@app.route('/api/admin/login', methods=['POST'])
def login():
    data = request.json
    if data.get('password') == '4658':
        return jsonify({"success": True, "token": "fake-jwt-token-123"})
    return jsonify({"success": False, "message": "Invalid password"}), 401


def check_auth(req):
    auth = req.headers.get('Authorization')
    return auth == 'Bearer fake-jwt-token-123' or auth == 'Bearer local_or_real_token'


@app.route('/api/admin/claims', methods=['GET'])
def get_admin_claims():
    if not check_auth(request):
        return jsonify({"success": False}), 401
    return jsonify(read_db())


@app.route('/api/admin/claims/<claim_id>/status', methods=['PUT'])
def update_status(claim_id):
    if not check_auth(request):
        return jsonify({"success": False}), 401
    status = request.json.get('status')
    claims = read_db()
    for c in claims:
        if c.get('id') == claim_id:
            c['status'] = status
            c['isManuallyOverridden'] = True
            write_db(claims)
            return jsonify({"success": True, "claim": c})
    return jsonify({"success": False}), 404


if __name__ == '__main__':
    print("Serving on http://127.0.0.1:8000")
    app.run(port=8000, host='127.0.0.1', debug=False)
