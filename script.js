const intro = document.querySelector(".biblical-intro");

const sparrow = document.querySelector(".sparrow-container");
const lineOne = document.querySelector(".intro-line-one");
const lineTwo = document.querySelector(".intro-line-two");
const verse = document.querySelector(".intro-verse");
const explore = document.querySelector(".intro-explore");

const navbar = document.querySelector(".navbar");

let mouseX = 0;
let mouseY = 0;

let targetMouseX = 0;
let targetMouseY = 0;

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


function setIntroState() {

    if (!intro) return;

    if (reducedMotion) {

        intro.classList.add("sparrow-visible");
        intro.classList.add("light-awakened");

        if (lineOne) {
            lineOne.classList.add("intro-visible");
        }

        if (lineTwo) {
            lineTwo.classList.add("intro-visible");
        }

        if (verse) {
            verse.classList.add("intro-visible");
        }

        if (explore) {
            explore.classList.add("intro-visible");
        }

        return;
    }


    setTimeout(() => {
        intro.classList.add("sparrow-visible");
    }, 700);


    setTimeout(() => {
        if (lineOne) {
            lineOne.classList.add("intro-visible");
        }
    }, 2200);


    setTimeout(() => {
        if (lineTwo) {
            lineTwo.classList.add("intro-visible");
        }
    }, 4300);


    setTimeout(() => {
        if (verse) {
            verse.classList.add("intro-visible");
        }
    }, 6200);


    setTimeout(() => {
        if (explore) {
            explore.classList.add("intro-visible");
        }
    }, 7800);


    setTimeout(() => {
        intro.classList.add("light-awakened");
    }, 9000);
}


setIntroState();


function updateMouse() {

    mouseX += (targetMouseX - mouseX) * 0.07;
    mouseY += (targetMouseY - mouseY) * 0.07;

    if (intro) {
        intro.style.setProperty("--mouse-x", mouseX.toFixed(4));
        intro.style.setProperty("--mouse-y", mouseY.toFixed(4));
    }

    requestAnimationFrame(updateMouse);
}


if (!reducedMotion) {

    window.addEventListener("mousemove", (event) => {

        targetMouseX =
            (event.clientX / window.innerWidth - 0.5) * 2;

        targetMouseY =
            (event.clientY / window.innerHeight - 0.5) * 2;

    });

    updateMouse();
}


window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 40) {
        navbar.classList.add("nav-scrolled");
    } else {
        navbar.classList.remove("nav-scrolled");
    }

});


if (explore) {

    explore.addEventListener("mouseenter", () => {

        if (!reducedMotion) {
            explore.style.transform =
                "translateY(-3px) scale(1.015)";
        }

    });


    explore.addEventListener("mouseleave", () => {

        if (!reducedMotion) {
            explore.style.transform =
                "translateY(0) scale(1)";
        }

    });

}


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        document.querySelectorAll(".nav-links a").forEach(item => {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});


if (!reducedMotion) {

    window.addEventListener("resize", () => {

        if (!intro) return;

        intro.style.setProperty("--mouse-x", "0");
        intro.style.setProperty("--mouse-y", "0");

        targetMouseX = 0;
        targetMouseY = 0;

    });

}


window.addEventListener("load", () => {

    document.body.classList.add("page-loaded");

});
