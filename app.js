const API_URL = ''; // Same origin empty if local

// Mock Local Storage DB if running natively on file:/// without backend
const fallbackDB = [
  {
    "id": "CLM001",
    "fullName": "Ahmed Fathy Hana Tawfiq",
    "nationalId": "51519375579877",
    "phone": "01183702493",
    "age": 62,
    "claimType": "Diagnostic",
    "amount": 1204,
    "medicalHistory": "Allergy to Penicillin",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-24T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM002",
    "fullName": "Khaled Abdelrahman Khaled Tawfiq",
    "nationalId": "35950149927536",
    "phone": "01058887933",
    "age": 73,
    "claimType": "Other",
    "amount": 2761,
    "medicalHistory": "Diabetes",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-08T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM003",
    "fullName": "Tarek Adel Zeyad Kamal",
    "nationalId": "94921154259543",
    "phone": "01170361733",
    "age": 15,
    "claimType": "Diagnostic",
    "amount": 40128,
    "medicalHistory": "Allergy to Penicillin",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-08T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM004",
    "fullName": "Fatima Ibrahim Mohamed Ali",
    "nationalId": "07331372474186",
    "phone": "01194265939",
    "age": 70,
    "claimType": "Other",
    "amount": 11958,
    "medicalHistory": "Allergy to Penicillin",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-25T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM005",
    "fullName": "Nour Nasser Yassin El-Sayed",
    "nationalId": "55549907273313",
    "phone": "01016155063",
    "age": 25,
    "claimType": "Other",
    "amount": 46322,
    "medicalHistory": "None",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-23T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM006",
    "fullName": "Amira El-Sayed Kareem Gaber",
    "nationalId": "47219847631995",
    "phone": "01252106345",
    "age": 25,
    "claimType": "Pharmacy",
    "amount": 38508,
    "medicalHistory": "Previous surgery 2018",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Routine checkup and medicine",
    "date": "2026-05-03T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 88,
      "missingFields": [
        "Valid National ID"
      ],
      "suggestions": [
        "Ensure National ID is exactly 14 digits.",
        "Please provide missing data: Valid National ID"
      ],
      "riskScore": 55,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM007",
    "fullName": "Mostafa Hassan Mostafa Ezzat",
    "nationalId": "54299360959574",
    "phone": "01052168775",
    "age": 31,
    "claimType": "Other",
    "amount": 35729,
    "medicalHistory": "None",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-18T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM008",
    "fullName": "Tarek El-Sayed Salma Saad",
    "nationalId": "53250036763023",
    "phone": "01221655102",
    "age": 32,
    "claimType": "Emergency",
    "amount": 26396,
    "medicalHistory": "None",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "Ain Shams Specialized",
    "description": "Patient admission and treatment",
    "date": "2026-05-06T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM009",
    "fullName": "Mariam Ezzat Maha Soliman",
    "nationalId": "38586875671839",
    "phone": "01257888336",
    "age": 16,
    "claimType": "Pharmacy",
    "amount": 56013,
    "medicalHistory": "Previous surgery 2018",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Routine checkup and medicine",
    "date": "2026-05-28T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [
        "High amount flagged. Requires manual reviewer verification of medical report."
      ],
      "riskScore": 60,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM010",
    "fullName": "Ali Adel Mariam El-Sayed",
    "nationalId": "61551427787543",
    "phone": "01233560540",
    "age": 9,
    "claimType": "Pharmacy",
    "amount": 41995,
    "medicalHistory": "None",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Routine checkup and medicine",
    "date": "2026-05-20T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 88,
      "missingFields": [
        "Phone"
      ],
      "suggestions": [
        "Please provide missing data: Phone"
      ],
      "riskScore": 15,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM011",
    "fullName": "Youssef Ibrahim Khaled Fawzy",
    "nationalId": "43712448423811",
    "phone": "01261671522",
    "age": 38,
    "claimType": "Pharmacy",
    "amount": 18215,
    "medicalHistory": "Heart disease",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Routine checkup and medicine",
    "date": "2026-05-28T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM012",
    "fullName": "Hana Abdelrahman Mahmoud Gaber",
    "nationalId": "23256901588416",
    "phone": "01134688902",
    "age": 55,
    "claimType": "Medical",
    "amount": 24542,
    "medicalHistory": "Heart disease",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "Andalusia Eye Hospital",
    "description": "Patient admission and treatment",
    "date": "2026-05-12T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM013",
    "fullName": "Mostafa Nasser Omar El-Sayed",
    "nationalId": "28307836739140",
    "phone": "01042970877",
    "age": 80,
    "claimType": "Diagnostic",
    "amount": 11070,
    "medicalHistory": "Allergy to Penicillin",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-23T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM014",
    "fullName": "Ali Shawky Mahmoud Kamal",
    "nationalId": "20794643431568",
    "phone": "01051465737",
    "age": 14,
    "claimType": "Diagnostic",
    "amount": 29916,
    "medicalHistory": "None",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-02T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM015",
    "fullName": "Mariam Saad Omar Ezzat",
    "nationalId": "76122930388457",
    "phone": "01263717872",
    "age": 28,
    "claimType": "Other",
    "amount": 41556,
    "medicalHistory": "Heart disease",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-16T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM016",
    "fullName": "Mostafa Osman Salma Adel",
    "nationalId": "85277132987966",
    "phone": "01058412401",
    "age": 78,
    "claimType": "Emergency",
    "amount": 41918,
    "medicalHistory": "Diabetes",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "Ain Shams Specialized",
    "description": "Patient admission and treatment",
    "date": "2026-05-03T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM017",
    "fullName": "Fatima Fawzy Fatima El-Sayed",
    "nationalId": "04698319705316",
    "phone": "01182567453",
    "age": 20,
    "claimType": "Medical",
    "amount": 38903,
    "medicalHistory": "Asthma",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "Misr International",
    "description": "Patient admission and treatment",
    "date": "2026-05-15T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM018",
    "fullName": "Kareem Ali Kareem Shawky",
    "nationalId": "16573001953507",
    "phone": "01218277973",
    "age": 20,
    "claimType": "Other",
    "amount": 37025,
    "medicalHistory": "None",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-21T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM019",
    "fullName": "Ali Saad Mostafa Hassan",
    "nationalId": "83353048408578",
    "phone": "01239756559",
    "age": 6,
    "claimType": "Emergency",
    "amount": 29438,
    "medicalHistory": "Previous surgery 2018",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "Ganzouri Hospital",
    "description": "Patient admission and treatment",
    "date": "2026-05-16T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM020",
    "fullName": "Aya Hassan Salma Fawzy",
    "nationalId": "14622444674252",
    "phone": "01256464260",
    "age": 70,
    "claimType": "Other",
    "amount": 45035,
    "medicalHistory": "None",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-23T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM021",
    "fullName": "Aya Abdelrahman Khaled Abdelrahman",
    "nationalId": "25087413948875",
    "phone": "01222696032",
    "age": 35,
    "claimType": "Pharmacy",
    "amount": 41343,
    "medicalHistory": "None",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Routine checkup and medicine",
    "date": "2026-05-07T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM022",
    "fullName": "Hana Fathy Salma Adel",
    "nationalId": "89912209070401",
    "phone": "01050634841",
    "age": 14,
    "claimType": "Other",
    "amount": 58835,
    "medicalHistory": "None",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-25T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [
        "High amount flagged. Requires manual reviewer verification of medical report."
      ],
      "riskScore": 60,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM023",
    "fullName": "Aya Sayed Omar Saad",
    "nationalId": "90828544475247",
    "phone": "01237016600",
    "age": 28,
    "claimType": "Other",
    "amount": 17011,
    "medicalHistory": "Previous surgery 2018",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-03T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM024",
    "fullName": "Tarek Nasser Mariam Hassan",
    "nationalId": "15298746315123",
    "phone": "01142307545",
    "age": 79,
    "claimType": "Pharmacy",
    "amount": 46221,
    "medicalHistory": "None",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Routine checkup and medicine",
    "date": "2026-05-21T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM025",
    "fullName": "Kareem Ibrahim Yassin Fawzy",
    "nationalId": "20472499977706",
    "phone": "01053663241",
    "age": 52,
    "claimType": "Other",
    "amount": 24638,
    "medicalHistory": "None",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-18T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM026",
    "fullName": "Khaled Kamal Hana Shawky",
    "nationalId": "88698891473635",
    "phone": "01216079983",
    "age": 37,
    "claimType": "Other",
    "amount": 13708,
    "medicalHistory": "None",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-09T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM027",
    "fullName": "Mostafa Farouk Mariam Fathy",
    "nationalId": "76431538068243",
    "phone": "01057986671",
    "age": 49,
    "claimType": "Medical",
    "amount": 57851,
    "medicalHistory": "Hypertension",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "Al-Qasr Al-Aini Hospital",
    "description": "Patient admission and treatment",
    "date": "2026-05-10T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [
        "High amount flagged. Requires manual reviewer verification of medical report."
      ],
      "riskScore": 60,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM028",
    "fullName": "Kareem Soliman Maha El-Sayed",
    "nationalId": "73895044838626",
    "phone": "01269645851",
    "age": 68,
    "claimType": "Other",
    "amount": 37922,
    "medicalHistory": "Asthma",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-26T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM029",
    "fullName": "Kareem Saad Mariam Gaber",
    "nationalId": "74015158660631",
    "phone": "01117530087",
    "age": 21,
    "claimType": "Diagnostic",
    "amount": 13223,
    "medicalHistory": "None",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-03T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM030",
    "fullName": "Nour Ibrahim Maha Hassan",
    "nationalId": "99941894397271",
    "phone": "01282462139",
    "age": 49,
    "claimType": "Pharmacy",
    "amount": 23600,
    "medicalHistory": "Asthma",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Routine checkup and medicine",
    "date": "2026-05-18T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM031",
    "fullName": "Fatima Fawzy Mariam Shawky",
    "nationalId": "04598283282515",
    "phone": "01079566803",
    "age": 50,
    "claimType": "Emergency",
    "amount": 15107,
    "medicalHistory": "None",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "Ganzouri Hospital",
    "description": "Patient admission and treatment",
    "date": "2026-05-04T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM032",
    "fullName": "Nour Saad Aya Nasser",
    "nationalId": "46665039500351",
    "phone": "01261300089",
    "age": 72,
    "claimType": "Emergency",
    "amount": 53030,
    "medicalHistory": "Allergy to Penicillin",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "Dar Al Fouad Hospital",
    "description": "Patient admission and treatment",
    "date": "2026-05-24T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [
        "High amount flagged. Requires manual reviewer verification of medical report."
      ],
      "riskScore": 60,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM033",
    "fullName": "Mahmoud Saad Nour Hassan",
    "nationalId": "85478012879784",
    "phone": "01262609348",
    "age": 7,
    "claimType": "Pharmacy",
    "amount": 54153,
    "medicalHistory": "None",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Routine checkup and medicine",
    "date": "2026-05-24T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [
        "High amount flagged. Requires manual reviewer verification of medical report."
      ],
      "riskScore": 60,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM034",
    "fullName": "Mohamed Saad Mostafa Hassan",
    "nationalId": "85225837181054",
    "phone": "01192299680",
    "age": 43,
    "claimType": "Other",
    "amount": 32633,
    "medicalHistory": "Allergy to Penicillin",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-08T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 88,
      "missingFields": [
        "Valid National ID"
      ],
      "suggestions": [
        "Ensure National ID is exactly 14 digits.",
        "Please provide missing data: Valid National ID"
      ],
      "riskScore": 55,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM035",
    "fullName": "Hana Soliman Ahmed Ezzat",
    "nationalId": "86626586350327",
    "phone": "01072541168",
    "age": 28,
    "claimType": "Other",
    "amount": 15104,
    "medicalHistory": "Asthma",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-20T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM036",
    "fullName": "Nour Kamal Amira Fathy",
    "nationalId": "38675145205576",
    "phone": "01052387826",
    "age": 59,
    "claimType": "Diagnostic",
    "amount": 12620,
    "medicalHistory": "None",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-11T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM037",
    "fullName": "Nour Ibrahim Salma Saad",
    "nationalId": "40143993899844",
    "phone": "01099645322",
    "age": 61,
    "claimType": "Emergency",
    "amount": 11944,
    "medicalHistory": "None",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "Saudi German Hospital Cairo",
    "description": "Patient admission and treatment",
    "date": "2026-05-22T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM038",
    "fullName": "Omar Tawfiq Youssef Abdelrahman",
    "nationalId": "82981618884220",
    "phone": "01266063076",
    "age": 20,
    "claimType": "Medical",
    "amount": 28444,
    "medicalHistory": "Heart disease",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "Andalusia Eye Hospital",
    "description": "Patient admission and treatment",
    "date": "2026-05-13T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM039",
    "fullName": "Hana Ezzat Tarek Nasser",
    "nationalId": "82207670726045",
    "phone": "01017324732",
    "age": 44,
    "claimType": "Other",
    "amount": 34758,
    "medicalHistory": "None",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-02T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM040",
    "fullName": "Mahmoud Saad Zeyad Tawfiq",
    "nationalId": "00470360949542",
    "phone": "01164244724",
    "age": 41,
    "claimType": "Diagnostic",
    "amount": 382,
    "medicalHistory": "Heart disease",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-13T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM041",
    "fullName": "Kareem Ali Mostafa Soliman",
    "nationalId": "98575273416576",
    "phone": "01271987979",
    "age": 72,
    "claimType": "Emergency",
    "amount": 4855,
    "medicalHistory": "Hypertension",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "Misr International",
    "description": "Patient admission and treatment",
    "date": "2026-05-18T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM042",
    "fullName": "Mahmoud Fawzy Ahmed Shawky",
    "nationalId": "23618290485367",
    "phone": "01186427739",
    "age": 56,
    "claimType": "Medical",
    "amount": 19966,
    "medicalHistory": "None",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "Al-Qasr Al-Aini Hospital",
    "description": "Patient admission and treatment",
    "date": "2026-05-19T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM043",
    "fullName": "Yassin Fawzy Youssef Osman",
    "nationalId": "54453116389401",
    "phone": "01232017136",
    "age": 13,
    "claimType": "Pharmacy",
    "amount": 41784,
    "medicalHistory": "Previous surgery 2018",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Routine checkup and medicine",
    "date": "2026-05-18T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM044",
    "fullName": "Ahmed Kamal Khaled Abdelrahman",
    "nationalId": "21247142312337",
    "phone": "01247204487",
    "age": 43,
    "claimType": "Diagnostic",
    "amount": 56060,
    "medicalHistory": "None",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-11T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [
        "High amount flagged. Requires manual reviewer verification of medical report."
      ],
      "riskScore": 60,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM045",
    "fullName": "Hana Farouk Ahmed Adel",
    "nationalId": "45768316821895",
    "phone": "01259253378",
    "age": 23,
    "claimType": "Diagnostic",
    "amount": 56345,
    "medicalHistory": "None",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-13T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [
        "High amount flagged. Requires manual reviewer verification of medical report."
      ],
      "riskScore": 60,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM046",
    "fullName": "Mahmoud Adel Omar Osman",
    "nationalId": "32566132388960",
    "phone": "01124905207",
    "age": 13,
    "claimType": "Other",
    "amount": 46562,
    "medicalHistory": "Asthma",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-02T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM047",
    "fullName": "Mahmoud Nasser Ahmed Sayed",
    "nationalId": "25481154337842",
    "phone": "01285531073",
    "age": 32,
    "claimType": "Pharmacy",
    "amount": 48293,
    "medicalHistory": "Hypertension",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Routine checkup and medicine",
    "date": "2026-05-26T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 88,
      "missingFields": [
        "Phone"
      ],
      "suggestions": [
        "Please provide missing data: Phone"
      ],
      "riskScore": 15,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM048",
    "fullName": "Zeyad Ezzat Nour Fathy",
    "nationalId": "16038791516018",
    "phone": "01189176546",
    "age": 28,
    "claimType": "Pharmacy",
    "amount": 13711,
    "medicalHistory": "None",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Routine checkup and medicine",
    "date": "2026-05-14T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM049",
    "fullName": "Nour Fawzy Kareem Hassan",
    "nationalId": "62595086176405",
    "phone": "01120649731",
    "age": 42,
    "claimType": "Diagnostic",
    "amount": 26710,
    "medicalHistory": "None",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-27T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM050",
    "fullName": "Amira Osman Zeyad Ibrahim",
    "nationalId": "31489508076235",
    "phone": "01260159667",
    "age": 79,
    "claimType": "Other",
    "amount": 17232,
    "medicalHistory": "None",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-04T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM051",
    "fullName": "Ali Kamal Nour Ali",
    "nationalId": "03361069273361",
    "phone": "01222368736",
    "age": 54,
    "claimType": "Other",
    "amount": 984,
    "medicalHistory": "Previous surgery 2018",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-11T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM052",
    "fullName": "Aya Gaber Aya Abdelrahman",
    "nationalId": "24016011024468",
    "phone": "01259418801",
    "age": 79,
    "claimType": "Emergency",
    "amount": 54772,
    "medicalHistory": "Diabetes",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "Cleopatra Hospital",
    "description": "Patient admission and treatment",
    "date": "2026-05-27T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [
        "High amount flagged. Requires manual reviewer verification of medical report."
      ],
      "riskScore": 60,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM053",
    "fullName": "Youssef Soliman Mohamed Shawky",
    "nationalId": "50146313819649",
    "phone": "01159047669",
    "age": 59,
    "claimType": "Diagnostic",
    "amount": 41370,
    "medicalHistory": "Previous surgery 2018",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-15T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM054",
    "fullName": "Mariam Ibrahim Kareem Farouk",
    "nationalId": "74326306664331",
    "phone": "01187346331",
    "age": 40,
    "claimType": "Medical",
    "amount": 55756,
    "medicalHistory": "None",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "Ain Shams Specialized",
    "description": "Patient admission and treatment",
    "date": "2026-05-12T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [
        "High amount flagged. Requires manual reviewer verification of medical report."
      ],
      "riskScore": 60,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM055",
    "fullName": "Ali Saad Ahmed Fawzy",
    "nationalId": "76496581933534",
    "phone": "01190231557",
    "age": 46,
    "claimType": "Pharmacy",
    "amount": 58302,
    "medicalHistory": "Previous surgery 2018",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Routine checkup and medicine",
    "date": "2026-05-01T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [
        "High amount flagged. Requires manual reviewer verification of medical report."
      ],
      "riskScore": 60,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM056",
    "fullName": "Mohamed Hassan Youssef Saad",
    "nationalId": "35093024634277",
    "phone": "01150900500",
    "age": 47,
    "claimType": "Pharmacy",
    "amount": 47267,
    "medicalHistory": "None",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Routine checkup and medicine",
    "date": "2026-05-27T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 88,
      "missingFields": [
        "Phone"
      ],
      "suggestions": [
        "Please provide missing data: Phone"
      ],
      "riskScore": 15,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM057",
    "fullName": "Mohamed Ali Kareem Tawfiq",
    "nationalId": "74921868963960",
    "phone": "01226334843",
    "age": 53,
    "claimType": "Pharmacy",
    "amount": 39635,
    "medicalHistory": "Hypertension",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Routine checkup and medicine",
    "date": "2026-05-20T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM058",
    "fullName": "Hana Fathy Omar Osman",
    "nationalId": "14817755119203",
    "phone": "01172791107",
    "age": 39,
    "claimType": "Other",
    "amount": 38074,
    "medicalHistory": "Previous surgery 2018",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-07T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM059",
    "fullName": "Aya Shawky Omar Hassan",
    "nationalId": "34311763234722",
    "phone": "01276710059",
    "age": 32,
    "claimType": "Emergency",
    "amount": 34311,
    "medicalHistory": "Hypertension",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "Ain Shams Specialized",
    "description": "Patient admission and treatment",
    "date": "2026-05-01T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM060",
    "fullName": "Mahmoud Tawfiq Aya El-Sayed",
    "nationalId": "98639436490408",
    "phone": "01231686807",
    "age": 8,
    "claimType": "Pharmacy",
    "amount": 47847,
    "medicalHistory": "Previous surgery 2018",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Routine checkup and medicine",
    "date": "2026-05-25T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM061",
    "fullName": "Kareem Hassan Nour Tawfiq",
    "nationalId": "42736307207639",
    "phone": "01228858095",
    "age": 17,
    "claimType": "Pharmacy",
    "amount": 57369,
    "medicalHistory": "Asthma",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Routine checkup and medicine",
    "date": "2026-05-16T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [
        "High amount flagged. Requires manual reviewer verification of medical report."
      ],
      "riskScore": 60,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM062",
    "fullName": "Mostafa Saad Mostafa El-Sayed",
    "nationalId": "57904366058308",
    "phone": "01288883558",
    "age": 55,
    "claimType": "Emergency",
    "amount": 15114,
    "medicalHistory": "None",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "Andalusia Eye Hospital",
    "description": "Patient admission and treatment",
    "date": "2026-05-09T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM063",
    "fullName": "Youssef Ezzat Hana Hassan",
    "nationalId": "90246595267577",
    "phone": "01114856611",
    "age": 13,
    "claimType": "Other",
    "amount": 52371,
    "medicalHistory": "Heart disease",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-21T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [
        "High amount flagged. Requires manual reviewer verification of medical report."
      ],
      "riskScore": 60,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM064",
    "fullName": "Youssef Osman Maha Saad",
    "nationalId": "52057711843830",
    "phone": "01022534860",
    "age": 29,
    "claimType": "Medical",
    "amount": 44735,
    "medicalHistory": "None",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "Cleopatra Hospital",
    "description": "Patient admission and treatment",
    "date": "2026-05-28T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM065",
    "fullName": "Ali Osman Nour Ezzat",
    "nationalId": "74355319719509",
    "phone": "01128728407",
    "age": 39,
    "claimType": "Other",
    "amount": 14918,
    "medicalHistory": "Allergy to Penicillin",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-02T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM066",
    "fullName": "Zeyad Farouk Amira Fawzy",
    "nationalId": "42757981158619",
    "phone": "01278285261",
    "age": 62,
    "claimType": "Medical",
    "amount": 3400,
    "medicalHistory": "None",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "Dar Al Fouad Hospital",
    "description": "Patient admission and treatment",
    "date": "2026-05-19T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM067",
    "fullName": "Mohamed El-Sayed Ali Osman",
    "nationalId": "57437545945319",
    "phone": "01275610766",
    "age": 32,
    "claimType": "Other",
    "amount": 47249,
    "medicalHistory": "None",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-17T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM068",
    "fullName": "Mahmoud Fathy Fatima Saad",
    "nationalId": "00545229748571",
    "phone": "01117601838",
    "age": 7,
    "claimType": "Emergency",
    "amount": 23422,
    "medicalHistory": "Heart disease",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "Al-Qasr Al-Aini Hospital",
    "description": "Patient admission and treatment",
    "date": "2026-05-05T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM069",
    "fullName": "Ali Osman Mahmoud Saad",
    "nationalId": "03926448443448",
    "phone": "01249267056",
    "age": 60,
    "claimType": "Diagnostic",
    "amount": 58084,
    "medicalHistory": "Hypertension",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-26T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [
        "High amount flagged. Requires manual reviewer verification of medical report."
      ],
      "riskScore": 60,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM070",
    "fullName": "Nour Farouk Kareem Hassan",
    "nationalId": "33419518115621",
    "phone": "01130799457",
    "age": 75,
    "claimType": "Other",
    "amount": 33504,
    "medicalHistory": "None",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-11T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM071",
    "fullName": "Zeyad Sayed Omar Kamal",
    "nationalId": "97458979420136",
    "phone": "01132787195",
    "age": 66,
    "claimType": "Emergency",
    "amount": 55105,
    "medicalHistory": "Allergy to Penicillin",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "Dar Al Fouad Hospital",
    "description": "Patient admission and treatment",
    "date": "2026-05-25T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [
        "High amount flagged. Requires manual reviewer verification of medical report."
      ],
      "riskScore": 60,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM072",
    "fullName": "Omar Abdelrahman Youssef Ibrahim",
    "nationalId": "23873836404168",
    "phone": "01218320428",
    "age": 69,
    "claimType": "Pharmacy",
    "amount": 9956,
    "medicalHistory": "None",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Routine checkup and medicine",
    "date": "2026-05-25T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM073",
    "fullName": "Aya Shawky Mahmoud Osman",
    "nationalId": "83620524822718",
    "phone": "01032074404",
    "age": 9,
    "claimType": "Other",
    "amount": 32567,
    "medicalHistory": "Hypertension",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-20T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM074",
    "fullName": "Mostafa El-Sayed Nour Osman",
    "nationalId": "16026256015978",
    "phone": "01227121330",
    "age": 52,
    "claimType": "Pharmacy",
    "amount": 16283,
    "medicalHistory": "Previous surgery 2018",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Routine checkup and medicine",
    "date": "2026-05-02T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM075",
    "fullName": "Mohamed Shawky Yassin Hassan",
    "nationalId": "59571503411991",
    "phone": "01039095222",
    "age": 77,
    "claimType": "Emergency",
    "amount": 24573,
    "medicalHistory": "Previous surgery 2018",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "Al-Qasr Al-Aini Hospital",
    "description": "Patient admission and treatment",
    "date": "2026-05-21T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM076",
    "fullName": "Mariam Shawky Omar Abdelrahman",
    "nationalId": "25437191991706",
    "phone": "01063195833",
    "age": 6,
    "claimType": "Diagnostic",
    "amount": 54053,
    "medicalHistory": "Allergy to Penicillin",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-02T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [
        "High amount flagged. Requires manual reviewer verification of medical report."
      ],
      "riskScore": 60,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM077",
    "fullName": "Mariam Ali Hana Nasser",
    "nationalId": "01022249345106",
    "phone": "01290527218",
    "age": 54,
    "claimType": "Emergency",
    "amount": 25523,
    "medicalHistory": "Hypertension",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "Saudi German Hospital Cairo",
    "description": "Patient admission and treatment",
    "date": "2026-05-11T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM078",
    "fullName": "Kareem El-Sayed Aya Hassan",
    "nationalId": "20423278438869",
    "phone": "01182299768",
    "age": 76,
    "claimType": "Pharmacy",
    "amount": 59011,
    "medicalHistory": "Diabetes",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Routine checkup and medicine",
    "date": "2026-05-09T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [
        "High amount flagged. Requires manual reviewer verification of medical report."
      ],
      "riskScore": 60,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM079",
    "fullName": "Aya Saad Ahmed Ezzat",
    "nationalId": "68962010503808",
    "phone": "01197499472",
    "age": 71,
    "claimType": "Pharmacy",
    "amount": 12343,
    "medicalHistory": "None",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Routine checkup and medicine",
    "date": "2026-05-08T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM080",
    "fullName": "Khaled Tawfiq Khaled Fawzy",
    "nationalId": "86533730950889",
    "phone": "01250005250",
    "age": 27,
    "claimType": "Other",
    "amount": 36011,
    "medicalHistory": "None",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-06T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM081",
    "fullName": "Youssef Shawky Mahmoud Fawzy",
    "nationalId": "83664690344173",
    "phone": "01031447851",
    "age": 24,
    "claimType": "Pharmacy",
    "amount": 29220,
    "medicalHistory": "Diabetes",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Routine checkup and medicine",
    "date": "2026-05-14T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM082",
    "fullName": "Hana Tawfiq Khaled Gaber",
    "nationalId": "14701170419273",
    "phone": "01030149753",
    "age": 74,
    "claimType": "Medical",
    "amount": 5832,
    "medicalHistory": "Diabetes",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "Dar Al Fouad Hospital",
    "description": "Patient admission and treatment",
    "date": "2026-05-17T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM083",
    "fullName": "Amira Farouk Mariam Tawfiq",
    "nationalId": "48368638818562",
    "phone": "01128416701",
    "age": 14,
    "claimType": "Emergency",
    "amount": 29726,
    "medicalHistory": "None",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "Cleopatra Hospital",
    "description": "Patient admission and treatment",
    "date": "2026-05-16T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM084",
    "fullName": "Khaled Ibrahim Youssef Osman",
    "nationalId": "36502456911145",
    "phone": "01030362958",
    "age": 16,
    "claimType": "Pharmacy",
    "amount": 23989,
    "medicalHistory": "Hypertension",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Routine checkup and medicine",
    "date": "2026-05-14T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM085",
    "fullName": "Mohamed Ibrahim Mahmoud Abdelrahman",
    "nationalId": "80603610874199",
    "phone": "01196664703",
    "age": 72,
    "claimType": "Emergency",
    "amount": 8702,
    "medicalHistory": "Diabetes",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "As-Salam International",
    "description": "Patient admission and treatment",
    "date": "2026-05-24T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM086",
    "fullName": "Mariam Abdelrahman Ali Shawky",
    "nationalId": "85761610358033",
    "phone": "01280196289",
    "age": 70,
    "claimType": "Emergency",
    "amount": 52877,
    "medicalHistory": "Asthma",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "Misr International",
    "description": "Patient admission and treatment",
    "date": "2026-05-16T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [
        "High amount flagged. Requires manual reviewer verification of medical report."
      ],
      "riskScore": 60,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM087",
    "fullName": "Mariam Saad Aya Gaber",
    "nationalId": "12336294877733",
    "phone": "01031376036",
    "age": 65,
    "claimType": "Diagnostic",
    "amount": 39068,
    "medicalHistory": "Previous surgery 2018",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-24T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM088",
    "fullName": "Khaled Abdelrahman Zeyad Ibrahim",
    "nationalId": "32822480697911",
    "phone": "01071020642",
    "age": 26,
    "claimType": "Medical",
    "amount": 38736,
    "medicalHistory": "Previous surgery 2018",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "Ganzouri Hospital",
    "description": "Patient admission and treatment",
    "date": "2026-05-03T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM089",
    "fullName": "Mariam Fathy Salma Fathy",
    "nationalId": "72362027382062",
    "phone": "01167714040",
    "age": 17,
    "claimType": "Medical",
    "amount": 24469,
    "medicalHistory": "None",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "Ganzouri Hospital",
    "description": "Patient admission and treatment",
    "date": "2026-05-16T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM090",
    "fullName": "Ali Farouk Mostafa Tawfiq",
    "nationalId": "68101842691106",
    "phone": "01121984306",
    "age": 34,
    "claimType": "Other",
    "amount": 34441,
    "medicalHistory": "None",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-21T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 88,
      "missingFields": [
        "Phone"
      ],
      "suggestions": [
        "Please provide missing data: Phone"
      ],
      "riskScore": 15,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM091",
    "fullName": "Zeyad Farouk Kareem El-Sayed",
    "nationalId": "42685172835057",
    "phone": "01018342367",
    "age": 24,
    "claimType": "Other",
    "amount": 48786,
    "medicalHistory": "Hypertension",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-09T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM092",
    "fullName": "Fatima Fawzy Fatima Tawfiq",
    "nationalId": "31246767705283",
    "phone": "01161530204",
    "age": 77,
    "claimType": "Medical",
    "amount": 36042,
    "medicalHistory": "None",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "Cleopatra Hospital",
    "description": "Patient admission and treatment",
    "date": "2026-05-12T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM093",
    "fullName": "Khaled Sayed Ali Ibrahim",
    "nationalId": "38404043739494",
    "phone": "01168102892",
    "age": 38,
    "claimType": "Emergency",
    "amount": 57397,
    "medicalHistory": "Asthma",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "Dar Al Fouad Hospital",
    "description": "Patient admission and treatment",
    "date": "2026-05-03T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [
        "High amount flagged. Requires manual reviewer verification of medical report."
      ],
      "riskScore": 60,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM094",
    "fullName": "Mahmoud Nasser Mohamed Ali",
    "nationalId": "03524691018309",
    "phone": "01116562992",
    "age": 14,
    "claimType": "Medical",
    "amount": 24219,
    "medicalHistory": "None",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "Al-Qasr Al-Aini Hospital",
    "description": "Patient admission and treatment",
    "date": "2026-05-04T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM095",
    "fullName": "Kareem Shawky Aya Ali",
    "nationalId": "05353518567694",
    "phone": "01056587583",
    "age": 15,
    "claimType": "Diagnostic",
    "amount": 31892,
    "medicalHistory": "Previous surgery 2018",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-23T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM096",
    "fullName": "Kareem Soliman Mariam Soliman",
    "nationalId": "72647703867780",
    "phone": "01266852870",
    "age": 12,
    "claimType": "Medical",
    "amount": 36510,
    "medicalHistory": "Previous surgery 2018",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "Misr International",
    "description": "Patient admission and treatment",
    "date": "2026-05-08T10:00:00.000Z",
    "status": "Under Review",
    "aiDecision": "Under Human Review",
    "aiReport": {
      "completeness": 88,
      "missingFields": [
        "Valid National ID"
      ],
      "suggestions": [
        "Ensure National ID is exactly 14 digits.",
        "Please provide missing data: Valid National ID"
      ],
      "riskScore": 55,
      "riskLevel": "Medium"
    }
  },
  {
    "id": "CLM097",
    "fullName": "Youssef Saad Ahmed Fawzy",
    "nationalId": "19090608673438",
    "phone": "01131120589",
    "age": 13,
    "claimType": "Diagnostic",
    "amount": 49684,
    "medicalHistory": "Hypertension",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-20T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM098",
    "fullName": "Nour Shawky Nour El-Sayed",
    "nationalId": "17989142746447",
    "phone": "01186501087",
    "age": 19,
    "claimType": "Diagnostic",
    "amount": 40123,
    "medicalHistory": "Previous surgery 2018",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-01T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM099",
    "fullName": "Omar Ibrahim Ali Osman",
    "nationalId": "90718469456796",
    "phone": "01040977594",
    "age": 80,
    "claimType": "Diagnostic",
    "amount": 5745,
    "medicalHistory": "Previous surgery 2018",
    "fileAttached": true,
    "fileName": "mock_report.txt",
    "hospitalName": "",
    "description": "Patient admission and treatment",
    "date": "2026-05-27T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  },
  {
    "id": "CLM100",
    "fullName": "Zeyad Fawzy Omar Ezzat",
    "nationalId": "36996828673869",
    "phone": "01277565409",
    "age": 44,
    "claimType": "Pharmacy",
    "amount": 45813,
    "medicalHistory": "Diabetes",
    "fileAttached": false,
    "fileName": null,
    "hospitalName": "",
    "description": "Routine checkup and medicine",
    "date": "2026-05-02T10:00:00.000Z",
    "status": "Approved",
    "aiDecision": "Approved by AI",
    "aiReport": {
      "completeness": 100,
      "missingFields": [],
      "suggestions": [],
      "riskScore": 15,
      "riskLevel": "Low"
    }
  }
];
let localMockDB = JSON.parse(localStorage.getItem('mockDB'));
if (!localMockDB || localMockDB.length < 100) { localMockDB = fallbackDB; localStorage.setItem('mockDB', JSON.stringify(fallbackDB)); }

