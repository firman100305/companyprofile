/* ==========================================================
   Component — Scroll To Top Button (js)
   Menampilkan/menyembunyikan tombol #scrollTopBtn berdasarkan
   posisi scroll, serta smooth-scroll ke atas saat diklik.
   Bukan bagian dari desain hover kartu service — dipisah agar
   servicev2.js tidak lagi mencampur logic footer dengan logic
   kartu service.
   ========================================================== */

(function () {
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
})();
