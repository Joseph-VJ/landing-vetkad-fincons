# NotebookLM Prompts: PERSONAL LOAN & HOME LOAN (Product Policy Only)
*Use this file to extract the "Credit Policy" details from your documents.*

**Prompt 1: Basic Eligibility Criteria**
> "Based on the documents, list the **Mandatory Eligibility Criteria** for a Personal Loan. Specifically:
> 1. Minimum and Maximum Age (at entry and at maturity).
> 2. Minimum Net Monthly Salary (is it different for Metro vs Non-Metro locations?).
> 3. Minimum Work Experience (Total years vs. Years in current company).
> 4. Minimum CIBIL Score required."

**Prompt 2: Financial Ratios (FOIR)**
> "Explain the **FOIR (Fixed Obligation to Income Ratio)** calculation logic.
> 1. What is the maximum allowed FOIR percentage? (e.g., 50%, 60%?)
> 2. Does the FOIR limit change based on the salary bracket? (e.g., Higher salary = Higher allowed FOIR?)
> 3. What existing obligations are counted? (Credit card minimum dues, existing EMIs, rent?)"

**Prompt 3: Employer Categorization**
> "How does the **Employer Category** affect the loan?
> 1. Are companies classified into Categories (e.g., Super A, Cat A, Cat B, Unlisted)?
> 2. How does the loan multiplier change based on the company category? (e.g., Cat A gets 20x salary, Unlisted gets 10x?)
> 3. Are there any 'Negative Profiles' or 'Negative Employer Types' that are auto-rejected?"

**Prompt 4: Home Loan - LTV & Property**
> "For **Home Loans**, detail the **LTV (Loan to Value)** guidelines:
> 1. What is the max LTV for loans up to 30 Lakhs?
> 2. What is the max LTV for loans above 75 Lakhs?
> 3. What are the restrictions on the property type? (e.g., Gram Panchayat properties, older buildings, resale vs. builder purchase?)"

**Prompt 5: Home Loan - Income Eligibility**
> "How is the **Home Loan Eligibility** calculated?
> 1. Can we include variable pay/incentives in the income calculation?
> 2. What is the logic for adding a Co-Applicant? Whose income can be clubbed? (Spouse, Parents, Siblings?)
> 3. What is the maximum tenure allowed?"

**Prompt 6: Documentation Requirements**
> "List the **Exact Documents Required** for login.
> 1. KYC Documents (Is Aadhaar/PAN mandatory?)
> 2. Income Documents (How many months of Payslips? How many months of Bank Statements?)
> 3. Property Documents (for Home Loan).
> 4. Are there any specific formats required (e.g., PDF only)?"

**Prompt 7: Negative Profiles & Locations**
> "Are there any **Negative Rules** mentioned?
> 1. List of Negative Pin Codes or Locations.
> 2. List of Negative Professions (e.g., Lawyers, Police, Journalists - often restricted in lending).
> 3. Rules for applicants living in PG or Bachelor accommodation."

**Prompt 8: Balance Transfer & Top-Up**
> "What are the rules for **Balance Transfer (BT)**?
> 1. Minimum number of EMIs paid on the existing loan.
> 2. Is a Top-Up loan allowed along with BT? If yes, what is the cap?
> 3. Is the FOIR calculation different for BT cases?"

**Prompt 9: Fees & Charges**
> "List the standard **Fees and Charges**:
> 1. Processing Fee percentage.
> 2. Pre-payment / Foreclosure charges (Fixed vs Floating rate).
> 3. Login fees or legal/technical charges for Home Loans."

**Prompt 10: FINAL CONFIGURATION SUMMARY**
> "Summarize the **Mathematical Rules** into a simple list for me to code:
> - Min Salary: [Value]
> - Min CIBIL: [Value]
> - Max FOIR: [Value]
> - Max Age: [Value]
> - Salary Multiplier: [Value]
> - Max LTV: [Value]"
