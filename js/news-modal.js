const modal = document.getElementById("newsModal");

const modalTitle = document.getElementById("modalTitle");
const modalImage = document.getElementById("modalImage");
const modalAuthor = document.getElementById("modalAuthor");
const modalDate = document.getElementById("modalDate");
const modalDescription = document.getElementById("modalDescription");

document.querySelectorAll(".news-card").forEach(card => {

    card.addEventListener("click", () => {

       
        modalImage.src = card.dataset.image;
        modalAuthor.textContent = "By " + card.dataset.author;
        modalDate.textContent = card.dataset.date;
        modalDescription.textContent = card.dataset.description;

        modal.classList.add("active");
        document.body.classList.add("modal-open");

    });

});

function closeModal(){

    modal.classList.remove("active");
    document.body.classList.remove("modal-open");

}

document.querySelector(".news-close").addEventListener("click", closeModal);

modal.addEventListener("click",(e)=>{

    if(e.target===modal){
        closeModal();
    }

});

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){
        closeModal();
    }

});