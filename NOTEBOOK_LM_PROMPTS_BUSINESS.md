# NotebookLM Prompts: BUSINESS LOAN (Product Policy Only)
*Use this file to extract the "Credit Policy" details from your documents.*

**Prompt 1: Basic Eligibility Criteria**
> "Based on the documents, list the **Mandatory Eligibility Criteria** for a Business Loan. Specifically:
> 1. Minimum Annual Turnover (Audited vs. Unaudited).
> 2. Minimum Business Vintage (Years in operation).
> 3. Minimum CIBIL Score for the Proprietor/Director.
> 4. Is GST Registration mandatory? If yes, how old should the registration be?"

**Prompt 2: Banking Analysis (ABB)**
> "Explain the **Banking Surrogate** norms.
> 1. What is the minimum Average Bank Balance (ABB) required?
> 2. How do you calculate eligibility based on ABB? (e.g., Loan Amount = 2x of ABB?)
> 3. What are the rules for 'Banking Churn' or 'Inward Cheque Returns'?"

**Prompt 3: Turnover Multipliers**
> "How is the **Loan Eligibility** calculated based on Turnover?
> 1. What percentage of the Annual Turnover is given as a loan? (e.g., 10%, 20%?)
> 2. Does this percentage change for Manufacturers vs. Traders vs. Service Providers?
> 3. How is the 'Net Profit Margin' factored in?"

**Prompt 4: Industry Margins & Negative Lists**
> "Are there specific rules for different **Industries**?
> 1. List of 'Negative Industries' (e.g., Jewelers, Real Estate, Gyms - often restricted).
> 2. List of 'High Risk' industries that require higher interest rates.
> 3. Are there specific margin assumptions for different sectors (e.g., IT Services = 50% margin, Trading = 5% margin)?"

**Prompt 5: Ownership & Constitution**
> "How does the **Business Constitution** affect the loan?
> 1. Are there different rules for Proprietorship vs. Partnership vs. Pvt Ltd?
> 2. For Partnerships, do all partners need to sign?
> 3. For Pvt Ltd, is the Board Resolution mandatory?"

**Prompt 6: Documentation Requirements**
> "List the **Exact Documents Required** for login.
> 1. KYC of Firm and Proprietor.
> 2. Financials (ITR for how many years? Audited Balance Sheet?).
> 3. Bank Statements (6 months or 12 months?).
> 4. GST Returns (GSTR-3B for how many months?)."

**Prompt 7: Collateral & Security**
> "Is this an **Unsecured** loan or are there collateral options?
> 1. If Unsecured, is there a cap on the loan amount? (e.g., Max 50 Lakhs).
> 2. Is CGTMSE coverage available?
> 3. Do we need Post Dated Cheques (PDC) or NACH mandate?"

**Prompt 8: Top-Up & Balance Transfer**
> "What are the rules for **Balance Transfer (BT)** of a Business Loan?
> 1. Minimum vintage of the existing loan.
> 2. Can we Top-Up over the BT amount?
> 3. Do we need a foreclosure letter from the previous lender?"

**Prompt 9: Fees & Charges**
> "List the standard **Fees and Charges**:
> 1. Processing Fee percentage (usually higher for business loans).
> 2. Insurance requirements (Keyman Insurance?).
> 3. Foreclosure charges."

**Prompt 10: FINAL CONFIGURATION SUMMARY**
> "Summarize the **Mathematical Rules** into a simple list for me to code:
> - Min Turnover: [Value]
> - Min Vintage: [Value]
> - Min CIBIL: [Value]
> - Turnover Multiplier: [Value]
> - ABB Multiplier: [Value]
> - Max Loan Amount: [Value]"
