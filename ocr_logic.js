/**
 * OCR LOGIC FOR AI AUTO-FILL
 * Handles communication with the OCR API and data extraction
 */

const OCR_API_ENDPOINT = 'http://10.10.10.119:5000/ocr';

/**
 * Main handler for document upload
 */
async function handleAIAssistantUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Show loader
    const loader = document.getElementById('ai-loader');
    if (loader) loader.classList.remove('hidden');

    console.log("Sending file to OCR API:", file.name);

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch(OCR_API_ENDPOINT, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        console.log("OCR Output:", data);

        if (data.success) {
            processOCRResults(data);
            showNotification("OCR Successful! Form fields updated.", "success");
        } else {
            console.error("OCR Error:", data.error);
            showNotification("OCR Failed: " + (data.error || "Unknown error"), "error");
        }
    } catch (error) {
        console.error("Network Error calling OCR API:", error);
        showNotification("Could not connect to OCR service at " + OCR_API_ENDPOINT, "error");
    } finally {
        if (loader) loader.classList.add('hidden');
        // Reset file input so same file can be uploaded again if needed
        event.target.value = '';
    }
}

/**
 * Processes OCR results to extract Name and National ID
 */
function processOCRResults(data) {
    const fullText = data.full_text || "";
    // Split into lines and clean them
    const lines = fullText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    let extractedName = "";
    let extractedID = "";

    // 1. Extract National ID (14 digits)
    // We look for 14 consecutive digits or Arabic digits
    const arabicDigits = /[٠-٩]/g;
    const westernDigits = /[0-9]/g;

    for (let line of lines) {
        // Convert Arabic digits to Western for easier processing
        const normalizedLine = line.replace(/[٠١٢٣٤٥٦٧٨٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
        const idMatch = normalizedLine.match(/\b\d{14}\b/);
        if (idMatch) {
            extractedID = idMatch[0];
            break;
        }
    }

    // 2. Extract Name
    // Strategy: The name in an Egyptian ID usually appears in the first few lines 
    // and consists of 3-5 words. We exclude common labels like "بطاقة تحقيق الشخصية".
    const excludedKeywords = ["بطاقة", "تحقيق", "الشخصية", "الرقم", "القومي", "محل", "الإقامة", "تاريخ", "الميلاد"];
    
    // We'll look for the longest line that doesn't contain excluded keywords and has multiple words
    let candidateNames = lines.filter(line => {
        // Check if line contains any excluded keywords
        const hasExcluded = excludedKeywords.some(kw => line.includes(kw));
        // Names usually have at least 3 words in Egypt
        const wordCount = line.split(/\s+/).length;
        // Exclude lines that are mostly digits (like ID or address numbers)
        const digitCount = (line.match(/\d/g) || []).length + (line.match(/[٠-٩]/g) || []).length;
        const isMostlyDigits = digitCount > line.length / 2;

        return !hasExcluded && wordCount >= 2 && !isMostlyDigits;
    });

    // If we have candidates, pick the one with the most words (usually the full name)
    if (candidateNames.length > 0) {
        // Sort by length or word count
        candidateNames.sort((a, b) => b.length - a.length);
        extractedName = candidateNames[0];
    }

    console.log("Extracted Data -> Name:", extractedName, "ID:", extractedID);

    // 3. Auto-fill form fields
    if (extractedName) {
        const nameField = document.getElementById('fullName');
        if (nameField) nameField.value = extractedName;
    }

    if (extractedID) {
        const idField = document.getElementById('nationalId');
        if (idField) {
            idField.value = extractedID;
            // Extract age and gender from National ID
            processNationalIDData(extractedID);
        }
    }
}

/**
 * Extracts birth date/age and gender from Egyptian ID
 */
function processNationalIDData(id) {
    if (id.length < 14) return;
    
    // 1. Age Extraction
    const centuryDigit = id[0];
    const year = id.substring(1, 3);
    const month = id.substring(3, 5);
    const day = id.substring(5, 7);
    
    const century = centuryDigit === '2' ? '19' : '20';
    const birthYear = parseInt(century + year);
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    const ageField = document.getElementById('age');
    if (ageField) ageField.value = age;

    // 2. Gender Extraction (13th digit)
    const genderDigit = parseInt(id[12]); // index 12 is the 13th digit
    const gender = (genderDigit % 2 !== 0) ? "Male" : "Female";
    
    const genderField = document.getElementById('gender');
    if (genderField) genderField.value = gender;
}
