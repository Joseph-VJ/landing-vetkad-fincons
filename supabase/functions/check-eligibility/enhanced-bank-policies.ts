// Enhanced Bank Policies with Detailed Research Data
// Based on comprehensive lender policy analysis

export interface EnhancedBankPolicy {
  name: string;
  
  // City-tier based salary requirements
  min_salary_by_tier: {
    tier_1: number;      // Metro/Prime cities
    tier_2: number;      // Growth/Urban cities
    tier_3: number;      // Smaller cities/Rural
  };
  
  // CIBIL-based interest rate mapping
  interest_rate_by_cibil: {
    '750_plus': number;
    '725_749': number;
    '700_724': number;
    '675_699': number;
    ntc?: number;        // New to Credit (0 or -1)
  };
  
  // Maximum loan caps
  max_loan_cap: {
    standard: number;
    prime?: number;
  };
  
  // Core eligibility
  min_cibil: number;
  cibil_0_allowed: boolean;
  min_age: number;
  max_age: number;
  foir_limit: number;
  
  // Multiplier variations
  multiplier_by_segment: {
    standard: number;
    prime?: number;
    super_prime?: number;
  };
  
  // Processing fee details
  processing_fee_details: {
    percentage: number;
    min_amount: number;
    max_amount: number;
    gst_included: boolean;
  };
  
  // Profession/Industry exclusions
  negative_profiles: string[];
  excluded_industries: string[];
  
  // Salary modes
  salary_modes_allowed: string[];
  
  // Work experience
  work_experience: {
    min_months_current_job: number;
    min_total_experience_months: number;
    employment_gaps_allowed: boolean;
  };
  
  // NTC conditions
  ntc_conditions?: {
    min_age_ntc: number;
    min_salary_ntc: number;
    bank_statement_months: number;
  };
  
  // Tenure options
  tenure_options: {
    min_months: number;
    max_months_salaried: number;
    max_months_self_employed?: number;
  };
  
  // Geographic restrictions
  geographic_restrictions: {
    excluded_states: string[];
    rural_areas_covered: boolean;
  };
  
  // Special programs
  special_programs: {
    balance_transfer: boolean;
    top_up: boolean;
    co_applicant_allowed: boolean;
  };
  
  // Documentation
  documentation: {
    salary_slips_months: number;
    bank_statements_months: number;
    form_16_required: boolean;
  };
  
  // Disbursement timeline
  disbursement: {
    standard_days: number;
    fast_track_days?: number;
  };
}

