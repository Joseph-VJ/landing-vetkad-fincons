const app = {
    init: () => {
        console.log("VetKad Fincons Initialized");
        
        // Force enable all form fields on load (fixes browser cache/restore issues)
        const form = document.getElementById('eligibility-form');
        if (form) {
            Array.from(form.elements).forEach(el => el.disabled = false);
        }
        const btn = document.querySelector('.btn-primary');
        if (btn) btn.disabled = false;

        app.setupCalculators();
        app.setupForm();
        app.setupModalBackdrop();
    },

    setupModalBackdrop: () => {
        const modalOverlay = document.getElementById('result-modal');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                // Close only if clicked on overlay, not the card
                if (e.target === modalOverlay) {
                    window.closeModal();
                }
            });
        }
    },

    setupForm: () => {
        const form = document.getElementById('eligibility-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            app.checkEligibility();
        });
    },

    checkEligibility: async () => {
        const btn = document.querySelector('.btn-primary');
        if (!btn) {
            console.error('Submit button not found');
            return;
        }
        
        // Prevent double submission
        if (btn.disabled) return;
        
        const originalText = btn.innerHTML;
        const form = document.getElementById('eligibility-form');

        try {
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Checking...';
            btn.disabled = true;

            // Disable form to prevent changes during submission
            if (form) {
                Array.from(form.elements).forEach(el => {
                    if (el !== btn) el.disabled = true;
                });
            }

            // Safely get values with null checks
            const getVal = (id) => document.getElementById(id)?.value || '';
            
            const amount = parseFloat(getVal('amount')) || 0;
            const tenure = parseFloat(getVal('tenure')) || 0; 
            const salary = parseFloat(getVal('salary')) || 0;
            const cibil = parseFloat(getVal('cibil')) || 0;
            const full_name = getVal('full_name');
            const phone = getVal('phone');
            const age = parseInt(getVal('age')) || 0;
            const salary_mode = getVal('salary_mode');
            const profession = getVal('profession');
            const emis = parseFloat(getVal('emis')) || 0;
            const obligations = parseFloat(getVal('obligations')) || 0;
            const pincode = getVal('pincode');

            // Validate phone number
            if (!/^[6-9]\d{9}$/.test(phone)) {
                alert('Please enter a valid 10-digit Indian mobile number starting with 6-9');
                return; // finally block will handle re-enabling
            }

            // Validate pincode
            if (!/^\d{6}$/.test(pincode)) {
                alert('Please enter a valid 6-digit pincode');
                return;
            }

            // Validate CIBIL score
            if (cibil !== -1 && cibil !== 0 && (cibil < 300 || cibil > 900)) {
                alert('CIBIL Score must be between 300-900, or 0 for new-to-credit, or -1 for no bureau');
                return;
            }

            const payload = {
                loan_type: 'personal',
                full_name,
                phone,
                age,
                monthly_salary: salary,
                existing_emis: emis,
                total_obligations: obligations,
                cibil_score: cibil,
                salary_mode,
                profession,
                desired_amount: amount,
                tenure: tenure,
                pincode: pincode
            };

            // Use environment-based configuration (secure approach)
            const SUPABASE_URL = window.SUPABASE_URL || "https://icammcswodhsjmthwwwh.supabase.co";
            const SUPABASE_KEY = window.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljYW1tY3N3b2Roc2ptdGh3d3doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MjIyODcsImV4cCI6MjA3OTI5ODI4N30.4P3iQXWGIpIhp-vk3ijOk9E64SBurByCQxTvdttATrc";
            
            const response = await fetch(`${SUPABASE_URL}/functions/v1/check-eligibility`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                },
                body: JSON.stringify(payload)
            });

            // Validate HTTP response
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();

            // Validate result structure
            if (!result || typeof result.status === 'undefined') {
                throw new Error('Invalid response from server');
            }

            if (result.status === 'APPROVED') {
                app.showModal('success', result);
                console.log('QA_RESULT:', JSON.stringify(result));
            } else {
                app.showModal('fail', result);
                console.log('QA_RESULT:', JSON.stringify(result));
            }
        } catch (error) {
            console.error('Eligibility check error:', error);
            const errorMsg = error instanceof Error ? error.message : 'Network error';
            app.showModal('error', { error_message: errorMsg });
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
            
            // Re-enable form
            if (form) {
                Array.from(form.elements).forEach(el => el.disabled = false);
            }
        }
    },

    showModal: (type, data) => {
        // For QA Automation: Create visible result display on page
        const formCard = document.querySelector('.form-card');
        if (!formCard) {
            console.error('Form card not found');
            return;
        }
        
        let qaResultDiv = document.getElementById('qa-result-display');
        if (!qaResultDiv) {
            qaResultDiv = document.createElement('div');
            qaResultDiv.id = 'qa-result-display';
            qaResultDiv.style.cssText = 'margin-top: 20px; padding: 20px; border-radius: 12px; font-weight: 600; text-align: center; white-space: pre-line;';
            formCard.appendChild(qaResultDiv);
        } else {
            // Clear previous data attributes to prevent stale data
            Array.from(qaResultDiv.attributes).forEach(attr => {
                if (attr.name.startsWith('data-')) {
                    qaResultDiv.removeAttribute(attr.name);
                }
            });
        }

        const modal = document.getElementById('result-modal');
        const icon = document.getElementById('modal-icon');
        const title = document.getElementById('modal-title');
        const message = document.getElementById('modal-message');
        const lender = document.getElementById('modal-lender');
        const amount = document.getElementById('modal-amount');
        
        if (!modal || !icon || !title || !message || !lender || !amount) {
            console.error('Required modal elements not found');
            return;
        }

        if (type === 'success') {
            icon.innerHTML = '<i class="fa-solid fa-check"></i>';
            icon.style.background = '#E3F9E5';
            icon.style.color = '#00C853';
            title.textContent = 'Congratulations!';
            message.textContent = 'You are eligible for a loan from';
            lender.style.display = 'inline-block';
            lender.textContent = data.matched_lender || 'N/A';
            amount.style.display = 'block';
            amount.textContent = `₹${(data.approved_amount || 0).toLocaleString('en-IN')}`;
            
            // QA Automation: Update visible result (use textContent to prevent XSS)
            qaResultDiv.style.backgroundColor = '#E3F9E5';
            qaResultDiv.style.color = '#00C853';
            qaResultDiv.textContent = `✅ APPROVED\nLender: ${data.matched_lender || 'N/A'}\nAmount: ₹${(data.approved_amount || 0).toLocaleString('en-IN')}`;
            qaResultDiv.setAttribute('data-status', 'APPROVED');
            qaResultDiv.setAttribute('data-lender', data.matched_lender || '');
            qaResultDiv.setAttribute('data-amount', data.approved_amount || 0);
        } else if (type === 'fail') {
            icon.innerHTML = '<i class="fa-solid fa-times"></i>';
            icon.style.background = '#FFEBEE';
            icon.style.color = '#FF3D00';
            title.textContent = 'Not Eligible';
            message.textContent = data.rejection_reason || 'Criteria not met';
            lender.style.display = 'none';
            amount.style.display = 'none';
            
            // QA Automation: Update visible result (use textContent to prevent XSS)
            qaResultDiv.style.backgroundColor = '#FFEBEE';
            qaResultDiv.style.color = '#FF3D00';
            qaResultDiv.textContent = `❌ REJECTED\nReason: ${data.rejection_reason || 'Criteria not met'}`;
            qaResultDiv.setAttribute('data-status', 'REJECTED');
            qaResultDiv.setAttribute('data-reason', data.rejection_reason || 'Criteria not met');
        } else {
            icon.innerHTML = '<i class="fa-solid fa-exclamation-triangle"></i>';
            icon.style.background = '#FFF3E0';
            icon.style.color = '#FF9800';
            title.textContent = 'Error';
            message.textContent = data?.error_message || 'Something went wrong. Please try again.';
            lender.style.display = 'none';
            amount.style.display = 'none';
            
            // QA Automation: Update visible result (use textContent to prevent XSS)
            qaResultDiv.style.backgroundColor = '#FFF3E0';
            qaResultDiv.style.color = '#FF9800';
            qaResultDiv.textContent = `⚠️ ERROR\nMessage: ${data?.error_message || 'Something went wrong'}`;
            qaResultDiv.setAttribute('data-status', 'ERROR');
            qaResultDiv.setAttribute('data-error', data?.error_message || 'Unknown error');
        }

        modal.classList.add('active');
    },

    setupCalculators: () => {
        // EMI Calculator Inputs
        const emiInputs = ['emi-amount', 'emi-rate', 'emi-tenure'];
        emiInputs.forEach(id => {
            document.getElementById(id)?.addEventListener('input', app.calculateEMI);
        });

        // BT Calculator Inputs
        const btInputs = ['bt-amount', 'bt-old-rate', 'bt-new-rate'];
        btInputs.forEach(id => {
            document.getElementById(id)?.addEventListener('input', app.calculateBT);
        });

        // Initial Calculation
        app.calculateEMI();
        app.calculateBT();
    },

    calculateEMI: () => {
        const emiAmountEl = document.getElementById('emi-amount');
        const emiRateEl = document.getElementById('emi-rate');
        const emiTenureEl = document.getElementById('emi-tenure');
        const emiOutputEl = document.getElementById('emi-output');
        
        if (!emiAmountEl || !emiRateEl || !emiTenureEl || !emiOutputEl) return;
        
        const P = parseFloat(emiAmountEl.value) || 0;
        const R = parseFloat(emiRateEl.value) || 0;
        const N = parseFloat(emiTenureEl.value) * 12 || 0;

        if (P > 0 && R > 0 && N > 0) {
            const r = R / 12 / 100;
            const denominator = Math.pow(1 + r, N) - 1;
            
            // Check for division by zero
            if (denominator === 0) {
                emiOutputEl.textContent = 'Invalid calculation';
                return;
            }
            
            const emi = P * r * (Math.pow(1 + r, N) / denominator);
            
            // Validate result
            if (!isFinite(emi) || isNaN(emi)) {
                emiOutputEl.textContent = 'Invalid result';
                return;
            }
            
            emiOutputEl.textContent = `₹${Math.round(emi).toLocaleString('en-IN')} / mo`;
        } else {
            emiOutputEl.textContent = '₹0 / mo';
        }
    },

    calculateBT: () => {
        const btAmountEl = document.getElementById('bt-amount');
        const btOldRateEl = document.getElementById('bt-old-rate');
        const btNewRateEl = document.getElementById('bt-new-rate');
        const btOutputEl = document.getElementById('bt-output');
        
        if (!btAmountEl || !btOldRateEl || !btNewRateEl || !btOutputEl) return;
        
        const P = parseFloat(btAmountEl.value) || 0;
        const R1 = parseFloat(btOldRateEl.value) || 0;
        const R2 = parseFloat(btNewRateEl.value) || 0;

        if (P > 0 && R1 > 0 && R2 > 0) {
            // Simple interest difference approximation for 1 year for simplicity in demo
            // Or just difference in EMI * tenure (assuming 5 years default)
            const savings = (P * (R1 - R2) / 100) * 5; // Approx 5 year savings
            btOutputEl.textContent = `Save ₹${Math.round(savings).toLocaleString('en-IN')}+`;
        } else {
            btOutputEl.textContent = 'Save ₹0+';
        }
    }
};

// Global function for modal close button
window.closeModal = () => {
    document.getElementById('result-modal').classList.remove('active');
};

// Initialize
document.addEventListener('DOMContentLoaded', app.init);
