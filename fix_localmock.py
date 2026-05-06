with open('public/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

text = text.replace("if (!localMockDB || localMockDB.length === 0) localMockDB = fallbackDB;", "if (!localMockDB || localMockDB.length < 100) { localMockDB = fallbackDB; localStorage.setItem('mockDB', JSON.stringify(fallbackDB)); }")

with open('public/app.js', 'w', encoding='utf-8') as f:
    f.write(text)
print("Updated localMockDB condition.")