export const ENHANCED_BANK_POLICIES: EnhancedBankPolicy[] = [
  {
    name: "Aditya Birla Capital",
    min_salary_by_tier: {
      tier_1: 20000,
      tier_2: 20000,
      tier_3: 20000
    },
    interest_rate_by_cibil: {
      '750_plus': 11.00,
      '725_749': 13.00,
      '700_724': 15.00,
      '675_699': 17.00,
      ntc: 19.00
    },
    max_loan_cap: {
      standard: 2500000,
      prime: 5000000
    },
    min_cibil: 700,
    cibil_0_allowed: true,
    min_age: 23,
    max_age: 60,
    foir_limit: 0.75,
    multiplier_by_segment: {
      standard: 20,
      prime: 25
    },
    processing_fee_details: {
      percentage: 2.0,
      min_amount: 5000,
      max_amount: 25000,
      gst_included: false
    },
    negative_profiles: [],
    excluded_industries: ['Gaming', 'Gambling', 'Chit Fund', 'Lottery', 'MLM'],
    salary_modes_allowed: ['Bank Transfer'],
    work_experience: {
      min_months_current_job: 6,
      min_total_experience_months: 24,
      employment_gaps_allowed: false
    },
    ntc_conditions: {
      min_age_ntc: 23,
      min_salary_ntc: 20000,
      bank_statement_months: 6
    },
    tenure_options: {
      min_months: 12,
      max_months_salaried: 84,
      max_months_self_employed: 60
    },
    geographic_restrictions: {
      excluded_states: [],
      rural_areas_covered: true
    },
    special_programs: {
      balance_transfer: true,
      top_up: true,
      co_applicant_allowed: true
    },
    documentation: {
      salary_slips_months: 3,
      bank_statements_months: 6,
      form_16_required: false
    },
    disbursement: {
      standard_days: 3,
      fast_track_days: 1
    }
  },
  
  {
    name: "Axis Finance",
    min_salary_by_tier: {
      tier_1: 40000,  // Metro CAT A/B/C
      tier_2: 35000,  // Urban CAT A/B
      tier_3: 20000   // Semi-Urban/Rural
    },
    interest_rate_by_cibil: {
      '750_plus': 10.99,
      '725_749': 12.50,
      '700_724': 14.00,
      '675_699': 16.50
    },
    max_loan_cap: {
      standard: 2500000,
      prime: 3500000
    },
    min_cibil: 700,
    cibil_0_allowed: false,
    min_age: 21,
    max_age: 60,
    foir_limit: 0.70,
    multiplier_by_segment: {
      standard: 30,
      prime: 32
    },
    processing_fee_details: {
      percentage: 1.5,
      min_amount: 3000,
      max_amount: 15000,
      gst_included: false
    },
    negative_profiles: ['Police', 'DSA', 'Commission-based'],
    excluded_industries: ['Gaming', 'Unlisted NBFC'],
    salary_modes_allowed: ['Bank Transfer'],
    work_experience: {
      min_months_current_job: 6,
      min_total_experience_months: 24,
      employment_gaps_allowed: false
    },
    tenure_options: {
      min_months: 12,
      max_months_salaried: 84
    },
    geographic_restrictions: {
      excluded_states: [],
      rural_areas_covered: true
    },
    special_programs: {
      balance_transfer: true,
      top_up: true,
      co_applicant_allowed: true
    },
    documentation: {
      salary_slips_months: 3,
      bank_statements_months: 6,
      form_16_required: false
    },
    disbursement: {
      standard_days: 3,
      fast_track_days: 2
    }
  },
  
  {
    name: "Bajaj Finserv",
    min_salary_by_tier: {
      tier_1: 50000,  // Prime & Annex
      tier_2: 35000,  // Growth locations
      tier_3: 25000   // Others
    },
    interest_rate_by_cibil: {
      '750_plus': 11.00,
      '725_749': 13.00,
      '700_724': 15.00,
      '675_699': 18.00,
      ntc: 19.99
    },
    max_loan_cap: {
      standard: 3800000,
      prime: 5000000
    },
    min_cibil: 685,
    cibil_0_allowed: true,
    min_age: 23,
    max_age: 59,
    foir_limit: 0.70,
    multiplier_by_segment: {
      standard: 20,
      prime: 24,
      super_prime: 30
    },
    processing_fee_details: {
      percentage: 2.0,
      min_amount: 5000,
      max_amount: 25000,
      gst_included: false
    },
    negative_profiles: ['Police', 'Lawyer', 'Politician', 'Journalist', 'Driver', 'Security Guard', 'DSA', 'Commission-based'],
    excluded_industries: ['Gaming', 'Gambling', 'Chit Fund', 'Lottery', 'MLM', 'Unlisted NBFC', 'Manpower Outsourcing', 'Mines', 'Jewellers'],
    salary_modes_allowed: ['Bank Transfer'],
    work_experience: {
      min_months_current_job: 6,
      min_total_experience_months: 36,
      employment_gaps_allowed: false
    },
    ntc_conditions: {
      min_age_ntc: 23,
      min_salary_ntc: 35000,
      bank_statement_months: 6
    },
    tenure_options: {
      min_months: 12,
      max_months_salaried: 96
    },
    geographic_restrictions: {
      excluded_states: [],
      rural_areas_covered: false
    },
    special_programs: {
      balance_transfer: true,
      top_up: true,
      co_applicant_allowed: true
    },
    documentation: {
      salary_slips_months: 3,
      bank_statements_months: 6,
      form_16_required: false
    },
    disbursement: {
      standard_days: 2,
      fast_track_days: 1
    }
  },
  
  {
    name: "Bandhan Bank",
    min_salary_by_tier: {
      tier_1: 25000,
      tier_2: 25000,
      tier_3: 25000
    },
    interest_rate_by_cibil: {
      '750_plus': 10.50,
      '725_749': 12.00,
      '700_724': 13.50,
      '675_699': 15.50,
      ntc: 16.99
    },
    max_loan_cap: {
      standard: 2500000,
      prime: 4000000  // Doctors
    },
    min_cibil: 730,
    cibil_0_allowed: true,
    min_age: 21,
    max_age: 60,
    foir_limit: 0.60,
    multiplier_by_segment: {
      standard: 20,
      prime: 25
    },
    processing_fee_details: {
      percentage: 1.5,
      min_amount: 3000,
      max_amount: 10000,
      gst_included: false
    },
    negative_profiles: [],
    excluded_industries: [],
    salary_modes_allowed: ['Bank Transfer'],
    work_experience: {
      min_months_current_job: 6,
      min_total_experience_months: 12,
      employment_gaps_allowed: false
    },
    ntc_conditions: {
      min_age_ntc: 23,
      min_salary_ntc: 25000,
      bank_statement_months: 6
    },
    tenure_options: {
      min_months: 12,
      max_months_salaried: 72
    },
    geographic_restrictions: {
      excluded_states: [],
      rural_areas_covered: true
    },
    special_programs: {
      balance_transfer: true,
      top_up: true,
      co_applicant_allowed: true
    },
    documentation: {
      salary_slips_months: 3,
      bank_statements_months: 6,
      form_16_required: false
    },
    disbursement: {
      standard_days: 3,
      fast_track_days: 2
    }
  },
  
  {
    name: "Chola",
    min_salary_by_tier: {
      tier_1: 20000,
      tier_2: 20000,
      tier_3: 20000
    },
    interest_rate_by_cibil: {
      '750_plus': 12.00,
      '725_749': 14.00,
      '700_724': 16.00,
      '675_699': 18.00
    },
    max_loan_cap: {
      standard: 2500000,
      prime: 3000000
    },
    min_cibil: 700,
    cibil_0_allowed: false,
    min_age: 21,
    max_age: 60,
    foir_limit: 0.65,
    multiplier_by_segment: {
      standard: 32
    },
    processing_fee_details: {
      percentage: 2.0,
      min_amount: 5000,
      max_amount: 20000,
      gst_included: false
    },
    negative_profiles: [],
    excluded_industries: [],
    salary_modes_allowed: ['Bank Transfer'],
    work_experience: {
      min_months_current_job: 6,
      min_total_experience_months: 12,
      employment_gaps_allowed: false
    },
    tenure_options: {
      min_months: 12,
      max_months_salaried: 72
    },
    geographic_restrictions: {
      excluded_states: [],
      rural_areas_covered: true
    },
    special_programs: {
      balance_transfer: true,
      top_up: true,
      co_applicant_allowed: true
    },
    documentation: {
      salary_slips_months: 3,
      bank_statements_months: 6,
      form_16_required: false
    },
    disbursement: {
      standard_days: 3
    }
  },
  
  {
    name: "Finnable",
    min_salary_by_tier: {
      tier_1: 20000,  // Chennai, Bangalore, Hyderabad, Delhi, Mumbai, Pune
      tier_2: 15000,  // Tier 2 cities
      tier_3: 15000
    },
    interest_rate_by_cibil: {
      '750_plus': 16.00,
      '725_749': 18.00,
      '700_724': 20.00,
      '675_699': 24.00,
      ntc: 19.99
    },
    max_loan_cap: {
      standard: 1000000,
      prime: 1500000
    },
    min_cibil: 700,
    cibil_0_allowed: true,
    min_age: 21,
    max_age: 58,
    foir_limit: 0.60,
    multiplier_by_segment: {
      standard: 18,
      prime: 20
    },
    processing_fee_details: {
      percentage: 2.5,
      min_amount: 3000,
      max_amount: 10000,
      gst_included: false
    },
    negative_profiles: [],
    excluded_industries: [],
    salary_modes_allowed: ['Bank Transfer'],
    work_experience: {
      min_months_current_job: 3,
      min_total_experience_months: 12,
      employment_gaps_allowed: false
    },
    ntc_conditions: {
      min_age_ntc: 23,
      min_salary_ntc: 20000,
      bank_statement_months: 6
    },
    tenure_options: {
      min_months: 12,
      max_months_salaried: 60
    },
    geographic_restrictions: {
      excluded_states: [],
      rural_areas_covered: false
    },
    special_programs: {
      balance_transfer: true,
      top_up: true,
      co_applicant_allowed: true
    },
    documentation: {
      salary_slips_months: 3,
      bank_statements_months: 6,
      form_16_required: false
    },
    disbursement: {
      standard_days: 3,
      fast_track_days: 1
    }
  },
  
  {
    name: "HDFC Bank",
    min_salary_by_tier: {
      tier_1: 30000,
      tier_2: 25000,
      tier_3: 25000
    },
    interest_rate_by_cibil: {
      '750_plus': 10.75,
      '725_749': 12.50,
      '700_724': 14.25,
      '675_699': 17.50
    },
    max_loan_cap: {
      standard: 2500000,
      prime: 4000000
    },
    min_cibil: 720,
    cibil_0_allowed: false,
    min_age: 21,
    max_age: 60,
    foir_limit: 0.65,
    multiplier_by_segment: {
      standard: 20,
      prime: 25
    },
    processing_fee_details: {
      percentage: 1.5,
      min_amount: 3000,
      max_amount: 10000,
      gst_included: false
    },
    negative_profiles: ['Card Abuse', 'DSA'],
    excluded_industries: [],
    salary_modes_allowed: ['Bank Transfer'],
    work_experience: {
      min_months_current_job: 6,
      min_total_experience_months: 24,
      employment_gaps_allowed: false
    },
    tenure_options: {
      min_months: 12,
      max_months_salaried: 60
    },
    geographic_restrictions: {
      excluded_states: [],
      rural_areas_covered: true
    },
    special_programs: {
      balance_transfer: true,
      top_up: true,
      co_applicant_allowed: true
    },
    documentation: {
      salary_slips_months: 3,
      bank_statements_months: 6,
      form_16_required: false
    },
    disbursement: {
      standard_days: 3,
      fast_track_days: 1
    }
  },
  
  {
    name: "ICICI Bank",
    min_salary_by_tier: {
      tier_1: 30000,
      tier_2: 30000,
      tier_3: 25000
    },
    interest_rate_by_cibil: {
      '750_plus': 10.55,
      '725_749': 11.80,
      '700_724': 13.50,
      '675_699': 16.50,
      ntc: 18.00
    },
    max_loan_cap: {
      standard: 2500000,
      prime: 4000000
    },
    min_cibil: 750,
    cibil_0_allowed: true,
    min_age: 23,
    max_age: 58,
    foir_limit: 0.65,
    multiplier_by_segment: {
      standard: 20,
      prime: 25
    },
    processing_fee_details: {
      percentage: 1.0,
      min_amount: 3999,
      max_amount: 9999,
      gst_included: false
    },
    negative_profiles: [],
    excluded_industries: [],
    salary_modes_allowed: ['Bank Transfer'],
    work_experience: {
      min_months_current_job: 6,
      min_total_experience_months: 24,
      employment_gaps_allowed: false
    },
    ntc_conditions: {
      min_age_ntc: 23,
      min_salary_ntc: 30000,
      bank_statement_months: 6
    },
    tenure_options: {
      min_months: 12,
      max_months_salaried: 72
    },
    geographic_restrictions: {
      excluded_states: [],
      rural_areas_covered: true
    },
    special_programs: {
      balance_transfer: true,
      top_up: true,
      co_applicant_allowed: true
    },
    documentation: {
      salary_slips_months: 3,
      bank_statements_months: 6,
      form_16_required: false
    },
    disbursement: {
      standard_days: 3,
      fast_track_days: 1
    }
  },
  
  {
    name: "IDFC First Bank",
    min_salary_by_tier: {
      tier_1: 20000,
      tier_2: 20000,
      tier_3: 20000
    },
    interest_rate_by_cibil: {
      '750_plus': 11.50,
      '725_749': 13.00,
      '700_724': 15.00,
      '675_699': 17.50
    },
    max_loan_cap: {
      standard: 2500000,
      prime: 3000000
    },
    min_cibil: 720,
    cibil_0_allowed: false,
    min_age: 23,
    max_age: 60,
    foir_limit: 0.70,
    multiplier_by_segment: {
      standard: 20,
      prime: 24
    },
    processing_fee_details: {
      percentage: 1.5,
      min_amount: 3000,
      max_amount: 12000,
      gst_included: false
    },
    negative_profiles: [],
    excluded_industries: [],
    salary_modes_allowed: ['Bank Transfer'],
    work_experience: {
      min_months_current_job: 6,
      min_total_experience_months: 24,
      employment_gaps_allowed: false
    },
    tenure_options: {
      min_months: 12,
      max_months_salaried: 84
    },
    geographic_restrictions: {
      excluded_states: [],
      rural_areas_covered: true
    },
    special_programs: {
      balance_transfer: true,
      top_up: true,
      co_applicant_allowed: true
    },
    documentation: {
      salary_slips_months: 3,
      bank_statements_months: 6,
      form_16_required: false
    },
    disbursement: {
      standard_days: 3,
      fast_track_days: 2
    }
  },
  
  {
    name: "InCred",
    min_salary_by_tier: {
      tier_1: 20000,
      tier_2: 20000,
      tier_3: 20000
    },
    interest_rate_by_cibil: {
      '750_plus': 16.00,
      '725_749': 18.00,
      '700_724': 18.99,
      '675_699': 20.00
    },
    max_loan_cap: {
      standard: 750000,
      prime: 1000000
    },
    min_cibil: 700,
    cibil_0_allowed: false,
    min_age: 23,
    max_age: 60,
    foir_limit: 0.50,
    multiplier_by_segment: {
      standard: 15,
      prime: 18
    },
    processing_fee_details: {
      percentage: 2.0,
      min_amount: 3000,
      max_amount: 8000,
      gst_included: false
    },
    negative_profiles: [],
    excluded_industries: [],
    salary_modes_allowed: ['Bank Transfer'],
    work_experience: {
      min_months_current_job: 6,
      min_total_experience_months: 24,
      employment_gaps_allowed: false
    },
    tenure_options: {
      min_months: 12,
      max_months_salaried: 48
    },
    geographic_restrictions: {
      excluded_states: [],
      rural_areas_covered: false
    },
    special_programs: {
      balance_transfer: false,
      top_up: true,
      co_applicant_allowed: true
    },
    documentation: {
      salary_slips_months: 3,
      bank_statements_months: 6,
      form_16_required: false
    },
    disbursement: {
      standard_days: 3
    }
  },
  
  {
    name: "Kotak Mahindra Bank",
    min_salary_by_tier: {
      tier_1: 25000,
      tier_2: 25000,
      tier_3: 25000
    },
    interest_rate_by_cibil: {
      '750_plus': 10.99,
      '725_749': 12.50,
      '700_724': 14.00,
      '675_699': 16.50,
      ntc: 18.00
    },
    max_loan_cap: {
      standard: 2500000,
      prime: 4000000
    },
    min_cibil: 700,
    cibil_0_allowed: true,
    min_age: 21,
    max_age: 60,
    foir_limit: 0.75,
    multiplier_by_segment: {
      standard: 32,
      prime: 35
    },
    processing_fee_details: {
      percentage: 1.5,
      min_amount: 3000,
      max_amount: 10000,
      gst_included: false
    },
    negative_profiles: [],
    excluded_industries: [],
    salary_modes_allowed: ['Bank Transfer'],
    work_experience: {
      min_months_current_job: 6,
      min_total_experience_months: 24,
      employment_gaps_allowed: false
    },
    ntc_conditions: {
      min_age_ntc: 21,
      min_salary_ntc: 25000,
      bank_statement_months: 6
    },
    tenure_options: {
      min_months: 12,
      max_months_salaried: 72
    },
    geographic_restrictions: {
      excluded_states: [],
      rural_areas_covered: true
    },
    special_programs: {
      balance_transfer: true,
      top_up: true,
      co_applicant_allowed: true
    },
    documentation: {
      salary_slips_months: 3,
      bank_statements_months: 6,
      form_16_required: false
    },
    disbursement: {
      standard_days: 3,
      fast_track_days: 2
    }
  },
  
  {
    name: "L&T Finance",
    min_salary_by_tier: {
      tier_1: 25000,  // Major metros except Mumbai
      tier_2: 25000,
      tier_3: 20000   // Tier 3+
    },
    interest_rate_by_cibil: {
      '750_plus': 11.50,
      '725_749': 12.50,
      '700_724': 15.50,
      '675_699': 18.50
    },
    max_loan_cap: {
      standard: 3000000
    },
    min_cibil: 700,
    cibil_0_allowed: false,
    min_age: 23,
    max_age: 58,
    foir_limit: 0.70,
    multiplier_by_segment: {
      standard: 18,
      prime: 24
    },
    processing_fee_details: {
      percentage: 2.0,
      min_amount: 5000,
      max_amount: 20000,
      gst_included: false
    },
    negative_profiles: ['Group D Employees'],
    excluded_industries: ['Partnership/Proprietorship firms'],
    salary_modes_allowed: ['Bank Transfer'],
    work_experience: {
      min_months_current_job: 6,
      min_total_experience_months: 24,
      employment_gaps_allowed: false
    },
    tenure_options: {
      min_months: 12,
      max_months_salaried: 72
    },
    geographic_restrictions: {
      excluded_states: [],
      rural_areas_covered: true
    },
    special_programs: {
      balance_transfer: true,
      top_up: true,
      co_applicant_allowed: true
    },
    documentation: {
      salary_slips_months: 3,
      bank_statements_months: 6,
      form_16_required: false
    },
    disbursement: {
      standard_days: 3
    }
  },
  
  {
    name: "MAS Finance",
    min_salary_by_tier: {
      tier_1: 18000,
      tier_2: 18000,
      tier_3: 18000
    },
    interest_rate_by_cibil: {
      '750_plus': 16.00,
      '725_749': 18.00,
      '700_724': 20.00,
      '675_699': 24.00,
      ntc: 31.00
    },
    max_loan_cap: {
      standard: 1000000,
      prime: 1500000
    },
    min_cibil: 700,
    cibil_0_allowed: true,
    min_age: 21,
    max_age: 58,
    foir_limit: 0.60,
    multiplier_by_segment: {
      standard: 15,
      prime: 18
    },
    processing_fee_details: {
      percentage: 2.0,
      min_amount: 3000,
      max_amount: 10000,
      gst_included: false
    },
    negative_profiles: [],
    excluded_industries: [],
    salary_modes_allowed: ['Bank Transfer'],
    work_experience: {
      min_months_current_job: 6,
      min_total_experience_months: 12,
      employment_gaps_allowed: false
    },
    ntc_conditions: {
      min_age_ntc: 23,
      min_salary_ntc: 18000,
      bank_statement_months: 6
    },
    tenure_options: {
      min_months: 12,
      max_months_salaried: 60
    },
    geographic_restrictions: {
      excluded_states: [],
      rural_areas_covered: false
    },
    special_programs: {
      balance_transfer: false,
      top_up: true,
      co_applicant_allowed: true
    },
    documentation: {
      salary_slips_months: 3,
      bank_statements_months: 6,
      form_16_required: false
    },
    disbursement: {
      standard_days: 3
    }
  },
  
  {
    name: "Muthoot",
    min_salary_by_tier: {
      tier_1: 25000,
      tier_2: 25000,
      tier_3: 25000
    },
    interest_rate_by_cibil: {
      '750_plus': 12.00,
      '725_749': 14.00,
      '700_724': 16.00,
      '675_699': 18.00,
      ntc: 20.00
    },
    max_loan_cap: {
      standard: 2000000
    },
    min_cibil: 675,
    cibil_0_allowed: true,
    min_age: 21,
    max_age: 60,
    foir_limit: 0.65,
    multiplier_by_segment: {
      standard: 18,
      prime: 20
    },
    processing_fee_details: {
      percentage: 2.0,
      min_amount: 5000,
      max_amount: 15000,
      gst_included: false
    },
    negative_profiles: [],
    excluded_industries: [],
    salary_modes_allowed: ['Bank Transfer'],
    work_experience: {
      min_months_current_job: 6,
      min_total_experience_months: 12,
      employment_gaps_allowed: false
    },
    ntc_conditions: {
      min_age_ntc: 23,
      min_salary_ntc: 25000,
      bank_statement_months: 6
    },
    tenure_options: {
      min_months: 12,
      max_months_salaried: 72
    },
    geographic_restrictions: {
      excluded_states: [],
      rural_areas_covered: true
    },
    special_programs: {
      balance_transfer: true,
      top_up: true,
      co_applicant_allowed: true
    },
    documentation: {
      salary_slips_months: 3,
      bank_statements_months: 6,
      form_16_required: false
    },
    disbursement: {
      standard_days: 3
    }
  },
  
  {
    name: "Piramal Finance",
    min_salary_by_tier: {
      tier_1: 25000,
      tier_2: 25000,
      tier_3: 25000
    },
    interest_rate_by_cibil: {
      '750_plus': 11.99,
      '725_749': 13.50,
      '700_724': 15.00,
      '675_699': 17.00
    },
    max_loan_cap: {
      standard: 2500000
    },
    min_cibil: 743,
    cibil_0_allowed: false,
    min_age: 21,
    max_age: 60,
    foir_limit: 0.75,
    multiplier_by_segment: {
      standard: 20,
      prime: 24
    },
    processing_fee_details: {
      percentage: 1.5,
      min_amount: 3000,
      max_amount: 12000,
      gst_included: false
    },
    negative_profiles: [],
    excluded_industries: [],
    salary_modes_allowed: ['Bank Transfer'],
    work_experience: {
      min_months_current_job: 6,
      min_total_experience_months: 24,
      employment_gaps_allowed: false
    },
    tenure_options: {
      min_months: 12,
      max_months_salaried: 72
    },
    geographic_restrictions: {
      excluded_states: [],
      rural_areas_covered: true
    },
    special_programs: {
      balance_transfer: true,
      top_up: false,
      co_applicant_allowed: true
    },
    documentation: {
      salary_slips_months: 3,
      bank_statements_months: 6,
      form_16_required: false
    },
    disbursement: {
      standard_days: 3
    }
  },
  
  {
    name: "Poonawala Fincorp",
    min_salary_by_tier: {
      tier_1: 30000,  // Metro
      tier_2: 30000,
      tier_3: 30000
    },
    interest_rate_by_cibil: {
      '750_plus': 11.50,
      '725_749': 13.00,
      '700_724': 15.00,
      '675_699': 17.50,
      ntc: 19.00
    },
    max_loan_cap: {
      standard: 3000000,
      prime: 5000000
    },
    min_cibil: 700,
    cibil_0_allowed: true,
    min_age: 21,
    max_age: 60,
    foir_limit: 0.80,
    multiplier_by_segment: {
      standard: 20,
      prime: 25
    },
    processing_fee_details: {
      percentage: 2.0,
      min_amount: 5000,
      max_amount: 20000,
      gst_included: false
    },
    negative_profiles: ['Lawyer', 'Police', 'DSA', 'Politically Exposed Persons'],
    excluded_industries: ['Defence'],
    salary_modes_allowed: ['Bank Transfer'],
    work_experience: {
      min_months_current_job: 3,
      min_total_experience_months: 24,
      employment_gaps_allowed: false
    },
    ntc_conditions: {
      min_age_ntc: 23,
      min_salary_ntc: 30000,
      bank_statement_months: 6
    },
    tenure_options: {
      min_months: 12,
      max_months_salaried: 72
    },
    geographic_restrictions: {
      excluded_states: [],
      rural_areas_covered: false
    },
    special_programs: {
      balance_transfer: true,
      top_up: true,
      co_applicant_allowed: true
    },
    documentation: {
      salary_slips_months: 3,
      bank_statements_months: 6,
      form_16_required: false
    },
    disbursement: {
      standard_days: 3,
      fast_track_days: 2
    }
  },
  
  {
    name: "Tata Capital",
    min_salary_by_tier: {
      tier_1: 25000,
      tier_2: 25000,
      tier_3: 25000
    },
    interest_rate_by_cibil: {
      '750_plus': 11.25,
      '725_749': 13.00,
      '700_724': 15.00,
      '675_699': 17.00
    },
    max_loan_cap: {
      standard: 2500000,
      prime: 3500000
    },
    min_cibil: 725,
    cibil_0_allowed: false,
    min_age: 21,
    max_age: 58,
    foir_limit: 0.75,
    multiplier_by_segment: {
      standard: 27,
      prime: 30
    },
    processing_fee_details: {
      percentage: 1.5,
      min_amount: 3000,
      max_amount: 15000,
      gst_included: false
    },
    negative_profiles: [],
    excluded_industries: [],
    salary_modes_allowed: ['Bank Transfer'],
    work_experience: {
      min_months_current_job: 12,
      min_total_experience_months: 24,
      employment_gaps_allowed: false
    },
    tenure_options: {
      min_months: 12,
      max_months_salaried: 72
    },
    geographic_restrictions: {
      excluded_states: [],
      rural_areas_covered: true
    },
    special_programs: {
      balance_transfer: true,
      top_up: true,
      co_applicant_allowed: true
    },
    documentation: {
      salary_slips_months: 3,
      bank_statements_months: 6,
      form_16_required: false
    },
    disbursement: {
      standard_days: 3
    }
  },
  
  {
    name: "WeRize",
    min_salary_by_tier: {
      tier_1: 12000,
      tier_2: 12000,
      tier_3: 12000
    },
    interest_rate_by_cibil: {
      '750_plus': 18.00,
      '725_749': 20.00,
      '700_724': 22.00,
      '675_699': 24.00
    },
    max_loan_cap: {
      standard: 500000,
      prime: 750000
    },
    min_cibil: 650,
    cibil_0_allowed: false,
    min_age: 21,
    max_age: 57,
    foir_limit: 0.58,
    multiplier_by_segment: {
      standard: 12,
      prime: 15
    },
    processing_fee_details: {
      percentage: 2.5,
      min_amount: 2000,
      max_amount: 8000,
      gst_included: false
    },
    negative_profiles: [],
    excluded_industries: [],
    salary_modes_allowed: ['Bank Transfer', 'IMPS'],
    work_experience: {
      min_months_current_job: 9,
      min_total_experience_months: 12,
      employment_gaps_allowed: false
    },
    tenure_options: {
      min_months: 12,
      max_months_salaried: 48
    },
    geographic_restrictions: {
      excluded_states: [],
      rural_areas_covered: false
    },
    special_programs: {
      balance_transfer: false,
      top_up: false,
      co_applicant_allowed: true
    },
    documentation: {
      salary_slips_months: 3,
      bank_statements_months: 12,
      form_16_required: false
    },
    disbursement: {
      standard_days: 2,
      fast_track_days: 1
    }
  }
];
