import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface BankPolicy {
  name: string;
  min_salary: number;
  min_cibil: number;
  cibil_0_allowed: boolean; // For -1 or 0 scores
  min_age: number;
  max_age: number;
  foir_limit: number; // 0.65 for 65%
  multiplier: number; // 20x salary
  interest_rate: number; // Starting ROI
  processing_fee: number; // Percentage
  negative_profiles: string[];
  salary_modes_allowed: string[];
}

const BANK_POLICIES: BankPolicy[] = [
  {
    name: "Aditya Birla Capital",
    min_salary: 20000,
    min_cibil: 700,
    cibil_0_allowed: true,
    min_age: 23,
    max_age: 60,
    foir_limit: 0.75,
    multiplier: 20, // Default
    interest_rate: 13.00, // Est
    processing_fee: 2.0,
    negative_profiles: [],
    salary_modes_allowed: ['Bank Transfer']
  },
  {
    name: "Axis Finance",
    min_salary: 20000, // Rural/Semi-urban base
    min_cibil: 700,
    cibil_0_allowed: false,
    min_age: 21,
    max_age: 60,
    foir_limit: 0.70,
    multiplier: 30,
    interest_rate: 10.99,
    processing_fee: 1.5,
    negative_profiles: [],
    salary_modes_allowed: ['Bank Transfer']
  },
  {
    name: "Bajaj Finserv",
    min_salary: 35000, // Growth location base
    min_cibil: 685,
    cibil_0_allowed: true, // Bureau No-Hit Program
    min_age: 23,
    max_age: 59,
    foir_limit: 0.70,
    multiplier: 24, // Max for Prime
    interest_rate: 15.00,
    processing_fee: 2.0,
    negative_profiles: ['Police', 'Lawyer', 'Politician', 'Journalist', 'Driver', 'Security Guard'],
    salary_modes_allowed: ['Bank Transfer']
  },
  {
    name: "Bandhan Bank",
    min_salary: 25000,
    min_cibil: 730,
    cibil_0_allowed: true,
    min_age: 21,
    max_age: 60,
    foir_limit: 0.60,
    multiplier: 20, // Default
    interest_rate: 10.50,
    processing_fee: 1.5,
    negative_profiles: [],
    salary_modes_allowed: ['Bank Transfer']
  },
  {
    name: "Chola",
    min_salary: 20000,
    min_cibil: 700,
    cibil_0_allowed: false,
    min_age: 21,
    max_age: 60,
    foir_limit: 0.65,
    multiplier: 32,
    interest_rate: 14.00, // Est
    processing_fee: 2.0,
    negative_profiles: [],
    salary_modes_allowed: ['Bank Transfer']
  },
  {
    name: "Finnable",
    min_salary: 15000, // Tier 2
    min_cibil: 700,
    cibil_0_allowed: true, // NTC allowed > 23 age
    min_age: 21,
    max_age: 58,
    foir_limit: 0.60,
    multiplier: 18, // Est
    interest_rate: 19.99,
    processing_fee: 2.5,
    negative_profiles: [],
    salary_modes_allowed: ['Bank Transfer']
  },
  {
    name: "HDFC Bank",
    min_salary: 25000,
    min_cibil: 720, // Default prime
    cibil_0_allowed: false,
    min_age: 21,
    max_age: 60,
    foir_limit: 0.65,
    multiplier: 20, // Default prime
    interest_rate: 10.75, // Est
    processing_fee: 1.5,
    negative_profiles: ['Card Abuse'],
    salary_modes_allowed: ['Bank Transfer']
  },
  {
    name: "ICICI Bank",
    min_salary: 30000, // Default prime
    min_cibil: 750,
    cibil_0_allowed: true,
    min_age: 23,
    max_age: 58,
    foir_limit: 0.65,
    multiplier: 20, // Default prime
    interest_rate: 10.55,
    processing_fee: 1.0,
    negative_profiles: [],
    salary_modes_allowed: ['Bank Transfer']
  },
  {
    name: "IDFC First Bank",
    min_salary: 20000,
    min_cibil: 720,
    cibil_0_allowed: false,
    min_age: 23,
    max_age: 60,
    foir_limit: 0.70,
    multiplier: 20, // Default
    interest_rate: 11.50, // Est
    processing_fee: 1.5,
    negative_profiles: [],
    salary_modes_allowed: ['Bank Transfer']
  },
  {
    name: "InCred",
    min_salary: 20000, // Salaried implied
    min_cibil: 700,
    cibil_0_allowed: false,
    min_age: 23,
    max_age: 60,
    foir_limit: 0.50, // Strict
    multiplier: 15, // Est
    interest_rate: 18.99,
    processing_fee: 2.0,
    negative_profiles: [],
    salary_modes_allowed: ['Bank Transfer']
  },
  {
    name: "Kotak Mahindra Bank",
    min_salary: 25000,
    min_cibil: 700,
    cibil_0_allowed: true,
    min_age: 21,
    max_age: 60,
    foir_limit: 0.75,
    multiplier: 32,
    interest_rate: 10.99,
    processing_fee: 1.5,
    negative_profiles: [],
    salary_modes_allowed: ['Bank Transfer']
  },
  {
    name: "L&T Finance",
    min_salary: 25000, // 35k for Mumbai, 25k for others
    min_cibil: 700,
    cibil_0_allowed: false,
    min_age: 23, // Standard assumption
    max_age: 58, // Standard assumption
    foir_limit: 0.70, // Avg of 55-80% based on segments
    multiplier: 18, // Base multiplier for Others/Cat C
    interest_rate: 12.50, // Starting for >750 CIBIL
    processing_fee: 2.0,
    negative_profiles: [],
    salary_modes_allowed: ['Bank Transfer']
  },
  {
    name: "MAS Finance",
    min_salary: 18000,
    min_cibil: 700,
    cibil_0_allowed: true,
    min_age: 21,
    max_age: 58,
    foir_limit: 0.60,
    multiplier: 15, // FOIR based
    interest_rate: 18.00,
    processing_fee: 2.0,
    negative_profiles: [],
    salary_modes_allowed: ['Bank Transfer']
  },
  {
    name: "Muthoot",
    min_salary: 25000,
    min_cibil: 675,
    cibil_0_allowed: true,
    min_age: 21,
    max_age: 60,
    foir_limit: 0.65,
    multiplier: 18, // Est
    interest_rate: 14.00, // Est
    processing_fee: 2.0,
    negative_profiles: [],
    salary_modes_allowed: ['Bank Transfer']
  },
  {
    name: "Piramal Finance",
    min_salary: 25000, // Default
    min_cibil: 743, // V6-V20
    cibil_0_allowed: false,
    min_age: 21,
    max_age: 60,
    foir_limit: 0.75,
    multiplier: 20, // No multiplier calc, use FOIR
    interest_rate: 11.99,
    processing_fee: 1.5,
    negative_profiles: [],
    salary_modes_allowed: ['Bank Transfer']
  },
  {
    name: "Poonawala Fincorp",
    min_salary: 30000,
    min_cibil: 700,
    cibil_0_allowed: true,
    min_age: 21,
    max_age: 60,
    foir_limit: 0.80,
    multiplier: 20, // Default
    interest_rate: 11.50, // Est
    processing_fee: 2.0,
    negative_profiles: ['Lawyer', 'Police', 'DSA'],
    salary_modes_allowed: ['Bank Transfer']
  },
  {
    name: "Tata Capital",
    min_salary: 25000,
    min_cibil: 725,
    cibil_0_allowed: false,
    min_age: 21,
    max_age: 58,
    foir_limit: 0.75,
    multiplier: 27,
    interest_rate: 11.25, // Est
    processing_fee: 1.5,
    negative_profiles: [],
    salary_modes_allowed: ['Bank Transfer']
  },
  {
    name: "WeRize",
    min_salary: 12000,
    min_cibil: 650, // Scorecard based
    cibil_0_allowed: false,
    min_age: 21,
    max_age: 57,
    foir_limit: 0.58,
    multiplier: 12, // Est low ticket
    interest_rate: 20.00, // Est
    processing_fee: 2.5,
    negative_profiles: [],
    salary_modes_allowed: ['Bank Transfer', 'IMPS']
  }
];

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
      // Business Loan Fields (Optional)
      annual_turnover,
      years_in_business
    } = await req.json()

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
      const eligible_banks = BANK_POLICIES.filter(bank => {
        // Salary Check
        if (monthly_salary < bank.min_salary) return false;
        
        // Age Check
        if (age < bank.min_age || age > bank.max_age) return false;

        // CIBIL Check
        if (cibil_score === -1 || cibil_score === 0) {
          if (!bank.cibil_0_allowed) return false;
        } else {
          if (cibil_score < bank.min_cibil) return false;
        }

        // Salary Mode Check
        if (!bank.salary_modes_allowed.includes(salary_mode) && salary_mode !== 'Bank Transfer') return false;

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
            // Loan Amount based on Multiplier
            let loan_amount = monthly_salary * bank.multiplier;
            
            // Cap loan amount based on EMI capacity (Approximate reverse calc: EMI * 60 months)
            // This is a simplified check to ensure they can afford the EMI
            const affordability_cap = max_emi * 60; 
            
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
          best_offer_roi = best_bank.interest_rate;
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
        raw_data: { desired_amount, total_obligations }
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
