# AI Browser Test Prompt: VetKad Pro-Level Backend

**User Instruction:** Copy and paste the text below into your AI Browser Agent. Replace `[YOUR_WEBSITE_URL]` with the actual link to your live site (e.g., your GitHub Pages link or Vercel link).

---

### **Role: QA Automation Tester**
**Objective:** Verify that the VetKad lending platform's new "Pro-Level" backend is correctly processing rules for Personal, Business, and Instant loans.

**Target URL:** `[YOUR_WEBSITE_URL]`

Please perform the following **6 Test Scenarios** sequentially. For each scenario, fill out the form with the exact data provided and report the result (Approved/Rejected, Lender Name, and Loan Amount).

---

### **Scenario 1: The "Prime" Personal Loan (HDFC Target)**
*Goal: Test high-income approval logic.*
1.  **Select Path:** Personal Loan
2.  **Full Name:** Rahul Sharma
3.  **Phone:** 9876543210
4.  **Age:** 28
5.  **Desired Amount:** 10,00,000
6.  **Net Monthly Salary:** 60,000
7.  **Total Current EMIs:** 5,000
8.  **Company Name:** Infosys
9.  **Salary Mode:** Bank Transfer
10. **CIBIL Score:** 780
11. **Profession:** Private Sector
*   **Expected Result:** ✅ **APPROVED**.
*   **Expected Lender:** HDFC Bank (Prime).
*   **Expected Amount:** Approx ₹6.8 Lakhs (Calculation: `(60k * 0.65 - 5k) * 20`).

---

### **Scenario 2: The "Negative Profile" Rejection**
*Goal: Test the "Secret Rules" (Profession Filter).*
1.  **Select Path:** Personal Loan
2.  **Full Name:** Vikram Singh
3.  **Phone:** 9876543211
4.  **Age:** 35
5.  **Net Monthly Salary:** 50,000
6.  **Current EMIs:** 0
7.  **CIBIL Score:** 750
8.  **Profession:** **Police** (or Lawyer/Politician)
*   **Expected Result:** ❌ **REJECTED**.
*   **Reason:** Negative Profile / Policy Rules.

---

### **Scenario 3: The "Prime" Business Loan**
*Goal: Test the Business Logic & GST Validation.*
1.  **Select Path:** Business Loan
2.  **Full Name:** Anjali Traders
3.  **Phone:** 9876543212
4.  **Age:** 40
5.  **GST Number:** `29ABCDE1234F1Z5` (Valid Format)
6.  **Annual Turnover:** 1,20,00,000 (1.2 Crores)
7.  **Years in Business:** 5
8.  **Industry Type:** Manufacturing
9.  **Office Ownership:** Owned
10. **Home Ownership:** Owned
*   **Expected Result:** ✅ **APPROVED**.
*   **Expected Lender:** HDFC / ICICI (Prime Business).
*   **Expected Amount:** Approx ₹12 Lakhs (Calculation: `(1.2Cr * 8% / 12) * 15`).

---

### **Scenario 4: The "Negative Industry" Rejection**
*Goal: Test the Business Risk Filters.*
1.  **Select Path:** Business Loan
2.  **Full Name:** City Builders
3.  **Turnover:** 60,00,000
4.  **Years in Business:** 4
5.  **GST Number:** `29ABCDE1234F1Z5`
6.  **Industry Type:** **Real Estate**
*   **Expected Result:** ❌ **REJECTED**.
*   **Reason:** Negative Industry.

---

### **Scenario 5: The "Quick Cash" (Instant Loan)**
*Goal: Test the fallback logic for smaller amounts.*
1.  **Select Path:** Quick Cash (Instant Loan)
2.  **Full Name:** Student Raj
3.  **Phone:** 9876543214
4.  **Age:** 22
5.  **Monthly Income:** 18,000
*   **Expected Result:** ✅ **APPROVED**.
*   **Expected Lender:** KreditBee / CASHe.
*   **Expected Amount:** Approx ₹27,000 - ₹50,000.

---

### **Scenario 6: The "Invalid GST" Check**
*Goal: Test Regex Validation.*
1.  **Select Path:** Business Loan
2.  **Turnover:** 50,00,000
3.  **GST Number:** `12345` (Invalid)
*   **Expected Result:** ❌ **REJECTED**.
*   **Reason:** Invalid GST Number.

---
