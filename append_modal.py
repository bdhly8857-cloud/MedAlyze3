with open('public/app.js', 'a', encoding='utf-8') as f:
    f.write('''

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
''')
print("Successfully appended modal handler JS code.")
