import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS (Browser security)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { 
      loan_type, 
      full_name, 
      phone, 
      age,
      monthly_salary, 
      existing_emis, 
      cibil_score,
      salary_mode,
      profession,
      annual_turnover,
      years_in_business,
      industry_type,
      gst_number,
      office_ownership,
      home_ownership,
      desired_amount
    } = await req.json()

    let status = 'REJECTED'
    let matched_lender = ''
    let approved_amount = 0
    let rejection_reason = ''

    // ==========================================
    // 🧠 LOGIC ENGINE START
    // ==========================================

    if (loan_type === 'personal') {
      // --- PERSONAL LOAN RULES ---
      const MIN_SALARY = 25000
      const MIN_CIBIL = 720
      const FOIR_LIMIT = 0.65 // 65%
      const MULTIPLIER = 20
      const MIN_AGE = 21
      const MAX_AGE = 60
      const NEGATIVE_PROFESSIONS = ['Police', 'Lawyer', 'Politician', 'Media/Journalist', 'MLM Agent']
      const INVALID_SALARY_MODES = ['Cash', 'Cheque']

      if (monthly_salary < MIN_SALARY) {
        rejection_reason = `Salary below minimum ₹${MIN_SALARY}`
      } else if (cibil_score < MIN_CIBIL) {
        rejection_reason = `CIBIL score below ${MIN_CIBIL}`
      } else if (age < MIN_AGE || age > MAX_AGE) {
        rejection_reason = `Age ${age} is outside eligible range (${MIN_AGE}-${MAX_AGE})`
      } else if (INVALID_SALARY_MODES.includes(salary_mode)) {
        rejection_reason = `Salary mode '${salary_mode}' not accepted (Bank Transfer required)`
      } else if (NEGATIVE_PROFESSIONS.includes(profession)) {
        rejection_reason = `Profession '${profession}' is in negative profile list`
      } else {
        // Calculate Disposable Income
        const max_emi_capacity = (monthly_salary * FOIR_LIMIT) - (existing_emis || 0)
        
        if (max_emi_capacity <= 0) {
          rejection_reason = 'High existing EMIs (FOIR exceeded)'
        } else {
          status = 'APPROVED'
          // Calculate Loan Amount
          approved_amount = Math.round(max_emi_capacity * MULTIPLIER)
          
          // Bank Matching Logic
          if (monthly_salary >= 50000 && cibil_score >= 750) {
            matched_lender = 'HDFC Bank (Prime)'
          } else if (monthly_salary >= 35000) {
            matched_lender = 'Bajaj Finserv'
          } else {
            matched_lender = 'KreditBee / MoneyView'
          }
        }
      }

    } else if (loan_type === 'business') {
      // --- BUSINESS LOAN RULES ---
      const MIN_TURNOVER = 1200000 // 12 Lakhs (Platform Min)
      const PRIME_TURNOVER = 10000000 // 1 Crore (Prime Min)
      const MIN_VINTAGE = 1 // 1 Year
      const PRIME_VINTAGE = 3 // 3 Years
      const PROFIT_MARGIN = 0.08 // 8%
      const NEGATIVE_INDUSTRIES = ['Real Estate', 'Jewellery', 'Liquor', 'Speculation/Trading']
      const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/

      if (annual_turnover < MIN_TURNOVER) {
        rejection_reason = `Turnover below minimum ₹12L`
      } else if (years_in_business < MIN_VINTAGE) {
        rejection_reason = `Business vintage below ${MIN_VINTAGE} year`
      } else if (NEGATIVE_INDUSTRIES.includes(industry_type)) {
        rejection_reason = `Industry '${industry_type}' is in negative list`
      } else if (!gst_number || !GST_REGEX.test(gst_number)) {
        rejection_reason = 'Invalid or missing GST number'
      } else if (office_ownership === 'Rented' && home_ownership === 'Rented') {
        rejection_reason = 'Both office and residence are rented (stability concern)'
      } else {
        status = 'APPROVED'
        
        // Calculate Estimated Monthly Income
        const estimated_monthly_income = (annual_turnover * PROFIT_MARGIN) / 12
        // Apply Personal Loan Multiplier logic to estimated income
        approved_amount = Math.round(estimated_monthly_income * 15) // 15x for Business

        // Bank Matching Logic
        if (annual_turnover >= PRIME_TURNOVER && years_in_business >= PRIME_VINTAGE) {
          matched_lender = 'HDFC / ICICI (Prime Business)'
        } else if (annual_turnover >= 5000000) {
          matched_lender = 'Bajaj Finserv / IDFC'
        } else {
          matched_lender = 'LendingKart / Protium'
        }
      }
    } else if (loan_type === 'instant') {
      // --- INSTANT LOAN (QUICK CASH) RULES ---
      // Default conservative rules since specific data wasn't provided
      const MIN_INCOME = 15000
      const MIN_AGE = 21
      
      if (monthly_salary < MIN_INCOME) {
        rejection_reason = `Income below ₹${MIN_INCOME} for Instant Loan`
      } else if (age < MIN_AGE) {
        rejection_reason = `Age below ${MIN_AGE}`
      } else {
        status = 'APPROVED'
        matched_lender = 'KreditBee / CASHe'
        // Instant loans usually cap at 50k-1L for new users
        approved_amount = Math.min(monthly_salary * 1.5, 50000) 
      }
    }

    // ==========================================
    // 💾 SAVE TO DATABASE
    // ==========================================
    
    const { error } = await supabase
      .from('leads_log')
      .insert({
        full_name,
        phone,
        loan_type,
        monthly_salary: monthly_salary || 0,
        existing_emis: existing_emis || 0,
        cibil_score: cibil_score || 0,
        annual_turnover: annual_turnover || 0,
        years_in_business: years_in_business || 0,
        status,
        matched_lender,
        approved_amount,
        rejection_reason,
        raw_data: { desired_amount }
      })

    if (error) throw error

    // Return the decision to the frontend
    return new Response(
      JSON.stringify({ 
        success: true, 
        status, 
        matched_lender, 
        approved_amount,
        rejection_reason 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
