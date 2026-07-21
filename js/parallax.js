
const hero = document.querySelector(".hero");
const heroText = document.querySelector(".parallax-text");
const heroImage = document.querySelector(".parallax-image");
const overlay = document.querySelector(".hero-overlay");

if (hero && heroText && heroImage && overlay) {
  hero.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;

    heroText.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    heroImage.style.transform = `translate(${x * 45}px, ${y * 45}px)`;
    overlay.style.transform = `translate(${x * 15}px, ${y * 15}px)`;
  });

  hero.addEventListener("mouseleave", () => {
    heroText.style.transform = "";
    heroImage.style.transform = "";
    overlay.style.transform = "";
  });
}