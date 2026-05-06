import json
import random
import re

first_names = ["Mohamed", "Ahmed", "Mahmoud", "Mostafa", "Ali", "Hana", "Fatima", "Aya", "Nour", "Mariam", "Omar", "Youssef", "Kareem", "Yassin", "Amira", "Zeyad", "Tarek", "Khaled", "Salma", "Maha"]
last_names = ["Hassan", "Ali", "Ibrahim", "Abdelrahman", "Sayed", "Tawfiq", "Fathy", "Kamal", "Osman", "Nasser", "Gaber", "Farouk", "El-Sayed", "Adel", "Fawzy", "Soliman", "Shawky", "Ezzat", "Saad"]
hospitals = ["Al-Qasr Al-Aini Hospital", "Dar Al Fouad Hospital", "Cleopatra Hospital", "As-Salam International", "Saudi German Hospital Cairo", "Ain Shams Specialized", "Zayed Specialized Hospital", "Misr International", "Andalusia Eye Hospital", "Ganzouri Hospital"]
claim_types = ["Medical", "Pharmacy", "Emergency", "Diagnostic", "Other"]
histories = ["Asthma", "Diabetes", "Hypertension", "None", "None", "None", "Heart disease", "Allergy to Penicillin", "Previous surgery 2018", "None"]

db = []

for i in range(1, 101):
    clm_id = f"CLM{str(i).zfill(3)}"
    full_name = f"{random.choice(first_names)} {random.choice(last_names)} {random.choice(first_names)} {random.choice(last_names)}"
    nid = "".join([str(random.randint(0, 9)) for _ in range(14)])
    phone = f"01{random.randint(0,2)}{random.randint(10000000, 99999999)}"
    age = random.randint(5, 80)
    ctype = random.choice(claim_types)
    amount = random.randint(100, 60000)
    med_hist = random.choice(histories)
    
    # Calculate Risk
    risk_score = 15
    missing_fields = []
    suggestions = []
    
    if amount > 50000:
        risk_score += 45
        suggestions.append("High amount flagged. Requires manual reviewer verification of medical report.")
    
    if ctype == 'Emergency' and amount < 500:
        risk_score += 20
        suggestions.append("Emergency claim with unusually low amount. Verify data.")

    # Random errors to simulate real data
    if random.random() < 0.1:
        missing_fields.append("Phone")
    if random.random() < 0.05:
        missing_fields.append("Valid National ID")
        risk_score += 40
        suggestions.append("Ensure National ID is exactly 14 digits.")

    comp = 100 - (len(missing_fields) * 12)
    
    status = "Approved"
    ai_dec = "Approved by AI"
    risk_level = "Low"

    if risk_score >= 70:
        status = "Rejected"
        ai_dec = "Rejected by AI"
        risk_level = "High"
        suggestions.append("Claim rejected due to high risk score or critical errors.")
    elif risk_score >= 40 or len(missing_fields) > 0:
        status = "Under Review"
        ai_dec = "Under Human Review"
        risk_level = "Medium"
        if len(missing_fields) > 0:
            suggestions.append("Please provide missing data: " + ", ".join(missing_fields))

    has_file = random.choice([True, False])
    file_name = "mock_report.png" if has_file else None

    claim = {
        "id": clm_id,
        "fullName": full_name,
        "nationalId": nid,
        "phone": phone,
        "age": age,
        "claimType": ctype,
        "amount": amount,
        "medicalHistory": med_hist,
        "fileAttached": has_file,
        "fileName": file_name,
        "hospitalName": random.choice(hospitals) if ctype in ['Medical', 'Emergency'] else "",
        "description": "Routine checkup and medicine" if ctype == 'Pharmacy' else "Patient admission and treatment",
        "date": f"2026-05-{str(random.randint(1,28)).zfill(2)}T10:00:00.000Z",
        "status": status,
        "aiDecision": ai_dec,
        "aiReport": {
            "completeness": comp,
            "missingFields": missing_fields,
            "suggestions": suggestions,
            "riskScore": risk_score,
            "riskLevel": risk_level
        }
    }
    db.append(claim)

new_json_str = "const fallbackDB = " + json.dumps(db, indent=2) + ";"

# Read app.js
with open('public/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace fallbackDB array
content = re.sub(r"const fallbackDB = \[.*?\];", new_json_str, content, flags=re.DOTALL)

with open('public/app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Successfully updated 100 mock items with medicalHistory and files.")
