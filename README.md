# Dubai Visa Service Website — Frontend Static Package

A modern, professional, conversion-focused, and trustworthy static website for a **Dubai Visa Assistance & UAE Visit Visa Services** company.

Built strictly with **HTML5, CSS3, Bootstrap 5, JavaScript, and Bootstrap Icons**, fully deployable to any standard shared hosting (cPanel, Apache, Nginx, GitHub Pages, Netlify, Vercel) by simply uploading the files.

---

## 🌟 Key Features

1. **Pure Static Frontend**:
   - Zero server-side runtime dependencies (No PHP, Node.js, Laravel, or SQL database required).
   - Instant deployment on any web hosting.

2. **Luxury Navy & Gold Travel Aesthetic**:
   - Custom tailored color palette (`#0a192f` Navy, `#c5a059` UAE Gold, `#fbf9f5` Cream).
   - Modern typography using Google Fonts (*Outfit* and *Plus Jakarta Sans*).
   - Glassmorphic accents, elegant hover effects, and subtle shadow systems.

3. **Conversion-Driven Architecture**:
   - Dynamic **Visa Finder Widget** providing instant informational recommendations.
   - Interactive **3-Step Application Wizard** with live client-side validation.
   - **Direct WhatsApp Application Flow** dynamically formatting client inquiries into pre-filled WhatsApp chats.
   - Floating WhatsApp button with mobile optimization.

4. **Trust & Legal Compliance**:
   - Transparent disclaimer prominently displayed across top bar, footer, and individual pages stating commercial assistance agency status.
   - Explicit disclaimers clarifying that visa issuance is strictly subject to UAE immigration authority (GDRFA / ICP) decisions.

5. **SEO & Structured Schema**:
   - Individual semantic `<title>` and `<meta name="description">` on every page.
   - Schema.org JSON-LD structured data (`TravelAgency`, `Product`, `FAQPage`, `Article`, `AboutPage`).

---

## 📁 Directory Structure

```text
dubai-visa-website/
│
├── index.html                          # Homepage (Express Fast-Track, Interactive Pricing Matrix, Live Tracker, Country Search)
├── about.html                          # About Us & Company Philosophy
├── contact.html                        # Contact Channels, Online Inquiry & Support Desk
├── track.html                          # Live Visa Application Status Tracker (Ref & Passport lookup)
├── visa-requirements.html              # Comprehensive Document Checklist & Photo Specifications
├── faq.html                            # Categorized FAQ with Live Search & Structured Schema
├── privacy-policy.html                 # Privacy Policy & Document Protection Terms
├── terms-and-conditions.html           # Terms of Service & Non-Government Disclaimer
│
├── dubai-14-days-visa.html                  # Dubai 14 Days Single & Multiple Entry Express Visa
├── dubai-30-days-visa.html                  # Dubai 30 Days Single Entry Tourist Visa
├── dubai-60-days-visa.html                  # Dubai 60 Days Single Entry Tourist Visa
├── dubai-multiple-entry-visa.html           # Dubai 14/30/60 Days Multiple Entry Visa
├── dubai-transit-visa.html             # Dubai 48 & 96 Hours Airport Transit Visas
├── uae-5-year-visa.html                # UAE 5-Year Multiple Entry Tourist Visa
├── gcc-resident-visa.html              # GCC Resident UAE Entry Permit
├── dubai-visa-extension.html                 # In-Country Dubai Visa Extension Assistance
│
├── blog.html                           # Blog Articles Listing
├── dubai-visa-for-indians.html         # Guide for Indian Travelers
├── dubai-visa-requirements.html        # Photo & Passport Rules Guide
├── dubai-visa-processing-time.html     # Processing Time & Timeline Insights
├── dubai-visa-documents.html           # Complete Preparation Checklist
│
├── include/
│   ├── header.html                     # Centralized Top-bar & Navbar (edit once, updates all pages)
│   └── footer.html                     # Centralized Footer, Disclaimers & Floating WhatsApp (edit once, updates all pages)
│
├── assets/
│   ├── css/
│   │   └── style.css                   # Custom Design System, Responsive Breakpoints, Custom Utilities
│   └── js/
│       └── script.js                   # Include Loader, Active Link Highlighter, Wizard, Live Tracker, Pricing Filter
│
└── README.md
```

---

## ⚙️ Configuration & Customization

All primary business settings are centralized at the top of [`assets/js/script.js`](assets/js/script.js):

```javascript
const CONFIG = {
  WHATSAPP_NUMBER: "919565416467", // WhatsApp number with country code (no + or spaces)
  COMPANY_NAME: "Dubai Express Visas",
  SUPPORT_PHONE: "+91 95654 16467",
  DOMAIN: "https://www.dubaiexpressvisas.com"
};
```

### To customize business details across HTML files:
Search and replace the placeholders:
- `YOUR_PHONE` → `+91 95654 16467`
- `YOUR_WHATSAPP_NUMBER` → `+91 95654 16467`
- `COMPANY_NAME` → Your brand name

---

## 🚀 How to Deploy

1. **Shared Hosting (cPanel, Hostinger, GoDaddy, Bluehost, etc.)**:
   - Compress the files inside `dubai-visa-website/` into a `.zip` archive.
   - Open your cPanel **File Manager** and go to `public_html`.
   - Upload and extract the `.zip` archive into `public_html`.
   - The site is live instantly!

2. **Netlify / Vercel / GitHub Pages**:
   - Drag and drop the root folder directly into Netlify Drop or commit to a GitHub repository and enable GitHub Pages on `main` branch.

---

## 🔒 Future Backend / Form Service Integration

When ready to connect backend services (e.g., Formspree, Web3Forms, PHP mailer, or Node.js / Laravel API):
1. In [`contact.html`](contact.html), verify `action="mail1.php"` and `method="POST"` on `<form>`.
2. Secure file uploads must be streamed to cloud storage (e.g. AWS S3 / Cloudinary) with SSL encryption.