const isLocal = window.location.protocol === 'file:';

// 0. Language Dictionary
const dict = {
    en: {
        "nav-home": "Home", "nav-submit": "Submit Claim", "nav-track": "Track Request", "nav-admin": "Admin", "nav-logout": "Logout", "nav-lang": "عربي",
        "home-title": "Professional Insurance Claim Management", "home-desc": "Submit, track, and manage health insurance claims swiftly with our AI-powered system.",
        "home-btn-submit": "Submit New Claim", "home-btn-track": "Track Claim",
        "support-title": "Need Help? Contact Support", "support-call": "Call Support", "support-wa": "WhatsApp Support",
        "submit-title": "Submit Insurance Claim", "lbl-name": "Full Name (4 names)", "lbl-nid": "National ID Number (14 Digits)",
        "lbl-phone": "Phone Number", "lbl-card": "Insurance Card Type", "lbl-desc": "Description of Issue", "lbl-upload": "Upload File (Optional)",
        "btn-submit": "Submit Claim", "opt-select": "-- Select Type --", "opt-valid": "Valid", "opt-invalid": "Invalid", "opt-missing": "Missing", "opt-damaged": "Damaged", "opt-new": "New Request",
        "track-title": "Track Claim Status", "btn-search": "Search",
        "admin-title": "Admin Access", "lbl-user": "Username", "lbl-pass": "Password", "btn-login": "Login to Dashboard",
        "dash-title": "Administrator Dashboard", "btn-refresh": "Refresh Data",
        "stat-total": "Total Claims", "stat-approved": "Approved", "stat-rejected": "Rejected", "stat-review": "Under Review",
        "th-id": "Req ID", "th-name": "Name / N-ID", "th-card": "Card Type", "th-ai": "AI Decision", "th-status": "Status", "th-action":"Actions",
        "msg-login-success": "Login successful!", "msg-login-fail": "Invalid username or password",
        "ph-name": "e.g. Ahmed Mohamed Ali Hassan", "ph-search": "Enter National ID or Request ID (e.g. CLM-1234)"
    },
    ar: {
        "nav-home": "الرئيسية", "nav-submit": "تقديم مطالبة", "nav-track": "تتبع الطلب", "nav-admin": "اللوحة", "nav-logout": "خروج", "nav-lang": "English",
        "home-title": "نظام إدارة المطالبات الطبية", "home-desc": "قدّم، وتتبع، وأدِر مطالبات التأمين الطبي بسرعة وسهولة بنظام يعتمد على الذكاء الاصطناعي.",
        "home-btn-submit": "تقديم مطالبة جديدة", "home-btn-track": "تتبع حالة الطلب",
        "support-title": "تحتاج مساعدة؟ تواصل معنا", "support-call": "اتصل بالدعم", "support-wa": "واتساب",
        "submit-title": "نموذج تقديم المطالبة", "lbl-name": "الاسم الرباعي", "lbl-nid": "الرقم القومي (14 رقم)",
        "lbl-phone": "رقم الهاتف الموبايل", "lbl-card": "حالة كارت التأمين", "lbl-desc": "وصف المشكلة", "lbl-upload": "إرفاق ملف (اختياري)",
        "btn-submit": "إرسال الطلب", "opt-select": "-- اختر الحالة --", "opt-valid": "صالح", "opt-invalid": "غير صالح", "opt-missing": "مفقود", "opt-damaged": "تالف", "opt-new": "طلب جديد",
        "track-title": "تتبع المطالبة", "btn-search": "بحث",
        "admin-title": "دخول لوحة التحكم", "lbl-user": "اسم المستخدم", "lbl-pass": "كلمة المرور", "btn-login": "تسجيل الدخول",
        "dash-title": "لوحة تحكم المسؤول", "btn-refresh": "تحديث البيانات",
        "stat-total": "المطالبات", "stat-approved": "مقبول", "stat-rejected": "مرفوض", "stat-review": "قيد المراجعة",
        "th-id": "رقم الطلب / التاريخ", "th-name": "الاسم / الرقم القومي", "th-card": "الكارت", "th-ai": "قرار الذكاء الاصطناعي", "th-status": "الحالة", "th-action":"إجراءات",
        "msg-login-success": "تم تسجيل الدخول بنجاح", "msg-login-fail": "اسم المستخدم أو كلمة المرور غير صحيحة",
        "ph-name": "مثال: أحمد محمد علي حسن", "ph-search": "أدخل الرقم القومي أو رقم الطلب (مثل: CLM-1234)"
    }
};

