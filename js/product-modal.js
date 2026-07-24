const modal = document.getElementById("productModal");

const modalImage = document.getElementById("modalImage");

const modalDescription = document.getElementById("modalDescription");

document.querySelectorAll(".product-card").forEach(card=>{

    card.addEventListener("click",function(e){

        e.preventDefault();

        modalImage.src=this.dataset.image;

        modalDescription.textContent=this.dataset.description;

        modal.classList.add("active");

        document.body.classList.add("modal-open");

    });

});

function closeModal(){

    modal.classList.remove("active");

    document.body.classList.remove("modal-open");

}

document.querySelector(".product-close").onclick=closeModal;

modal.onclick=function(e){

    if(e.target===modal){

        closeModal();

    }

};

document.addEventListener("keydown",function(e){

    if(e.key==="Escape"){

        closeModal();

    }

});