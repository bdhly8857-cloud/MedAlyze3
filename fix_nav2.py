import codecs

with open('public/app.js', 'r', encoding='utf-8') as f:
    c = f.read()

rep = """    if (pageId === 'admin-dashboard-page') {
        if (!localStorage.getItem('adminToken')) {
            showPage('admin-login-page');
            showNotification(currentLang === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Please login first', 'error');
        } else {
            fetchAdminClaims();
        }
    }"""

find = """    if (pageId === 'admin-dashboard-page') {
        fetchAdminClaims();
    }"""

c = c.replace(find, rep)

with open('public/app.js', 'w', encoding='utf-8') as f:
    f.write(c)
