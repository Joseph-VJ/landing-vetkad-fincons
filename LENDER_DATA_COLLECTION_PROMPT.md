# 🔍 Enhanced Lender Data Research Prompt

## Objective
Research and fill missing details for the existing 18 lenders in `supabase/functions/check-eligibility/index.ts` to make eligibility calculations more accurate and comprehensive.

---

## Current Data Structure (What We Already Have)
```typescript
interface BankPolicy {
  name: string;
  min_salary: number;
  min_cibil: number;
  cibil_0_allowed: boolean;
  min_age: number;
  max_age: number;
  foir_limit: number;
  multiplier: number;
  interest_rate: number;
  processing_fee: number;
  negative_profiles: string[];
  salary_modes_allowed: string[];
}
```

---

## 🎯 Your Task: Research & Fill These Missing Details

For each of the 18 lenders below, find and provide the **additional data points** that will make our eligibility engine more accurate:

## Target Lenders (18 Total)

1. Aditya Birla Capital
2. Axis Finance
3. Bajaj Finserv
4. Bandhan Bank
5. Chola (Cholamandalam)
6. Finnable
7. HDFC Bank
8. ICICI Bank
9. IDFC First Bank
10. InCred
11. Kotak Mahindra Bank
12. L&T Finance
13. MAS Finance
14. Muthoot Finance
15. Piramal Finance
16. Poonawala Fincorp
17. Tata Capital
18. WeRize

---

## 📋 Additional Data to Research for Each Lender

### **Category 1: City-Tier Based Salary Requirements** ⭐ HIGH PRIORITY
Current data has only one `min_salary` value. Research:
- **Metro/Tier 1 Cities** (Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata, Pune)
- **Tier 2 Cities** (Ahmedabad, Jaipur, Lucknow, Chandigarh, etc.)
- **Tier 3 Cities** (Smaller towns)

**Example Output:**
```json
"min_salary_by_tier": {
  "tier_1": 30000,
  "tier_2": 25000,
  "tier_3": 20000
}
```

---

### **Category 2: CIBIL Score Brackets & Interest Rate Mapping** ⭐ HIGH PRIORITY
Current data has only `interest_rate` (starting). Research exact ROI for different CIBIL bands:
- **750+** → What ROI?
- **725-749** → What ROI?
- **700-724** → What ROI?
- **675-699** → What ROI?
- **NTC (0 or -1)** → What ROI (if allowed)?

**Example Output:**
```json
"interest_rate_by_cibil": {
  "750_plus": 10.75,
  "725_749": 12.50,
  "700_724": 14.25,
  "675_699": 17.50,
  "ntc": 19.99
}
```

---

### **Category 3: Maximum Loan Amount Caps** ⭐ HIGH PRIORITY
Current data uses `multiplier` (e.g., 20x salary). But is there an **absolute maximum cap**?
- **Max loan amount** regardless of salary (e.g., ₹25 lakhs, ₹40 lakhs)
- Does the cap vary by customer segment (Prime vs Regular)?

**Example Output:**
```json
"max_loan_cap": {
  "standard": 2500000,
  "prime": 4000000
}
```

---

### **Category 4: Profession/Industry Exclusions** ⭐ MEDIUM PRIORITY
Current `negative_profiles` list is incomplete for most lenders. Research:
- **Excluded Professions**: Police, Lawyers, DSA agents, Politicians, Journalists, Drivers, Security Guards, Commission-based workers
- **Excluded Industries**: Gaming, Alcohol, Tobacco, Cryptocurrency, Unregistered businesses

**Example Output:**
```json
"negative_profiles": ["Police", "Lawyer", "DSA", "Driver", "Security Guard", "Commission-based"],
"excluded_industries": ["Gaming", "Alcohol", "Crypto", "Unregistered Business"]
```

---

### **Category 5: Salary Credit Modes Accepted** ⭐ MEDIUM PRIORITY
Current data mostly shows `["Bank Transfer"]`. But do they accept:
- **Cheque**
- **Cash** (with salary slip)
- **IMPS/UPI**

**Example Output:**
```json
"salary_modes_allowed": ["Bank Transfer", "Cheque"]
```

---

### **Category 6: Employment & Work Experience Requirements**
Research:
- **Minimum months in current job** (e.g., 3 months, 6 months)
- **Minimum total work experience** (e.g., 2 years)
- **Continuous employment** required or gaps allowed?

**Example Output:**
```json
"work_experience": {
  "min_months_current_job": 6,
  "min_total_experience_months": 24,
  "employment_gaps_allowed": false
}
```

