// ===============================
// Reveal Animation
// ===============================

const newsCards = document.querySelectorAll(".news-card");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.2
    }
);

newsCards.forEach((card, index) => {

    card.style.transitionDelay = `${index * 120}ms`;

    revealObserver.observe(card);

});


// ===============================
// 3D Tilt Effect
// ===============================

newsCards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 10;

        const rotateX = ((rect.height / 2 - y) / rect.height) * 10;

        card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-10px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";

    });

});


// ===============================
// Spotlight Effect
// ===============================

newsCards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        card.style.setProperty("--x", `${x}px`);

        card.style.setProperty("--y", `${y}px`);

    });

});