# AI Browser Test Prompt: VetKad Pro-Level Backend

**User Instruction:** Copy and paste the text below into your AI Browser Agent. Replace `[YOUR_WEBSITE_URL]` with the actual link to your live site (e.g., your GitHub Pages link or Vercel link).

**⚠️ CRITICAL:** This application **MUST** be accessed via HTTP (web server), **NOT** as a file:/// URL. 
- ✅ CORRECT: `http://localhost:8000` or `https://your-site.vercel.app`
- ❌ WRONG: `file:///F:/app-new/index.html`

**Quick Setup (if testing locally):**
```bash
# Option 1: Python (if installed)
cd F:/app-new
python -m http.server 8000
# Then open: http://localhost:8000

# Option 2: Node.js (if installed)
cd F:/app-new
npx http-server -p 8000
# Then open: http://localhost:8000
```

---

### **Role: QA Automation Tester**
**Objective:** Verify that the VetKad lending platform's new "Pro-Level" backend is correctly processing rules for **ALL 18 Lenders** and that the new "Total Outstanding Loans" field is functioning correctly.

**Target URL:** `[YOUR_WEBSITE_URL]`

**IMPORTANT - Result Display:** The application displays results in **THREE WAYS** for reliable automation:
1.  **On-Page Result Box:** A colored result box appears directly below the form (✅ APPROVED / ❌ REJECTED)
2.  **Modal Popup:** A modal overlay appears with full details
3.  **Console Logs:** Check Browser Console for `QA_RESULT: {...}` entries

**How to Read Results:**
- Look for the **green box** (APPROVED) or **red box** (REJECTED) below the "Check Now" button
- The box will show: Status, Lender Name, Amount (or Rejection Reason)
- Also check the page's HTML for an element with `id="qa-result-display"` and `data-status` attribute

Please perform the following **Test Scenarios** sequentially. For each scenario, fill out the form with the exact data provided and report the result (Approved/Rejected, Lender Name, and Loan Amount).

---

### **Part 1: New Feature Verification**

#### **Scenario 1: High Obligations Rejection**
*Goal: Test if the new "Total Outstanding Loans" field is working (though logic currently relies on EMIs, we verify the field accepts input).*
1.  **Full Name:** Test User 1
2.  **Phone:** 9876543210
3.  **Age:** 30
4.  **Desired Amount:** 5,00,000
5.  **Net Monthly Salary:** 50,000
6.  **Current Total EMIs:** 40,000 (High FOIR)
7.  **Total Outstanding Loans:** 20,00,000 (New Field)
8.  **CIBIL Score:** 750
9.  **Profession:** Private Sector
10. **Pincode:** 600001
*   **Expected Result:** ❌ **REJECTED**.
*   **Reason:** High existing EMIs (FOIR exceeded).

---

### **Part 2: Lender-Specific Validation (18 Banks)**

#### **1. Aditya Birla Capital**
*   **Profile:** Salary 25k, CIBIL 710, Age 25.
*   **Input:** Salary: 25000, EMIs: 0, CIBIL: 710, Age: 25.
*   **Expected:** ✅ **APPROVED** (Aditya Birla).

#### **2. Axis Finance**
*   **Profile:** Salary 22k, CIBIL 710, Age 22.
*   **Input:** Salary: 22000, EMIs: 0, CIBIL: 710, Age: 22.
*   **Expected:** ✅ **APPROVED** (Axis Finance).

#### **3. Bajaj Finserv**
*   **Profile:** Salary 40k, CIBIL 690, Age 24.
*   **Input:** Salary: 40000, EMIs: 0, CIBIL: 690, Age: 24.
*   **Expected:** ✅ **APPROVED** (Bajaj Finserv - NTC Friendly).

#### **4. Bandhan Bank**
*   **Profile:** Salary 28k, CIBIL 740, Age 25.
*   **Input:** Salary: 28000, EMIs: 0, CIBIL: 740, Age: 25.
*   **Expected:** ✅ **APPROVED** (Bandhan Bank).

#### **5. Chola**
*   **Profile:** Salary 22k, CIBIL 710, Age 25.
*   **Input:** Salary: 22000, EMIs: 0, CIBIL: 710, Age: 25.
*   **Expected:** ✅ **APPROVED** (Chola).

