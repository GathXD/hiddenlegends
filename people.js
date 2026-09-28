/* =========================================================
   HIDDEN LEGENDS — PEOPLE PAGE
   PREMIUM INTERACTIVE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       PARTICLES
    ===================================================== */

    const particleCount = 70;

    for (let i = 0; i < particleCount; i++) {

        const particle =
            document.createElement("div");

        particle.classList.add(
            "people-particle"
        );

        const size =
            Math.random() * 3 + 1;

        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.top =
            Math.random() * 100 + "%";

        particle.style.opacity =
            Math.random() * 0.6 + 0.2;

        document.body.appendChild(
            particle
        );

        particle.animate(
            [
                {
                    transform:
                        "translateY(0px)",
                    opacity:
                        0
                },

                {
                    transform:
                        `
                        translate(
                            ${Math.random() * 100 - 50}px,
                            ${Math.random() * -150 - 50}px
                        )
                        `,
                    opacity:
                        0.7
                },

                {
                    transform:
                        `
                        translate(
                            ${Math.random() * 200 - 100}px,
                            ${Math.random() * -350 - 100}px
                        )
                        `,
                    opacity:
                        0
                }
            ],
            {
                duration:
                    7000 +
                    Math.random() * 9000,

                iterations:
                    Infinity,

                delay:
                    Math.random() * 7000,

                easing:
                    "ease-in-out"
            }
        );
    }


    /* =====================================================
       CURSOR GLOW
    ===================================================== */

    const cursorGlow =
        document.createElement("div");

    cursorGlow.className =
        "people-cursor-glow";

    document.body.appendChild(
        cursorGlow
    );

    let mouseX = 0;
    let mouseY = 0;

    let glowX = 0;
    let glowY = 0;

    document.addEventListener(
        "mousemove",
        (event) => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;
        }
    );

    function animateCursor() {

        glowX +=
            (mouseX - glowX) *
            0.12;

        glowY +=
            (mouseY - glowY) *
            0.12;

        cursorGlow.style.left =
            glowX + "px";

        cursorGlow.style.top =
            glowY + "px";

        requestAnimationFrame(
            animateCursor
        );
    }

    animateCursor();


    /* =====================================================
       CARD 3D EFFECT
       Exact HTML class: .person
    ===================================================== */

    const cards =
        document.querySelectorAll(
            ".person"
        );

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


    /* =====================================================
       IMAGE PARALLAX
    ===================================================== */

    cards.forEach((card) => {

        const image =
            card.querySelector("img");

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
                    ((x / rect.width) - 0.5) *
                    12;

                const moveY =
                    ((y / rect.height) - 0.5) *
                    12;

                image.style.transform =
                    `
                    scale(1.04)
                    translate(
                        ${moveX}px,
                        ${moveY}px
                    )
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
    });


    /* =====================================================
       BUTTON MAGNET EFFECT
       Exact HTML class: .read-more
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".read-more"
        );

    buttons.forEach((button) => {

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
    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".person, .category-title, .section-heading"
        );

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "reveal",
                                "active"
                            );

                            revealObserver.unobserve(
                                entry.target
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
        (element, index) => {

            element.classList.add(
                "reveal"
            );

            element.style.transitionDelay =
                `${(index % 3) * 0.08}s`;

            revealObserver.observe(
                element
            );
        }
    );


    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    const progress =
        document.createElement("div");

    progress.className =
        "people-scroll-progress";

    document.body.appendChild(
        progress
    );

    function updateProgress() {

        const scrollTop =
            window.scrollY;

        const pageHeight =
            document.documentElement
                .scrollHeight;

        const windowHeight =
            window.innerHeight;

        const scrollable =
            pageHeight -
            windowHeight;

        const percentage =
            scrollable > 0
                ? (scrollTop / scrollable) * 100
                : 0;

        progress.style.width =
            percentage + "%";
    }

    window.addEventListener(
        "scroll",
        updateProgress,
        {
            passive: true
        }
    );

    updateProgress();


    /* =====================================================
       NAVBAR SCROLL
    ===================================================== */

    const nav =
        document.querySelector("nav");

    window.addEventListener(
        "scroll",
        () => {

            if (!nav) return;

            if (window.scrollY > 80) {

                nav.style.background =
                    "rgba(3, 6, 18, 0.95)";

                nav.style.boxShadow =
                    `
                    0 15px 50px
                    rgba(0,0,0,0.4)
                    `;

            } else {

                nav.style.background =
                    "rgba(5, 8, 22, 0.72)";

                nav.style.boxShadow =
                    "none";
            }
        },
        {
            passive: true
        }
    );


/* =====================================================
   HERO PARALLAX
   Keep the BIG TITLE stable
===================================================== */

const hero =
    document.querySelector(
        ".people-hero"
    );

const heroContent =
    document.querySelector(
        ".people-hero .hero-content"
    );

const heroTitle =
    document.querySelector(
        ".people-hero .hero-content h1"
    );

if (hero && heroContent) {

    hero.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                hero.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            const moveX =
                ((x / rect.width) - 0.5) *
                10;

            const moveY =
                ((y / rect.height) - 0.5) *
                10;

            /*
               Move ONLY the background layer.
               Do NOT transform the title.
            */

            hero.style.setProperty(
                "--hero-x",
                `${moveX}px`
            );

            hero.style.setProperty(
                "--hero-y",
                `${moveY}px`
            );

            /*
               Keep the title completely stable.
            */

            if (heroTitle) {
                heroTitle.style.transform =
                    "translate3d(0, 0, 0)";
            }
        }
    );

    hero.addEventListener(
        "mouseleave",
        () => {

            hero.style.setProperty(
                "--hero-x",
                "0px"
            );

            hero.style.setProperty(
                "--hero-y",
                "0px"
            );

            if (heroTitle) {
                heroTitle.style.transform =
                    "translate3d(0, 0, 0)";
            }
        }
    );
}


    /* =====================================================
       CLICK RIPPLE
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            const ripple =
                document.createElement(
                    "div"
                );

            ripple.style.position =
                "fixed";

            ripple.style.left =
                event.clientX + "px";

            ripple.style.top =
                event.clientY + "px";

            ripple.style.width =
                "10px";

            ripple.style.height =
                "10px";

            ripple.style.borderRadius =
                "50%";

            ripple.style.border =
                "2px solid #22d3ee";

            ripple.style.boxShadow =
                `
                0 0 15px #22d3ee,
                0 0 35px #8b5cf6,
                0 0 55px #ec4899
                `;

            ripple.style.pointerEvents =
                "none";

            ripple.style.zIndex =
                "10000";

            ripple.style.transform =
                "translate(-50%, -50%)";

            document.body.appendChild(
                ripple
            );

            ripple.animate(
                [
                    {
                        width: "10px",
                        height: "10px",
                        opacity: 1
                    },

                    {
                        width: "120px",
                        height: "120px",
                        opacity: 0
                    }
                ],
                {
                    duration: 750,
                    easing: "ease-out"
                }
            );

            setTimeout(
                () => {
                    ripple.remove();
                },
                800
            );
        }
    );


    /* =====================================================
       RANDOM LIGHTS
    ===================================================== */

    const colors = [
        "#22d3ee",
        "#3b82f6",
        "#8b5cf6",
        "#ec4899",
        "#f4c542"
    ];

    for (let i = 0; i < 20; i++) {

        const light =
            document.createElement(
                "div"
            );

        const color =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

        light.style.position =
            "fixed";

        light.style.width =
            Math.random() * 4 + 2 + "px";

        light.style.height =
            light.style.width;

        light.style.left =
            Math.random() * 100 + "%";

        light.style.top =
            Math.random() * 100 + "%";

        light.style.borderRadius =
            "50%";

        light.style.background =
            color;

        light.style.boxShadow =
            `
            0 0 12px ${color},
            0 0 30px ${color}
            `;

        light.style.pointerEvents =
            "none";

        light.style.zIndex =
            "0";

        document.body.appendChild(
            light
        );

        light.animate(
            [
                {
                    transform:
                        "translate(0, 0)"
                },

                {
                    transform:
                        `
                        translate(
                            ${Math.random() * 120 - 60}px,
                            ${Math.random() * 120 - 60}px
                        )
                        `
                },

                {
                    transform:
                        "translate(0, 0)"
                }
            ],
            {
                duration:
                    5000 +
                    Math.random() * 7000,

                iterations:
                    Infinity,

                easing:
                    "ease-in-out"
            }
        );
    }


    /* =====================================================
       CATEGORY TITLE GLOW
    ===================================================== */

    const categoryTitles =
        document.querySelectorAll(
            ".category-title"
        );

    categoryTitles.forEach(
        (title, index) => {

            const colors =
                [
                    "#22d3ee",
                    "#3b82f6",
                    "#8b5cf6",
                    "#ec4899",
                    "#f97316",
                    "#f4c542"
                ];

            title.style.textShadow =
                `
                0 0 25px
                ${colors[index % colors.length]}
                20
                `;
        }
    );


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        "%c HIDDEN LEGENDS ",
        `
        background:
            linear-gradient(
                90deg,
                #22d3ee,
                #3b82f6,
                #8b5cf6,
                #ec4899
            );

        color: white;

        font-size: 18px;

        font-weight: bold;

        padding: 10px 20px;

        border-radius: 10px;
        `
    );

});