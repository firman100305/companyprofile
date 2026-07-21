// Load Navbar
fetch("navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar-container").innerHTML = data;
    initNavbar();

    const navbar = document.getElementById("navbar");

    // Active Menu
    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav-link").forEach((link) => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      }
    });

    // Scroll Effect
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  });

  function initNavbar() {
    const toggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".nav-menu");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        toggle.classList.toggle("active");
        menu.classList.toggle("active");
    });
}