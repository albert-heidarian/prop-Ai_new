const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../styles-NNWH23TG.css');
let css = fs.readFileSync(cssPath, 'utf8');

let rtlBlockStart = css.indexOf('Comprehensive Persian');
if (rtlBlockStart !== -1) {
  // Back up to the comment banner
  const bannerStart = css.lastIndexOf('/* ===', rtlBlockStart);
  if (bannerStart !== -1) {
    css = css.substring(0, bannerStart);
  } else {
    css = css.substring(0, rtlBlockStart);
  }
}

const additionalRtl = `
/* ==========================================================================
   Comprehensive Persian & RTL Architecture Styles
   ========================================================================== */
html, body {
  direction: rtl !important;
  text-align: right !important;
  font-family: "Vazirmatn", "Google Sans Flex", system-ui, -apple-system, sans-serif !important;
}

/* Force Vazirmatn on all Persian text containers */
h1, h2, h3, h4, h5, h6, p, a, button, input, textarea, select, span:not(.google-symbols):not(.symbol):not([class*="symbol"]):not([class*="icon"]):not(i), li, dt, dd, label, th, td {
  font-family: "Vazirmatn", system-ui, -apple-system, sans-serif !important;
}

/* Maintain English/Monospace LTR readability for code and terminal snippets */
code, pre, .terminal-content, .code-container, .snippet-container, textarea.code, .hljs, [class*="language-"] {
  direction: ltr !important;
  text-align: left !important;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace !important;
}

/* RTL Grid Offsets (Complete 1 through 11) */
html[dir="rtl"] .col-md-offset-1, html .col-md-offset-1 { margin-left: 0 !important; margin-right: 8.3333333333% !important; }
html[dir="rtl"] .col-md-offset-2, html .col-md-offset-2 { margin-left: 0 !important; margin-right: 16.6666666667% !important; }
html[dir="rtl"] .col-md-offset-3, html .col-md-offset-3 { margin-left: 0 !important; margin-right: 0 !important; }
html[dir="rtl"] .col-md-offset-4, html .col-md-offset-4 { margin-left: 0 !important; margin-right: 33.3333333333% !important; }
html[dir="rtl"] .col-md-offset-5, html .col-md-offset-5 { margin-left: 0 !important; margin-right: 41.6666666667% !important; }
html[dir="rtl"] .col-md-offset-6, html .col-md-offset-6 { margin-left: 0 !important; margin-right: 50% !important; }
html[dir="rtl"] .col-md-offset-7, html .col-md-offset-7 { margin-left: 0 !important; margin-right: 58.3333333333% !important; }
html[dir="rtl"] .col-md-offset-8, html .col-md-offset-8 { margin-left: 0 !important; margin-right: 66.6666666667% !important; }
html[dir="rtl"] .col-md-offset-9, html .col-md-offset-9 { margin-left: 0 !important; margin-right: 75% !important; }
html[dir="rtl"] .col-md-offset-10, html .col-md-offset-10 { margin-left: 0 !important; margin-right: 83.3333333333% !important; }
html[dir="rtl"] .col-md-offset-11, html .col-md-offset-11 { margin-left: 0 !important; margin-right: 91.6666666667% !important; }

/* Text alignments across cards, tables, headers, and content */
.video-header,
.feature-explorer-section,
.pricing-card,
.pricing .cards-container .pricing-card,
.card-content,
.use-case-card,
.detail-content,
.overview-card,
.tab-content,
.step-container,
.hero-content,
.release-item,
.changelog-item,
.support-card {
  text-align: right !important;
  direction: rtl !important;
}

/* RTL Typing Text Animation Rules */
.landing-main-header {
  direction: rtl !important;
  text-align: center !important;
  margin-inline: auto !important;
  max-inline-size: 1100px !important;
  font-family: "Vazirmatn", system-ui, sans-serif !important;
  font-weight: 750 !important;
  line-height: 1.3 !important;
  letter-spacing: -0.5px !important;
  display: flex !important;
  justify-content: center !important;
}

html[dir="rtl"] typed-header,
html[dir="rtl"] .typed-container {
  direction: rtl !important;
  text-align: right !important;
  display: inline-flex !important;
  flex-direction: row !important;
  align-items: baseline !important;
  position: relative !important;
  unicode-bidi: isolate !important;
}

html[dir="rtl"] .landing-main-header typed-header {
  justify-content: center !important;
  text-align: center !important;
}

html[dir="rtl"] typed-header .typed-content {
  order: 1 !important;
  direction: rtl !important;
  text-align: right !important;
  display: inline !important;
  unicode-bidi: isolate !important;
  font-family: "Vazirmatn", system-ui, sans-serif !important;
  white-space: normal !important;
}

html[dir="rtl"] typed-header .cursor-container {
  order: 2 !important;
  position: relative !important;
  transform: none !important;
  display: inline-flex !important;
  align-items: center !important;
  margin-inline-start: 6px !important;
  margin-inline-end: 0 !important;
  left: auto !important;
  top: auto !important;
  right: auto !important;
  bottom: auto !important;
  vertical-align: middle !important;
}

html[dir="rtl"] typed-header .blinking-cursor {
  height: 1.05em !important;
  width: auto !important;
  display: inline-block !important;
  vertical-align: middle !important;
}

/* Breadcrumbs & Navigation Arrows in RTL */
.breadcrumb-separator, .docs-breadcrumb span {
  display: inline-block;
  transform: scaleX(-1);
}
.arrow-link::after {
  transform: scaleX(-1) !important;
  margin-right: 6px !important;
  margin-left: 0 !important;
}

/* Form Inputs & Search RTL */
input[type="text"], input[type="search"], input[type="email"], textarea {
  direction: rtl !important;
  text-align: right !important;
}
.search-container .search-icon, .docs-search .search-icon {
  right: 12px !important;
  left: auto !important;
}

/* Header & Dropdown Alignments */
.dropdown-menu, .navigation-dropdown {
  direction: rtl !important;
  text-align: right !important;
  right: 0 !important;
  left: auto !important;
}
.sublink-item {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  text-align: right !important;
  direction: rtl !important;
}

/* ==========================================================================
   Upgraded UI Menu & Dropdown Styling (Desktop & Mobile)
   ========================================================================== */
.header {
  backdrop-filter: blur(16px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(16px) saturate(180%) !important;
  background: rgba(255, 255, 255, 0.88) !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07) !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.header.scrolled,
.header.opaque,
.header.dropdown-open,
.header.menu-open {
  background: rgba(255, 255, 255, 0.96) !important;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04) !important;
  border-bottom-color: rgba(0, 0, 0, 0.1) !important;
}

/* Nav Item Links */
.button-nav {
  font-family: "Vazirmatn", system-ui, sans-serif !important;
  font-weight: 550 !important;
  font-size: 0.95rem !important;
  letter-spacing: 0 !important;
  border-radius: 9999px !important;
  padding: 8px 16px !important;
  color: #374151 !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
  position: relative !important;
}

.button-nav:hover,
.button-nav:focus-visible {
  color: #111827 !important;
  background: rgba(0, 0, 0, 0.05) !important;
}

/* Header Dropdown Container & Glassmorphism */
header-dropdown .dropdown,
.header .dropdown {
  direction: rtl !important;
  background: rgba(255, 255, 255, 0.98) !important;
  backdrop-filter: blur(24px) !important;
  -webkit-backdrop-filter: blur(24px) !important;
  border-bottom-left-radius: 20px !important;
  border-bottom-right-radius: 20px !important;
  box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.14), 0 0 0 1px rgba(0, 0, 0, 0.05) !important;
  border-top: 1px solid rgba(0, 0, 0, 0.06) !important;
  padding: 2.25rem 2rem 2.5rem 2rem !important;
}

/* Dropdown Overlay */
.dropdown-overlay {
  background: rgba(0, 0, 0, 0.35) !important;
  backdrop-filter: blur(3px) !important;
  -webkit-backdrop-filter: blur(3px) !important;
}

/* Dropdown Title & Info typography */
.dropdown-title {
  direction: rtl !important;
  text-align: right !important;
  font-family: "Vazirmatn", system-ui, sans-serif !important;
  font-weight: 750 !important;
  font-size: 1.35rem !important;
  line-height: 1.4 !important;
  color: #111827 !important;
  margin-bottom: 0.75rem !important;
}

.dropdown-info {
  direction: rtl !important;
  text-align: right !important;
  font-family: "Vazirmatn", system-ui, sans-serif !important;
  font-weight: 400 !important;
  font-size: 0.9rem !important;
  line-height: 1.65 !important;
  color: #4b5563 !important;
  margin: 0 0 1.5rem 0 !important;
}

/* Dropdown CTA Action Button */
.dropdown .nav-button,
header-dropdown .nav-button {
  font-family: "Vazirmatn", system-ui, sans-serif !important;
  font-weight: 600 !important;
  font-size: 0.88rem !important;
  border-radius: 9999px !important;
  padding: 9px 20px !important;
  background: #111827 !important;
  color: #ffffff !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  box-shadow: 0 4px 12px rgba(17, 24, 39, 0.2) !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.dropdown .nav-button:hover,
header-dropdown .nav-button:hover {
  background: #000000 !important;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3) !important;
  transform: translateY(-1px) !important;
}

/* Subnav Column Divider */
.subnav-column {
  border-inline: 1px solid rgba(0, 0, 0, 0.08) !important;
  padding-inline: 1.5rem !important;
}

.subnav-label {
  font-family: "Vazirmatn", system-ui, sans-serif !important;
  font-weight: 700 !important;
  font-size: 0.8rem !important;
  letter-spacing: 0.5px !important;
  text-transform: uppercase !important;
  color: #6b7280 !important;
  padding: 4px 12px !important;
  margin-bottom: 0.75rem !important;
  text-align: right !important;
  direction: rtl !important;
}

/* Subnav Item Cards / Links */
.subnav-link {
  direction: rtl !important;
  text-align: right !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  padding: 10px 14px !important;
  border-radius: 12px !important;
  color: #1f2937 !important;
  font-family: "Vazirmatn", system-ui, sans-serif !important;
  font-size: 0.92rem !important;
  font-weight: 550 !important;
  text-decoration: none !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
  border: 1px solid transparent !important;
  margin-bottom: 4px !important;
  position: relative !important;
}

.subnav-link:hover,
.subnav-link:focus-visible {
  background: #f3f4f6 !important;
  color: #111827 !important;
  border-color: rgba(0, 0, 0, 0.05) !important;
  transform: translateX(-4px) !important;
}

/* Subnav Link Left Chevron Arrow */
.subnav-link .link-arrow {
  margin-inline-start: auto !important;
  margin-inline-end: 0 !important;
  color: #9ca3af !important;
  font-size: 1.15rem !important;
  transition: all 0.2s ease !important;
  transform: none !important;
}

.subnav-link:hover .link-arrow {
  color: #111827 !important;
  transform: translateX(-3px) !important;
}

/* Subnav Link Icon styling */
.subnav-link .link-icon {
  margin-inline-end: 12px !important;
  margin-inline-start: 0 !important;
  font-size: 1.25rem !important;
  color: #4b5563 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 28px !important;
  height: 28px !important;
  border-radius: 8px !important;
  background: rgba(0, 0, 0, 0.04) !important;
  transition: all 0.2s ease !important;
}

.subnav-link:hover .link-icon {
  color: #111827 !important;
  background: #e5e7eb !important;
}

/* Mobile Menu Upgrades */
.mobile-menu {
  direction: rtl !important;
  text-align: right !important;
  background: rgba(255, 255, 255, 0.98) !important;
  backdrop-filter: blur(24px) !important;
  -webkit-backdrop-filter: blur(24px) !important;
  border-bottom-left-radius: 20px !important;
  border-bottom-right-radius: 20px !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
  border-top: 1px solid rgba(0, 0, 0, 0.08) !important;
}

.mobile-menu-content {
  padding: 1.5rem 1.25rem 3rem 1.25rem !important;
  direction: rtl !important;
}

.mobile-nav-item {
  font-family: "Vazirmatn", system-ui, sans-serif !important;
  font-weight: 700 !important;
  font-size: 1.35rem !important;
  padding: 14px 16px !important;
  border-radius: 12px !important;
  color: #111827 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  transition: all 0.2s ease !important;
  margin-bottom: 6px !important;
}

.mobile-nav-item:hover,
.mobile-nav-item:active {
  background: #f3f4f6 !important;
}

/* Header Primary CTA Button */
.download-button,
.header .download-button {
  font-family: "Vazirmatn", system-ui, sans-serif !important;
  font-weight: 650 !important;
  font-size: 0.92rem !important;
  letter-spacing: 0 !important;
  border-radius: 9999px !important;
  padding: 8px 20px !important;
  background: #111827 !important;
  color: #ffffff !important;
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12) !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.download-button:hover,
.header .download-button:hover {
  background: #000000 !important;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2) !important;
  transform: translateY(-1px) !important;
}

/* ==========================================================================
   Full RTL Footer Architecture
   ========================================================================== */
.footer,
.footer-main-content {
  direction: rtl !important;
  text-align: right !important;
}

.footer-inner {
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-between !important;
  align-items: flex-start !important;
  direction: rtl !important;
  flex-wrap: wrap !important;
}

.footer-title {
  text-align: right !important;
  direction: rtl !important;
  font-family: "Vazirmatn", system-ui, sans-serif !important;
  font-size: clamp(1.25rem, 2.5vw, 1.75rem) !important;
  line-height: 1.5 !important;
  font-weight: 700 !important;
  max-width: 440px !important;
}

.footer-nav-section {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  text-align: right !important;
  direction: rtl !important;
  gap: 0.85rem !important;
}

.footer-nav-section a,
.footer-nav-section .call-to-action {
  text-align: right !important;
  direction: rtl !important;
  font-family: "Vazirmatn", system-ui, sans-serif !important;
}

.footer-google-links {
  direction: rtl !important;
  padding-top: 2rem !important;
  padding-bottom: 1.5rem !important;
}

.footer-google-links .grid-row {
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-between !important;
  align-items: center !important;
  direction: rtl !important;
  flex-wrap: wrap !important;
  gap: 1.5rem !important;
  width: 100% !important;
  margin: 0 !important;
}

.footer-google-links .grid-col {
  flex: auto !important;
  max-width: none !important;
  margin: 0 !important;
  padding: 0 !important;
}

.footer-google-nav {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  gap: 1.75rem !important;
  direction: rtl !important;
  flex-wrap: wrap !important;
}

.footer-trust-seals {
  display: inline-flex !important;
  align-items: center !important;
  gap: 16px !important;
  direction: rtl !important;
}

/* Remove Physics/Antigravity Footer Wrapper */
#antigravity-footer-wrapper {
  display: none !important;
}

/* ==========================================================================
   Full Width Footer PROP-AI Branding (Icon Removed, Edge-to-Edge Typography)
   ========================================================================== */
.footer-large-brand {
  display: block !important;
  width: 100% !important;
  max-width: 100% !important;
  margin: 3.5rem 0 0 0 !important;
  padding: 3rem 0 1.5rem 0 !important;
  border-top: 1px solid rgba(0, 0, 0, 0.08) !important;
  box-sizing: border-box !important;
  overflow: hidden !important;
  text-align: center !important;
}

[data-theme="dark"] .footer-large-brand,
.dark .footer-large-brand {
  border-top-color: rgba(255, 255, 255, 0.08) !important;
}

/* Explicitly remove the last icon from footer */
.footer-large-logo-img {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  visibility: hidden !important;
  margin: 0 !important;
  padding: 0 !important;
}

.footer-large-brand-name {
  display: block !important;
  width: 100% !important;
  margin: 0 auto !important;
  text-align: center !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
  font-size: clamp(64px, 16.5vw, 240px) !important;
  font-weight: 950 !important;
  letter-spacing: -0.03em !important;
  line-height: 0.85 !important;
  color: var(--theme-surface-on-surface, #111827) !important;
  opacity: 0.95 !important;
  user-select: none !important;
  direction: ltr !important;
  text-transform: uppercase !important;
  white-space: nowrap !important;
}

[data-theme="dark"] .footer-large-brand-name,
.dark .footer-large-brand-name {
  color: #f3f4f6 !important;
}
`;

fs.writeFileSync(cssPath, css.trim() + '\n' + additionalRtl.trim() + '\n', 'utf8');
console.log('✓ Successfully updated styles-NNWH23TG.css with comprehensive RTL and full-width PROP-AI rules');
