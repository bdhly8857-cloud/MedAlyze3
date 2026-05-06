const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Email Configuration
// Note: To use gmail, the user MUST generate an "App Password" from their Google Account
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bdhly8857@gmail.com',
        pass: process.env.EMAIL_PASS || 'NickName013Yq57H516Dq7'
    }
});

// Database helper
const DB_FILE = path.join(__dirname, 'claims.json');
function readDB() {
    if (!fs.existsSync(DB_FILE)) return [];
    try {
        const data = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}
function writeDB(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Simulated AI Model
function simulateAIDecision(claim) {
    let riskScore = 15;
    let missingFields = [];
    let suggestions = [];
    let completeCount = 0;
    const totalFields = 8;

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

    if (claim.amount && parseInt(claim.amount) > 50000) {
        riskScore += 45;
        suggestions.push("High amount flagged. Requires manual reviewer verification of medical report.");
    }
    
    if (claim.claimType === 'Emergency' && claim.amount && parseInt(claim.amount) < 100) {
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

// 1. Submit Claim API
app.post('/api/claims', upload.single('file'), (req, res) => {
    const { fullName, nationalId, age, gender, phone, email, claimType, description, incidentDate, amount, paymentType, notes, hospitalName, medicalHistory } = req.body;
    
    // Simulate AI logic
    const claimData = { fullName, nationalId, age, gender, phone, email, claimType, description, incidentDate, amount, paymentType, notes, hospitalName, medicalHistory, hasFile: !!req.file };
    const decision = simulateAIDecision(claimData);
    
    const newClaim = {
        id: 'CLM-' + crypto.randomBytes(4).toString('hex').toUpperCase(),
        ...claimData,
        fileAttached: !!req.file,
        fileName: req.file ? req.file.filename : null,
        status: decision.status,
        aiDecision: decision.aiDecision,
        aiReport: decision.aiReport,
        date: new Date().toISOString(),
        isManuallyOverridden: false
    };

    const claims = readDB();
    claims.unshift(newClaim);
    writeDB(claims);

    // Send Email to Admin softly in background
    const mailOptions = {
        from: 'bdhly8857@gmail.com',
        to: 'bdhly8857@gmail.com',
        subject: `New Claim Submitted: ${newClaim.id}`,
        text: `A new claim was submitted!
        
        Request ID: ${newClaim.id}
        Name: ${newClaim.fullName}
        National ID: ${newClaim.nationalId}
        Age: ${newClaim.age}
        Gender: ${newClaim.gender}
        Phone: ${newClaim.phone}
        Email: ${newClaim.email || 'None provided'}
        Claim Type: ${newClaim.claimType}
        Hospital/Facility: ${newClaim.hospitalName || "N/A"}
        Incident Date: ${newClaim.incidentDate}
        Estimated Amount: $${newClaim.amount}
        Payment Type: ${newClaim.paymentType}
        Past Medical History: ${newClaim.medicalHistory || "None"}
        Description: ${newClaim.description}
        Notes: ${newClaim.notes || "None"}
        File Attached: ${newClaim.fileAttached ? 'Yes' : 'No'}
        
        --- AI ANALYSIS REPORT ---
        Status: ${newClaim.status}
        AI Decision: ${newClaim.aiDecision}
        Risk Score: ${newClaim.aiReport.riskScore}/100 (${newClaim.aiReport.riskLevel} Risk)
        Data Completeness: ${newClaim.aiReport.completeness}%
        Missing Info: ${newClaim.aiReport.missingFields.length > 0 ? newClaim.aiReport.missingFields.join(", ") : "None"}

        Login to dashboard to view full details.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log("Email Notification Error:", error.message);
        else console.log("Email Notification Sent:", info.response);
    });

    res.json({ success: true, requestID: newClaim.id, status: newClaim.status, aiDecision: newClaim.aiDecision, aiReport: newClaim.aiReport });
});

// 2. Track Request API
app.get('/api/claims/track/:query', (req, res) => {
    const query = req.params.query.trim().toLowerCase();
    const claims = readDB();
    
    const foundClaims = claims.filter(c => 
        (c.id && c.id.toLowerCase() === query) || 
        (c.nationalId && c.nationalId === query)
    );

    res.json(foundClaims);
});

// 3. Admin Login API
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (password === '7216') {
        return res.json({ success: true, token: 'fake-jwt-token-123' });
    }
    res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// Admin Authentication Middleware
function authenticateAdmin(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader === 'Bearer fake-jwt-token-123') return next();
    res.status(401).json({ success: false, message: 'Unauthorized' });
}

// 4. Get all claims mapped
app.get('/api/admin/claims', authenticateAdmin, (req, res) => {
    res.json(readDB());
});

// 5. Override/Modify claim API
app.put('/api/admin/claims/:id/status', authenticateAdmin, (req, res) => {
    const { status } = req.body;
    const claims = readDB();
    const claim = claims.find(c => c.id === req.params.id);
    
    if (claim) {
        claim.status = status;
        claim.isManuallyOverridden = true;
        writeDB(claims);
        return res.json({ success: true, claim });
    }
    res.status(404).json({ success: false, message: 'Claim not found' });
});


// Serve React / Frontend on all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
