const app = {
    init: () => {
        console.log("VetKad Fincons Initialized");
        app.setupCalculators();
        app.setupForm();
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
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Checking...';
        btn.disabled = true;

        const amount = parseFloat(document.getElementById('amount').value);
        // const tenure = parseFloat(document.getElementById('tenure').value); // Not used in backend logic yet but good to have
        const salary = parseFloat(document.getElementById('salary').value);
        const cibil = parseFloat(document.getElementById('cibil').value);
        const full_name = document.getElementById('full_name').value;
        const phone = document.getElementById('phone').value;
        const age = parseInt(document.getElementById('age').value);
        const salary_mode = document.getElementById('salary_mode').value;
        const profession = document.getElementById('profession').value;
        const emis = parseFloat(document.getElementById('emis').value) || 0;
        const obligations = parseFloat(document.getElementById('obligations').value) || 0;

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
            desired_amount: amount
        };

        try {
            const SUPABASE_URL = "https://icammcswodhsjmthwwwh.supabase.co";
            const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljYW1tY3N3b2Roc2ptdGh3d3doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MjIyODcsImV4cCI6MjA3OTI5ODI4N30.4P3iQXWGIpIhp-vk3ijOk9E64SBurByCQxTvdttATrc";
            
            const response = await fetch(`${SUPABASE_URL}/functions/v1/check-eligibility`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.status === 'APPROVED') {
                app.showModal('success', result);
                // For QA Automation: Log result to console
                console.log('QA_RESULT:', JSON.stringify(result));
            } else {
                app.showModal('fail', result);
                // For QA Automation: Log result to console
                console.log('QA_RESULT:', JSON.stringify(result));
            }
        } catch (error) {
            console.error(error);
            app.showModal('error');
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    },

    showModal: (type, data) => {
        // For QA Automation: Create visible result display on page
        const formCard = document.querySelector('.form-card');
        let qaResultDiv = document.getElementById('qa-result-display');
        if (!qaResultDiv) {
            qaResultDiv = document.createElement('div');
            qaResultDiv.id = 'qa-result-display';
            qaResultDiv.style.cssText = 'margin-top: 20px; padding: 20px; border-radius: 12px; font-weight: 600; text-align: center;';
            formCard.appendChild(qaResultDiv);
        }

        const modal = document.getElementById('result-modal');
        const icon = document.getElementById('modal-icon');
        const title = document.getElementById('modal-title');
        const message = document.getElementById('modal-message');
        const lender = document.getElementById('modal-lender');
        const amount = document.getElementById('modal-amount');

        if (type === 'success') {
            icon.innerHTML = '<i class="fa-solid fa-check"></i>';
            icon.style.background = '#E3F9E5';
            icon.style.color = '#00C853';
            title.innerText = 'Congratulations!';
            message.innerText = 'You are eligible for a loan from';
            lender.style.display = 'inline-block';
            lender.innerText = data.matched_lender;
            amount.style.display = 'block';
            amount.innerText = `₹${data.approved_amount.toLocaleString('en-IN')}`;
            
            // QA Automation: Update visible result
            qaResultDiv.style.backgroundColor = '#E3F9E5';
            qaResultDiv.style.color = '#00C853';
            qaResultDiv.innerHTML = `✅ APPROVED<br>Lender: ${data.matched_lender}<br>Amount: ₹${data.approved_amount.toLocaleString('en-IN')}`;
            qaResultDiv.setAttribute('data-status', 'APPROVED');
            qaResultDiv.setAttribute('data-lender', data.matched_lender);
            qaResultDiv.setAttribute('data-amount', data.approved_amount);
        } else if (type === 'fail') {
            icon.innerHTML = '<i class="fa-solid fa-times"></i>';
            icon.style.background = '#FFEBEE';
            icon.style.color = '#FF3D00';
            title.innerText = 'Not Eligible';
            message.innerText = data.rejection_reason || 'Criteria not met';
            lender.style.display = 'none';
            amount.style.display = 'none';
            
            // QA Automation: Update visible result
            qaResultDiv.style.backgroundColor = '#FFEBEE';
            qaResultDiv.style.color = '#FF3D00';
            qaResultDiv.innerHTML = `❌ REJECTED<br>Reason: ${data.rejection_reason || 'Criteria not met'}`;
            qaResultDiv.setAttribute('data-status', 'REJECTED');
            qaResultDiv.setAttribute('data-reason', data.rejection_reason || 'Criteria not met');
        } else {
            icon.innerHTML = '<i class="fa-solid fa-exclamation-triangle"></i>';
            icon.style.background = '#FFF3E0';
            icon.style.color = '#FF9800';
            title.innerText = 'Error';
            message.innerText = 'Something went wrong. Please try again.';
            lender.style.display = 'none';
            amount.style.display = 'none';
            
            // QA Automation: Update visible result
            qaResultDiv.style.backgroundColor = '#FFF3E0';
            qaResultDiv.style.color = '#FF9800';
            qaResultDiv.innerHTML = `⚠️ ERROR<br>Message: Something went wrong`;
            qaResultDiv.setAttribute('data-status', 'ERROR');
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
        const P = parseFloat(document.getElementById('emi-amount').value) || 0;
        const R = parseFloat(document.getElementById('emi-rate').value) || 0;
        const N = parseFloat(document.getElementById('emi-tenure').value) * 12 || 0;

        if (P > 0 && R > 0 && N > 0) {
            const r = R / 12 / 100;
            const emi = P * r * (Math.pow(1 + r, N) / (Math.pow(1 + r, N) - 1));
            document.getElementById('emi-output').innerText = `₹${Math.round(emi).toLocaleString('en-IN')} / mo`;
        }
    },

    calculateBT: () => {
        const P = parseFloat(document.getElementById('bt-amount').value) || 0;
        const R1 = parseFloat(document.getElementById('bt-old-rate').value) || 0;
        const R2 = parseFloat(document.getElementById('bt-new-rate').value) || 0;

        if (P > 0 && R1 > 0 && R2 > 0) {
            // Simple interest difference approximation for 1 year for simplicity in demo
            // Or just difference in EMI * tenure (assuming 5 years default)
            const savings = (P * (R1 - R2) / 100) * 5; // Approx 5 year savings
            document.getElementById('bt-output').innerText = `Save ₹${Math.round(savings).toLocaleString('en-IN')}+`;
        }
    }
};

// Global function for modal close button
window.closeModal = () => {
    document.getElementById('result-modal').classList.remove('active');
};

// Initialize
document.addEventListener('DOMContentLoaded', app.init);
