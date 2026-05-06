const API_URL = ''; // Same origin empty if local

// Mock Local Storage DB if running natively on file:/// without backend
let localMockDB = JSON.parse(localStorage.getItem('mockDB')) || [];
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
        if (!localStorage.getItem('adminToken')) {
            showPage('admin-login-page');
            showNotification(currentLang === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Please login first', 'error');
        } else {
            fetchAdminClaims();
        }
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
function getLocalAIDecision(claim) {
    const isValidId = claim.nationalId && claim.nationalId.length === 14 && !isNaN(claim.nationalId);
    const isValidCard = claim.cardType === 'Valid' || claim.cardType === 'New Request';
    const isComplete = claim.fullName && claim.phone && claim.description;

    if (!isComplete || !isValidId || claim.cardType === 'Missing') {
        return { status: "Rejected", aiDecision: "Rejected by AI" };
    }
    
    if (claim.cardType === 'Damaged' || claim.cardType === 'Invalid') {
        return { status: "Under Review", aiDecision: "Under Human Review" };
    }
    return { status: "Approved", aiDecision: "Approved by AI" };
}


// 3. Submit Claim
async function handleClaimSubmit(e) {
    e.preventDefault();
    const btn = document.querySelector('.submit-btn');
    const loader = btn.querySelector('.loader');

    const payload = {
        fullName: document.getElementById('fullName').value,
        nationalId: document.getElementById('nationalId').value,
        phone: document.getElementById('phone').value,
        cardType: document.getElementById('cardType').value,
        description: document.getElementById('description').value
    };

    btn.disabled = true;
    loader.classList.remove('hidden');

    try {
        let requestID = 'CLM-' + Math.floor(Math.random()*10000);
        
        if (isLocal) {
            // Local Mock simulation so form works locally for testing
            const decision = getLocalAIDecision(payload);
            const claim = { ...payload, id: requestID, date: new Date().toISOString(), status: decision.status, aiDecision: decision.aiDecision };
            localMockDB.unshift(claim);
            localStorage.setItem('mockDB', JSON.stringify(localMockDB));
            
            // Notify user about email needing Replit
            setTimeout(() => {
                alert(currentLang==='ar' ? "💡 تنويه: تم حفظ الطلب كمعاينة على جهازك بنجاح. لكن لإرسال 'الإيميل الحقيقي لحسابك Gmail'، يجب رفع و تشغيل المشروع على Replit (السيرفر) لأن إرسال الإيميلات لا يعمل إلا بوجود سيرفر Node.js." : "💡 Note: Claim saved locally. To test real Gmail emails, you must run this on Replit.");
            }, 500);
            
        } else {
            // Real fetch to Node.js backend
            const formData = new FormData();
            Object.keys(payload).forEach(k => formData.append(k, payload[k]));
            const res = await fetch(`${API_URL}/api/claims`, { method: 'POST', body: formData });
            const data = await res.json();
            requestID = data.requestID;
        }
        
        showNotification(currentLang==='ar' ? `تم الإرسال! رقم الطلب: ${requestID}` : `Submitted! ID: ${requestID}`);
        document.getElementById('submit-form').reset();
        
        // Auto-navigate to track page to wow the user
        setTimeout(() => {
            showPage('track-page');
            document.getElementById('trackQuery').value = requestID;
            handleTrackSubmit();
        }, 1500);

    } catch (err) {
        showNotification('Error submitting claim.', 'error');
    } finally {
        btn.disabled = false;
        loader.classList.add('hidden');
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
            
            html += `
                <div class="result-card ${statusClass}">
                    <h3>Claim ID: ${c.id}</h3>
                    <p><strong>${currentLang==='ar'?'الاسم':'Name'}:</strong> ${c.fullName}</p>
                    <p><strong>${currentLang==='ar'?'الرقم القومي':'National ID'}:</strong> ${c.nationalId}</p>
                    <p><strong>${currentLang==='ar'?'تاريخ الطلب':'Date'}:</strong> ${new Date(c.date).toLocaleDateString()}</p>
                    <hr style="margin: 10px 0; border: 0; border-top: 1px solid #eee;">
                    <p>
                        <strong>${currentLang==='ar'?'حالة الطلب':'Status'}:</strong> <span class="badge ${badgeClass}">${statusStr}</span>
                        <strong style="margin-left:15px; margin-right:15px;">AI:</strong> <span class="badge ai-badge"><i class="fa-solid fa-robot"></i> ${c.aiDecision}</span>
                    </p>
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
    const pass = document.getElementById('adminPass').value;

    // Allow login purely on password 4658 to avoid any typing issues
    const normalizedUser = user ? user.toLowerCase().trim() : '';
    if (pass === '4658') {
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

function renderAdminTable(claims) {
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
            const cardAr = dict.ar[`opt-${c.cardType.toLowerCase().replace(' ','')}`] || c.cardType;
            rows += `
                <tr>
                    <td>${c.id}<br><small style="color:#888;">${new Date(c.date).toLocaleDateString()}</small></td>
                    <td><strong>${c.fullName}</strong><br><small style="color:#888;">NID: ${c.nationalId}</small></td>
                    <td>${currentLang==='ar'?cardAr:c.cardType}</td>
                    <td><span class="badge ai-badge" style="font-size:0.75rem;">${c.aiDecision}</span></td>
                    <td><span class="badge ${badgeClass}">${c.status}</span></td>
                    <td>
                        <div class="action-btns">
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
                                <th>${currentLang==='ar'?'الكارت':'Card Type'}</th>
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
