/* ============================================================
   NEWS PAGES SHARED SCRIPT
   Dipakai bersama oleh news.html dan news-detail.html.
   Setiap modul dijaga dengan pengecekan elemen, jadi aman
   dimuat di kedua halaman meski elemennya beda-beda.
   ============================================================ */

/* ----------------------------
   Scroll to Top button (footer)
---------------------------- */
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

/* ----------------------------------------------------------
   Reveal on scroll untuk .featured-grid dan .news-grid (news.html)
   .featured-grid dan .news-grid TIDAK auto-aktif walau sudah
   kelihatan pas halaman baru dibuka — baru nyala (in-view) setelah
   user benar-benar melakukan scroll. Urutan tampil masing-masing
   card diatur lewat transition-delay di CSS (.card-reveal).
---------------------------------------------------------- */
(function () {
    const groups = document.querySelectorAll('.featured-grid, .news-grid');
    if (!groups.length) return;

    function check() {
        groups.forEach((el) => {
            if (el.classList.contains('in-view')) return;
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
                el.classList.add('in-view');
            }
        });
    }

    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    check();
})();

/* ----------------------------------------------------------
   Related News horizontal scroll (news-detail.html)
   Progress bar untuk scroll horizontal "More News":
   track panjang + thumb kecil yang bergerak sesuai posisi scroll,
   plus drag-to-scroll pakai mouse untuk desktop.
---------------------------------------------------------- */
(function () {
    const scrollEl = document.getElementById("relatedScroll");
    const thumb = document.getElementById("relatedProgressThumb");
    if (!scrollEl || !thumb) return;

    function updateProgress() {
        const maxScroll = scrollEl.scrollWidth - scrollEl.clientWidth;
        const visibleRatio = scrollEl.clientWidth / scrollEl.scrollWidth;
        thumb.style.width = Math.min(Math.max(visibleRatio * 100, 10), 100) + "%";

        const track = thumb.parentElement;
        const maxTranslate = track.clientWidth - thumb.offsetWidth;
        const progress = maxScroll > 0 ? scrollEl.scrollLeft / maxScroll : 0;
        thumb.style.transform = `translateX(${progress * maxTranslate}px)`;
    }

    scrollEl.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    // Drag-to-scroll pakai mouse (buat desktop, karena mouse biasa
    // nggak punya scroll horizontal bawaan)
    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    scrollEl.addEventListener("mousedown", (e) => {
        isDown = true;
        scrollEl.classList.add("dragging");
        startX = e.pageX;
        startScroll = scrollEl.scrollLeft;
    });

    window.addEventListener("mouseup", () => {
        isDown = false;
        scrollEl.classList.remove("dragging");
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        scrollEl.scrollLeft = startScroll - (e.pageX - startX);
    });
})();