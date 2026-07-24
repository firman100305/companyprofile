/*====================================
        ABOUT OPSI - REVEAL SECTION
====================================*/

const aboutOpsiReveals = document.querySelectorAll(".about-opsi-reveal");

function aboutOpsiRevealSections() {

    const trigger = window.innerHeight * 0.82;

    aboutOpsiReveals.forEach(section => {

        const top = section.getBoundingClientRect().top;

        if (top < trigger) {

            section.classList.add("show");

        }

    });

}

window.addEventListener("scroll", aboutOpsiRevealSections);
window.addEventListener("load", aboutOpsiRevealSections);


/*==================================================
            ABOUT OPSI - COMPANY STORY
==================================================*/

const aboutOpsiStorySlides = document.querySelectorAll(".about-opsi-story-slide");
const aboutOpsiStoryDots = document.querySelectorAll(".about-opsi-story-dot");
const aboutOpsiStorySection = document.querySelector(".about-opsi-company-story");

let currentAboutOpsiStory = 0;
let aboutOpsiStoryInterval = null;

function showAboutOpsiStory(index) {

    aboutOpsiStorySlides.forEach(slide => {

        slide.classList.remove("active");

    });

    aboutOpsiStoryDots.forEach(dot => {

        dot.classList.remove("active");

    });

    aboutOpsiStorySlides[index].classList.add("active");
    aboutOpsiStoryDots[index].classList.add("active");

    currentAboutOpsiStory = index;

}

function nextAboutOpsiStory() {

    currentAboutOpsiStory++;

    if (currentAboutOpsiStory >= aboutOpsiStorySlides.length) {

        currentAboutOpsiStory = 0;

    }

    showAboutOpsiStory(currentAboutOpsiStory);

}

function stopAboutOpsiStory() {

    clearInterval(aboutOpsiStoryInterval);

}

function startAboutOpsiStory() {

    stopAboutOpsiStory();

    aboutOpsiStoryInterval = setInterval(nextAboutOpsiStory, 6000);

}

if (aboutOpsiStorySlides.length) {

    aboutOpsiStoryDots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            showAboutOpsiStory(index);

            startAboutOpsiStory();

        });

    });

    aboutOpsiStorySection.addEventListener("mouseenter", stopAboutOpsiStory);

    aboutOpsiStorySection.addEventListener("mouseleave", startAboutOpsiStory);

    showAboutOpsiStory(0);

    startAboutOpsiStory();

}


/*==================================================
            ABOUT OPSI - STICKY PARALLAX
==================================================*/

const aboutOpsiStickyImage = document.querySelector(".about-opsi-sticky-image img");
const aboutOpsiStickyContent = document.querySelector(".about-opsi-sticky-content");
const aboutOpsiParallaxSpace = document.querySelector(".about-opsi-parallax-space");

function aboutOpsiStickyParallax() {

    if (
        !aboutOpsiStickyImage ||
        !aboutOpsiStickyContent ||
        !aboutOpsiParallaxSpace
    ) return;

    const rect = aboutOpsiParallaxSpace.getBoundingClientRect();

    const progress = Math.min(
        Math.max(
            (window.innerHeight - rect.top) /
            (window.innerHeight + rect.height),
            0
        ),
        1
    );

    const scale = 1.15 - progress * 0.15;

    aboutOpsiStickyImage.style.transform = `scale(${scale})`;

    if (progress > 0.18 && progress < 0.82) {

        aboutOpsiStickyContent.classList.add("show");

    } else {

        aboutOpsiStickyContent.classList.remove("show");

    }

}

window.addEventListener("scroll", aboutOpsiStickyParallax);
window.addEventListener("load", aboutOpsiStickyParallax);


/*==================================================
            ABOUT OPSI - SMOOTH PARALLAX
==================================================*/

let aboutOpsiCurrentScale = 1.15;
let aboutOpsiTargetScale = 1.15;

function aboutOpsiAnimateParallax() {

    aboutOpsiCurrentScale +=
        (aboutOpsiTargetScale - aboutOpsiCurrentScale) * 0.08;

    if (aboutOpsiStickyImage) {

        aboutOpsiStickyImage.style.transform =
            `scale(${aboutOpsiCurrentScale})`;

    }

    requestAnimationFrame(aboutOpsiAnimateParallax);

}

window.addEventListener("scroll", () => {

    if (!aboutOpsiParallaxSpace) return;

    const rect = aboutOpsiParallaxSpace.getBoundingClientRect();

    const progress = Math.min(
        Math.max(
            (window.innerHeight - rect.top) /
            (window.innerHeight + rect.height),
            0
        ),
        1
    );

    aboutOpsiTargetScale = 1.15 - progress * 0.15;

});

aboutOpsiAnimateParallax();

/*==================================
    ABOUT OPSI PARALLAX CARD ANIMATION
==================================*/

const aboutOpsiCards = document.querySelectorAll(".about-opsi-parallax-card");

let aboutOpsiCardsPlayed = false;

function animateAboutOpsiCards() {

    if (!parallaxSpace) return;

    const rect = parallaxSpace.getBoundingClientRect();

    const progress =
        (window.innerHeight - rect.top) /
        (window.innerHeight + rect.height);

    const inView = progress > 0.18 && progress < 0.82;

    if (inView && !aboutOpsiCardsPlayed) {

        aboutOpsiCardsPlayed = true;

        aboutOpsiCards.forEach((card, index) => {

            setTimeout(() => {

                card.classList.add("active");

                const counter = card.querySelector(".about-opsi-counter");

                if (counter) {

                    counter.textContent = "0";

                    animateAboutOpsiCounter(counter);

                }

            }, index * 250);

        });

    }

    if (!inView && aboutOpsiCardsPlayed) {

        aboutOpsiCardsPlayed = false;

        aboutOpsiCards.forEach(card => {

            card.classList.remove("active");

            const counter = card.querySelector(".about-opsi-counter");

            if (counter) {

                counter.textContent = "0";

            }

        });

    }

}

window.addEventListener("scroll", animateAboutOpsiCards);

window.addEventListener("load", animateAboutOpsiCards);


/*==================================
    ABOUT OPSI COUNT UP ANIMATION
==================================*/

const aboutOpsiCounters = document.querySelectorAll(".about-opsi-counter");

function animateAboutOpsiCounter(counter) {

    cancelAnimationFrame(counter.animationFrame);

    const target = Number(counter.dataset.target);

    const duration = 1800;

    const start = performance.now();

    function update(now) {

        const progress = Math.min((now - start) / duration, 1);

        const ease = 1 - Math.pow(1 - progress, 3);

        const value = Math.floor(target * ease);

        counter.textContent = value.toLocaleString();

        if (progress < 1) {

            counter.animationFrame = requestAnimationFrame(update);

        } else {

            counter.textContent = target.toLocaleString();

        }

    }

    counter.animationFrame = requestAnimationFrame(update);

}