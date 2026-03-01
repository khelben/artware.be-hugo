// Slideshow functionality
const slideshowContainer = document.querySelector('.slideshow');
console.dir(slideshowContainer);
for (let index = 1; index <= 55; index++) {
    slideshowContainer.innerHTML += `<div class="slide" style="background-image: url('/images/slide${index}.jpg');"></div>`;
}

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Initialize first slide
showSlide(0);

// Change slide every 3 seconds
setInterval(nextSlide, 3000);
