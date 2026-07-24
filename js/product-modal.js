const modal = document.getElementById("productModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");

const productCards = document.querySelectorAll(".product-card");

let currentIndex = 0;

function showProduct(index) {

    currentIndex = index;

    const card = productCards[index];

    modalImage.src = card.dataset.image;
    modalTitle.textContent = card.dataset.title;
    modalDescription.textContent = card.dataset.description;
}

productCards.forEach((card, index) => {

    card.addEventListener("click", function (e) {

        e.preventDefault();

        showProduct(index);

        modal.classList.add("active");
        document.body.classList.add("modal-open");

    });

});

function closeModal() {

    modal.classList.remove("active");
    document.body.classList.remove("modal-open");

}

modal.addEventListener("click", function (e) {

    if (e.target === modal) {
        closeModal();
    }

});

document.querySelector(".product-close").addEventListener("click", closeModal);

function nextProduct() {

    currentIndex++;

    if (currentIndex >= productCards.length) {
        currentIndex = 0;
    }

    showProduct(currentIndex);

}

function prevProduct() {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = productCards.length - 1;
    }

    showProduct(currentIndex);

}

const nextBtn = document.querySelector(".product-next");
const prevBtn = document.querySelector(".product-prev");

if (nextBtn) {
    nextBtn.addEventListener("click", nextProduct);
}

if (prevBtn) {
    prevBtn.addEventListener("click", prevProduct);
}

document.addEventListener("keydown", function (e) {

    if (!modal.classList.contains("active")) return;

    switch (e.key) {

        case "Escape":
            closeModal();
            break;

        case "ArrowRight":
            nextProduct();
            break;

        case "ArrowLeft":
            prevProduct();
            break;
    }

});