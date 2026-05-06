import json
import datetime

data_str = """
[
  {"id":"CLM001","name":"Ahmed Mohamed Ali Hassan","national_id":"29801011234567","phone":"01011112222","card":"Valid","status":"Under Review","date":"2026-04-01"},
  {"id":"CLM002","name":"Omar Mahmoud Abdelrahman Ali","national_id":"29902022345678","phone":"01022223333","card":"Missing","status":"Rejected","date":"2026-04-02"},
  {"id":"CLM003","name":"Youssef Ibrahim Hassan Mohamed","national_id":"30003033456789","phone":"01033334444","card":"Damaged","status":"Approved","date":"2026-04-03"},
  {"id":"CLM004","name":"Khaled Ahmed Saad Ali","national_id":"30104044567890","phone":"01044445555","card":"Valid","status":"Approved","date":"2026-04-04"},
  {"id":"CLM005","name":"Hassan Tarek Mohamed Ali","national_id":"30205055678901","phone":"01055556666","card":"Invalid","status":"Rejected","date":"2026-04-05"},

  {"id":"CLM006","name":"Mostafa Ali Mahmoud Hassan","national_id":"30306066789012","phone":"01066667777","card":"Valid","status":"Under Review","date":"2026-04-06"},
  {"id":"CLM007","name":"Mahmoud Hassan Ibrahim Ali","national_id":"30407077890123","phone":"01077778888","card":"Missing","status":"Rejected","date":"2026-04-07"},
  {"id":"CLM008","name":"Ali Ahmed Tarek Mohamed","national_id":"30508088901234","phone":"01088889999","card":"Valid","status":"Approved","date":"2026-04-08"},
  {"id":"CLM009","name":"Amr Saad Hassan Mahmoud","national_id":"30609099012345","phone":"01099990000","card":"Damaged","status":"Under Review","date":"2026-04-09"},
  {"id":"CLM010","name":"Karim Ibrahim Ali Hassan","national_id":"30710110123456","phone":"01100001111","card":"Valid","status":"Approved","date":"2026-04-10"},

  {"id":"CLM011","name":"Wael Mohamed Ali Saad","national_id":"30811121234567","phone":"01111112222","card":"Invalid","status":"Rejected","date":"2026-04-11"},
  {"id":"CLM012","name":"Sherif Ahmed Mahmoud Ali","national_id":"30912132345678","phone":"01122223333","card":"Valid","status":"Approved","date":"2026-04-12"},
  {"id":"CLM013","name":"Hany Ibrahim Hassan Ali","national_id":"31013143456789","phone":"01133334444","card":"Missing","status":"Rejected","date":"2026-04-13"},
  {"id":"CLM014","name":"Tamer Mohamed Ali Mahmoud","national_id":"31114154567890","phone":"01144445555","card":"Valid","status":"Approved","date":"2026-04-14"},
  {"id":"CLM015","name":"Sameh Hassan Ibrahim Ali","national_id":"31215165678901","phone":"01155556666","card":"Damaged","status":"Under Review","date":"2026-04-15"},

  {"id":"CLM016","name":"Adel Ahmed Mohamed Hassan","national_id":"31316176789012","phone":"01166667777","card":"Valid","status":"Approved","date":"2026-04-16"},
  {"id":"CLM017","name":"Fady Mahmoud Ali Ibrahim","national_id":"31417187890123","phone":"01177778888","card":"Invalid","status":"Rejected","date":"2026-04-17"},
  {"id":"CLM018","name":"Nader Hassan Ahmed Ali","national_id":"31518198901234","phone":"01188889999","card":"Valid","status":"Approved","date":"2026-04-18"},
  {"id":"CLM019","name":"Ehab Mohamed Ali Hassan","national_id":"31619209012345","phone":"01199990000","card":"Missing","status":"Rejected","date":"2026-04-19"},
  {"id":"CLM020","name":"Ramy Ibrahim Mahmoud Ali","national_id":"31720210123456","phone":"01200001111","card":"Valid","status":"Approved","date":"2026-04-20"},

  {"id":"CLM021","name":"Islam Ahmed Hassan Ali","national_id":"31821221234567","phone":"01211112222","card":"Damaged","status":"Under Review","date":"2026-04-21"},
  {"id":"CLM022","name":"Basel Mohamed Ali Ibrahim","national_id":"31922232345678","phone":"01222223333","card":"Valid","status":"Approved","date":"2026-04-22"},
  {"id":"CLM023","name":"Mina Saad Ahmed Ali","national_id":"32023243456789","phone":"01233334444","card":"Invalid","status":"Rejected","date":"2026-04-23"},
  {"id":"CLM024","name":"George Ibrahim Hassan Ali","national_id":"32124254567890","phone":"01244445555","card":"Valid","status":"Approved","date":"2026-04-24"},
  {"id":"CLM025","name":"Peter Mohamed Ali Saad","national_id":"32225265678901","phone":"01255556666","card":"Missing","status":"Rejected","date":"2026-04-25"},

  {"id":"CLM026","name":"Samir Ahmed Hassan Ali","national_id":"32326276789012","phone":"01266667777","card":"Valid","status":"Approved","date":"2026-04-26"},
  {"id":"CLM027","name":"Magdy Ibrahim Ali Hassan","national_id":"32427287890123","phone":"01277778888","card":"Damaged","status":"Under Review","date":"2026-04-27"},
  {"id":"CLM028","name":"Lotfy Mohamed Ahmed Ali","national_id":"32528298901234","phone":"01288889999","card":"Valid","status":"Approved","date":"2026-04-28"},
  {"id":"CLM029","name":"Ashraf Hassan Ali Ibrahim","national_id":"32629309012345","phone":"01299990000","card":"Invalid","status":"Rejected","date":"2026-04-29"},
  {"id":"CLM030","name":"Sayed Ahmed Mohamed Ali","national_id":"32730310123456","phone":"01500001111","card":"Valid","status":"Approved","date":"2026-04-30"},

  {"id":"CLM031","name":"Reda Ibrahim Hassan Ali","national_id":"32831321234567","phone":"01511112222","card":"Missing","status":"Rejected","date":"2026-05-01"},
  {"id":"CLM032","name":"Hossam Mohamed Ali Hassan","national_id":"32932332345678","phone":"01522223333","card":"Valid","status":"Approved","date":"2026-05-02"},
  {"id":"CLM033","name":"Ayman Ahmed Hassan Ali","national_id":"33033343456789","phone":"01533334444","card":"Damaged","status":"Under Review","date":"2026-05-03"},
  {"id":"CLM034","name":"Gamal Ibrahim Ali Hassan","national_id":"33134354567890","phone":"01544445555","card":"Valid","status":"Approved","date":"2026-05-04"},
  {"id":"CLM035","name":"Sabry Mohamed Hassan Ali","national_id":"33235365678901","phone":"01555556666","card":"Invalid","status":"Rejected","date":"2026-05-05"},

  {"id":"CLM036","name":"Farouk Ahmed Ali Hassan","national_id":"33336376789012","phone":"01566667777","card":"Valid","status":"Approved","date":"2026-05-06"},
  {"id":"CLM037","name":"Nabil Ibrahim Hassan Ali","national_id":"33437387890123","phone":"01577778888","card":"Missing","status":"Rejected","date":"2026-05-07"},
  {"id":"CLM038","name":"Zaki Mohamed Ali Hassan","national_id":"33538398901234","phone":"01588889999","card":"Valid","status":"Approved","date":"2026-05-08"},
  {"id":"CLM039","name":"Hamdy Ahmed Hassan Ali","national_id":"33639409012345","phone":"01599990000","card":"Damaged","status":"Under Review","date":"2026-05-09"},
  {"id":"CLM040","name":"Shawky Ibrahim Ali Hassan","national_id":"33740410123456","phone":"01012121212","card":"Valid","status":"Approved","date":"2026-05-10"},

  {"id":"CLM041","name":"Galal Mohamed Hassan Ali","national_id":"33841421234567","phone":"01023232323","card":"Invalid","status":"Rejected","date":"2026-05-11"},
  {"id":"CLM042","name":"Mamdouh Ahmed Ali Hassan","national_id":"33942432345678","phone":"01034343434","card":"Valid","status":"Approved","date":"2026-05-12"},
  {"id":"CLM043","name":"Anwar Ibrahim Hassan Ali","national_id":"34043443456789","phone":"01045454545","card":"Missing","status":"Rejected","date":"2026-05-13"},
  {"id":"CLM044","name":"Kamal Mohamed Ali Hassan","national_id":"34144454567890","phone":"01056565656","card":"Valid","status":"Approved","date":"2026-05-14"},
  {"id":"CLM045","name":"Badr Ahmed Hassan Ali","national_id":"34245465678901","phone":"01067676767","card":"Damaged","status":"Under Review","date":"2026-05-15"},

  {"id":"CLM046","name":"Sami Ibrahim Ali Hassan","national_id":"34346476789012","phone":"01078787878","card":"Valid","status":"Approved","date":"2026-05-16"},
  {"id":"CLM047","name":"Maher Mohamed Hassan Ali","national_id":"34447487890123","phone":"01089898989","card":"Invalid","status":"Rejected","date":"2026-05-17"},
  {"id":"CLM048","name":"Hatem Ahmed Ali Hassan","national_id":"34548498901234","phone":"01090909090","card":"Valid","status":"Approved","date":"2026-05-18"},
  {"id":"CLM049","name":"Ragab Ibrahim Hassan Ali","national_id":"34649509012345","phone":"01010101010","card":"Missing","status":"Rejected","date":"2026-05-19"},
  {"id":"CLM050","name":"Saad Mohamed Ali Hassan","national_id":"34750510123456","phone":"01021212121","card":"Valid","status":"Approved","date":"2026-05-20"}
]
"""

raw_claims = json.loads(data_str)
formatted = []

for item in raw_claims:
    f_item = {
        "id": item["id"],
        "fullName": item["name"],
        "nationalId": item["national_id"],
        "phone": item["phone"],
        "cardType": item["card"],
        "description": "Auto generated description",
        "fileAttached": False,
        "fileName": None,
        "status": item["status"],
        "aiDecision": "Approved by AI" if item["status"] == "Approved" else "Rejected by AI" if item["status"] == "Rejected" else "Under Human Review",
        "date": item["date"] + "T10:00:00.000Z",
        "isManuallyOverridden": False
    }
    formatted.append(f_item)

with open('claims.json', 'w', encoding='utf-8') as f:
    json.dump(formatted, f, ensure_ascii=False, indent=2)

print("Fixed the 50 items and wrote to claims.json")