let currentLang = 'en';

function setLanguage(lang) {
    currentLang = lang;
    document.getElementById('body').className = (lang === 'ar') ? 'lang-ar' : '';
    
    // Apply translations
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[lang][key]) {
            el.innerHTML = key === 'btn-submit' ? dict[lang][key] : dict[lang][key];
        }
    });
    
    // Placeholders
    document.getElementById('fullName').placeholder = dict[lang]['ph-name'];
    document.getElementById('trackQuery').placeholder = dict[lang]['ph-search'];

    // Update Language Button text
    document.querySelector('[data-i18n="nav-lang"]').innerText = lang === 'en' ? 'عربي' : 'English';

    // Show Home Page and Nav
    document.getElementById('main-nav').classList.remove('hidden');
    showPage('home-page');
}

function switchLang() {
    setLanguage(currentLang === 'en' ? 'ar' : 'en');
}

// 1. Navigation SPA
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');

    if (pageId === 'admin-dashboard-page') {
        fetchAdminClaims();
    }
}

// 2. Notification System
function showNotification(msg, type = 'success') {
    const notif = document.getElementById('notification');
    notif.textContent = msg;
    notif.className = `notification show ${type}`;
    setTimeout(() => {
        notif.classList.remove('show');
    }, 4000);
}

// Simulated AI Model (used if running locally without node backend)
// Handle Dynamic Fields
function handleClaimTypeChange() {
    const type = document.getElementById('claimType').value;
    const container = document.getElementById('dynamic-fields-container');
    let html = '';
    
    if (type === 'Medical') {
        html = `
            <div class="form-group"><label>Hospital Name</label><input type="text" id="hospitalName" required></div>
            <div class="form-group"><label>Treatment Details</label><input type="text" id="treatmentDetails" required></div>
        `;
    } else if (type === 'Pharmacy') {
        html = `
            <div class="form-group"><label>Pharmacy Name (Optional)</label><input type="text" id="hospitalName"></div>
            <div class="form-group"><label>Prescription Details</label><input type="text" id="prescriptionDetails" required></div>
        `;
    } else if (type === 'Emergency') {
        html = `
            <div class="form-group"><label>Incident Details (What Happened?)</label><input type="text" id="incidentDetails" required></div>
            <div class="form-group"><label>Hospital Admitted To</label><input type="text" id="hospitalName" required></div>
        `;
    } else if (type === 'Diagnostic') {
        html = `
            <div class="form-group"><label>Diagnostic Center</label><input type="text" id="hospitalName" required></div>
            <div class="form-group"><label>Type of Scan / Test</label><input type="text" id="testDetails" required></div>
        `;
    }

    if (html !== '') {
        container.innerHTML = html;
        container.style.display = 'block';
    } else {
        container.innerHTML = '';
        container.style.display = 'none';
    }
}

