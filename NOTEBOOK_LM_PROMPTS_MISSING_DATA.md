# Google NotebookLM Prompts: Missing Data Extraction

Great job extracting the initial data! We have some gaps for major lenders (HDFC, ICICI) and some missing financial numbers (Multipliers, Rates) for others. Use these targeted prompts to fill those gaps.

## 🔍 HDFC & ICICI Deep Dive (Critical)
> "Re-examine the **HDFC Bank** and **ICICI Bank** documents specifically.
> 1. **HDFC Bank:**
>    - What is the exact **Loan Multiplier**? (e.g., 15 times, 20 times, or 27 times of salary?)
>    - What is the **Minimum Net Monthly Salary** figure explicitly mentioned? (Is it ₹25,000 or higher?)
>    - What is the starting **Interest Rate** and **Processing Fee**?
> 2. **ICICI Bank:**
>    - Is there a specific **Minimum Net Salary** amount mentioned (e.g., ₹30,000)?
>    - What is the **Loan Multiplier** applied for Salaried employees?
>    - What is the maximum **FOIR** allowed?"

## 🔢 Missing Multipliers & FOIR
> "For the following lenders, the Loan Multiplier (how many times of salary) or FOIR was not found. Please check again:
> - **Bandhan Bank:** Multiplier?
> - **Finnable:** Multiplier?
> - **IDFC First Bank:** Multiplier?
> - **InCred:** Multiplier?
> - **MAS Finance:** Multiplier?
> - **Muthoot:** Multiplier?
> - **Poonawala:** Multiplier?
> - **WeRize:** Multiplier?
> *If no multiplier is stated, look for 'Max Loan Amount calculation' logic.*"

## 📉 Missing Interest Rates & Fees
> "Find the **Starting Interest Rate (ROI)** and **Processing Fee (PF)** for these specific lenders:
> - **Aditya Birla:** ROI & PF?
> - **Axis Finance:** ROI & PF?
> - **Chola:** ROI & PF?
> - **HDFC Bank:** ROI & PF?
> - **IDFC First Bank:** ROI & PF?
> - **Muthoot:** ROI & PF?
> - **Poonawala:** ROI & PF?
> - **Tata Capital:** ROI & PF?
> - **WeRize:** ROI & PF?"
