// ======================================================
// PRODUCTS PAGE — Smooth 3D Carousel (5-Card Layout)
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  if (!track) return;

  const viewport = document.querySelector(".carousel-viewport");
  const cards = Array.from(track.querySelectorAll(".product-card-3d"));
  const dots = Array.from(document.querySelectorAll(".carousel-dot"));
  const prevBtn = document.querySelector(".carousel-nav-btn.prev");
  const nextBtn = document.querySelector(".carousel-nav-btn.next");

  const total = cards.length;
  let current = Math.min(1, total - 1);
  let lastDirection = 1; // 1 = next, -1 = prev
  let prevOffsets = new Array(total).fill(0);
  let prevActiveIndex = current;

  function getMaxVisibleRing() {
    const w = window.innerWidth;
    if (w <= 767) return 1;  // Tampilkan 3 kartu di HP
    return 2;                // Tampilkan 5 kartu di Tablet & Desktop
  }

  function getCardWidth() {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue("--card-w")
      .trim();
    if (raw.endsWith("vw")) {
      return (parseFloat(raw) / 100) * window.innerWidth;
    }
    return parseFloat(raw) || 300;
  }

  function computeOffset(i) {
    let offset = i - current;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  }

  function render() {
    const cardW = getCardWidth();
    const maxRing = getMaxVisibleRing();

    if (viewport) {
      viewport.dataset.direction = lastDirection > 0 ? "next" : "prev";
    }

    cards.forEach((card, i) => {
      const offset = computeOffset(i);
      const prevOffset = prevOffsets[i];

      // Deteksi jika kartu melompat dari sisi paling kanan ke kiri (atau sebaliknya)
      const isSeamJump = Math.abs(offset - prevOffset) > total / 2 + 0.001;

      const abs = Math.abs(offset);
      let translateX = 0;
      let scale = 1;
      let rotate = 0;
      let opacity = 1;
      let blur = 0;
      let z = 50;
      let pointer = "auto";

      if (abs === 0) {
        // --- KARTU UTAMA (TENGAH) ---
        translateX = 0;
        scale = 1.08;
        rotate = 0;
        opacity = 1;
        blur = 0;
        z = 50;
      } else if (abs === 1) {
        // --- KARTU SAMPING DEKAT (2 KIRI-KANAN PERTAMA) ---
        translateX = offset * cardW * 0.95;
        scale = 0.88;
        rotate = offset * -10;
        opacity = 0.9;
        blur = 0;
        z = 40;
        pointer = "auto";
      } else if (abs === 2) {
        // --- KARTU SAMPING LUAR (2 KIRI-KANAN KEDUA) ---
        translateX = offset * cardW * 1.65;
        scale = 0.72;
        rotate = offset * -15;
        opacity = maxRing >= 2 ? 0.65 : 0;
        blur = maxRing >= 2 ? 1.5 : 5;
        z = 30;
        pointer = maxRing >= 2 ? "auto" : "none";
      } else {
        // --- KARTU SISA (DISEMBUNYIKAN SEBAGAI BUFFER) ---
        translateX = offset * cardW * 2.2;
        scale = 0.55;
        rotate = offset * -20;
        opacity = 0;
        blur = 6;
        z = 10;
        pointer = "none";
      }

      if (isSeamJump) {
        card.style.transition = "none";
      } else {
        card.style.transition = "";
      }

      card.style.transform = `translate(-50%, -50%) translateX(${translateX}px) scale(${scale}) rotateY(${rotate}deg)`;
      card.style.opacity = opacity;
      card.style.filter = blur ? `blur(${blur}px)` : "none";
      card.style.zIndex = z;
      card.style.pointerEvents = pointer;
      card.classList.toggle("is-active", abs === 0);

      if (isSeamJump) {
        void card.offsetWidth;
        requestAnimationFrame(() => {
          card.style.transition = "";
        });
      }

      prevOffsets[i] = offset;
    });

    // Animasi pop halus ketika berganti kartu utama
    if (current !== prevActiveIndex) {
      const activeCard = cards[current];
      if (activeCard) {
        activeCard.classList.remove("pop-in");
        void activeCard.offsetWidth;
        activeCard.classList.add("pop-in");
        activeCard.addEventListener(
          "animationend",
          () => activeCard.classList.remove("pop-in"),
          { once: true }
        );
      }
      prevActiveIndex = current;
    }

    dots.forEach((dot, i) => dot.classList.toggle("active", i === current));
  }

  function goTo(index, direction) {
    const target = (index + total) % total;
    if (direction === undefined) {
      const diff = (target - current + total) % total;
      direction = diff <= total / 2 ? 1 : -1;
    }
    lastDirection = direction;
    current = target;
    render();
  }

  if (prevBtn) prevBtn.addEventListener("click", () => goTo(current - 1, -1));
  if (nextBtn) nextBtn.addEventListener("click", () => goTo(current + 1, 1));

  cards.forEach((card, i) => {
    card.addEventListener("click", () => {
      if (i !== current) goTo(i);
    });
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => goTo(i));
  });

  let touchStartX = 0;
  if (viewport) {
    viewport.addEventListener(
      "touchstart",
      (e) => (touchStartX = e.touches[0].clientX),
      { passive: true }
    );
    viewport.addEventListener(
      "touchend",
      (e) => {
        const diff = e.changedTouches[0].clientX - touchStartX;
        if (diff > 40) goTo(current - 1, -1);
        if (diff < -40) goTo(current + 1, 1);
      },
      { passive: true }
    );
  }

  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(render, 100);
  });

  render();
});