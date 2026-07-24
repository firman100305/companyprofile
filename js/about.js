/*====================================
        REVEAL SECTION
====================================*/

const reveals = document.querySelectorAll(".reveal");

function revealSections() {
  const trigger = window.innerHeight * 0.82;

  reveals.forEach((section) => {
    const top = section.getBoundingClientRect().top;

    if (top < trigger) {
      section.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);

/*==================================================
                COMPANY STORY
==================================================*/

const storySlides = document.querySelectorAll(".story-slide");
const storyDots = document.querySelectorAll(".story-dot");
const storySection = document.querySelector(".company-story");

const prevBtn = document.querySelector(".story-prev");
const nextBtn = document.querySelector(".story-next");

let currentStory = 0;
let storyInterval = null;

function showStory(index) {
  storySlides.forEach((slide) => {
    slide.classList.remove("active");
  });

  storyDots.forEach((dot) => {
    dot.classList.remove("active");
  });

  storySlides[index].classList.add("active");
  storyDots[index].classList.add("active");

  currentStory = index;
}

function nextStory() {
  currentStory++;

  if (currentStory >= storySlides.length) {
    currentStory = 0;
  }

  showStory(currentStory);
}

function prevStory() {
  currentStory--;

  if (currentStory < 0) {
    currentStory = storySlides.length - 1;
  }

  showStory(currentStory);
}

function stopStory() {
  clearInterval(storyInterval);
}

function startStory() {
  stopStory();

  storyInterval = setInterval(nextStory, 6000);
}

if (storySlides.length) {
  storyDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showStory(index);
      startStory();
    });
  });

  prevBtn.addEventListener("click", () => {
    prevStory();
    startStory();
  });

  nextBtn.addEventListener("click", () => {
    nextStory();
    startStory();
  });

  storySection.addEventListener("mouseenter", stopStory);
  storySection.addEventListener("mouseleave", startStory);

  showStory(0);
  startStory();
}

/*==================================================
            STICKY PARALLAX
==================================================*/

const stickyImage = document.querySelector(".sticky-image img");
const stickyContent = document.querySelector(".sticky-content");
const parallaxSpace = document.querySelector(".parallax-space");

function stickyParallax() {
  if (!stickyImage || !stickyContent || !parallaxSpace) return;

  const rect = parallaxSpace.getBoundingClientRect();

  const progress = Math.min(
    Math.max(
      (window.innerHeight - rect.top) / (window.innerHeight + rect.height),
      0,
    ),
    1,
  );

  const scale = 1.15 - progress * 0.15;

  stickyImage.style.transform = `scale(${scale})`;

  if (progress > 0.18 && progress < 0.82) {
    stickyContent.classList.add("show");
  } else {
    stickyContent.classList.remove("show");
  }
}

window.addEventListener("scroll", stickyParallax);

window.addEventListener("load", stickyParallax);

/*==================================================
            SMOOTH PARALLAX
==================================================*/

let currentScale = 1.15;
let targetScale = 1.15;

function animateParallax() {
  currentScale += (targetScale - currentScale) * 0.08;

  if (stickyImage) {
    stickyImage.style.transform = `scale(${currentScale})`;
  }

  requestAnimationFrame(animateParallax);
}

window.addEventListener("scroll", () => {
  if (!parallaxSpace) return;

  const rect = parallaxSpace.getBoundingClientRect();

  const progress = Math.min(
    Math.max(
      (window.innerHeight - rect.top) / (window.innerHeight + rect.height),
      0,
    ),
    1,
  );

  targetScale = 1.15 - progress * 0.15;
});

animateParallax();

/*==================================
        PARALLAX CARD ANIMATION
==================================*/

const cards = document.querySelectorAll(".parallax-card");

let cardsPlayed = false;

function animateCards() {
  if (!parallaxSpace) return;

  const rect = parallaxSpace.getBoundingClientRect();

  const progress =
    (window.innerHeight - rect.top) / (window.innerHeight + rect.height);

  const inView = progress > 0.18 && progress < 0.82;

  if (inView && !cardsPlayed) {
    cardsPlayed = true;

    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("active");

        const counter = card.querySelector(".counter");

        if (counter) {
          counter.textContent = "0";

          animateCounter(counter);
        }
      }, index * 250);
    });
  }

  if (!inView && cardsPlayed) {
    cardsPlayed = false;

    cards.forEach((card) => {
      card.classList.remove("active");

      const counter = card.querySelector(".counter");

      if (counter) {
        counter.textContent = "0";
      }
    });
  }
}

window.addEventListener("scroll", animateCards);

window.addEventListener("load", animateCards);

/*==================================
        COUNT UP ANIMATION
==================================*/

const counters = document.querySelectorAll(".counter");

function animateCounter(counter) {
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
