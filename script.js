/* =========================================================
   HIDDEN LEGENDS
   ULTRA PREMIUM ANIMATIONS + 3D BACKGROUND
========================================================= */


/* =========================================================
   HERO BACKGROUND
========================================================= */

const background = document.querySelector(".background");

if (background) {

    /* -----------------------------------------------
       PARTICLES
    ----------------------------------------------- */

    const particleCount = 70;

    for (let i = 0; i < particleCount; i++) {

        const particle =
            document.createElement("span");

        particle.className =
            "particle";

        const size =
            Math.random() * 5 + 1;

        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.top =
            Math.random() * 100 + "%";

        particle.style.animationDuration =
            Math.random() * 15 + 8 + "s";

        particle.style.animationDelay =
            Math.random() * -20 + "s";

        background.appendChild(
            particle
        );
    }


    /* -----------------------------------------------
       STARS
    ----------------------------------------------- */

    const starCount = 80;

    for (let i = 0; i < starCount; i++) {

        const star =
            document.createElement("span");

        star.className =
            "star";

        const size =
            Math.random() * 3 + 1;

        star.style.width =
            size + "px";

        star.style.height =
            size + "px";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.animationDuration =
            Math.random() * 3 + 2 + "s";

        star.style.animationDelay =
            Math.random() * -5 + "s";

        background.appendChild(
            star
        );
    }


    /* -----------------------------------------------
       3D SHAPES
    ----------------------------------------------- */

    const shapes = [
        "sphere",
        "sphere",
        "cube",
        "ring",
        "sphere",
        "cube",
        "planet"
    ];


    shapes.forEach(
        (type, index) => {

            const shape =
                document.createElement("div");

            shape.className =
                "floating-shape " + type;


            shape.style.left =
                Math.random() * 90 + 5 + "%";


            shape.style.top =
                Math.random() * 80 + 5 + "%";


            shape.style.animationDuration =
                12 + index * 3 + "s";


            shape.style.animationDelay =
                index * -2 + "s";


            background.appendChild(
                shape
            );
        }
    );


    /* -----------------------------------------------
       ORBIT SYSTEM
    ----------------------------------------------- */

    const orbit =
        document.createElement("div");

    orbit.className =
        "orbit-system";


    const orbitPlanet =
        document.createElement("div");

    orbitPlanet.className =
        "orbit-planet";


    orbit.appendChild(
        orbitPlanet
    );

    background.appendChild(
        orbit
    );
}


/* =========================================================
   SHOOTING STARS
========================================================= */

function createShootingStar() {

    if (!background) return;

    const shootingStar =
        document.createElement("div");

    shootingStar.className =
        "shooting-star";


    shootingStar.style.left =
        Math.random() * 100 + "%";


    shootingStar.style.top =
        Math.random() * 40 + "%";


    background.appendChild(
        shootingStar
    );


    setTimeout(
        () => {

            shootingStar.remove();

        },
        2500
    );
}


setInterval(
    createShootingStar,
    4500
);


/* =========================================================
   MOUSE POSITION
========================================================= */

let mouseX = 0;
let mouseY = 0;


document.addEventListener(
    "mousemove",
    (event) => {

        mouseX =
            event.clientX;

        mouseY =
            event.clientY;

    }
);


/* =========================================================
   HERO PARALLAX
========================================================= */

document.addEventListener(
    "mousemove",
    (event) => {

        const x =
            event.clientX /
            window.innerWidth -
            0.5;


        const y =
            event.clientY /
            window.innerHeight -
            0.5;


        /* -----------------------------------------------
           HERO CONTENT
        ----------------------------------------------- */

        const heroContent =
            document.querySelector(
                ".hero-content"
            );


        if (heroContent) {

            heroContent.style.transform =
                `
                perspective(1000px)

                rotateX(${-y * 4}deg)

                rotateY(${x * 4}deg)

                translate3d(
                    ${x * 15}px,
                    ${y * 15}px,
                    0
                )
                `;
        }


        /* -----------------------------------------------
           BACKGROUND SHAPES
        ----------------------------------------------- */

        const shapes =
            document.querySelectorAll(
                ".floating-shape"
            );


        shapes.forEach(
            (shape, index) => {

                const depth =
                    (index + 1) * 8;


                shape.style.marginLeft =
                    x * depth + "px";


                shape.style.marginTop =
                    y * depth + "px";

            }
        );


        /* -----------------------------------------------
           ORBIT
        ----------------------------------------------- */

        const orbit =
            document.querySelector(
                ".orbit-system"
            );


        if (orbit) {

            orbit.style.transform =
                `
                translate(
                    ${x * 30}px,
                    ${y * 30}px
                )
                `;
        }

    }
);