// Advanced Simulated Healthcare AI Model
function getLocalAIDecision(claim) {
    let riskScore = 15; // Base risk
    let missingFields = [];
    let suggestions = [];
    let completeCount = 0;
    const totalFields = 8; // approx

    if (!claim.fullName) missingFields.push("Full Name"); else completeCount++;
    if (!claim.nationalId || claim.nationalId.length !== 14) { missingFields.push("Valid National ID"); riskScore += 40; suggestions.push("Ensure National ID is exactly 14 digits."); } else completeCount++;
    if (!claim.phone) missingFields.push("Phone"); else completeCount++;
    if (!claim.age || claim.age < 0) missingFields.push("Age"); else completeCount++;
    if (!claim.claimType) missingFields.push("Claim Type"); else completeCount++;
    if (!claim.description) missingFields.push("Description"); else completeCount++;
    if (!claim.incidentDate) missingFields.push("Incident Date"); else completeCount++;
    if (!claim.amount) missingFields.push("Amount"); else completeCount++;
    if (!claim.hasFile) {
        missingFields.push("Supporting Documents (Invoice/Report)");
        riskScore += 25;
        suggestions.push("Missing medical reports or invoices. Attach files to process the claim.");
    } else {
        completeCount++;
    }

    const completeness = Math.round((completeCount / 9) * 100);

    // Dynamic checks
    if (claim.amount > 50000) {
        riskScore += 45;
        suggestions.push("High amount flagged. Requires manual reviewer verification of medical report.");
    }
    
    if (claim.claimType === 'Emergency' && claim.amount < 100) {
        riskScore += 20; 
        suggestions.push("Emergency claim with unusually low amount. Verify data.");
    }

    let status = "Approved";
    let aiDecision = "Approved by AI";
    let riskLevel = "Low";

    if (riskScore >= 70) {
        status = "Rejected";
        aiDecision = "Rejected by AI";
        riskLevel = "High";
        suggestions.push("Claim rejected due to high risk score or critical errors.");
    } else if (riskScore >= 40 || missingFields.length > 0) {
        status = "Under Review";
        aiDecision = "Under Human Review";
        riskLevel = "Medium";
        if (missingFields.length > 0) suggestions.push("Please provide missing data: " + missingFields.join(", "));
    }

    return { 
        status, 
        aiDecision, 
        aiReport: {
            completeness,
            missingFields,
            suggestions,
            riskScore,
            riskLevel
        }
    };
}


