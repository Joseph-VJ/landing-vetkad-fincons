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
    
    -- Financial Data (Business)
    annual_turnover NUMERIC,
    years_in_business NUMERIC,
    
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
-- This prevents hackers from inserting fake leads directly
CREATE POLICY "Service Role Only" ON leads_log
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);
