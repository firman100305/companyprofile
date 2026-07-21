const cursor = document.querySelector(".cursor");

if (cursor) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";

    cursor.style.top = e.clientY + "px";
  });
}

const hoverItems = document.querySelectorAll(
  "a, button, .btn-gold, .btn-outline",
);

hoverItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    cursor.classList.add("active");
  });
  });