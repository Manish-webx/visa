/**
 * Dubai Visa Assistance Services - Core Interactive JavaScript
 * Strictly static frontend logic, input validation, WhatsApp message generator, 
 * Application Status Tracker, Dynamic Pricing Filter, and Country Search.
 */

// Global Configuration (Easily configurable by the website owner)
const CONFIG = {
  WHATSAPP_NUMBER: "919565416467",
  COMPANY_NAME: "Dubai Express Visas",
  SUPPORT_PHONE: "+91 95654 16467",
  DOMAIN: "https://www.dubaiexpressvisas.com"
};

document.addEventListener('DOMContentLoaded', async () => {
  if (window.location.protocol.startsWith('http')) {
    await loadIncludes();
  }
  initMobileMenu();
  highlightActiveNavLink();
  initNavbarScroll();
  initBackToTop();
  initVisaFinder();
  initApplicationWizard();
  initContactForm();
  initWhatsAppButtons();
  initFaqSearch();
  initTrackerTool();
  initPricingToggle();
  initCountrySearch();
});

/* ---------------- Include Header & Footer Loader ---------------- */
async function loadIncludes() {
  const headerContainer = document.getElementById('site-header');
  const footerContainer = document.getElementById('site-footer');

  const tasks = [];

  if (headerContainer) {
    tasks.push(
      fetch('include/header.html')
        .then(res => {
          if (!res.ok) throw new Error('Header not found');
          return res.text();
        })
        .then(html => {
          headerContainer.innerHTML = html;
          highlightActiveNavLink();
          initNavbarScroll();
        })
        .catch(err => {
          console.warn('Could not load include/header.html via fetch:', err);
        })
    );
  }

  if (footerContainer) {
    tasks.push(
      fetch('include/footer.html')
        .then(res => {
          if (!res.ok) throw new Error('Footer not found');
          return res.text();
        })
        .then(html => {
          footerContainer.innerHTML = html;
          initBackToTop();
        })
        .catch(err => {
          console.warn('Could not load include/footer.html via fetch:', err);
        })
    );
  }

  await Promise.allSettled(tasks);
  initMobileMenu();
  initWhatsAppButtons();
}

function highlightActiveNavLink() {
  let path = window.location.pathname;
  let currentPage = path.substring(path.lastIndexOf('/') + 1).replace(/\.html$/, '');
  if (!currentPage || currentPage === 'index') {
    currentPage = './';
  }

  const allLinks = document.querySelectorAll('.navbar-nav .nav-link, .dropdown-menu .dropdown-item, .dropdown-menu .dropdown-item-rich');
  allLinks.forEach(link => {
    link.classList.remove('active');
  });

  allLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    const cleanHref = href.split('?')[0].split('#')[0];
    if (cleanHref === currentPage) {
      link.classList.add('active');
      const dropdownParent = link.closest('.dropdown');
      if (dropdownParent) {
        const toggle = dropdownParent.querySelector('.dropdown-toggle');
        if (toggle) toggle.classList.add('active');
      }
    }
  });
}

