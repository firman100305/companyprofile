// File: assets/js/career.js

// Buka Modal
function openModal(jobTitle, jobDesc) {
    const modal = document.getElementById('applicationModal');
    document.getElementById('modalJobTitle').textContent = jobTitle;
    document.getElementById('modalJobDesc').textContent = jobDesc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Tutup Modal
function closeModal() {
    const modal = document.getElementById('applicationModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Tutup modal saat klik di luar
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('applicationModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }

    // Handle form submission
    const form = document.querySelector('.application-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Application submitted successfully!');
            closeModal();
            this.reset();
        });
    }
});

// Carousel scroll
function scrollCarousel(direction) {
    const carousel = document.querySelector('.job-carousel');
    if (carousel) {
        const scrollAmount = 364;
        carousel.scrollBy({
            left: direction * scrollAmount,
            behavior: 'smooth'
        });
    }
}