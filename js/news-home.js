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



