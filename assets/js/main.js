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

const pswpModule = () => import('https://unpkg.com/photoswipe@5/dist/photoswipe.esm.js');

['#gallery-grid', '#gallery-grid-gray', '#process-grid']
    .filter(id => document.querySelector(id))
    .forEach(id => new PhotoSwipeLightbox({ gallery: id, children: 'a', pswpModule }).init());
