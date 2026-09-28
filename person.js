document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       HIDDEN LEGENDS
       PERSON PAGE — 3D ANIMATION SYSTEM
    ========================================================= */


    /* =========================================================
       CREATE BACKGROUND
    ========================================================= */

    var background = document.createElement("div");

    background.className = "person-3d-background";

    background.innerHTML = `
        <div class="three-d-grid"></div>

        <div class="space-glow glow-one"></div>
        <div class="space-glow glow-two"></div>
        <div class="space-glow glow-three"></div>

        <div class="star-field"></div>

        <div class="planet planet-one">
            
        </div>

        <div class="planet planet-two"></div>

        <div class="planet planet-three">
            
        </div>

        <div class="orb orb-one"></div>
        <div class="orb orb-two"></div>
        <div class="orb orb-three"></div>
        <div class="orb orb-four"></div>
        <div class="orb orb-five"></div>

        <div class="floating-cube cube-one"></div>
        <div class="floating-cube cube-two"></div>
        <div class="floating-cube cube-three"></div>

        <div class="energy-ring energy-one"></div>
        <div class="energy-ring energy-two"></div>

        <div class="light-beam beam-one"></div>
        <div class="light-beam beam-two"></div>

        <div class="shooting-stars"></div>
    `;

    document.body.insertBefore(
        background,
        document.body.firstChild
    );


    /* =========================================================
       CREATE STARS
    ========================================================= */

    var starField =
        background.querySelector(".star-field");

    for (var i = 0; i < 220; i++) {

        var star =
            document.createElement("span");

        star.className = "space-star";

        var size =
            Math.random() * 2.5 + 0.5;

        star.style.width =
            size + "px";

        star.style.height =
            size + "px";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.animationDelay =
            Math.random() * 5 + "s";

        star.style.animationDuration =
            Math.random() * 4 + 2 + "s";

        starField.appendChild(star);
    }


    /* =========================================================
       SHOOTING STARS
    ========================================================= */

    var shootingContainer =
        background.querySelector(".shooting-stars");

    function createShootingStar() {

        var star =
            document.createElement("div");

        star.className =
            "shooting-star";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 65 + "%";

        shootingContainer.appendChild(star);

        setTimeout(function () {

            star.remove();

        }, 2200);
    }

    setInterval(function () {

        if (Math.random() > 0.2) {
            createShootingStar();
        }

    }, 1600);


    /* =========================================================
       MOUSE POSITION
    ========================================================= */

    var mouseX = 0;
    var mouseY = 0;

    var smoothX = 0;
    var smoothY = 0;

    document.addEventListener(
        "mousemove",
        function (event) {

            mouseX =
                (event.clientX /
                    window.innerWidth -
                    0.5) * 2;

            mouseY =
                (event.clientY /
                    window.innerHeight -
                    0.5) * 2;

        }
    );


    /* =========================================================
       BACKGROUND PARALLAX
    ========================================================= */

    function animate3D() {

        smoothX +=
            (mouseX - smoothX) * 0.035;

        smoothY +=
            (mouseY - smoothY) * 0.035;


        var grid =
            background.querySelector(
                ".three-d-grid"
            );

        if (grid) {

            grid.style.marginLeft =
                smoothX * 20 + "px";

            grid.style.marginTop =
                smoothY * 15 + "px";
        }


        var planets =
            background.querySelectorAll(
                ".planet"
            );

        planets.forEach(
            function (planet, index) {

                var depth =
                    (index + 1) * 10;

                planet.style.marginLeft =
                    smoothX * depth + "px";

                planet.style.marginTop =
                    smoothY * depth + "px";
            }
        );


        var orbs =
            background.querySelectorAll(
                ".orb"
            );

        orbs.forEach(
            function (orb, index) {

                var depth =
                    (index + 1) * 5;

                orb.style.marginLeft =
                    smoothX * depth + "px";

                orb.style.marginTop =
                    smoothY * depth + "px";
            }
        );


        requestAnimationFrame(
            animate3D
        );
    }

    animate3D();



    /* =========================================================
       CLICK RIPPLE
    ========================================================= */

    document.addEventListener(
        "click",
        function (event) {

            var ripple =
                document.createElement("div");

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
                function () {
                    ripple.remove();
                },
                900
            );
        }
    );


    /* =========================================================
       NAVBAR
    ========================================================= */

    var nav =
        document.querySelector("nav");

    function updateNav() {

        if (!nav) {
            return;
        }

        if (window.scrollY > 60) {

            nav.classList.add(
                "nav-scrolled"
            );

        } else {

            nav.classList.remove(
                "nav-scrolled"
            );
        }
    }

    window.addEventListener(
        "scroll",
        updateNav
    );

    updateNav();


    /* =========================================================
       SCROLL PROGRESS
    ========================================================= */

    var progress =
        document.createElement("div");

    progress.className =
        "scroll-progress";

    document.body.appendChild(
        progress
    );


    function updateProgress() {

        var total =
            document.documentElement
                .scrollHeight -
            window.innerHeight;

        if (total <= 0) {
            progress.style.width = "0%";
            return;
        }

        var amount =
            (window.scrollY / total) * 100;

        progress.style.width =
            amount + "%";
    }

    window.addEventListener(
        "scroll",
        updateProgress
    );

    updateProgress();


    /* =========================================================
       STORY PARAGRAPHS
    ========================================================= */

    var paragraphs =
        document.querySelectorAll(
            ".story-text p"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        var paragraphObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "story-visible"
                                    );
                            }

                        }
                    );

                },
                {
                    threshold: 0.08
                }
            );


        paragraphs.forEach(
            function (paragraph) {

                paragraphObserver.observe(
                    paragraph
                );

            }
        );

    } else {

        paragraphs.forEach(
            function (paragraph) {

                paragraph.classList.add(
                    "story-visible"
                );

            }
        );
    }


    /* =========================================================
       REVEAL ELEMENTS
    ========================================================= */

    var reveals =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

        var revealObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target
                                    .classList
                                    .add(
                                        "active"
                                    );
                            }

                        }
                    );

                },
                {
                    threshold: 0.08
                }
            );


        reveals.forEach(
            function (element) {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        reveals.forEach(
            function (element) {

                element.classList.add(
                    "active"
                );

            }
        );
    }


    /* =========================================================
       IMPACT CARD 3D TILT
    ========================================================= */

    var cards =
        document.querySelectorAll(
            ".impact-card"
        );


    cards.forEach(
        function (card) {

            card.addEventListener(
                "mousemove",
                function (event) {

                    var rect =
                        card.getBoundingClientRect();

                    var x =
                        event.clientX -
                        rect.left;

                    var y =
                        event.clientY -
                        rect.top;

                    var centerX =
                        rect.width / 2;

                    var centerY =
                        rect.height / 2;

                    var rotateX =
                        ((y - centerY) /
                            centerY) * -7;

                    var rotateY =
                        ((x - centerX) /
                            centerX) * 7;

                    card.style.transform =
                        "perspective(1000px) " +
                        "rotateX(" +
                        rotateX +
                        "deg) " +
                        "rotateY(" +
                        rotateY +
                        "deg) " +
                        "translateY(-10px)";

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    card.style.transform =
                        "perspective(1000px) " +
                        "rotateX(0deg) " +
                        "rotateY(0deg) " +
                        "translateY(0)";

                }
            );

        }
    );


    /* =========================================================
       STORY INFO 3D TILT
    ========================================================= */

    var storyInfo =
        document.querySelector(
            ".story-info"
        );


    if (storyInfo) {

        storyInfo.addEventListener(
            "mousemove",
            function (event) {

                var rect =
                    storyInfo.getBoundingClientRect();

                var x =
                    event.clientX -
                    rect.left;

                var y =
                    event.clientY -
                    rect.top;

                var centerX =
                    rect.width / 2;

                var centerY =
                    rect.height / 2;

                var rotateX =
                    ((y - centerY) /
                        centerY) * -4;

                var rotateY =
                    ((x - centerX) /
                        centerX) * 4;

                storyInfo.style.transform =
                    "perspective(1200px) " +
                    "rotateX(" +
                    rotateX +
                    "deg) " +
                    "rotateY(" +
                    rotateY +
                    "deg)";

            }
        );


        storyInfo.addEventListener(
            "mouseleave",
            function () {

                storyInfo.style.transform =
                    "perspective(1200px) " +
                    "rotateX(0deg) " +
                    "rotateY(0deg)";

            }
        );
    }


    /* =========================================================
       HERO 3D TILT
    ========================================================= */

    var hero =
        document.querySelector(
            ".person-hero .hero-content"
        );


    if (hero) {

        hero.addEventListener(
            "mousemove",
            function (event) {

                var rect =
                    hero.getBoundingClientRect();

                var x =
                    event.clientX -
                    rect.left;

                var y =
                    event.clientY -
                    rect.top;

                var centerX =
                    rect.width / 2;

                var centerY =
                    rect.height / 2;

                var rotateX =
                    ((y - centerY) /
                        centerY) * -2;

                var rotateY =
                    ((x - centerX) /
                        centerX) * 2;

                hero.style.transform =
                    "perspective(1200px) " +
                    "rotateX(" +
                    rotateX +
                    "deg) " +
                    "rotateY(" +
                    rotateY +
                    "deg)";

            }
        );


        hero.addEventListener(
            "mouseleave",
            function () {

                hero.style.transform =
                    "perspective(1200px) " +
                    "rotateX(0deg) " +
                    "rotateY(0deg)";

            }
        );
    }


    /* =========================================================
       HEADING GLOW
    ========================================================= */

    var headings =
        document.querySelectorAll(
            ".story-info h2, " +
            ".impact-section h2, " +
            ".impact-card h3"
        );


    headings.forEach(
        function (heading) {

            heading.addEventListener(
                "mouseenter",
                function () {

                    heading.classList.add(
                        "heading-glow"
                    );

                }
            );


            heading.addEventListener(
                "mouseleave",
                function () {

                    heading.classList.remove(
                        "heading-glow"
                    );

                }
            );

        }
    );


    /* =========================================================
       MAGNETIC BACK BUTTON
    ========================================================= */

    var buttons =
        document.querySelectorAll(
            ".back-button"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "mousemove",
                function (event) {

                    var rect =
                        button.getBoundingClientRect();

                    var x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    var y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;

                    button.style.transform =
                        "translate(" +
                        x * 0.15 +
                        "px, " +
                        y * 0.15 +
                        "px)";

                }
            );


            button.addEventListener(
                "mouseleave",
                function () {

                    button.style.transform =
                        "translate(0, 0)";

                }
            );

        }
    );


    /* =========================================================
       SCROLL PARALLAX
    ========================================================= */

    window.addEventListener(
        "scroll",
        function () {

            var scroll =
                window.scrollY;

            var glows =
                background.querySelectorAll(
                    ".space-glow"
                );

            glows.forEach(
                function (glow, index) {

                    glow.style.marginTop =
                        scroll *
                        (0.015 + index * 0.008) +
                        "px";

                }
            );

        }
    );


    /* =========================================================
       FALLBACK — MAKE STORY VISIBLE
       AFTER PAGE LOAD
    ========================================================= */

    setTimeout(
        function () {

            document.querySelectorAll(
                ".story-text p"
            ).forEach(
                function (paragraph) {

                    paragraph.classList.add(
                        "story-visible"
                    );

                }
            );


            document.querySelectorAll(
                ".reveal"
            ).forEach(
                function (element) {

                    element.classList.add(
                        "active"
                    );

                }
            );

        },
        1800
    );


    /* =========================================================
       PAGE LOADED
    ========================================================= */

    document.body.classList.add(
        "page-loaded"
    );


    console.log(
        "Hidden Legends 3D system loaded successfully."
    );

});