---

### **Category 7: New-to-Credit (NTC) Special Conditions**
If `cibil_0_allowed: true`, research:
- **Minimum age for NTC** customers (often 23-25 years)
- **Higher minimum salary** for NTC?
- **Document requirements** for NTC (bank statements, ITR, etc.)

**Example Output:**
```json
"ntc_conditions": {
  "min_age_ntc": 23,
  "min_salary_ntc": 25000,
  "bank_statement_months": 12
}
```

---

### **Category 8: Loan Tenure Variations**
Research:
- **Minimum tenure** (e.g., 12 months, 24 months)
- **Maximum tenure** (e.g., 60 months, 72 months, 84 months)
- Does tenure vary by:
  - Age of customer?
  - Loan amount?
  - Customer segment?

**Example Output:**
```json
"tenure_options": {
  "min_months": 12,
  "max_months_salaried": 60,
  "max_months_self_employed": 48
}
```

---

### **Category 9: Processing Fee Details**
Current data has percentage (e.g., 2.0%). Research:
- **Minimum processing fee** (e.g., ₹2,000, ₹3,000)
- **Maximum processing fee cap** (e.g., ₹10,000, ₹25,000)
- **GST included or extra?**

**Example Output:**
```json
"processing_fee_details": {
  "percentage": 1.5,
  "min_amount": 3000,
  "max_amount": 10000,
  "gst_included": false
}
```

---

### **Category 10: Geographic Restrictions**
Research:
- **States NOT covered** (e.g., J&K, Northeast states for some lenders)
- **Pincode exclusions** (if any specific areas are blocked)
- **Rural area restrictions**

**Example Output:**
```json
"geographic_restrictions": {
  "excluded_states": ["Jammu & Kashmir"],
  "rural_areas_covered": false,
  "pincode_exclusions": ["190001", "190002"]
}
```

---

### **Category 11: Special Programs & Offers**
Research:
- **Balance Transfer (BT)** allowed?
- **Top-up loans** offered?
- **Co-applicant/Co-borrower** allowed?
- **Women-specific schemes** or lower rates?

**Example Output:**
```json
"special_programs": {
  "balance_transfer": true,
  "top_up": true,
  "co_applicant_allowed": true,
  "women_special_rate": false
}
```

---

### **Category 12: Existing Loan/EMI Tolerance**
Research:
- **Maximum number of existing loans** allowed (e.g., 3 active loans)
- **Running loan with same lender** - allowed or rejected?
- **DPD (Days Past Due) tolerance** - 0 DPD only, or 30 DPD okay?

**Example Output:**
```json
"existing_loan_rules": {
  "max_active_loans": 3,
  "same_lender_running_loan": false,
  "max_dpd_allowed": 0
}
```

---

### **Category 13: Documentation Requirements**
Research:
- **Salary slips** - How many months? (e.g., 3 months)
- **Bank statements** - How many months? (e.g., 6 months)
- **Form 16** - Required or optional?
- **ITR** - Required for NTC customers?

**Example Output:**
```json
"documentation": {
  "salary_slips_months": 3,
  "bank_statements_months": 6,
  "form_16_required": false,
  "itr_for_ntc": true
}
```

---

### **Category 14: Disbursement Timeline**
Research:
- **Standard disbursement** - How many days? (e.g., 3-5 days)
- **Fast-track available?** - Same day or 24 hours?
- **Pre-approved offers** - Instant disbursal?

**Example Output:**
```json
"disbursement": {
  "standard_days": 3,
  "fast_track_available": true,
  "fast_track_days": 1
}
```

---

### **Category 15: Multiplier Variations** ⭐ CRITICAL
Current data has one `multiplier` value. But does it vary by:
- **CIBIL score bracket?** (e.g., 750+ gets 25x, 700-749 gets 20x)
- **Customer segment?** (Prime vs Regular)
- **Income slab?** (Higher salary = higher multiplier?)

**Example Output:**
```json
"multiplier_by_segment": {
  "standard": 20,
  "prime_cibil_750_plus": 25,
  "super_prime_cibil_800_plus": 30
}
```

---

## 🔍 Research Sources to Use

1. **Official Lender Websites**
   - Product pages (Personal Loan section)
   - Eligibility calculators
   - FAQs & Terms
   - Rate of Interest charts

2. **Aggregator Platforms**
   - BankBazaar.com
   - Paisabazaar.com
   - PolicyBazaar (loan section)
   - Compare & check eligibility criteria

