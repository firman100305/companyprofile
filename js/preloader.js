document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");

  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hide");
    }, 250);
  }
});