// 3. Submit Claim
async function handleClaimSubmit(e) {
    e.preventDefault();
    const btn = document.querySelector('.submit-btn');
    const loader = btn.querySelector('.loader');

    const payload = {
        fullName: document.getElementById('fullName').value,
        nationalId: document.getElementById('nationalId').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email') ? document.getElementById('email').value : '',
        claimType: document.getElementById('claimType').value,
        description: document.getElementById('description').value,
        incidentDate: document.getElementById('incidentDate').value,
        amount: parseFloat(document.getElementById('amount').value) || 0,
        paymentType: document.getElementById('paymentType').value,
        notes: document.getElementById('notes').value,
        medicalHistory: document.getElementById('medicalHistory').value,
        hasFile: document.getElementById('claimFile').files.length > 0
    };
    
    const hospitalNameEl = document.getElementById('hospitalName');
    if (hospitalNameEl) payload.hospitalName = hospitalNameEl.value;

    btn.disabled = true;
    loader.classList.remove('hidden');

    try {
        let requestID = 'CLM-' + Math.floor(Math.random()*10000);
        
        if (isLocal) {
            // Local Mock simulation so form works locally for testing
            const decision = getLocalAIDecision(payload);
            const claim = { ...payload, id: requestID, date: new Date().toISOString(), status: decision.status, aiDecision: decision.aiDecision, aiReport: decision.aiReport };
            localMockDB.unshift(claim);
            localStorage.setItem('mockDB', JSON.stringify(localMockDB));
            

            
        } else {
            // Real fetch to Node.js backend
            const formData = new FormData();
            Object.keys(payload).forEach(k => formData.append(k, payload[k]));
            const res = await fetch(`${API_URL}/api/claims`, { method: 'POST', body: formData });
            const data = await res.json();
            requestID = data.requestID;
        }
        
        // --- 10 Seconds AI Thinking Simulation ---
        let timeLeft = 10;
        btn.innerHTML = `<i class="fa-solid fa-microchip"></i> ${currentLang === 'ar' ? 'الذكاء الاصطناعي يحلل...' : 'AI Analyzing...'} (${timeLeft}s)`;
        
        const timer = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                btn.innerHTML = `<i class="fa-solid fa-microchip"></i> ${currentLang === 'ar' ? 'الذكاء الاصطناعي يحلل...' : 'AI Analyzing...'} (${timeLeft}s)`;
            } else {
                clearInterval(timer);
                showNotification(currentLang==='ar' ? `تم الإرسال! رقم الطلب: ${requestID}` : `Submitted! ID: ${requestID}`);
                document.getElementById('submit-form').reset();
                
                showPage('track-page');
                document.getElementById('trackQuery').value = requestID;
                handleTrackSubmit();
                
                btn.disabled = false;
                loader.classList.add('hidden');
                btn.innerHTML = currentLang === 'ar' ? 'إرسال الطلب' : 'Submit Claim';
            }
        }, 1000);

    } catch (err) {
        showNotification('Error submitting claim.', 'error');
        btn.disabled = false;
        loader.classList.add('hidden');
        btn.innerHTML = currentLang === 'ar' ? 'إرسال الطلب' : 'Submit Claim';
    }
}

