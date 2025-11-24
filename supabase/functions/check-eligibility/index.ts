import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { ENHANCED_BANK_POLICIES } from "./enhanced-bank-policies.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}



serve(async (req: Request) => {
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
      total_obligations,
      cibil_score,
      salary_mode,
      profession,
      desired_amount,
      tenure,
      pincode,
      city_tier = 'tier_2', // Default to Tier 2 if not provided
      // Business Loan Fields (Optional)
      annual_turnover,
      years_in_business
    } = await req.json()

    // Input Validation
    if (!loan_type || !full_name || !phone) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields: loan_type, full_name, or phone' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (typeof age !== 'number' || age < 18 || age > 100) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid age: must be between 18 and 100' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (typeof monthly_salary !== 'number' || monthly_salary < 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid monthly salary: must be a positive number' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (typeof cibil_score !== 'number' || (cibil_score !== -1 && cibil_score !== 0 && (cibil_score < 300 || cibil_score > 900))) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid CIBIL score: must be -1, 0, or between 300-900' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    let status = 'REJECTED'
    let matched_lender = ''
    let approved_amount = 0
    let rejection_reason = ''
    let best_offer_roi = 0

    // ==========================================
    // 🧠 LOGIC ENGINE START
    // ==========================================

    if (loan_type === 'personal') {
      
      // 1. Filter Eligible Banks
      const eligible_banks = ENHANCED_BANK_POLICIES.filter(bank => {
        // Salary Check based on City Tier
        const min_salary = bank.min_salary_by_tier[city_tier as keyof typeof bank.min_salary_by_tier] || bank.min_salary_by_tier.tier_2;
        if (monthly_salary < min_salary) return false;
        
        // Age Check
        if (age < bank.min_age || age > bank.max_age) return false;

        // CIBIL Check
        if (cibil_score === -1 || cibil_score === 0) {
          if (!bank.cibil_0_allowed) return false;
          // Check NTC specific salary if available
          if (bank.ntc_conditions && monthly_salary < bank.ntc_conditions.min_salary_ntc) return false;
        } else {
          if (cibil_score < bank.min_cibil) return false;
        }

        // Salary Mode Check
        if (!bank.salary_modes_allowed.includes(salary_mode)) return false;

        // Negative Profile Check
        if (bank.negative_profiles.includes(profession)) return false;
        
        return true;
      });

      if (eligible_banks.length === 0) {
        rejection_reason = "No lenders matched your profile (Salary/CIBIL/Age criteria not met)";
      } else {
        // 2. Calculate Loan Amount for Each Eligible Bank
        let best_bank = null;
        let max_loan_possible = 0;

        for (const bank of eligible_banks) {
          // FOIR Calculation
          const max_emi = (monthly_salary * bank.foir_limit) - (existing_emis || 0);
          
          if (max_emi > 0) {
            // Determine Multiplier based on CIBIL
            let multiplier = bank.multiplier_by_segment.standard;
            if (cibil_score >= 750 && bank.multiplier_by_segment.prime) {
              multiplier = bank.multiplier_by_segment.prime;
            }

            // Loan Amount based on Multiplier
            let loan_amount = monthly_salary * multiplier;
            
            // Apply Max Loan Cap
            const max_cap = (cibil_score >= 750 && bank.max_loan_cap.prime) 
              ? (bank.max_loan_cap.prime || bank.max_loan_cap.standard)
              : bank.max_loan_cap.standard;
            
            loan_amount = Math.min(loan_amount, max_cap);

            // Cap loan amount based on EMI capacity
            const affordability_cap = max_emi * (tenure || 60); 
            
            const final_offer = Math.min(loan_amount, affordability_cap);

            if (final_offer > max_loan_possible) {
              max_loan_possible = final_offer;
              best_bank = bank;
            }
          }
        }

        if (max_loan_possible > 0 && best_bank) {
          status = 'APPROVED';
          approved_amount = Math.round(max_loan_possible);
          matched_lender = best_bank.name;
          
          // Determine ROI
          if (cibil_score === -1 || cibil_score === 0) {
            best_offer_roi = best_bank.interest_rate_by_cibil.ntc || 18.0;
          } else if (cibil_score >= 750) {
            best_offer_roi = best_bank.interest_rate_by_cibil['750_plus'];
          } else if (cibil_score >= 725) {
            best_offer_roi = best_bank.interest_rate_by_cibil['725_749'];
          } else if (cibil_score >= 700) {
            best_offer_roi = best_bank.interest_rate_by_cibil['700_724'];
          } else {
            best_offer_roi = best_bank.interest_rate_by_cibil['675_699'];
          }
        } else {
          rejection_reason = "High existing EMIs (FOIR exceeded for all eligible banks)";
        }
      }

    } else {
      rejection_reason = "Invalid Loan Type"
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
        raw_data: { desired_amount, total_obligations, tenure, pincode }
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
