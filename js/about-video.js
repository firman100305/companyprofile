const reveal=document.querySelector(".about-video");

window.addEventListener("scroll",()=>{

const top=reveal.getBoundingClientRect().top;

if(top<window.innerHeight-150){

reveal.classList.add("show");

}

});