/* ---------------- Navbar Sticky / Scrolled Behavior ---------------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-custom');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu close on link click
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .dropdown-item');
  const navCollapse = document.querySelector('.navbar-collapse');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navCollapse && navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
}

/* ---------------- Back To Top Button ---------------- */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ---------------- Hero / Quick Visa Finder ---------------- */
function initVisaFinder() {
  const finderForm = document.getElementById('visaFinderForm');
  const resultContainer = document.getElementById('visaFinderResult');
  if (!finderForm) return;

  finderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nationality = document.getElementById('finderNationality')?.value || 'Not specified';
    const visaType = document.getElementById('finderType')?.value || '30-days';
    const duration = document.getElementById('finderDuration')?.value || 'Standard';
    const urgency = document.getElementById('finderUrgency')?.value || 'regular';

    const visaMap = {
      '14-days': {
        name: 'Dubai 14 Days Express / Tourist Visa',
        entry: 'Single or Multiple Entry',
        validity: '14 Days stay period',
        targetUrl: 'dubai-14-days-visa',
        desc: 'Quick visa tailored for short vacations, meetings, and urgent business trips.'
      },
      '30-days': {
        name: 'Dubai 30 Days Tourist Visa',
        entry: 'Single Entry',
        validity: '30 Days from entry',
        targetUrl: 'dubai-30-days-visa',
        desc: 'Ideal for leisure holidays, family visits, and short business trips.'
      },
      '60-days': {
        name: 'Dubai 60 Days Tourist Visa',
        entry: 'Single Entry',
        validity: '60 Days from entry',
        targetUrl: 'dubai-60-days-visa',
        desc: 'Recommended for extended vacations, job exploration, and longer family stays.'
      },
      'multiple-entry': {
        name: 'Dubai Multiple Entry Visa (30/60 Days)',
        entry: 'Multiple Entries',
        validity: 'Valid across stay period',
        targetUrl: 'dubai-multiple-entry-visa',
        desc: 'Best for cruise passengers, business travelers, and multi-country trips.'
      },
      'transit': {
        name: 'Dubai 48 / 96 Hours Transit Visa',
        entry: 'Single Entry',
        validity: '48 or 96 Hours stopover',
        targetUrl: 'dubai-transit-visa',
        desc: 'Crafted for airport stopovers and connecting flights with confirmed onward tickets.'
      },
      'gcc-resident': {
        name: 'GCC Resident UAE Entry Permit',
        entry: 'Single Entry',
        validity: '30 Days stay',
        targetUrl: 'gcc-resident-visa',
        desc: 'Special category for residents of Saudi Arabia, Oman, Qatar, Kuwait, and Bahrain.'
      },
      '5-year': {
        name: 'UAE 5-Year Multiple Entry Visa',
        entry: 'Multiple Entries (90 Days per visit)',
        validity: '5 Years validity window',
        targetUrl: 'uae-5-year-visa',
        desc: 'Self-sponsored long-term tourist visa for frequent UAE travelers.'
      }
    };

    const selected = visaMap[visaType] || visaMap['30-days'];
    const urgencyLabel = urgency === 'express' ? '<span class="badge bg-gold text-dark ms-2"><i class="bi bi-lightning-fill"></i> Express 4–12 Hrs</span>' : '<span class="badge bg-secondary ms-2">Regular 2–3 Days</span>';

    if (resultContainer) {
      resultContainer.innerHTML = `
        <div class="alert alert-success border-0 shadow-sm rounded-4 p-4 mt-4 bg-white border-start border-4 border-gold">
          <div class="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div>
              <div class="d-flex align-items-center mb-1">
                <h5 class="fw-bold text-navy mb-0">${selected.name}</h5>
                ${urgencyLabel}
              </div>
              <p class="text-muted small mb-1">${selected.desc}</p>
              <div class="d-flex flex-wrap gap-3 small text-muted">
                <span><i class="bi bi-flag text-gold"></i> Nationality: <strong>${escapeHtml(nationality)}</strong></span>
                <span><i class="bi bi-clock text-gold"></i> Stay: <strong>${selected.validity}</strong></span>
                <span><i class="bi bi-arrow-repeat text-gold"></i> Entry: <strong>${selected.entry}</strong></span>
              </div>
            </div>
            <div class="d-flex gap-2">
              <a href="${selected.targetUrl}" class="btn btn-outline-navy btn-sm px-3">View Details</a>
              <a href="contact" class="btn btn-gold btn-sm px-4">Inquire Now <i class="bi bi-arrow-right-short"></i></a>
            </div>
          </div>
        </div>
      `;
      resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}

/* ---------------- Interactive Pricing Tab & Urgency Switcher ---------------- */
function initPricingToggle() {
  const toggleCheckbox = document.getElementById('expressPricingToggle');
  if (!toggleCheckbox) return;

  toggleCheckbox.addEventListener('change', () => {
    const isExpress = toggleCheckbox.checked;
    const regularBadges = document.querySelectorAll('.pricing-regular-badge');
    const expressBadges = document.querySelectorAll('.pricing-express-badge');
    const timeElements = document.querySelectorAll('.pricing-time-val');

    timeElements.forEach(el => {
      if (isExpress) {
        el.textContent = '4 to 12 Hours (Fast-Track)';
        el.classList.add('text-gold', 'fw-bold');
      } else {
        el.textContent = '24 to 72 Business Hours';
        el.classList.remove('text-gold', 'fw-bold');
      }
    });

    regularBadges.forEach(el => el.classList.toggle('d-none', isExpress));
    expressBadges.forEach(el => el.classList.toggle('d-none', !isExpress));
  });
}

/* ---------------- Application Status Tracker Tool ---------------- */
function initTrackerTool() {
  const refForm = document.getElementById('trackRefForm');
  const passForm = document.getElementById('trackPassportForm');
  const resultDiv = document.getElementById('trackerResult');

  if (refForm) {
    refForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const refInput = document.getElementById('trackRefInput')?.value.trim();
      if (!refInput) return;
      displayTrackerResult(refInput, 'Reference Number', 'India', 'Dubai 30 Days Express Visa');
    });
  }

  if (passForm) {
    passForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const passInput = document.getElementById('trackPassInput')?.value.trim();
      const nationality = document.getElementById('trackNationalityInput')?.value || 'International';
      if (!passInput) return;
      displayTrackerResult(passInput, 'Passport Number', nationality, 'Dubai Tourist Visa');
    });
  }

  function displayTrackerResult(id, type, nationality, visaCategory) {
    if (!resultDiv) return;
    resultDiv.classList.remove('d-none');
    resultDiv.innerHTML = `
      <div class="card border-0 rounded-4 p-4 bg-white shadow-sm border-top border-4 border-gold">
        <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 pb-3 border-bottom">
          <div>
            <span class="text-muted small d-block">Search by ${type}:</span>
            <h5 class="fw-bold text-navy mb-0">${escapeHtml(id)}</h5>
          </div>
          <div class="text-end">
            <span class="badge bg-success-subtle text-success px-3 py-2 rounded-pill fw-bold">
              <i class="bi bi-check-circle-fill me-1"></i> Application Active
            </span>
          </div>
        </div>

        <div class="row g-3 mb-4 text-muted small">
          <div class="col-sm-4">
            <span>Visa Category:</span>
            <strong class="d-block text-navy">${visaCategory}</strong>
          </div>
          <div class="col-sm-4">
            <span>Nationality:</span>
            <strong class="d-block text-navy">${escapeHtml(nationality)}</strong>
          </div>
          <div class="col-sm-4">
            <span>Latest Update:</span>
            <strong class="d-block text-navy">Document Verification Passed</strong>
          </div>
        </div>

        <!-- Timeline Progress -->
        <h6 class="fw-bold text-navy mb-3">Live Processing Milestones:</h6>
        <div class="tracker-timeline">
          <div class="timeline-step completed">
            <div class="step-icon"><i class="bi bi-check2"></i></div>
            <div class="step-content">
              <strong>1. Application Received</strong>
              <p class="text-muted small mb-0">Applicant file registered in portal database.</p>
            </div>
          </div>
          <div class="timeline-step completed">
            <div class="step-icon"><i class="bi bi-check2"></i></div>
            <div class="step-content">
              <strong>2. Pre-Submission Document Check</strong>
              <p class="text-muted small mb-0">Passport scan clarity & photograph verified against GDRFA standards.</p>
            </div>
          </div>
          <div class="timeline-step active">
            <div class="step-icon"><i class="bi bi-hourglass-split"></i></div>
            <div class="step-content">
              <strong>3. Under Immigration Processing</strong>
              <p class="text-muted small mb-0">Application lodged through authorized UAE immigration channels.</p>
            </div>
          </div>
          <div class="timeline-step">
            <div class="step-icon"><i class="bi bi-file-earmark-pdf"></i></div>
            <div class="step-content">
              <strong>4. Electronic Visa Issuance</strong>
              <p class="text-muted small mb-0">Approved electronic visa PDF sent via Email and WhatsApp.</p>
            </div>
          </div>
        </div>

        <div class="mt-4 pt-3 border-top d-flex flex-wrap justify-content-between align-items-center gap-2">
          <span class="text-muted small"><i class="bi bi-info-circle me-1"></i> Need live agent update?</span>
          <a href="#" class="btn btn-whatsapp btn-sm dynamic-whatsapp-link"><i class="bi bi-whatsapp me-1"></i> Ask Coordinator on WhatsApp</a>
        </div>
      </div>
    `;
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/* ---------------- Country Eligibility Search Filter ---------------- */
function initCountrySearch() {
  const searchInput = document.getElementById('countrySearchInput');
  const countryList = document.getElementById('countryListContainer');
  if (!searchInput || !countryList) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    const items = countryList.querySelectorAll('.country-pill-item');

    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(term)) {
        item.classList.remove('d-none');
      } else {
        item.classList.add('d-none');
      }
    });
  });
}

