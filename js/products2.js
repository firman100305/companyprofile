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
  
    // FIX: without a lock, rapid clicking on prev/next (or spamming dots)
    // during an in-flight transition made the layout jump/stutter because
    // multiple renders overlapped mid-animation.
    let isAnimating = false;
    const TRANSITION_MS = 650;
  
    function getMaxVisibleRing() {
      const w = window.innerWidth;
      if (w <= 640) return 1; // 3 cards visible on phones
      return 2; // 5 cards visible on tablet & desktop
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
  
    function setNavDisabled(disabled) {
      if (prevBtn) prevBtn.disabled = disabled;
      if (nextBtn) nextBtn.disabled = disabled;
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
  
        // Detect a card jumping from one end of the loop to the other,
        // so we can skip the transition for just that one frame (no seam glitch).
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
          // --- MAIN (CENTER) CARD ---
          translateX = 0;
          scale = 1.08;
          rotate = 0;
          opacity = 1;
          blur = 0;
          z = 50;
        } else if (abs === 1) {
          // --- NEAR SIDE CARDS ---
          translateX = offset * cardW * 0.75;
          scale = 0.86;
          rotate = offset * -10;
          opacity = 0.9;
          blur = 0;
          z = 40;
          pointer = "auto";
        } else if (abs === 2) {
          // --- CARDS BEHIND abs=1 ---
          translateX = offset * cardW * 0.76;
          scale = 0.78;
          rotate = offset * -10;
          opacity = maxRing >= 2 ? 0.65 : 0;
          blur = maxRing >= 2 ? 1 : 6;
          z = 30;
          pointer = maxRing >= 2 ? "auto" : "none";
        } else {
          // --- REMAINING BUFFER CARDS ---
          translateX = offset * cardW * 0.77;
          scale = 0.7;
          rotate = offset * -10;
          opacity = 0;
          blur = 4;
          z = 20;
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
  
      // Subtle glow/pop pulse on the new active card.
      // FIX: the animation now only touches filter/box-shadow (see CSS),
      // so it no longer fights the inline `transform` set above — that
      // conflict was the cause of the visible "snap" on the previous version.
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
      if (isAnimating) return; // ignore input mid-transition
      const target = (index + total) % total;
      if (target === current) return;
  
      if (direction === undefined) {
        const diff = (target - current + total) % total;
        direction = diff <= total / 2 ? 1 : -1;
      }
  
      isAnimating = true;
      setNavDisabled(true);
  
      lastDirection = direction;
      current = target;
      render();
  
      window.setTimeout(() => {
        isAnimating = false;
        setNavDisabled(false);
      }, TRANSITION_MS);
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
  
    // Optional: keyboard navigation for accessibility.
    if (viewport) {
      viewport.setAttribute("tabindex", "0");
      viewport.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") goTo(current - 1, -1);
        if (e.key === "ArrowRight") goTo(current + 1, 1);
      });
    }
  
    let resizeTimer = null;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(render, 100);
    });
  
    render();
  });