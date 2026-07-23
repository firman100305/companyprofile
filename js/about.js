
/*====================================
        REVEAL SECTION
====================================*/

const reveals=document.querySelectorAll(".reveal");

function revealSections(){

    const trigger=window.innerHeight*0.82;

    reveals.forEach(section=>{

        const top=section.getBoundingClientRect().top;

        if(top<trigger){

            section.classList.add("show");

        }

    });

}

window.addEventListener("scroll", revealSections);

window.addEventListener("load", () => {
    revealSections();
});

/*==================================================
                COMPANY STORY
==================================================*/

const storySlides = document.querySelectorAll(".story-slide");
const storyDots = document.querySelectorAll(".story-dot");
const storySection = document.querySelector(".company-story");

let currentStory = 0;
let storyInterval;

/*==================================
        SHOW SLIDE
==================================*/

function showStory(index){

    storySlides.forEach(slide=>{

        slide.classList.remove("active");

    });

    storyDots.forEach(dot=>{

        dot.classList.remove("active");

    });

    storySlides[index].classList.add("active");

    storyDots[index].classList.add("active");

    currentStory=index;

}

/*==================================
        NEXT
==================================*/

function nextStory(){

    currentStory++;

    if(currentStory>=storySlides.length){

        currentStory=0;

    }

    showStory(currentStory);

}

/*==================================
        START
==================================*/

function startStory(){

    storyInterval=setInterval(nextStory,6000);

}

/*==================================
        STOP
==================================*/

function stopStory(){

    clearInterval(storyInterval);

}

/*==================================
        DOT CLICK
==================================*/

storyDots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        stopStory();

        showStory(index);

        startStory();

    });

});

/*==================================
        HOVER
==================================*/

storySection.addEventListener("mouseenter",stopStory);

storySection.addEventListener("mouseleave",startStory);

/*==================================
        INIT
==================================*/

showStory(0);

startStory();

/*==================================================
                FIXED PARALLAX
==================================================*/

const parallaxGap = document.querySelector(".reveal-parallax");
const fixedContent = document.querySelector(".fixed-content");

function revealParallax(){

    if(!parallaxGap || !fixedContent) return;

    const rect = parallaxGap.getBoundingClientRect();

    const trigger = window.innerHeight * 0.25;

    if(rect.top < trigger && rect.bottom > trigger){

        fixedContent.classList.add("show");

    }else{

        fixedContent.classList.remove("show");

    }

}   

window.addEventListener("scroll", revealParallax);

window.addEventListener("load", revealParallax);