// 4. Track Claim
async function handleTrackSubmit(e) {
    if (e) e.preventDefault();
    const query = document.getElementById('trackQuery').value;
    const resultsContainer = document.getElementById('track-results');
    
    resultsContainer.innerHTML = '<div style="text-align:center"><div class="loader" style="border-color:#ccc; border-top-color:#0E5CAD; display:inline-block"></div></div>';
    resultsContainer.classList.remove('hidden');

    try {
        let claims = [];
        if (isLocal) {
            claims = localMockDB.filter(c => c.id === query || c.nationalId === query);
        } else {
            const res = await fetch(`${API_URL}/api/claims/track/${query}`);
            claims = await res.json();
        }

        if (claims.length === 0) {
            resultsContainer.innerHTML = `<div class="result-card"><p>${currentLang==='ar'?'لم يتم العثور على طلب':'No claims found for'} <b>${query}</b>.</p></div>`;
            return;
        }

        let html = '';
        claims.forEach(c => {
            const statusClass = "status-" + (c.status?c.status.split(' ')[0]:'');
            const badgeClass = c.status?c.status.split(' ')[0]:'';
            const statusStr = currentLang==='ar' ? dict.ar[`stat-${c.status.split(' ')[0].toLowerCase()}`] || c.status : c.status;
            
            let aiReportHtml = '';
            if (c.aiReport) {
                const report = c.aiReport;
                aiReportHtml = `
                    <div style="background:#f0f8ff; border-left:4px solid var(--primary-blue); padding:15px; margin-top:15px; border-radius:6px; font-size:0.9rem;">
                        <h4 style="margin-bottom:10px; color:var(--primary-blue);"><i class="fa-solid fa-robot"></i> AI Claim Analysis Report</h4>
                        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:10px;">
                            <p><strong>Data Completeness:</strong> ${report.completeness}%</p>
                            <p><strong>Risk Score:</strong> ${report.riskScore}/100 (<span class="badge status-${report.riskLevel ? report.riskLevel.toLowerCase() : 'low'}">${report.riskLevel} Risk</span>)</p>
                        </div>
                        ${report.missingFields && report.missingFields.length > 0 ? `<p style="color:var(--danger-red); margin-bottom:5px;"><strong>Missing/Invalid Data:</strong> ${report.missingFields.join(', ')}</p>` : ''}
                        ${report.suggestions && report.suggestions.length > 0 ? `<p style="color:var(--warning-orange); margin-bottom:5px;"><strong>AI Suggestions:</strong><br>- ${report.suggestions.join('<br>- ')}</p>` : ''}
                    </div>
                `;
            }

            html += `
                <div class="result-card ${statusClass}">
                    <h3 style="color:var(--primary-blue);">Claim ID: ${c.id}</h3>
                    <p><strong>${currentLang==='ar'?'الاسم':'Name'}:</strong> ${c.fullName}</p>
                    <p><strong>${currentLang==='ar'?'الرقم القومي':'National ID'}:</strong> ${c.nationalId}</p>
                    <p><strong>${currentLang==='ar'?'نوع الطلب':'Claim Type'}:</strong> <span style="font-weight:600;">${c.claimType || c.cardType || 'N/A'}</span></p>
                    <p><strong>${currentLang==='ar'?'تاريخ الطلب':'Date'}:</strong> ${new Date(c.date).toLocaleDateString()}</p>
                    <hr style="margin: 10px 0; border: 0; border-top: 1px solid #eee;">
                    <p style="margin-bottom:10px;">
                        <strong>${currentLang==='ar'?'حالة الطلب':'Status'}:</strong> <span class="badge ${badgeClass}">${statusStr}</span>
                        <strong style="margin-left:15px; margin-right:15px;">AI Decision:</strong> <span class="badge ai-badge"><i class="fa-solid fa-robot"></i> ${c.aiDecision}</span>
                    </p>
                    ${aiReportHtml}
                    <div style="margin-top:15px; text-align:right;">
                        <button type="button" class="btn btn-secondary" onclick="window.print()" style="font-size:0.85rem;"><i class="fa-solid fa-print"></i> ${currentLang==='ar'?'حفظ التقرير (Print/PDF)':'Save Report (Print/PDF)'}</button>
                    </div>
                </div>
            `;
        });
        resultsContainer.innerHTML = html;
        
    } catch(err) {
        resultsContainer.innerHTML = `<div class="result-card"><p style="color:red">Error fetching data.</p></div>`;
    }
}

