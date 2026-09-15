(function () {
  'use strict';

  document.documentElement.lang = 'fa';
  document.documentElement.dir = 'rtl';
  document.title = 'پراپ — راهکارهای هوش مصنوعی';

  function cleanIconText() {
    // Clean raw ligature text from dropdown-icon elements
    document.querySelectorAll('.dropdown-icon').forEach(el => {
      if (el.textContent && el.textContent.includes('keyboard_arrow_down')) {
        el.textContent = '';
      }
    });
    // Remove any leftover download icon in CTA button
    document.querySelectorAll('.download-button').forEach(btn => {
      const icon = btn.querySelector('.dropdown-icon');
      if (icon) icon.remove();
      // Ensure button text is only "شروع رایگان"
      const spans = btn.querySelectorAll('span');
      spans.forEach(s => {
        if (s.textContent.trim() === 'download') {
          s.remove();
        }
      });
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

  function init() {
    cleanIconText();
    injectHeroStats();
    injectTrustSeals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Monitor DOM for Angular client navigation and hydrations
  let count = 0;
  const timer = setInterval(() => {
    init();
    count++;
    if (count > 30) clearInterval(timer);
  }, 250);

  // MutationObserver to catch any dynamically rendered elements
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(() => {
      cleanIconText();
    });
    observer.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true
    });
  }
})();
