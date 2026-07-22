const cards = document.querySelectorAll(".product-card");

const revealCards = () => {

    cards.forEach(card => {

        const top = card.getBoundingClientRect().top;

        if(top < window.innerHeight - 120){

            card.classList.add("show");

        }

    });

}

window.addEventListener("scroll", revealCards);

revealCards();