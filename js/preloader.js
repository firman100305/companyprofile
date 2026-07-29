const video = document.getElementById("loaderVideo");
const preloader = document.getElementById("preloader");

let hidden = false;

// Mempercepat video (opsional)
video.playbackRate = 1.5;

// Paksa play
video.play().catch(console.error);

// Maksimal tampil 2 detik
const maxDuration = setTimeout(() => {

    hidePreloader();

}, 5000);

// Jika video selesai lebih cepat
video.addEventListener("ended", () => {

    hidePreloader();

});

function hidePreloader(){

    if(hidden) return;

    hidden = true;

    clearTimeout(maxDuration);

    preloader.classList.add("hide");

    document.body.style.overflow = "auto";

    setTimeout(() => {

        preloader.remove();

    }, 600);

}