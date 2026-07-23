document.addEventListener("DOMContentLoaded", () => {

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            preloader.classList.add("hide");

            document.body.style.overflow = "auto";

        }, 1200);

    });

});

document.body.style.overflow = "hidden";