#### **6. Finnable**
*   **Profile:** Salary 18k, CIBIL 710, Age 22.
*   **Input:** Salary: 18000, EMIs: 0, CIBIL: 710, Age: 22.
*   **Expected:** ✅ **APPROVED** (Finnable - Low Salary).

#### **7. HDFC Bank**
*   **Profile:** Salary 60k, CIBIL 780, Age 30.
*   **Input:** Salary: 60000, EMIs: 5000, CIBIL: 780, Age: 30.
*   **Expected:** ✅ **APPROVED** (HDFC Bank - Prime).

#### **8. ICICI Bank**
*   **Profile:** Salary 35k, CIBIL 760, Age 28.
*   **Input:** Salary: 35000, EMIs: 0, CIBIL: 760, Age: 28.
*   **Expected:** ✅ **APPROVED** (ICICI Bank).

#### **9. IDFC First Bank**
*   **Profile:** Salary 22k, CIBIL 730, Age 25.
*   **Input:** Salary: 22000, EMIs: 0, CIBIL: 730, Age: 25.
*   **Expected:** ✅ **APPROVED** (IDFC First Bank).

#### **10. InCred**
*   **Profile:** Salary 22k, CIBIL 710, Age 25.
*   **Input:** Salary: 22000, EMIs: 0, CIBIL: 710, Age: 25.
*   **Expected:** ✅ **APPROVED** (InCred).

#### **11. Kotak Mahindra Bank**
*   **Profile:** Salary 30k, CIBIL 710, Age 25.
*   **Input:** Salary: 30000, EMIs: 0, CIBIL: 710, Age: 25.
*   **Expected:** ✅ **APPROVED** (Kotak Mahindra).

#### **12. L&T Finance (NEW)**
*   **Profile:** Salary 28k, CIBIL 710, Age 25.
*   **Input:** Salary: 28000, EMIs: 0, CIBIL: 710, Age: 25.
*   **Expected:** ✅ **APPROVED** (L&T Finance).

#### **13. MAS Finance**
*   **Profile:** Salary 19k, CIBIL 710, Age 25.
*   **Input:** Salary: 19000, EMIs: 0, CIBIL: 710, Age: 25.
*   **Expected:** ✅ **APPROVED** (MAS Finance).

#### **14. Muthoot**
*   **Profile:** Salary 26k, CIBIL 680, Age 25.
*   **Input:** Salary: 26000, EMIs: 0, CIBIL: 680, Age: 25.
*   **Expected:** ✅ **APPROVED** (Muthoot - Low CIBIL).

#### **15. Piramal Finance**
*   **Profile:** Salary 28k, CIBIL 750, Age 25.
*   **Input:** Salary: 28000, EMIs: 0, CIBIL: 750, Age: 25.
*   **Expected:** ✅ **APPROVED** (Piramal Finance).

#### **16. Poonawala Fincorp**
*   **Profile:** Salary 32k, CIBIL 710, Age 25.
*   **Input:** Salary: 32000, EMIs: 0, CIBIL: 710, Age: 25.
*   **Expected:** ✅ **APPROVED** (Poonawala Fincorp).

#### **17. Tata Capital**
*   **Profile:** Salary 28k, CIBIL 730, Age 25.
*   **Input:** Salary: 28000, EMIs: 0, CIBIL: 730, Age: 25.
*   **Expected:** ✅ **APPROVED** (Tata Capital).

#### **18. WeRize**
*   **Profile:** Salary 13k, CIBIL 660, Age 25.
*   **Input:** Salary: 13000, EMIs: 0, CIBIL: 660, Age: 25.
*   **Expected:** ✅ **APPROVED** (WeRize - Low Salary/CIBIL).

---

### **Part 3: Negative Testing**

#### **Scenario: The "Police" Rejection (Bajaj/Poonawala)**
*   **Input:** Profession: **Police**, Salary: 50k, CIBIL: 750.
*   **Expected:** ❌ **REJECTED** (Policy Restricted).

#### **Scenario: Underage Rejection**
*   **Input:** Age: 18, Salary: 50k.
*   **Expected:** ❌ **REJECTED** (Min Age 21).

---
