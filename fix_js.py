import json
import codecs

with codecs.open('claims.json', 'r', 'utf-8') as f:
    claims = f.read()

with codecs.open('public/app.js', 'r', 'utf-8') as f:
    code = f.read()

# Fix mock DB
code = code.replace("let localMockDB = JSON.parse(localStorage.getItem('mockDB')) || [];", 
    f"const fallbackDB = {claims};\nlet localMockDB = JSON.parse(localStorage.getItem('mockDB'));\nif (!localMockDB || localMockDB.length === 0) localMockDB = fallbackDB;\n")

submit_find = """        showNotification(currentLang==='ar' ? `تم الإرسال! رقم الطلب: ${requestID}` : `Submitted! ID: ${requestID}`);
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
    }"""

submit_rep = """        // --- 60 Seconds AI Thinking Simulation ---
        let timeLeft = 60;
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
    }"""

code = code.replace(submit_find, submit_rep)

warn_find = """            // Notify user about email needing Replit
            setTimeout(() => {
                alert(currentLang==='ar' ? "💡 تنويه: تم حفظ الطلب كمعاينة على جهازك بنجاح. لكن لإرسال 'الإيميل الحقيقي لحسابك Gmail'، يجب رفع و تشغيل المشروع على Replit (السيرفر) لأن إرسال الإيميلات لا يعمل إلا بوجود سيرفر Node.js." : "💡 Note: Claim saved locally. To test real Gmail emails, you must run this on Replit.");
            }, 500);"""
code = code.replace(warn_find, "")

with codecs.open('public/app.js', 'w', 'utf-8') as f:
    f.write(code)

print("done")