/* ---------------- Multi-Step Application Wizard ---------------- */
function initApplicationWizard() {
  const form = document.getElementById('visaApplicationWizard');
  if (!form) return;

  const urlParams = new URLSearchParams(window.location.search);
  const prefillVisa = urlParams.get('visa');
  const prefillUrgency = urlParams.get('urgency');

  if (prefillVisa) {
    const visaSelect = document.getElementById('appVisaType');
    if (visaSelect) {
      visaSelect.value = prefillVisa;
    }
  }

  if (prefillUrgency === 'express') {
    const expressCheckbox = document.getElementById('appUrgencyExpress');
    if (expressCheckbox) {
      expressCheckbox.checked = true;
    }
  }

  let currentStep = 1;
  const totalSteps = 3;

  const step1 = document.getElementById('wizardStep1');
  const step2 = document.getElementById('wizardStep2');
  const step3 = document.getElementById('wizardStep3');
  const successBox = document.getElementById('wizardSuccess');

  const btnNext1 = document.getElementById('btnNextStep1');
  const btnNext2 = document.getElementById('btnNextStep2');
  const btnPrev2 = document.getElementById('btnPrevStep2');
  const btnPrev3 = document.getElementById('btnPrevStep3');
  const btnSubmit = document.getElementById('btnSubmitWizard');
  const btnDirectWhatsApp = document.getElementById('btnDirectWhatsApp');

  // Step Indicators
  const indicator1 = document.getElementById('indStep1');
  const indicator2 = document.getElementById('indStep2');
  const indicator3 = document.getElementById('indStep3');

  function updateSteps() {
    if (step1) step1.classList.toggle('d-none', currentStep !== 1);
    if (step2) step2.classList.toggle('d-none', currentStep !== 2);
    if (step3) step3.classList.toggle('d-none', currentStep !== 3);

    if (indicator1) {
      indicator1.classList.toggle('active', currentStep === 1);
      indicator1.classList.toggle('completed', currentStep > 1);
    }
    if (indicator2) {
      indicator2.classList.toggle('active', currentStep === 2);
      indicator2.classList.toggle('completed', currentStep > 2);
    }
    if (indicator3) {
      indicator3.classList.toggle('active', currentStep === 3);
      indicator3.classList.toggle('completed', currentStep > 3);
    }

    if (currentStep === 3) {
      populateReviewSummary();
    }
  }

  if (btnNext1) {
    btnNext1.addEventListener('click', () => {
      if (validateStep1()) {
        currentStep = 2;
        updateSteps();
      }
    });
  }

  if (btnNext2) {
    btnNext2.addEventListener('click', () => {
      if (validateStep2()) {
        currentStep = 3;
        updateSteps();
      }
    });
  }

  if (btnPrev2) {
    btnPrev2.addEventListener('click', () => {
      currentStep = 1;
      updateSteps();
    });
  }

  if (btnPrev3) {
    btnPrev3.addEventListener('click', () => {
      currentStep = 2;
      updateSteps();
    });
  }

  function validateStep1() {
    const fullName = document.getElementById('appFullName');
    const email = document.getElementById('appEmail');
    const phone = document.getElementById('appPhone');
    const nationality = document.getElementById('appNationality');

    let isValid = true;
    if (!fullName || !fullName.value.trim()) {
      showError(fullName, 'Please enter your full legal name as per passport.');
      isValid = false;
    } else {
      clearError(fullName);
    }

    if (!email || !isValidEmail(email.value.trim())) {
      showError(email, 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearError(email);
    }

    if (!phone || !phone.value.trim() || phone.value.trim().length < 7) {
      showError(phone, 'Please enter a valid phone or WhatsApp number.');
      isValid = false;
    } else {
      clearError(phone);
    }

    if (!nationality || !nationality.value) {
      showError(nationality, 'Please select your nationality.');
      isValid = false;
    } else {
      clearError(nationality);
    }

    return isValid;
  }

  function validateStep2() {
    const visaType = document.getElementById('appVisaType');
    const travelDate = document.getElementById('appTravelDate');
    const applicants = document.getElementById('appApplicants');

    let isValid = true;
    if (!visaType || !visaType.value) {
      showError(visaType, 'Please select a visa category.');
      isValid = false;
    } else {
      clearError(visaType);
    }

    if (!travelDate || !travelDate.value) {
      showError(travelDate, 'Please enter your tentative arrival date in Dubai.');
      isValid = false;
    } else {
      clearError(travelDate);
    }

    if (!applicants || parseInt(applicants.value) < 1) {
      showError(applicants, 'Please select at least 1 applicant.');
      isValid = false;
    } else {
      clearError(applicants);
    }

    return isValid;
  }

  function populateReviewSummary() {
    const name = document.getElementById('appFullName')?.value || '-';
    const email = document.getElementById('appEmail')?.value || '-';
    const phone = document.getElementById('appPhone')?.value || '-';
    const nationality = document.getElementById('appNationality')?.value || '-';
    const visaType = document.getElementById('appVisaType')?.options[document.getElementById('appVisaType')?.selectedIndex]?.text || '-';
    const travelDate = document.getElementById('appTravelDate')?.value || '-';
    const applicants = document.getElementById('appApplicants')?.value || '1';
    const isExpress = document.getElementById('appUrgencyExpress')?.checked;
    const notes = document.getElementById('appNotes')?.value || 'None';

    const reviewBox = document.getElementById('wizardReviewBox');
    if (reviewBox) {
      reviewBox.innerHTML = `
        <div class="table-responsive">
          <table class="table table-bordered mb-0">
            <tbody>
              <tr><th class="bg-light" style="width: 35%;">Applicant Name:</th><td><strong>${escapeHtml(name)}</strong></td></tr>
              <tr><th class="bg-light">Email Address:</th><td>${escapeHtml(email)}</td></tr>
              <tr><th class="bg-light">WhatsApp / Phone:</th><td>${escapeHtml(phone)}</td></tr>
              <tr><th class="bg-light">Nationality:</th><td>${escapeHtml(nationality)}</td></tr>
              <tr><th class="bg-light">Visa Package:</th><td><strong>${escapeHtml(visaType)}</strong></td></tr>
              <tr><th class="bg-light">Urgency Tier:</th><td>${isExpress ? '<span class="badge bg-gold text-dark fw-bold"><i class="bi bi-lightning-fill"></i> Express 4–12 Hrs Fast-Track</span>' : '<span class="badge bg-secondary">Regular 2–3 Days</span>'}</td></tr>
              <tr><th class="bg-light">Expected Arrival:</th><td>${escapeHtml(travelDate)}</td></tr>
              <tr><th class="bg-light">No. of Travelers:</th><td>${escapeHtml(applicants)}</td></tr>
              <tr><th class="bg-light">Special Notes:</th><td>${escapeHtml(notes)}</td></tr>
            </tbody>
          </table>
        </div>
      `;
    }
  }

  if (btnSubmit) {
    btnSubmit.addEventListener('click', (e) => {
      if (validateStep1() && validateStep2()) {
        form.submit();
      } else {
        e.preventDefault();
        alert('Please complete all required fields.');
      }
    });
  }

  if (btnDirectWhatsApp) {
    btnDirectWhatsApp.addEventListener('click', (e) => {
      e.preventDefault();
      const name = document.getElementById('appFullName')?.value || 'Applicant';
      const visaType = document.getElementById('appVisaType')?.options[document.getElementById('appVisaType')?.selectedIndex]?.text || 'Dubai Visa';
      const nationality = document.getElementById('appNationality')?.value || 'International';
      const travelDate = document.getElementById('appTravelDate')?.value || 'Soon';
      const applicants = document.getElementById('appApplicants')?.value || '1';
      const isExpress = document.getElementById('appUrgencyExpress')?.checked;

      const urgencyText = isExpress ? '🚨 URGENT EXPRESS (4-12 Hours)' : 'Standard Regular (2-3 Days)';

      const text = `Hello ${CONFIG.COMPANY_NAME}, I would like to submit a Dubai Visa Inquiry:
• Name: ${name}
• Nationality: ${nationality}
• Visa Category: ${visaType}
• Urgency: ${urgencyText}
• Arrival Date: ${travelDate}
• Number of Travelers: ${applicants}

Please guide me on the documents and fee payment. Thank you!`;

      const encoded = encodeURIComponent(text);
      window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
    });
  }

  updateSteps();
}

/* ---------------- Contact Form Handler ---------------- */
function initContactForm() {
  const contactForm = document.getElementById('contactForm') || document.getElementById('mainContactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    const name = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const message = document.getElementById('contactMessage')?.value.trim();

    if (!name || !email || !message) {
      e.preventDefault();
      alert('Please fill out all required fields.');
      return;
    }
  });
}

