import PhotoSwipeLightbox from 'https://unpkg.com/photoswipe@5/dist/photoswipe-lightbox.esm.js';

const images = [
    { n: 1,  w: 1200, h: 1600 },
    { n: 2,  w: 738,  h: 833  },
    { n: 3,  w: 738,  h: 776  },
    { n: 4,  w: 1536, h: 2730 },
    { n: 5,  w: 1536, h: 2048 },
    { n: 6,  w: 1536, h: 2048 },
    { n: 7,  w: 1536, h: 2048 },
    { n: 8,  w: 1536, h: 2048 },
    { n: 9,  w: 1536, h: 2048 },
    { n: 10, w: 1536, h: 2048 },
    { n: 11, w: 1536, h: 2048 },
    { n: 12, w: 1536, h: 2048 },
    { n: 13, w: 1536, h: 2048 },
    { n: 14, w: 1536, h: 2048 },
    { n: 15, w: 1832, h: 2048 },
    { n: 16, w: 1536, h: 2048 },
    { n: 17, w: 1536, h: 2048 },
    { n: 18, w: 2048, h: 1758 },
    { n: 19, w: 2048, h: 1812 },
    { n: 20, w: 2048, h: 1546 },
    { n: 21, w: 1768, h: 2048 },
    { n: 22, w: 2048, h: 1642 },
    { n: 23, w: 1536, h: 2048 },
    { n: 24, w: 1536, h: 2048 },
    { n: 25, w: 1536, h: 2048 },
    { n: 26, w: 1536, h: 2048 },
    { n: 27, w: 2804, h: 1536 },
    { n: 28, w: 2168, h: 1536 },
    { n: 29, w: 2048, h: 1840 },
    { n: 30, w: 2048, h: 1796 },
    { n: 31, w: 2048, h: 1652 },
    { n: 32, w: 1536, h: 2048 },
    { n: 33, w: 1536, h: 2048 },
    { n: 34, w: 3980, h: 1536 },
    { n: 35, w: 1536, h: 2048 },
    { n: 36, w: 2048, h: 1974 },
    { n: 37, w: 1536, h: 2048 },
    { n: 38, w: 1536, h: 2048 },
    { n: 39, w: 1536, h: 2048 },
    { n: 40, w: 1536, h: 2048 },
    { n: 41, w: 1536, h: 2048 },
    { n: 42, w: 1536, h: 2048 },
    { n: 43, w: 1536, h: 2048 },
    { n: 44, w: 1536, h: 2048 },
    { n: 45, w: 1536, h: 2048 },
    { n: 46, w: 1536, h: 2048 },
    { n: 47, w: 1536, h: 2048 },
    { n: 48, w: 1536, h: 2048 },
    { n: 49, w: 1536, h: 2048 },
    { n: 50, w: 1536, h: 2048 },
    { n: 51, w: 1536, h: 2048 },
    { n: 52, w: 1536, h: 2048 },
    { n: 53, w: 1536, h: 2048 },
    { n: 54, w: 1536, h: 2048 },
    { n: 55, w: 1536, h: 2048 },
    { n: 56, w: 1536, h: 2048 },
    { n: 57, w: 1536, h: 2048 },
    { n: 58, w: 1536, h: 2048 },
    { n: 59, w: 1536, h: 2048 },
    { n: 60, w: 1536, h: 2048 },
    { n: 61, w: 1536, h: 2048 },
    { n: 62, w: 1536, h: 2048 },
    { n: 63, w: 1536, h: 2048 },
    { n: 64, w: 1536, h: 2048 },
    { n: 65, w: 1536, h: 2048 },
    { n: 66, w: 1536, h: 2048 },
    { n: 67, w: 1536, h: 2048 },
    { n: 68, w: 1536, h: 2048 },
    { n: 69, w: 1536, h: 2048 },
    { n: 70, w: 1536, h: 2048 },
    { n: 71, w: 1536, h: 2048 },
    { n: 72, w: 1536, h: 2048 },
    { n: 73, w: 1536, h: 2048 },
    { n: 74, w: 1536, h: 2048 },
    { n: 75, w: 1536, h: 2048 },
];

const gallery = document.getElementById('gallery');

images.forEach(({ n, w, h }) => {
    const a = document.createElement('a');
    a.href = `/images/slide${n}.jpg`;
    a.setAttribute('data-pswp-width', w);
    a.setAttribute('data-pswp-height', h);
    a.target = '_blank';

    const img = document.createElement('img');
    img.src = `/images/slide${n}.jpg`;
    img.alt = '';
    img.loading = 'lazy';

    a.appendChild(img);
    gallery.appendChild(a);
});

const lightbox = new PhotoSwipeLightbox({
    gallery: '#gallery',
    children: 'a',
    pswpModule: () => import('https://unpkg.com/photoswipe@5/dist/photoswipe.esm.js'),
});

lightbox.init();
