import PhotoSwipeLightbox from 'https://unpkg.com/photoswipe@5/dist/photoswipe-lightbox.esm.js';

// Close navbar and then scroll to target (avoids timing issues on mobile)
document.querySelectorAll('#main-nav .nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const collapseEl = document.getElementById('main-nav');
        const instance = bootstrap.Collapse.getInstance(collapseEl);
        if (!instance) return; // desktop: no collapse active, do nothing

        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        instance.hide();
        collapseEl.addEventListener('hidden.bs.collapse', () => {
            target?.scrollIntoView({ behavior: 'smooth' });
        }, { once: true });
    });
});

// ── Google Analytics + cookie consent ──
function loadGA() {
    if (!window.GA_ID) return;
    
    const s = document.createElement('script');
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    s.async = true;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', GA_ID);
}

const CONSENT_KEY = 'cookie_consent';
const CONSENT_DATE_KEY = 'cookie_consent_date';
const CONSENT_TTL = 30 * 24 * 60 * 60 * 1000; // 30 days in ms
const banner = document.getElementById('cookie-banner');

const consent = localStorage.getItem(CONSENT_KEY);
const consentDate = parseInt(localStorage.getItem(CONSENT_DATE_KEY) || '0');
const expired = Date.now() - consentDate > CONSENT_TTL;

if (consent && !expired) {
    if (consent === 'accepted') loadGA();
} else {
    localStorage.removeItem(CONSENT_KEY);
    localStorage.removeItem(CONSENT_DATE_KEY);
    banner.hidden = false;
}

document.getElementById('cookie-accept')?.addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    localStorage.setItem(CONSENT_DATE_KEY, Date.now());
    banner.hidden = true;
    loadGA();
});

document.getElementById('cookie-decline')?.addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    localStorage.setItem(CONSENT_DATE_KEY, Date.now());
    banner.hidden = true;
});

const pswpModule = () => import('https://unpkg.com/photoswipe@5/dist/photoswipe.esm.js');

['#gallery-grid', '#gallery-grid-gray', '#gallery-grid-black', '#process-grid']
    .filter(id => document.querySelector(id))
    .forEach(id => new PhotoSwipeLightbox({ gallery: id, children: 'a', pswpModule }).init());