/* =========================================================
   CURSOR GLOW
========================================================= */

const cursorGlow =
    document.createElement("div");

cursorGlow.className =
    "cursor-glow";

document.body.appendChild(
    cursorGlow
);


document.addEventListener(
    "mousemove",
    (event) => {

        cursorGlow.style.left =
            event.clientX + "px";


        cursorGlow.style.top =
            event.clientY + "px";

    }
);


/* =========================================================
   CLICK RIPPLE
========================================================= */

document.addEventListener(
    "click",
    (event) => {

        const ripple =
            document.createElement(
                "span"
            );


        ripple.className =
            "click-ripple";


        ripple.style.left =
            event.clientX + "px";


        ripple.style.top =
            event.clientY + "px";


        document.body.appendChild(
            ripple
        );


        setTimeout(
            () => {

                ripple.remove();

            },
            800
        );

    }
);


/* =========================================================
   MAGNETIC BUTTONS
   MATCHES PEOPLE.JS
========================================================= */

const buttons =
    document.querySelectorAll(
        ".explore-btn, .read-more-btn"
    );


buttons.forEach(
    (button) => {

        button.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                button.style.transform =
                    `
                    translate(
                        ${x * 0.15}px,
                        ${y * 0.15}px
                    )
                    `;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
   CARD 3D EFFECT
   MATCHES PEOPLE.JS
========================================================= */

const cards =
    document.querySelectorAll(
        ".card"
    );


/* =========================================================
   CARD TILT
========================================================= */

cards.forEach(
    (card, index) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                /*
                   EXACT SAME FORMULA
                   AS PEOPLE.JS
                */

                const rotateX =
                    (y - centerY) /
                    25;


                const rotateY =
                    (centerX - x) /
                    25;


                card.style.transform =
                    `
                    perspective(1200px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-15px)
                    scale(1.015)
                    `;


                /*
                   SAME MOUSE VARIABLES
                   AS PEOPLE.JS
                */

                card.style.setProperty(
                    "--mouse-x",
                    `${x}px`
                );


                card.style.setProperty(
                    "--mouse-y",
                    `${y}px`
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
   IMAGE PARALLAX
   MATCHES PEOPLE.JS
========================================================= */

cards.forEach(
    (card) => {

        const image =
            card.querySelector(
                "img"
            );


        if (!image) return;


        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const moveX =
                    (
                        (x / rect.width) -
                        0.5
                    ) * 12;


                const moveY =
                    (
                        (y / rect.height) -
                        0.5
                    ) * 12;


                    image.style.transform = `
                    translate(${moveX}px, ${moveY}px)
                    scale(1.04)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                image.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        `
        .section-title,
        .card,
        .quote-content,
        .about
        `
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "active-reveal"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(
    (element) => {

        element.classList.add(
            "scroll-reveal"
        );


        observer.observe(
            element
        );

    }
);


/* =========================================================
   NAVBAR SCROLL
========================================================= */

const navbar =
    document.querySelector(
        "nav"
    );


window.addEventListener(
    "scroll",
    () => {

        if (!navbar) return;


        if (
            window.scrollY > 50
        ) {

            navbar.classList.add(
                "nav-scrolled"
            );

        } else {

            navbar.classList.remove(
                "nav-scrolled"
            );

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   SCROLL PROGRESS BAR
========================================================= */

const progressBar =
    document.createElement(
        "div"
    );


progressBar.className =
    "scroll-progress";


document.body.appendChild(
    progressBar
);


window.addEventListener(
    "scroll",
    () => {

        const scrollTop =
            window.scrollY;


        const height =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        const progress =
            height > 0
                ? (scrollTop / height) * 100
                : 0;


        progressBar.style.width =
            progress + "%";

    },
    {
        passive: true
    }
);


/* =========================================================
   HERO TITLE FLOAT
========================================================= */

const heroTitle =
    document.querySelector(
        ".hero h1"
    );


if (heroTitle) {

    let time = 0;


    function floatTitle() {

        time += 0.015;


        const floatY =
            Math.sin(time) * 6;


        heroTitle.style.marginTop =
            floatY + "px";


        requestAnimationFrame(
            floatTitle
        );

    }


    floatTitle();

}


/* =========================================================
   SMOOTH ANCHOR SCROLL
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        (link) => {

            link.addEventListener(
                "click",
                function (event) {

                    const target =
                        document.querySelector(
                            this.getAttribute(
                                "href"
                            )
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView(
                            {
                                behavior:
                                    "smooth",

                                block:
                                    "start"
                            }
                        );

                    }

                }
            );

        }
    );