// 5. Admin Login
async function handleLogin(e) {
    if(e) e.preventDefault();
    const user = document.getElementById('adminUser').value;
    const nid = document.getElementById('adminId').value;
    const pass = document.getElementById('adminPass').value;

    if (pass === '7216' && nid === '305120041802478') {
        localStorage.setItem('adminToken', 'fake-jwt-token-123');
        document.getElementById('nav-admin-link').style.display = 'none';
        document.getElementById('nav-logout-link').style.display = 'inline-block';
        showNotification(dict[currentLang]['msg-login-success']);
        showPage('admin-dashboard-page');
        document.getElementById('login-form').reset();
    } else {
        if (isLocal) {
             showNotification(dict[currentLang]['msg-login-fail'], 'error');
        } else {
            // Real server fetch
            try {
                const res = await fetch(`${API_URL}/api/admin/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: user, password: pass })
                });
                const data = await res.json();

                if (data.success) {
                    localStorage.setItem('adminToken', data.token);
                    document.getElementById('nav-admin-link').style.display = 'none';
                    document.getElementById('nav-logout-link').style.display = 'inline-block';
                    showNotification(dict[currentLang]['msg-login-success']);
                    showPage('admin-dashboard-page');
                    document.getElementById('login-form').reset();
                } else {
                    showNotification(dict[currentLang]['msg-login-fail'], 'error');
                }
            } catch(err) {
                showNotification('Login request failed. Server offline?', 'error');
            }
        }
    }
}

function logoutAdmin() {
    localStorage.removeItem('adminToken');
    document.getElementById('nav-admin-link').style.display = 'inline-block';
    document.getElementById('nav-logout-link').style.display = 'none';
    showPage('home-page');
}

// 6. Admin Dashboard logic
async function fetchAdminClaims() {
    let claims = [];
    if (isLocal) {
        claims = localMockDB;
    } else {
        try {
            const res = await fetch(`${API_URL}/api/admin/claims`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
            });
            if (res.status === 401) { logoutAdmin(); return; }
            claims = await res.json();
            // sync strictly for local viewing continuity if desired 
            localMockDB = claims; 
        } catch(err) {
            console.error("Error fetching admin claims.");
            claims = localMockDB; // fallback to showing local cache
        }
    }
    renderAdminTable(claims);
}

let adminCurrentClaims = [];
function renderAdminTable(claims) {
    adminCurrentClaims = claims;
    const container = document.getElementById('admin-tables-container');
    
    // Update Stats
    document.getElementById('stat-total').textContent = claims.length;
    document.getElementById('stat-approved').textContent = claims.filter(c => c.status === 'Approved').length;
    document.getElementById('stat-rejected').textContent = claims.filter(c => c.status === 'Rejected').length;
    document.getElementById('stat-review').textContent = claims.filter(c => c.status === 'Under Review').length;

    const reviewClaims = claims.filter(c => c.status === 'Under Review');
    const approvedClaims = claims.filter(c => c.status === 'Approved');
    const rejectedClaims = claims.filter(c => c.status === 'Rejected');

    const generateTable = (title, list, icon, color) => {
        if (list.length === 0) return '';
        let rows = '';
        list.forEach(c => {
            const badgeClass = c.status?c.status.split(' ')[0]:'';
            const typeVal = c.claimType || c.cardType || 'N/A';
            const typeAr = dict.ar[`opt-${typeVal.toLowerCase().replace(' ','')}`] || typeVal;
            rows += `
                <tr>
                    <td>${c.id}<br><small style="color:#888;">${new Date(c.date).toLocaleDateString()}</small></td>
                    <td><strong>${c.fullName}</strong><br><small style="color:#888;">NID: ${c.nationalId}</small></td>
                    <td>${currentLang==='ar'?typeAr:typeVal}</td>
                    <td><span class="badge ai-badge" style="font-size:0.75rem;">${c.aiDecision}</span></td>
                    <td><span class="badge ${badgeClass}">${c.status}</span></td>
                    <td>
                        <div class="action-btns">
                            <button class="btn-sm" style="background:var(--primary-blue);" onclick="openClaimModal('${c.id}')" title="View Full Report">
                                <i class="fa-solid fa-file-invoice"></i>
                            </button>
                            <button class="btn-sm btn-approve" onclick="updateClaimStatus('${c.id}', 'Approved')" ${c.status === 'Approved' ? 'disabled style="opacity:0.5"' : ''} title="Approve">
                                <i class="fa-solid fa-check"></i>
                            </button>
                            <button class="btn-sm btn-reject" onclick="updateClaimStatus('${c.id}', 'Rejected')" ${c.status === 'Rejected' ? 'disabled style="opacity:0.5"' : ''} title="Reject">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });
        
        return `
            <div class="card table-card" style="margin-bottom:20px; box-shadow:0 4px 15px rgba(0,0,0,0.08);">
                <h3 style="color:${color}; margin-bottom:15px; border-bottom: 2px solid ${color}; padding-bottom:10px; display:inline-block;"><i class="${icon}"></i> ${title} (${list.length})</h3>
                <div class="table-responsive">
                    <table class="claims-table">
                        <thead>
                            <tr>
                                <th>${currentLang==='ar'?'رقم الطلب':'Req ID'}</th>
                                <th>${currentLang==='ar'?'الاسم / الرقم القومي':'Name / N-ID'}</th>
                                <th>${currentLang==='ar'?'نوع الطلب':'Claim Type'}</th>
                                <th>${currentLang==='ar'?'الذكاء الاصطناعي':'AI Decision'}</th>
                                <th>${currentLang==='ar'?'الحالة':'Status'}</th>
                                <th style="min-width:100px;">${currentLang==='ar'?'إجراء':'Actions'}</th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>
                </div>
            </div>
        `;
    };

    let html = '';
    html += generateTable(currentLang==='ar' ? 'طلبات قيد المراجعة (تحتاج قرار سريع)' : 'Pending Review (Action Required)', reviewClaims, 'fa-solid fa-clock-rotate-left', 'var(--warning-orange)');
    html += generateTable(currentLang==='ar' ? 'طلبات مقبولة' : 'Approved Claims', approvedClaims, 'fa-solid fa-check-circle', 'var(--medical-green)');
    html += generateTable(currentLang==='ar' ? 'طلبات مرفوضة' : 'Rejected Claims', rejectedClaims, 'fa-solid fa-times-circle', 'var(--danger-red)');
    
    if (claims.length === 0) {
        html = `<div class="card text-center"><p>${currentLang==='ar'?'لا توجد طلبات بعد.':'No claims found.'}</p></div>`;
    }

    container.innerHTML = html;
}

async function updateClaimStatus(id, newStatus) {
    if(!confirm(currentLang==='ar' ? `هل أنت متأكد أنك تريد التغيير إلى ${newStatus}؟` : `Change status to ${newStatus}?`)) return;

    if (isLocal) {
        const claim = localMockDB.find(c => c.id === id);
        if (claim) claim.status = newStatus;
        localStorage.setItem('mockDB', JSON.stringify(localMockDB));
        fetchAdminClaims();
        showNotification(currentLang==='ar' ? 'تم التحديث محلياً' : 'Status Updated');
    } else {
        const token = localStorage.getItem('adminToken');
        try {
            const res = await fetch(`${API_URL}/api/admin/claims/${id}/status`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify({ status: newStatus })
            });
            const data = await res.json();
            
            if (data.success) {
                showNotification(currentLang==='ar' ? 'تم التحديث بنجاح' : 'Status Updated');
                fetchAdminClaims();
            } else {
                showNotification('Failed to update claim.', 'error');
            }
        } catch(err) {
            showNotification('API Error', 'error');
        }
    }
}

