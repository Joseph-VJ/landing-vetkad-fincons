const SUPABASE_URL = "https://icammcswodhsjmthwwwh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljYW1tY3N3b2Roc2ptdGh3d3doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MjIyODcsImV4cCI6MjA3OTI5ODI4N30.4P3iQXWGIpIhp-vk3ijOk9E64SBurByCQxTvdttATrc";

const app = {
    state: {
        path: null, // 'personal', 'business', 'instant'
        formData: {},
        isEligible: false
    },

    init: () => {
        console.log("VetKad Platform Initialized");
        app.setup3DTilt();
    },

    selectPath: (pathName) => {
        console.log(`Path selected: ${pathName}`);
        app.state.path = pathName;
        app.state.formData = {}; // Reset form data
        
        // Explicitly reset the form DOM element to clear any browser-cached values
        const form = document.getElementById('loan-form');
        if (form) form.reset();

        // Visual Transition
        const gateway = document.getElementById('gateway');
        const ascent = document.getElementById('ascent');

        gsap.to(gateway, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                gateway.classList.remove('active-section');
                gateway.classList.add('hidden-section');

                ascent.classList.remove('hidden-section');
                ascent.classList.add('active-section');

                // Reset scroll to top
                window.scrollTo(0, 0);

                gsap.fromTo(ascent, { opacity: 0 }, { opacity: 1, duration: 0.5 });

                // Initialize Form for the selected path
                app.renderForm(pathName);
            }
        });
    },

    goBack: () => {
        const gateway = document.getElementById('gateway');
        const ascent = document.getElementById('ascent');

        // Reset form data on back
        app.state.formData = {};
        const form = document.getElementById('loan-form');
        if (form) form.reset();

        gsap.to(ascent, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                ascent.classList.remove('active-section');
                ascent.classList.add('hidden-section');

                gateway.classList.remove('hidden-section');
                gateway.classList.add('active-section');

                // Reset scroll to top
                window.scrollTo(0, 0);

                gsap.fromTo(gateway, { opacity: 0 }, { opacity: 1, duration: 0.5 });

                app.state.path = null;
            }
        });
    },

    renderForm: (path) => {
        const formTitle = document.getElementById('form-title');
        const dynamicFields = document.getElementById('dynamic-fields');

        dynamicFields.innerHTML = ''; // Clear previous fields

        // Form Configuration
        const formConfig = {
            common: [
                { id: 'full_name', label: 'Full Name', hint: 'முழு பெயர்', type: 'text', icon: 'fa-user', placeholder: 'e.g. John Doe' },
                { id: 'phone', label: 'Mobile Number', hint: 'அலைபேசி எண்', type: 'tel', icon: 'fa-phone', placeholder: 'e.g. 9876543210' },
                { id: 'age', label: 'Age', hint: 'வயது', type: 'number', icon: 'fa-calendar', placeholder: 'e.g. 28' }
            ],
            personal: [
                { id: 'desired_amount', label: 'Desired Loan Amount (₹)', hint: 'தேவையான கடன் தொகை', type: 'number', icon: 'fa-sack-dollar', placeholder: 'e.g. 500000' },
                { id: 'monthly_salary', label: 'Net Monthly Salary (₹)', hint: 'மாத சம்பளம்', type: 'number', icon: 'fa-indian-rupee-sign', placeholder: 'e.g. 45000' },
                { id: 'current_emis', label: 'Total Current EMIs (₹)', hint: 'தற்போதைய கடன் தவணை', type: 'number', icon: 'fa-money-bill-transfer', placeholder: 'e.g. 5000' },
                { id: 'company_name', label: 'Company Name', hint: 'நிறுவனத்தின் பெயர்', type: 'text', icon: 'fa-building', placeholder: 'e.g. Company Pvt Ltd' },
                { id: 'salary_mode', label: 'Salary Mode', hint: 'சம்பளம் பெறும் முறை', type: 'select', options: ['Bank Transfer', 'Cheque', 'Cash'], icon: 'fa-money-bill-wave' },
                { id: 'cibil_score', label: 'CIBIL Score', hint: 'சிபில் ஸ்கோர்', type: 'number', icon: 'fa-chart-simple', placeholder: 'e.g. 750' },
                { id: 'profession', label: 'Profession', hint: 'தொழில்', type: 'select', options: ['Private Sector', 'Govt Employee', 'Police', 'Lawyer', 'Politician', 'Media/Journalist', 'MLM Agent', 'Other'], icon: 'fa-user-tie' }
            ],
            business: [
                { id: 'gst_number', label: 'GST Number', hint: 'GST எண்', type: 'text', icon: 'fa-file-invoice', placeholder: 'e.g. 29ABCDE1234F1Z5' },
                { id: 'annual_turnover', label: 'Annual Turnover (₹)', hint: 'ஆண்டு வருமானம்', type: 'number', icon: 'fa-chart-line', placeholder: 'e.g. 6000000' },
                { id: 'business_years', label: 'Years in Business', hint: 'தொழில் அனுபவம் (ஆண்டுகள்)', type: 'number', icon: 'fa-calendar-check', placeholder: 'e.g. 5' },
                { id: 'industry_type', label: 'Industry Type', hint: 'தொழில் வகை', type: 'select', options: ['Service', 'Manufacturing', 'Trading', 'Real Estate', 'Jewellery', 'Liquor', 'Speculation/Trading'], icon: 'fa-industry' },
                { id: 'office_ownership', label: 'Office Ownership', hint: 'அலுவலகம் சொந்தமா/வாடகையா?', type: 'select', options: ['Owned', 'Rented'], icon: 'fa-building-user' },
                { id: 'home_ownership', label: 'Home Ownership', hint: 'வீடு சொந்தமா/வாடகையா?', type: 'select', options: ['Owned', 'Rented'], icon: 'fa-house' },
                { id: 'avg_bank_balance', label: 'Avg Bank Balance (Last 6m)', hint: 'சராசரி வங்கி இருப்பு', type: 'number', icon: 'fa-piggy-bank', placeholder: 'e.g. 200000' }
            ],
            instant: [
                { id: 'monthly_income', label: 'Monthly Income (₹)', hint: 'மாத வருமானம்', type: 'number', icon: 'fa-wallet', placeholder: 'e.g. 20000' }
            ]
        };

        // Set Title
        if (path === 'personal') formTitle.innerText = "Personal Loan Details";
        else if (path === 'business') formTitle.innerText = "Business Details";
        else formTitle.innerText = "Quick Cash Details";

        // Merge Common + Specific Fields
        const fieldsToRender = [...formConfig.common, ...(formConfig[path] || [])];

        // Generate HTML
        fieldsToRender.forEach((field, index) => {
            const fieldWrapper = document.createElement('div');
            fieldWrapper.className = 'form-group';
            fieldWrapper.style.opacity = '0'; // Start hidden for animation
            fieldWrapper.style.transform = 'translateY(20px)';

            let inputHTML = '';
            if (field.type === 'select') {
                inputHTML = `
                    <select id="${field.id}" name="${field.id}" required onchange="app.handleInput(this)">
                        <option value="" disabled selected>Select an option</option>
                        ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                `;
            } else {
                inputHTML = `
                    <input type="${field.type}" id="${field.id}" name="${field.id}" placeholder="${field.placeholder}" required oninput="app.handleInput(this)">
                `;
            }

            fieldWrapper.innerHTML = `
                <label for="${field.id}">
                    <i class="fa-solid ${field.icon}"></i> ${field.label}
                    <span class="tamil-hint">(${field.hint})</span>
                </label>
                ${inputHTML}
                <div class="validation-check"><i class="fa-solid fa-check"></i></div>
            `;

            dynamicFields.appendChild(fieldWrapper);

            // Staggered Animation
            setTimeout(() => {
                gsap.to(fieldWrapper, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
            }, index * 150);
        });
    },

    handleInput: (input) => {
        const parent = input.parentElement;
        if (input.value.length > 0 && input.checkValidity()) {
            parent.classList.add('valid');
            app.state.formData[input.id] = input.value;
        } else {
            parent.classList.remove('valid');
        }
    },

    setup3DTilt: () => {
        const cards = document.querySelectorAll('.card-3d');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    },

    submitForm: (e) => {
        if (e) e.preventDefault(); // Prevent page reload for SPA
        console.log("Form Submitted", app.state.formData);

        // Send data to Web3Forms via AJAX
        const form = document.getElementById('loan-form');
        const formData = new FormData(form);

        // Append manual data if needed, or rely on form inputs
        // Note: app.state.formData contains the clean values

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => console.log("Web3Forms response", data))
            .catch(error => console.error("Web3Forms error", error));

        // Transition to Analysis
        const ascent = document.getElementById('ascent');
        const analysis = document.getElementById('analysis');

        gsap.to(ascent, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                ascent.classList.remove('active-section');
                ascent.classList.add('hidden-section');

                analysis.classList.remove('hidden-section');
                analysis.classList.add('active-section');

                // Reset scroll to top
                window.scrollTo(0, 0);

                app.startAnalysis();
            }
        });
    },

    startAnalysis: () => {
        const textElement = document.getElementById('analysis-text');
        const messages = ["Analyzing Profile...", "Checking Bureau Score...", "Matching with Lenders..."];
        let tl = gsap.timeline({
            onComplete: () => {
                app.checkEligibility();
            }
        });

        messages.forEach((msg) => {
            tl.to(textElement, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => textElement.innerText = msg
            })
                .to(textElement, { opacity: 1, duration: 0.5 })
                .to({}, { duration: 1.0 });
        });
    },

    checkEligibility: async () => {
        try {
            const data = app.state.formData;
            const path = app.state.path;
            
            console.log("Checking Eligibility for:", path, data);

            // Prepare payload for Supabase Edge Function
            const payload = {
                loan_type: path,
                full_name: data.full_name,
                phone: data.phone,
                age: parseInt(data.age),
                monthly_salary: parseFloat(data.monthly_salary) || parseFloat(data.monthly_income),
                existing_emis: parseFloat(data.current_emis),
                cibil_score: parseInt(data.cibil_score),
                salary_mode: data.salary_mode,
                profession: data.profession,
                annual_turnover: parseFloat(data.annual_turnover),
                years_in_business: parseFloat(data.business_years),
                industry_type: data.industry_type,
                gst_number: data.gst_number,
                office_ownership: data.office_ownership,
                home_ownership: data.home_ownership,
                desired_amount: parseFloat(data.desired_amount)
            };

            // Call the "Brain" (Edge Function)
            const response = await fetch(`${SUPABASE_URL}/functions/v1/check-eligibility`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${SUPABASE_KEY}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error("Network response was not ok");

            const result = await response.json();
            console.log("AI Decision:", result);

            if (result.status === 'APPROVED') {
                app.showSummit(result.approved_amount, result.matched_lender);
            } else {
                console.log("Rejected:", result.rejection_reason);
                // Trust the AI Brain: If rejected, show rejection.
                // We do NOT blindly downgrade anymore, as that bypasses negative profile checks.
                app.showSummit(0, result.rejection_reason || "Policy Criteria Not Met");
            }

        } catch (error) {
            console.error("Critical Error in checkEligibility:", error);
            // Fallback for demo purposes if API keys are missing
            if (SUPABASE_URL.includes("YOUR_SUPABASE")) {
                alert("Please configure SUPABASE_URL and KEY in script.js to use the AI Brain!");
            }
            app.showSummit(0, "Connection Error");
        }
    },

    showSummit: (amount, lenderName) => {
        const analysis = document.getElementById('analysis');
        const summit = document.getElementById('summit');
        const amountEl = document.getElementById('loan-amount');

        gsap.to(analysis, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                analysis.classList.remove('active-section');
                analysis.classList.add('hidden-section');
                summit.classList.remove('hidden-section');
                summit.classList.add('active-section');

                // Scroll to top instantly to ensure visibility
                window.scrollTo(0, 0);

                gsap.to(amountEl, {
                    innerText: amount,
                    duration: 2,
                    snap: { innerText: 1000 },
                    onUpdate: function () {
                        this.targets()[0].innerText = Math.ceil(this.targets()[0].innerText).toLocaleString('en-IN');
                    }
                });
                app.renderLenders(lenderName);
            }
        });
    },

    renderLenders: (matchedLender) => {
        const list = document.getElementById('lender-list');
        const path = app.state.path;
        let lenders = [];

        if (matchedLender) {
            // If AI matched a specific lender, show that one prominently
            lenders = [{ name: matchedLender, color: '#4CAF50', recommended: true }];
        } else if (path === 'instant') {
            // Apps for Instant Loans
            lenders = [
                { name: 'KreditBee', color: '#FFC107' },
                { name: 'MoneyView', color: '#4CAF50' },
                { name: 'CASHe', color: '#2196F3' }
            ];
        } else {
            // Banks for Personal & Business Loans
            lenders = [
                { name: 'HDFC Bank', color: '#004c8f' },
                { name: 'ICICI Bank', color: '#f37e20' },
                { name: 'Bajaj Finserv', color: '#00aae0' },
                { name: 'Axis Bank', color: '#97144d' }
            ];
        }

        list.innerHTML = lenders.map(l => `
            <div class="lender-card" style="border-top: 4px solid ${l.color}; ${l.recommended ? 'transform: scale(1.05); box-shadow: 0 10px 20px rgba(0,0,0,0.2);' : ''}">
                ${l.recommended ? '<div style="background:#4CAF50; color:white; padding:2px 8px; font-size:12px; border-radius:4px; display:inline-block; margin-bottom:5px;">Recommended</div>' : ''}
                <h4>${l.name}</h4>
                <button>Apply Now</button>
            </div>
        `).join('');
    }
};

document.addEventListener('DOMContentLoaded', app.init);