3. **Partner/DSA Guidelines**
   - If you have access to partner portals
   - DSA manuals or lender policy documents

4. **Industry Reports & Forums**
   - Reddit (r/IndiaInvestments)
   - Team-BHP forums (loan discussions)
   - LinkedIn posts from lender employees

---

## 📊 Output Format Required

For each lender, provide enhanced JSON data in this format:

```json
{
  "lender_name": "HDFC Bank",
  
  "enhancements": {
    "min_salary_by_tier": {
      "tier_1": 30000,
      "tier_2": 25000,
      "tier_3": 20000
    },
    
    "interest_rate_by_cibil": {
      "750_plus": 10.75,
      "725_749": 12.50,
      "700_724": 14.25,
      "675_699": 18.00
    },
    
    "max_loan_cap": {
      "standard": 2500000,
      "prime": 4000000
    },
    
    "negative_profiles": ["Card Abuse", "DSA", "Police"],
    
    "excluded_industries": ["Gaming", "Crypto"],
    
    "salary_modes_allowed": ["Bank Transfer"],
    
    "work_experience": {
      "min_months_current_job": 6,
      "min_total_experience_months": 24
    },
    
    "ntc_conditions": {
      "min_age_ntc": 23,
      "min_salary_ntc": 30000
    },
    
    "tenure_options": {
      "min_months": 12,
      "max_months_salaried": 60
    },
    
    "processing_fee_details": {
      "percentage": 1.5,
      "min_amount": 3000,
      "max_amount": 10000
    },
    
    "geographic_restrictions": {
      "excluded_states": [],
      "rural_areas_covered": true
    },
    
    "special_programs": {
      "balance_transfer": true,
      "top_up": true
    },
    
    "existing_loan_rules": {
      "max_active_loans": 3,
      "max_dpd_allowed": 0
    },
    
    "documentation": {
      "salary_slips_months": 3,
      "bank_statements_months": 6
    },
    
    "disbursement": {
      "standard_days": 3,
      "fast_track_days": 1
    },
    
    "multiplier_by_segment": {
      "standard": 20,
      "prime_cibil_750_plus": 25
    }
  },
  
  "data_confidence": "High", // High/Medium/Low
  "source_references": [
    "https://www.hdfcbank.com/personal/borrow/popular-loans/personal-loan",
    "BankBazaar eligibility page"
  ],
  "last_updated": "2025-11-24",
  "notes": "Prime customers defined as CIBIL 750+ with 3+ years work experience"
}
```

---

## ✅ Research Checklist (Per Lender)

Before submitting data, verify:

- [ ] City-tier salary requirements researched (if available)
- [ ] CIBIL-based ROI brackets found (at least 3 brackets)
- [ ] Maximum loan cap identified
- [ ] Negative profiles list is comprehensive (check at least 5 common exclusions)
- [ ] Salary modes verified (not just assuming "Bank Transfer")
- [ ] Work experience requirements documented
- [ ] NTC conditions clarified (if `cibil_0_allowed: true`)
- [ ] Tenure options (min/max) verified
- [ ] Processing fee structure complete (%, min, max)
- [ ] Geographic restrictions checked
- [ ] Special programs availability confirmed
- [ ] Existing loan tolerance rules found
- [ ] Documentation requirements listed
- [ ] Disbursement timeline noted
- [ ] Multiplier variations researched
- [ ] Source URLs documented for verification
- [ ] Confidence level assigned (High/Medium/Low)

---

## 🎯 Priority Order for Research

**Phase 1 (Most Critical - Do First):**
1. ✅ City-tier salary requirements
2. ✅ CIBIL-based interest rates
3. ✅ Maximum loan caps
4. ✅ Multiplier variations by segment

**Phase 2 (High Value):**
5. Negative profiles & industry exclusions
6. Salary credit modes
7. NTC special conditions
8. Geographic restrictions

**Phase 3 (Good to Have):**
9. Work experience requirements
10. Tenure variations
11. Processing fee details
12. Special programs
13. Existing loan rules
14. Documentation requirements
15. Disbursement timeline

---

## 📝 Example: Completed Research for One Lender

**Lender: Bajaj Finserv**

