// ======================================================
// PRODUCT DETAIL PAGE RENDERER — MINIMALIST HOVER TABS
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
  const layout = document.getElementById("pdLayout");
  const ribbon = document.getElementById("pdRibbon");
  if (!layout) return;

  const params = new URLSearchParams(window.location.search);
  let slug = params.get("slug");
  const data = window.PRODUCTS_DATA || [];

  if (!slug && data.length > 0) {
    slug = data[0].slug;
  }

  const product = data.find((p) => p.slug === slug);

  // 1. Render Running Marquee Ribbon Navigation
  //
  // FIX: previously this always rendered exactly 2 duplicated groups and
  // animated translateX(-50%). That only loops seamlessly when a single
  // group is at least as wide as the ribbon container. With just 6
  // products, on wide screens one group ends up narrower than the
  // viewport, so the ribbon runs out of content mid-scroll and a blank
  // gap flashes by (the bug in the screenshot).
  //
  // Now we measure the real rendered width of one group (after fonts
  // have loaded, since Cormorant Garamond loads async and can reflow
  // things), clone as many groups as needed to always exceed the
  // container width, and shift by an exact pixel amount instead of a
  // fixed percentage so the loop stays seamless no matter the count.
  if (ribbon && data.length > 0) {
    const leafSvg = `
      <svg class="leaf-icon" viewBox="0 0 24 24">
        <path d="M17,8C8,10,5,16,5,22C11.5,22,15.5,19,17,13C18,9,17,8,17,8M17,2C17,2,11,3,7,7C3,11,2,16,2,16C2,16,7,15,11,11C14,8.8,16,5,17,2Z"/>
      </svg>
    `;

    const itemsHtml = data
      .map((item) => {
        const isActive = item.slug === slug ? "active" : "";
        return `
          <a href="product-detail.html?slug=${item.slug}" class="pd-ribbon-item ${isActive}">
            <span>${item.title}</span>
            ${leafSvg}
          </a>
        `;
      })
      .join("");

    const track = document.createElement("div");
    track.className = "pd-ribbon-track";
    ribbon.innerHTML = "";
    ribbon.appendChild(track);

    // Render one group first, just to measure its real width.
    const measureGroup = document.createElement("div");
    measureGroup.className = "pd-ribbon-group";
    measureGroup.innerHTML = itemsHtml;
    track.appendChild(measureGroup);

    const SPEED_PX_PER_SECOND = 45; // constant visual speed, independent of item count

    function buildSeamlessMarquee() {
      const groupWidth = measureGroup.offsetWidth;
      const containerWidth = ribbon.clientWidth;

      if (!groupWidth) {
        // Layout not ready yet (e.g. ribbon hidden/zero width) — try again next frame.
        requestAnimationFrame(buildSeamlessMarquee);
        return;
      }

      // Enough copies so the track is always wider than the visible
      // container, with one extra group as a buffer.
      const repeats = Math.max(2, Math.ceil(containerWidth / groupWidth) + 1);

      track.innerHTML = "";
      for (let i = 0; i < repeats; i++) {
        const group = document.createElement("div");
        group.className = "pd-ribbon-group";
        group.innerHTML = itemsHtml;
        track.appendChild(group);
      }

      const duration = groupWidth / SPEED_PX_PER_SECOND;

      track.style.setProperty("--pd-marquee-shift", `-${groupWidth}px`);
      track.style.animationDuration = `${duration}s`;
    }

    // Build once fonts are confirmed ready (accurate width), and also
    // immediately on next frame as a safe first pass.
    requestAnimationFrame(buildSeamlessMarquee);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(buildSeamlessMarquee);
    }

    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(buildSeamlessMarquee, 200);
    });
  }

  if (!product) {
    layout.innerHTML = `
      <div class="pd-notfound">
        <h1>Product Not Found</h1>
        <p>We couldn't find the product you're looking for.</p>
        <a href="products.html" class="pd-back-btn" style="color: var(--pd-gold)">← View All Products</a>
      </div>
    `;
    return;
  }

  document.title = `${product.title} - Mangli Djaya Raya`;

  // Multi-page logic
  const pages = product.pages || [
    { pageTitle: "Overview", content: product.summary }
  ];
  let currentPageIndex = 0;

  const specsHtml =
    product.specs && product.specs.length
      ? `
        <div class="pd-specs-grid pd-reveal">
          ${product.specs
            .map(
              (spec) => `
            <div class="pd-spec-item">
              <span class="pd-spec-label">${spec.label}</span>
              <span class="pd-spec-value">${spec.value}</span>
            </div>
          `
            )
            .join("")}
        </div>
      `
      : "";

  // Render Skeleton UI
  layout.innerHTML = `
    <!-- Sisi Kiri: Foto Tembakau Full-Bleed -->
    <div class="pd-left-media">
      <img src="${product.image}" alt="${product.title}" />
    </div>

    <!-- Sisi Kanan: Clean Multi-Page Detail -->
    <div class="pd-right-info">
      <div>
        <div class="pd-title-group">
          <p class="pd-product-eyebrow">${product.badge || "Signature Leaf"}</p>
          <h1 class="pd-product-title">${product.title}</h1>
        </div>

        <!-- Hover Pill Navigation -->
        <div class="pd-hover-pills" id="pdHoverPills"></div>

        <!-- Description Container dengan Smooth Fade -->
        <div class="pd-description-body">
          <div class="pd-quote-wrapper" id="pdQuoteWrapper">
            <p class="pd-quote-text" id="pdQuoteText"></p>
          </div>
        </div>

        ${specsHtml}
      </div>

      <!-- Footer Back Button -->
      <div class="pd-footer-nav">
        <div class="pd-accent-line"></div>
        <a href="products.html" class="pd-back-btn">&larr; Back</a>
      </div>
    </div>
  `;

  const pillsContainer = document.getElementById("pdHoverPills");
  const quoteWrapper = document.getElementById("pdQuoteWrapper");
  const quoteText = document.getElementById("pdQuoteText");

  // Render Pill Buttons
  pillsContainer.innerHTML = pages
    .map(
      (pg, idx) => `
      <button class="pd-pill-btn ${idx === 0 ? "active" : ""}" data-page="${idx}">
        <span>${pg.pageTitle}</span>
      </button>
    `
    )
    .join("");

  // Function Pergantian Teks dengan Efek Fade Smooth
  function switchPage(newIndex) {
    if (newIndex === currentPageIndex) return;

    quoteWrapper.classList.add("fade-out");

    setTimeout(() => {
      currentPageIndex = newIndex;
      quoteText.innerText = pages[currentPageIndex].content;

      document.querySelectorAll(".pd-pill-btn").forEach((pill, idx) => {
        if (idx === currentPageIndex) {
          pill.classList.add("active");
        } else {
          pill.classList.remove("active");
        }
      });

      quoteWrapper.classList.remove("fade-out");
    }, 200);
  }

  // Bind Event 'mouseenter' (Hover untuk mengganti halaman)
  document.querySelectorAll(".pd-pill-btn").forEach((pill) => {
    pill.addEventListener("mouseenter", (e) => {
      const pageIdx = parseInt(e.currentTarget.getAttribute("data-page"));
      switchPage(pageIdx);
    });

    // Tetap bisa diklik untuk perangkat touch screen (mobile)
    pill.addEventListener("click", (e) => {
      const pageIdx = parseInt(e.currentTarget.getAttribute("data-page"));
      switchPage(pageIdx);
    });
  });

  // Set isi awal
  quoteText.innerText = pages[0].content;

  // 2. Scroll-reveal for anything marked .pd-reveal (e.g. the specs grid)
  const revealTargets = document.querySelectorAll(".pd-reveal");
  if (revealTargets.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }
});