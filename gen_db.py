import json
import random
import uuid
import datetime

first_names_ar = ["أحمد", "محمد", "محمود", "علي", "عمر", "كريم", "طارق", "سامي", "ياسر", "تامر", "وليد", "يوسف", "حسن", "حسين", "خالد"]
second_names_ar = ["عبدالرحمن", "مصطفى", "إبراهيم", "سعيد", "صالح", "ماجد", "منصور", "نادر", "وائل", "رامي", "شريف"]
third_names_ar = ["عادل", "فاروق", "قطب", "لمعي", "نور", "هاني", "جمال", "بهاء", "ثابت"]
fourth_names_ar = ["السيد", "الدسوقي", "النجار", "الحداد", "المهدي", "عبدالله", "محفوظ", "رضوان"]

first_names_en = ["John", "Michael", "David", "James", "Robert", "William", "Joseph", "Thomas", "Charles", "Daniel", "Matthew"]
second_names_en = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez"]

card_types = ["Valid", "Invalid", "Missing", "Damaged", "New Request"]
statuses = ["Under Review", "Approved", "Rejected"]
ai_decisions = ["Approved by AI", "Rejected by AI", "Under Human Review"]

def generate_national_id():
    return str(random.randint(2, 3)) + str(random.randint(0, 99)).zfill(2) + str(random.randint(1, 12)).zfill(2) + str(random.randint(1, 28)).zfill(2) + str(random.randint(1, 99)).zfill(2) + str(random.randint(0, 99999)).zfill(5)

claims = []
for i in range(70):
    is_ar = random.choice([True, False])
    if is_ar:
        name = f"{random.choice(first_names_ar)} {random.choice(second_names_ar)} {random.choice(third_names_ar)} {random.choice(fourth_names_ar)}"
    else:
        name = f"{random.choice(first_names_en)} {random.choice(second_names_en)} {random.choice(first_names_en)} {random.choice(second_names_en)}"
    
    status = random.choice(statuses)
    card_type = random.choice(card_types)
    
    if card_type == "Valid":
        ai_decision = random.choice(["Approved by AI", "Under Human Review"])
    else:
        ai_decision = random.choice(["Rejected by AI", "Under Human Review"])
        
    date = datetime.datetime.now() - datetime.timedelta(days=random.randint(0, 365))
    
    claim = {
        "id": f"CLM-{uuid.uuid4().hex[:8].upper()}",
        "fullName": name,
        "nationalId": generate_national_id(),
        "phone": f"01{random.randint(0,2)}{random.randint(10000000, 99999999)}",
        "cardType": card_type,
        "description": "simulated issue description...",
        "fileAttached": random.choice([True, False]),
        "status": status,
        "aiDecision": ai_decision,
        "date": date.isoformat(),
        "isManuallyOverridden": random.choice([True, False])
    }
    claims.append(claim)

with open('claims.json', 'w', encoding='utf-8') as f:
    json.dump(claims, f, ensure_ascii=False, indent=2)

print("Claims Generated!")
