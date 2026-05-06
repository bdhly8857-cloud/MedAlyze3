import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://healthsync-claim-system.netlify.app"
urllib.request.urlretrieve(url, "qrcode_for_judges.png")
print("Done")
