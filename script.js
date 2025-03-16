// Add hover effects for navigation items
document.querySelectorAll('.border').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.border = '1.5px solid white';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.border = '1.5px solid transparent';
    });
});

// Search functionality
const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');

searchIcon.addEventListener('click', () => {
    if (searchInput.value.trim() !== '') {
        alert('Search functionality would go here in a real implementation');
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && searchInput.value.trim() !== '') {
        alert('Search functionality would go here in a real implementation');
    }
});

// Back to top functionality
document.querySelector('.foot-panel1').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Slider functionality
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.slider-dots');

let currentSlide = 0;
const totalSlides = slides.length;

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    const offset = -currentSlide * (100 / totalSlides);
    slider.style.transform = `translateX(${offset}%)`;
    updateDots();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
}

// Event listeners for buttons
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto slide every 2.5 seconds
let slideInterval = setInterval(nextSlide, 2500);

// Pause auto-slide on hover
const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

sliderContainer.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 2500);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 2500);
    } else if (e.key === 'ArrowRight') {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 2500);
    }
});

// Touch events for mobile
let touchStartX = 0;
let touchEndX = 0;

sliderContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(slideInterval);
});

sliderContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    slideInterval = setInterval(nextSlide, 2500);
});

function handleSwipe() {
    const swipeThreshold = 50;
    const difference = touchStartX - touchEndX;
    
    if (Math.abs(difference) > swipeThreshold) {
        if (difference > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
} 