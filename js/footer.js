// Load Footer
fetch("footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer-container").innerHTML = data;
    initFooterScrollBtn();
  });

function initFooterScrollBtn() {
  const btn = document.getElementById("scrollTopBtn");
  if (!btn) return;

  function toggleBtn() {
    if (window.scrollY > 300) {
      btn.classList.add("is-visible");
    } else {
      btn.classList.remove("is-visible");
    }
  }

  window.addEventListener("scroll", toggleBtn, { passive: true });
  toggleBtn();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}