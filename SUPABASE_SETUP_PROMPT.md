# Supabase Setup "Master Prompt"

**User Instruction:** Copy and paste the text below into your AI Browser Agent (or follow these steps manually) to set up the entire backend.

---

### **Task: Initialize VetKad "Pro-Level" Backend on Supabase**

I need to set up the database and backend logic for my lending application. Please follow these 3 steps exactly.

#### **Step 1: Database Schema (Run in SQL Editor)**
Go to the Supabase Dashboard -> SQL Editor -> New Query. Paste and run this SQL code to create the secure `leads_log` table:

```sql
-- 1. Create the table to store every single lead
CREATE TABLE leads_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    
    -- User Data
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    
    -- Loan Details
    loan_type TEXT NOT NULL, -- 'personal' or 'business'
    requested_amount NUMERIC,
    
    -- Financial Data (Personal)
    monthly_salary NUMERIC,
    existing_emis NUMERIC DEFAULT 0,
    cibil_score NUMERIC,
    salary_mode TEXT,
    profession TEXT,
    age NUMERIC,
    
    -- Financial Data (Business)
    annual_turnover NUMERIC,
    years_in_business NUMERIC,
    industry_type TEXT,
    gst_number TEXT,
    office_ownership TEXT,
    home_ownership TEXT,
    
    -- The Decision (Calculated by AI)
    status TEXT, -- 'APPROVED' or 'REJECTED'
    matched_lender TEXT,
    approved_amount NUMERIC,
    rejection_reason TEXT,
    
    -- Raw Input for debugging
    raw_data JSONB
);

-- 2. Enable Row Level Security (Security Best Practice)
ALTER TABLE leads_log ENABLE ROW LEVEL SECURITY;

-- 3. Create a policy so ONLY the backend (Service Role) can write to this table
CREATE POLICY "Service Role Only" ON leads_log
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
```

#### **Step 2: Deploy the "Brain" (Edge Function)**
The logic is already written in `supabase/functions/check-eligibility/index.ts`.
Run this command in the terminal to deploy it:

```bash
npx supabase functions deploy check-eligibility --no-verify-jwt
```
*(Note: You will need the Project Reference ID from Supabase Settings).*

#### **Step 3: Get API Keys**
Go to **Settings -> API**.
1. Copy the **Project URL**.
2. Copy the **anon public** key.
3. Paste them into `script.js` at lines 1 and 2.

---