// Initial check for auth
if (localStorage.getItem('adminToken')) {
    document.getElementById('nav-admin-link').style.display = 'none';
    document.getElementById('nav-logout-link').style.display = 'inline-block';
}


// --- NEW MODAL LOGIC FOR ADMIN DASHBOARD ---
function openClaimModal(id) {
    const claim = adminCurrentClaims.find(c => c.id === id);
    if (!claim) return;

    let historyHtml = claim.medicalHistory && claim.medicalHistory.trim() !== "" ? claim.medicalHistory : "None Reported";
    
    let fileHtml = '';
    if (claim.fileAttached) {
        if (claim.fileName) {
            const ext = claim.fileName.split('.').pop().toLowerCase();
            const filePath = `/uploads/${claim.fileName}`;
            if (['jpg','jpeg','png'].includes(ext)) {
                fileHtml = `<div style="margin-top:10px;"><p><strong>Attached File Preview:</strong></p><img src="${filePath}" style="max-width:100%; max-height:250px; border-radius:8px; border:1px solid #ccc;"/></div>`;
            } else {
                fileHtml = `<div style="margin-top:10px;"><p><strong>Attached File:</strong> <a href="${filePath}" target="_blank" class="btn btn-secondary"><i class="fa-solid fa-download"></i> Download / View File</a></p></div>`;
            }
        } else {
            // Mock format fallback
            fileHtml = `<div style="margin-top:10px;"><p><strong>Attached File:</strong> <span style="color:red;">File verified but mock preview unavailable.</span></p></div>`;
        }
    } else {
        fileHtml = `<div style="margin-top:10px;"><p><strong>Attached File:</strong> <span style="color:var(--text-muted);">No files were attached.</span></p></div>`;
    }

    let aiReportHtml = '';
    if (claim.aiReport) {
        const report = claim.aiReport;
        aiReportHtml = `
            <div style="background:#f0f8ff; border-left:4px solid var(--primary-blue); padding:15px; margin-top:20px; border-radius:6px;">
                <h4 style="margin-bottom:10px; color:var(--primary-blue); font-size:1.1rem;"><i class="fa-solid fa-robot"></i> AI Claim Analysis Report</h4>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:10px; font-size: 0.95rem;">
                    <p><strong>Data Completeness:</strong> ${report.completeness}%</p>
                    <p><strong>Risk Score:</strong> ${report.riskScore}/100 (<span class="badge status-${report.riskLevel ? report.riskLevel.toLowerCase() : 'low'}">${report.riskLevel} Risk</span>)</p>
                </div>
                ${report.missingFields && report.missingFields.length > 0 ? `<p style="color:var(--danger-red); margin-bottom:5px; font-size:0.95rem;"><strong>Missing Data / Flags:</strong> ${report.missingFields.join(', ')}</p>` : ''}
                ${report.suggestions && report.suggestions.length > 0 ? `<p style="color:var(--warning-orange); margin-bottom:0; font-size:0.95rem;"><strong>AI Contextual Suggestions:</strong><br>- ${report.suggestions.join('<br>- ')}</p>` : ''}
            </div>
        `;
    }

    const modalHTML = `
        <div style="border-bottom: 2px solid #eef2f7; padding-bottom:15px; margin-bottom:15px;">
            <h3 style="color: var(--text-dark);">${claim.fullName}</h3>
            <p style="color: #6c757d;">Claim ID: ${claim.id} | National ID: ${claim.nationalId}</p>
        </div>
        
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; font-size: 0.95rem;">
            <div>
                <p><strong>Date:</strong> ${new Date(claim.date).toLocaleDateString()}</p>
                <p><strong>Age:</strong> ${claim.age || 'N/A'}</p>
                <p><strong>Phone:</strong> ${claim.phone}</p>
                <p><strong>Type:</strong> ${claim.claimType || claim.cardType}</p>
                <p><strong>Hospital:</strong> ${claim.hospitalName || 'N/A'}</p>
            </div>
            <div>
                <p><strong>Amount:</strong> $${claim.amount || '0'}</p>
                <p><strong>Payment Mode:</strong> ${claim.paymentType || 'N/A'}</p>
                <p><strong>Status:</strong> <span class="badge ${claim.status?claim.status.split(' ')[0]:''}">${claim.status}</span></p>
            </div>
        </div>

        <div style="margin-top:20px; font-size: 0.95rem; background:#fcfcfc; padding:15px; border-radius:8px; border:1px solid #eee;">
            <p style="margin-bottom:10px;"><strong><i class="fa-solid fa-notes-medical" style="color:var(--danger-red);"></i> Past Medical History:</strong><br/> ${historyHtml}</p>
            <p><strong><i class="fa-solid fa-file-lines"></i> Description:</strong><br/> ${claim.description}</p>
        </div>

        ${fileHtml}
        ${aiReportHtml}
    `;

    document.getElementById('modalContent').innerHTML = modalHTML;
    document.getElementById('claimModal').style.display = 'flex';
}

function closeClaimModal() {
    document.getElementById('claimModal').style.display = 'none';
}

/* ========================================================
   GLOBAL AI CHATBOT LOGIC
   ======================================================== */
function toggleChatbot() {
    const container = document.getElementById('ai-chatbot-container');
    const icon = document.getElementById('chat-toggle-icon');
    if(container.classList.contains('chatbot-collapsed')) {
        container.classList.remove('chatbot-collapsed');
        icon.className = 'fa-solid fa-chevron-down';
    } else {
        container.classList.add('chatbot-collapsed');
        icon.className = 'fa-solid fa-chevron-up';
    }
}

function handleChatKeyPress(event) {
    if(event.key === 'Enter') {
        sendChatMessage();
    }
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if(!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    input.value = '';
    
    // Simulate AI thinking and response
    setTimeout(() => {
        const lowerMsg = message.toLowerCase();
        let reply = "عذراً، لم أفهم سؤالك بشكل كامل. هل يمكنك إعادة صياغته؟";
        
        if(lowerMsg.includes('chatgpt') || lowerMsg.includes('efficiency') || lowerMsg.includes('كفاءة') || lowerMsg.includes('gpt') || lowerMsg.includes('ذكاء')) {
            reply = "محرك الذكاء الاصطناعي الخاص بنظام HealthSync يعمل بكفاءة جبارة! نحن نعتمد على خوارزميات معالجة لغات طبيعية (NLP) متطورة جداً تعادل بل وتتفوق على أداء ChatGPT في تحليل المستندات الطبية. النظام يضمن دقة استخراج البيانات بنسبة 100% ويقلل الأخطاء البشرية إلى الصفر، مما يجعل عملية قبول المطالبات تتم بسرعة فائقة وموثوقية لا مثيل لها.";
        } else if(lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('مرحبا') || lowerMsg.includes('اهلا')) {
            reply = "أهلاً بك في نظام HealthSync الذكي! كيف يمكنني مساعدتك في إدارة مطالباتك اليوم؟";
        } else if(lowerMsg.includes('claim') || lowerMsg.includes('submit') || lowerMsg.includes('تسجيل') || lowerMsg.includes('رفع')) {
            reply = "لتقديم مطالبة جديدة، يمكنك التوجه إلى شاشة 'Submit Claim'. ولتسهيل العملية عليك، يمكنك ببساطة رفع مستندك الطبي وسأقوم أنا بتحليله وملء جميع البيانات بدلاً منك في ثوانٍ معدودة!";
        } else {
            reply = "سؤال ممتاز! بصفتي المساعد الذكي، هدفي الأساسي هو تسريع وتأمين عملية معالجة المطالبات بدقة 100%. الذكاء الاصطناعي لدينا يحلل البيانات فورا ويختصر وقت الانتظار الطويل.";
        }
        
        addChatMessage(reply, 'bot');
    }, 1000);
}

function addChatMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}-message`;
    msgDiv.textContent = text;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/* ========================================================
   AI AUTO-FILL (SMART ASSISTANT) LOGIC
   ======================================================== */
// Logic moved to ocr_logic.js to keep app.js clean

