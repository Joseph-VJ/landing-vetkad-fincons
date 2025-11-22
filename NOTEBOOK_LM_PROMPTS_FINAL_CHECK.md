# Google NotebookLM Prompts: Final Forensic Check

We have excellent data for most lenders, but **HDFC** and **ICICI** (the biggest lenders) are missing critical numbers in the documents. Sometimes these numbers are hidden in "Illustrations", "Annexures", or "Sample Calculations".

## 🕵️‍♂️ Forensic Search for HDFC & ICICI
> "Search the **HDFC** and **ICICI** documents for any **'Illustrations'**, **'Sample Calculations'**, or **'Annexures'**.
> 1. **HDFC Multiplier:** Look for any example where a loan amount is calculated based on salary. (e.g., 'If Mr. X has a salary of 50,000, he is eligible for...')
> 2. **ICICI Salary:** Look for the lowest salary mentioned in any rate table or eligibility grid. Is there a mention of 'Minimum Income' in the definitions section?
> 3. **ICICI Multiplier:** Look for terms like 'FOIR based eligibility' or 'Multiplier based eligibility' in the fine print."

## 🔢 Missing Multipliers (Check for "Max Loan" Examples)
> "For **Aditya Birla**, **IDFC First Bank**, and **Bandhan Bank**, look for:
> - Any text saying 'Maximum Loan Amount is restricted to X times the monthly income'.
> - Any example calculation showing how the loan amount is derived."

## 💰 Interest Rate & Fee Scavenger Hunt
> "Search specifically for **'Schedule of Charges'** or **'Interest Rate Policy'** sections for:
> - **Axis Finance**
> - **HDFC Bank**
> - **Tata Capital**
> - **IDFC First Bank**
> *If exact rates aren't found, look for a range (e.g., '10.50% onwards').*"
