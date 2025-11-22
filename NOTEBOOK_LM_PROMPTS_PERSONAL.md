# Google NotebookLM Prompts: Personal Loan Policy Extraction

Use these prompts in Google NotebookLM after uploading your lender policy documents. These prompts are designed to extract specific details for each lender to populate your website's logic without assuming specific bank names.

## 🎯 Master Comparison Prompt
> "Create a detailed comparison table for **all lenders** mentioned in the uploaded documents. For each lender, list:
> 1. **Minimum Net Monthly Salary** (Metro vs Non-Metro)
> 2. **Minimum CIBIL Score**
> 3. **Minimum & Maximum Age**
> 4. **FOIR Limit** (Fixed Obligation to Income Ratio)
> 5. **Loan Multiplier** (How many times of salary?)
> 6. **Lowest Interest Rate**
> 7. **Processing Fee**"

## 🏦 Detailed Policy Extraction
> "For each lender identified in the documents, extract the following specific policy details:
> - **Salary Classification:** How do they classify companies (e.g., Cat A, Cat B, Unlisted) and does the minimum salary change based on this?
> - **CIBIL Requirements:** What is the absolute minimum CIBIL score required? Are there exceptions for high salary?
> - **Special Programs:** Are there any special schemes for government employees, doctors, or high-net-worth individuals?
> - **Foreclosure Charges:** What are the charges for closing the loan early? Is there a lock-in period?"

## 📊 Financial Logic (FOIR & Multipliers)
> "Analyze the financial calculation logic for each lender:
> - **FOIR Calculation:** What is the maximum FOIR allowed? Does it increase with higher salary brackets?
> - **Multiplier Logic:** What is the standard multiplier applied to the net monthly salary?
> - **Cash/Cheque Salary:** Do any lenders accept cash or cheque salary modes? If so, what are the conditions?"

## 🚫 Negative Profiles & Restrictions
> "List all **Negative Profiles** and restrictions mentioned across the documents:
> 1. **Restricted Professions:** Which job profiles are explicitly mentioned as negative or restricted?
> 2. **Employer Restrictions:** Are there rules against funding employees of Proprietorships, Partnerships, or Unlisted companies?
> 3. **Location Restrictions:** Are there specific negative pincodes or areas mentioned?"

## 💰 Fees & Charges Summary
> "Create a summary of **Fees and Charges** for every lender found:
> - **Processing Fees:** (Percentage and Min/Max caps)
> - **Foreclosure/Pre-closure Charges:** (Fixed vs Floating rate rules)
> - **Part-Payment Rules:** Is part-payment allowed? If yes, what are the charges?"

## 📄 Documentation & Login Rules
> "What are the **Login and Documentation Requirements**?
> - **KYC:** Which lenders accept Video KYC vs Physical KYC?
> - **Income Proof:** How many months of payslips and bank statements are required for each lender?
> - **Official Email:** Is official email verification mandatory for all lenders?"
