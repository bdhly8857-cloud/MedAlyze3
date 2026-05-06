import shutil
try:
    shutil.copy(r"C:\Users\Dell\.gemini\antigravity\brain\870837cd-381d-4c98-8e59-db37cac3a3fc\medical_claim_side_1775897158802.png", r"c:\Users\Dell\Pictures\cliam manegment\public\login-side.png")
    print("Copied successfully.")
except Exception as e:
    print("Error:", e)