/* ---------------- Global WhatsApp Buttons ---------------- */
function initWhatsAppButtons() {
  const buttons = document.querySelectorAll('.dynamic-whatsapp-link');
  const defaultText = `Hello ${CONFIG.COMPANY_NAME}, I would like to inquire about Dubai Visa assistance. Please share the details and required documents.`;
  const encoded = encodeURIComponent(defaultText);
  const waUrl = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encoded}`;

  buttons.forEach(btn => {
    btn.setAttribute('href', waUrl);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });
}

/* ---------------- FAQ Search Filter ---------------- */
function initFaqSearch() {
  const searchInput = document.getElementById('faqSearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase().trim();
    const items = document.querySelectorAll('.custom-accordion .accordion-item');

    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(term)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

/* ---------------- Utility Helpers ---------------- */
function showError(element, message) {
  if (!element) return;
  element.classList.add('is-invalid');
  let feedback = element.nextElementSibling;
  if (!feedback || !feedback.classList.contains('invalid-feedback')) {
    feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    element.parentNode.appendChild(feedback);
  }
  feedback.textContent = message;
}

function clearError(element) {
  if (!element) return;
  element.classList.remove('is-invalid');
  const feedback = element.parentNode.querySelector('.invalid-feedback');
  if (feedback) feedback.remove();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

/* ---------------- Mobile Slide-From-Right Drawer & Dropdown ---------------- */
function initMobileMenu() {
  // Prevent multiple bindings of global listener
  if (document.body.dataset.mobileMenuInitialized === 'true') return;
  document.body.dataset.mobileMenuInitialized = 'true';

  // Create backdrop if not existing
  let backdrop = document.querySelector('.navbar-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'navbar-backdrop';
    document.body.appendChild(backdrop);
  }

  function openMenu() {
    const navCollapse = document.getElementById('mainNavbar');
    if (navCollapse) navCollapse.classList.add('show');
    backdrop.classList.add('show');
    document.body.classList.add('mobile-nav-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    const navCollapse = document.getElementById('mainNavbar');
    if (navCollapse) navCollapse.classList.remove('show');
    backdrop.classList.remove('show');
    document.body.classList.remove('mobile-nav-open');
    document.body.style.overflow = '';
  }

  // Delegated click handler on document
  document.addEventListener('click', (e) => {
    // 1. Navbar Toggler Button
    const toggler = e.target.closest('.navbar-toggler');
    if (toggler) {
      e.preventDefault();
      e.stopPropagation();
      const navCollapse = document.getElementById('mainNavbar');
      if (navCollapse && navCollapse.classList.contains('show')) {
        closeMenu();
      } else {
        openMenu();
      }
      return;
    }

    // 2. Mobile Nav Close Button
    const closeBtn = e.target.closest('#mobileNavCloseBtn, .mobile-nav-close');
    if (closeBtn) {
      e.preventDefault();
      closeMenu();
      return;
    }

    // 3. Backdrop Click
    if (e.target.classList.contains('navbar-backdrop')) {
      closeMenu();
      return;
    }

    // 4. Dropdown Toggle (Visa Types) on Mobile
    const dropdownToggle = e.target.closest('.dropdown-mega-wrapper .dropdown-toggle');
    if (dropdownToggle && window.innerWidth < 992) {
      e.preventDefault();
      e.stopPropagation();
      const wrapper = dropdownToggle.closest('.dropdown-mega-wrapper');
      const menu = wrapper ? wrapper.querySelector('.dropdown-menu-mega') : null;
      if (menu) {
        const isOpen = menu.classList.contains('show');
        if (isOpen) {
          menu.classList.remove('show');
          dropdownToggle.classList.remove('show');
          if (wrapper) wrapper.classList.remove('show');
        } else {
          menu.classList.add('show');
          dropdownToggle.classList.add('show');
          if (wrapper) wrapper.classList.add('show');
        }
      }
      return;
    }

    // 5. Regular internal links in mobile drawer
    const navLink = e.target.closest('#mainNavbar a:not(.dropdown-toggle)');
    if (navLink && window.innerWidth < 992) {
      closeMenu();
    }
  });

  // Close when pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const navCollapse = document.getElementById('mainNavbar');
      if (navCollapse && navCollapse.classList.contains('show')) {
        closeMenu();
      }
    }
  });
}

