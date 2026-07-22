const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".story-dot");

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

let index = 0;
let timer;

function showSlide(i) {
  slides.forEach((slide) => slide.classList.remove("active"));

  dots.forEach((dot) => dot.classList.remove("active"));

  slides[i].classList.add("active");

  dots[i].classList.add("active");

  restartTimer();
}

function nextSlide() {
  index++;

  if (index >= slides.length) {
    index = 0;
  }

  showSlide(index);
}

function prevSlide() {
  index--;

  if (index < 0) {
    index = slides.length - 1;
  }

  showSlide(index);
}

function restartTimer() {
  clearInterval(timer);

  timer = setInterval(nextSlide, 6000);
}

next.onclick = nextSlide;

prev.onclick = prevSlide;

dots.forEach((dot, i) => {
  dot.onclick = () => {
    index = i;

    showSlide(index);
  };
});

restartTimer();

const hero = document.querySelector(".hero");

hero.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 35;

  const y = (window.innerHeight / 2 - e.clientY) / 35;

  document.querySelectorAll(".hero-parallax").forEach((layer) => {
    layer.style.transform = `translate(${x}px,${y}px)`;
  });
});
