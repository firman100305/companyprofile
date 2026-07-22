// ======================================
// COMPANY STORY SLIDER
// ======================================

const slides = document.querySelectorAll(".story-slide");
const dots = document.querySelectorAll(".story-dot");

let currentSlide = 0;
let autoSlide;

// ==========================
// Show Slide
// ==========================

function showSlide(index) {

    slides.forEach((slide) => {

        slide.classList.remove("active");

    });

    dots.forEach((dot) => {

        dot.classList.remove("active");

    });

    slides[index].classList.add("active");

    dots[index].classList.add("active");

    currentSlide = index;

}

// ==========================
// Next Slide
// ==========================

function nextSlide() {

    currentSlide++;

    if (currentSlide >= slides.length) {

        currentSlide = 0;

    }

    showSlide(currentSlide);

}

// ==========================
// Auto Slide
// ==========================

function startSlider() {

    autoSlide = setInterval(nextSlide, 5000);

}

// ==========================
// Stop Slider
// ==========================

function stopSlider() {

    clearInterval(autoSlide);

}

// ==========================
// Dot Click
// ==========================

dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

        stopSlider();

        showSlide(index);

        startSlider();

    });

});

// ==========================
// Pause On Hover
// ==========================

const slider = document.querySelector(".story-slider");

slider.addEventListener("mouseenter", stopSlider);

slider.addEventListener("mouseleave", startSlider);

// ==========================
// Init
// ==========================

showSlide(0);

startSlider();

/*====================================
        PREMIUM PARALLAX
====================================*/

const backgrounds = document.querySelectorAll(".parallax-bg");
const contents = document.querySelectorAll(".parallax-content");

function updateParallax(){

    const scroll = window.pageYOffset;

    backgrounds.forEach(bg=>{

        const speed=parseFloat(bg.dataset.speed);

        bg.style.transform=

        `translateY(${scroll*speed}px) scale(1.12)`;

    });

    contents.forEach(item=>{

        const speed=parseFloat(item.dataset.speed);

        item.style.transform=

        `translateY(${scroll*speed}px)`;

    });

}

let ticking=false;

window.addEventListener("scroll",()=>{

    if(!ticking){

        requestAnimationFrame(()=>{

            updateParallax();

            revealSections();

            ticking=false;

        });

        ticking=true;

    }

});

/*====================================
        REVEAL SECTION
====================================*/

const reveals=document.querySelectorAll(".reveal");

function revealSections(){

    const trigger=window.innerHeight*0.82;

    reveals.forEach(section=>{

        const top=section.getBoundingClientRect().top;

        if(top<trigger){

            section.classList.add("show");

        }

    });

}

window.addEventListener("load",()=>{

    updateParallax();

    revealSections();

});
