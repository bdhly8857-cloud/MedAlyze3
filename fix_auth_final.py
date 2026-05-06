import codecs

with open('public/app.js', 'r', encoding='utf-8') as f:
    c = f.read()

find_blk = """    if (pageId === 'admin-dashboard-page') {
        if (!localStorage.getItem('adminToken')) {
            showPage('admin-login-page');
            showNotification(currentLang === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Please login first', 'error');
        } else {
            fetchAdminClaims();
        }
    }"""

rep_blk = """    if (pageId === 'admin-dashboard-page') {
        fetchAdminClaims();
    }"""

c = c.replace(find_blk, rep_blk)

with open('public/app.js', 'w', encoding='utf-8') as f:
    f.write(c)