```json
{
  "lender_name": "Bajaj Finserv",
  "enhancements": {
    "min_salary_by_tier": {
      "tier_1_metro": 35000,
      "tier_1_non_metro": 30000,
      "tier_2_growth": 25000,
      "tier_3_others": 20000
    },
    "interest_rate_by_cibil": {
      "750_plus": 11.00,
      "725_749": 13.00,
      "700_724": 15.00,
      "685_699": 18.00,
      "ntc_no_hit": 19.99
    },
    "max_loan_cap": {
      "standard": 4000000,
      "prime_salaried": 5000000
    },
    "negative_profiles": [
      "Police", "Lawyer", "Politician", "Journalist", 
      "Driver", "Security Guard", "Commission-based workers"
    ],
    "excluded_industries": ["Gaming", "Alcohol", "Tobacco", "MLM"],
    "salary_modes_allowed": ["Bank Transfer"],
    "work_experience": {
      "min_months_current_job": 12,
      "min_total_experience_months": 24,
      "employment_gaps_allowed": false
    },
    "ntc_conditions": {
      "ntc_allowed": true,
      "min_age_ntc": 23,
      "min_salary_ntc": 35000,
      "bank_statement_months": 12,
      "ntc_program_name": "Bureau No-Hit Program"
    },
    "tenure_options": {
      "min_months": 12,
      "max_months_salaried": 72,
      "max_months_age_dependent": true,
      "max_age_at_maturity": 60
    },
    "processing_fee_details": {
      "percentage": 2.0,
      "min_amount": 5000,
      "max_amount": 25000,
      "gst_extra": true
    },
    "geographic_restrictions": {
      "excluded_states": [],
      "rural_areas_covered": false,
      "negative_pincodes": []
    },
    "special_programs": {
      "balance_transfer": true,
      "top_up": true,
      "co_applicant_allowed": false,
      "women_special_rate": false,
      "insta_emi_card_holders": true
    },
    "existing_loan_rules": {
      "max_active_loans": 4,
      "same_lender_running_loan": false,
      "max_dpd_allowed": 0,
      "dpd_last_12_months": 0
    },
    "documentation": {
      "salary_slips_months": 3,
      "bank_statements_months": 6,
      "form_16_required": false,
      "itr_for_ntc": false,
      "address_proof": "Aadhaar/Passport",
      "identity_proof": "PAN Mandatory"
    },
    "disbursement": {
      "standard_days": 2,
      "fast_track_available": true,
      "fast_track_days": 1,
      "insta_emi_instant": true
    },
    "multiplier_by_segment": {
      "standard": 20,
      "prime_750_plus": 24,
      "insta_emi_holders": 24
    },
    "foir_variations": {
      "standard": 0.70,
      "high_cibil_750_plus": 0.75
    }
  },
  "data_confidence": "High",
  "source_references": [
    "https://www.bajajfinserv.in/personal-loan-eligibility",
    "https://www.bajajfinserv.in/interest-rate",
    "BankBazaar - Bajaj Finserv comparison page"
  ],
  "last_updated": "2025-11-24",
  "research_notes": [
    "Bajaj has 4 city tiers for salary (Metro, Non-Metro, Growth, Others)",
    "Bureau No-Hit program for NTC confirmed active",
    "InstaEMI card holders get preferential treatment",
    "Negative profiles list is exhaustive per official policy doc"
  ]
}
```

---

## 🚀 Next Steps After Data Collection

1. **Validate** each data point with 2-3 sources (cross-reference)
2. **Update TypeScript interface** in Edge Function to support new fields
3. **Enhance eligibility logic** to use city-tier salaries, CIBIL-based ROI, etc.
4. **Test with real-world cases** - Create 10 test scenarios per lender
5. **Document assumptions** - Where data wasn't available, note assumptions made

---

## 💡 Pro Tips for Research

1. **Check lender websites first** - Most accurate source
2. **Use aggregators to cross-verify** - BankBazaar, Paisabazaar have detailed comparisons
3. **Look for PDF policy documents** - Often more detailed than web pages
4. **Check for recent updates** - Interest rates change quarterly
5. **Note regional variations** - Some lenders have different criteria for different states
6. **Document uncertainty** - If unsure, mark confidence as "Low" and note assumptions

---

## Final Deliverable

**A JSON file** (`enhanced_lender_data.json`) containing all 18 lenders with enhanced data points, ready to be integrated into the TypeScript Edge Function.

**Format:**
```json
{
  "lenders": [
    { /* Lender 1 enhanced data */ },
    { /* Lender 2 enhanced data */ },
    ...
    { /* Lender 18 enhanced data */ }
  ],
  "metadata": {
    "total_lenders": 18,
    "research_completed_date": "2025-11-24",
    "researcher": "Your Name/AI Model",
    "average_confidence": "High"
  }
}
```

---

**Ready to make VetKad Fincons the most accurate loan eligibility platform!** 🎯
