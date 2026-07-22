/* ======================
   FOOTER (site-wide) — logic
   - initFooterScrollTop(): logika tombol "scroll to top" (diambil dari <script> di dalam <footer>)
   - loadFooter(): opsional, memuat partials/footer.html ke dalam sebuah container,
     mengikuti pola yang sama dengan #navbar-container / js/navbar.js
====================== */

function initFooterScrollTop() {
  var btn = document.getElementById("scrollTopBtn");
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

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/**
 * Memuat markup footer dari partials/footer.html ke dalam elemen container,
 * lalu menjalankan initFooterScrollTop() setelah markup terpasang di DOM.
 *
 * @param {string} containerId - id elemen tempat footer akan disisipkan
 * @param {string} footerPath  - path menuju partials/footer.html (relatif terhadap halaman)
 */
function loadFooter(containerId, footerPath) {
  containerId = containerId || "footer-container";
  footerPath = footerPath || "partials/footer.html";

  var container = document.getElementById(containerId);
  if (!container) return;

  fetch(footerPath)
    .then(function (res) {
      return res.text();
    })
    .then(function (html) {
      container.innerHTML = html;
      initFooterScrollTop();
    })
    .catch(function (err) {
      console.error("Gagal memuat footer:", err);
    });
}

// Jika footer sudah ditulis langsung di HTML halaman (bukan lewat loadFooter),
// cukup panggil initFooterScrollTop() setelah DOM siap.
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("scrollTopBtn") && !document.getElementById("footer-container")) {
    initFooterScrollTop();
  }
});