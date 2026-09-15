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
html[dir="rtl"] .col-md-offset-3, html .col-md-offset-3 { margin-left: 0 !important; margin-right: 25% !important; }
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
.blog-card,
.changelog-container,
.support-container,
.terms-container,
.doc-content,
.docs-content,
.table-container table th,
.table-container table td,
.markdown-table th,
.markdown-table td {
  text-align: right !important;
  direction: rtl !important;
}

/* Docs Layout RTL */
.docs-main-container {
  direction: rtl !important;
}
.docs-nav {
  direction: rtl !important;
  text-align: right !important;
  padding-right: var(--space-lg, 24px) !important;
  padding-left: 0 !important;
  border-left: 1px solid var(--theme-outline-variant, #e0e0e0) !important;
  border-right: none !important;
}
.docs-section-nav {
  direction: rtl !important;
  text-align: right !important;
  padding-right: var(--space-lg, 24px) !important;
  padding-left: 0 !important;
  border-right: 1px solid var(--theme-outline-variant, #e0e0e0) !important;
  border-left: none !important;
}
.docs-main-content {
  direction: rtl !important;
  text-align: right !important;
}

/* Breadcrumbs in Docs */
.breadcrumb-item, .docs-breadcrumb {
  direction: rtl !important;
  text-align: right !important;
}

/* Arrow link RTL flip */
.arrow-link:not(.arrow-link-left):after {
  transform: scaleX(-1) !important;
}
.arrow-link-left:before {
  transform: scaleX(-1) !important;
}

/* Form inputs right alignment */
input, textarea, select {
  direction: rtl !important;
  text-align: right !important;
}
input[type="email"], input[type="url"], input[type="tel"], input.code-input {
  direction: ltr !important;
  text-align: left !important;
}

/* Feature checklists checkmark on the right */
.pricing-card ul li, .feature-bullet {
  display: flex !important;
  align-items: flex-start !important;
  gap: 10px !important;
  text-align: right !important;
}
.pricing-card ul li span.symbol, .feature-bullet span.symbol {
  margin-left: 4px !important;
  margin-right: 0 !important;
}

/* Search input with search icon on right */
.search-container input, .docs-search input {
  padding-right: 40px !important;
  padding-left: 14px !important;
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

/* Large Font Prop-AI & Official Logo at End of Footer */
#antigravity-footer-wrapper {
  display: none !important;
}
.footer-large-brand {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;
  text-align: center !important;
  padding: 3.5rem 1rem 2rem 1rem !important;
  margin-top: 2rem !important;
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
  gap: 16px !important;
}
.footer-large-logo-img {
  height: clamp(100px, 14vw, 170px) !important;
  width: auto !important;
  display: block !important;
  filter: drop-shadow(0 15px 40px rgba(0, 0, 0, 0.7)) !important;
  user-select: none !important;
}
.footer-large-brand-name {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
  font-size: clamp(36px, 9vw, 90px) !important;
  font-weight: 900 !important;
  letter-spacing: -0.03em !important;
  line-height: 1 !important;
  color: var(--theme-surface-on-surface, #ffffff) !important;
  opacity: 0.92 !important;
  user-select: none !important;
  direction: ltr !important;
  text-transform: uppercase !important;
}
`;

fs.writeFileSync(cssPath, css.trim() + '\n' + additionalRtl.trim() + '\n', 'utf8');
console.log('✓ Successfully updated styles-NNWH23TG.css with comprehensive RTL rules');
