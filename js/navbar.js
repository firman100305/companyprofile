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

const menuToggle = document.getElementById("menuToggle");

const navMenu = document.querySelector(".nav-menu");

const overlay = document.querySelector(".nav-overlay");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");

  navMenu.classList.toggle("active");

  overlay.classList.toggle("show");

  document.body.classList.toggle("menu-open");
});

overlay.addEventListener("click", closeMenu);

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

function closeMenu() {
  menuToggle.classList.remove("active");

  navMenu.classList.remove("active");

  overlay.classList.remove("show");

  document.body.classList.remove("menu-open");
}

document.querySelectorAll(".dropdown > a").forEach((item) => {
  item.addEventListener("click", (e) => {
    if (window.innerWidth <= 992) {
      e.preventDefault();

      item.parentElement.classList.toggle("active");
    }
  });
});
