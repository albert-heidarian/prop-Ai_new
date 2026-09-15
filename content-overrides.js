(function () {
  'use strict';

  function enforceRTL() {
    if (document.documentElement.getAttribute('dir') !== 'rtl') {
      document.documentElement.setAttribute('dir', 'rtl');
    }
    if (document.documentElement.getAttribute('lang') !== 'fa') {
      document.documentElement.setAttribute('lang', 'fa');
    }
    if (document.body && document.body.getAttribute('dir') !== 'rtl') {
      document.body.setAttribute('dir', 'rtl');
    }
  }

  function updatePageTitle() {
    const title = document.title;
    if (title.includes('Google Antigravity') || title.includes('Antigravity')) {
      document.title = title
        .replace(/Google Antigravity/g, 'پراپ')
        .replace(/Antigravity/g, 'پراپ');
    }
  }

  function cleanIconText() {
    // Clean raw ligature text from dropdown-icon elements
    document.querySelectorAll('.dropdown-icon').forEach(el => {
      if (el.textContent && (el.textContent.includes('keyboard_arrow_down') || el.textContent.includes('keyboard_arrow_left') || el.textContent.includes('keyboard_arrow_right'))) {
        el.textContent = '';
      }
    });

    // Remove any leftover download icon in CTA button
    document.querySelectorAll('.download-button').forEach(btn => {
      const icon = btn.querySelector('.dropdown-icon');
      if (icon) icon.remove();
      const spans = btn.querySelectorAll('span');
      spans.forEach(s => {
        if (s.textContent.trim() === 'download') {
          s.remove();
        }
      });
    });
  }

  function localizeDynamicUI() {
    // Search inputs
    document.querySelectorAll('input[type="text"], input[type="search"]').forEach(input => {
      const ph = input.getAttribute('placeholder');
      if (ph && (ph.toLowerCase().includes('search') || ph.includes('Search docs'))) {
        input.setAttribute('placeholder', 'جستجو در مستندات...');
      }
    });

    // Code copy buttons
    document.querySelectorAll('.copy-button, button.copy, [aria-label*="Copy"]').forEach(btn => {
      if (btn.textContent.trim() === 'Copy') {
        btn.textContent = 'کپی';
      }
    });

    // Breadcrumbs
    document.querySelectorAll('.breadcrumb-separator, .docs-breadcrumb span').forEach(el => {
      if (el.textContent.trim() === '>') {
        el.textContent = '‹';
      }
    });
  }

  function injectHeroStats() {
    if (document.querySelector('.hero-stats-bar')) return;
    const cta = document.querySelector('.welcome-cta');
    if (!cta || !cta.parentElement) return;

    const statsBar = document.createElement('div');
    statsBar.className = 'hero-stats-bar';
    statsBar.id = 'heroStatsBar';
    statsBar.innerHTML = `
      <div class="hero-stat-item">
        <span class="hero-stat-num">+۳۲۰۰</span>
        <span class="hero-stat-label">کسب‌وکار فعال</span>
      </div>
      <div class="hero-stat-item">
        <span class="hero-stat-num">۹۹.۸٪</span>
        <span class="hero-stat-label">آپ‌تایم تضمینی</span>
      </div>
      <div class="hero-stat-item">
        <span class="hero-stat-num">۱۸۰+</span>
        <span class="hero-stat-label">ادغام آماده</span>
      </div>
      <div class="hero-stat-item">
        <span class="hero-stat-num">×۴.۵</span>
        <span class="hero-stat-label">رشد بهره‌وری</span>
      </div>
    `;
    cta.parentElement.appendChild(statsBar);
  }

  function injectTrustSeals() {
    if (document.querySelector('.footer-trust-seals')) return;
    const footerNav = document.querySelector('.footer-google-nav') || document.querySelector('.footer-google-links');
    if (!footerNav) return;

    const seals = document.createElement('div');
    seals.className = 'footer-trust-seals';
    seals.innerHTML = `
      <a referrerpolicy="origin" target="_blank" href="https://trustseal.enamad.ir/?id=697290&Code=7Ngbiv3i1OR6QxSHcu8LyvhcfhYPMGCi" title="نماد اعتماد الکترونیکی اینماد">
        <img referrerpolicy="origin" src="https://trustseal.enamad.ir/logo.aspx?id=697290&Code=7Ngbiv3i1OR6QxSHcu8LyvhcfhYPMGCi" alt="اینماد" code="7Ngbiv3i1OR6QxSHcu8LyvhcfhYPMGCi">
      </a>
      <a onclick="window.open('https://panel.aqayepardakht.ir/trustGateway/82391',null,'width=400, height=600, scrollbars=no, resizable=no')" href="javascript:void(0)" referrerpolicy="strict-origin-when-cross-origin" title="پرداخت امن آقای پرداخت">
        <img src="https://cdn.aqayepardakht.ir/trustlogo/2.svg" alt="پرداخت امن آقای پرداخت">
      </a>
    `;
    footerNav.parentElement.appendChild(seals);
  }

  function injectOfficialLogo() {
    // 1. Header and navigation logos
    document.querySelectorAll('antigravity-logo').forEach(el => {
      if (el.dataset.logoInjected === 'true') return;
      
      const isHero = el.closest('.welcome-section') || el.closest('.hero-section');
      if (isHero) {
        // Hero prominent vertical logo
        el.innerHTML = '<img src="/logo.svg" class="official-logo-img official-logo-hero" alt="پراپ — Prop AI" />';
      } else {
        // Header / nav horizontal logo
        el.innerHTML = '<img src="/logo-horizontal.svg" class="official-logo-img official-logo-header" alt="پراپ — Prop AI" />';
      }
      el.dataset.logoInjected = 'true';
    });

    // 2. Footer google-logo
    document.querySelectorAll('google-logo').forEach(el => {
      if (el.dataset.logoInjected === 'true') return;
      el.innerHTML = '<img src="/logo-horizontal.svg" class="official-logo-img official-logo-footer" alt="پراپ — Prop AI" />';
      el.dataset.logoInjected = 'true';
    });

    // 3. Any image element still targeting old antigravity-logo.png
    document.querySelectorAll('img[src*="antigravity-logo.png"]').forEach(img => {
      img.src = '/logo.svg';
    });

    // 4. Update favicons dynamically in document head if needed
    const favicons = document.querySelectorAll('link[rel*="icon"]');
    favicons.forEach(link => {
      if (!link.href.includes('logo.svg') && !link.href.includes('favicon.png')) {
        link.href = '/logo-icon.svg';
        link.type = 'image/svg+xml';
      }
    });
  }

  function injectFooterLargeBrand() {
    if (document.getElementById('footerLargeBrand')) return;
    const footer = document.querySelector('footer.footer') || document.querySelector('footer');
    if (!footer) return;

    const brandEl = document.createElement('div');
    brandEl.className = 'footer-large-brand';
    brandEl.id = 'footerLargeBrand';
    brandEl.innerHTML = `
      <img src="/logo.svg" alt="پراپ — Prop AI" class="footer-large-logo-img" />
      <span class="footer-large-brand-name">PROP-AI</span>
    `;
    footer.appendChild(brandEl);
  }

  function runAll() {
    enforceRTL();
    updatePageTitle();
    cleanIconText();
    localizeDynamicUI();
    injectHeroStats();
    injectTrustSeals();
    injectOfficialLogo();
    injectFooterLargeBrand();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runAll);
  } else {
    runAll();
  }

  // Periodic check for Angular client navigation
  let count = 0;
  const timer = setInterval(() => {
    runAll();
    count++;
    if (count > 40) clearInterval(timer);
  }, 250);

  // MutationObserver to catch any dynamically rendered elements
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(() => {
      runAll();
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  // Listen to navigation popstate
  window.addEventListener('popstate', runAll);
})();
