import PhotoSwipeLightbox from 'https://unpkg.com/photoswipe@5/dist/photoswipe-lightbox.esm.js';

const pswpModule = () => import('https://unpkg.com/photoswipe@5/dist/photoswipe.esm.js');

['#gallery-grid', '#gallery-grid-gray', '#process-grid']
    .filter(id => document.querySelector(id))
    .forEach(id => new PhotoSwipeLightbox({ gallery: id, children: 'a', pswpModule }).init());
