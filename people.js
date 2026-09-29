/* =========================================================
   HIDDEN LEGENDS — INTRO LIGHT REVEAL
========================================================= */

const introScreen = document.getElementById("introScreen");
const introSparrow = document.getElementById("introSparrow");
const introPrompt = document.querySelector(".intro-prompt");

let introStarted = false;


/* =========================================================
   ENTER HIDDEN LEGENDS
========================================================= */

function enterHiddenLegends() {

    if (introStarted) return;

    introStarted = true;

    /* Start the light coming from the sparrow */
    introScreen.classList.add("light-reveal");

    /*
       Wait until the light has completely covered
       the screen before removing the intro.
    */

    setTimeout(() => {

        introScreen.classList.add("finished");

    }, 1750);

}


/* =========================================================
   CLICK SPARROW
========================================================= */

if (introSparrow) {

    introSparrow.addEventListener(
        "click",
        enterHiddenLegends
    );

}


/* =========================================================
   CLICK "CLICK TO ENTER"
========================================================= */

if (introPrompt) {

    introPrompt.addEventListener(
        "click",
        enterHiddenLegends
    );

}


/* =========================================================
   HIDDEN LEGENDS — BOOK NAVIGATION
========================================================= */

const spreads =
    document.querySelectorAll(".book-spread");

const previousButton =
    document.getElementById("previousPage");

const nextButton =
    document.getElementById("nextPage");

const bookPosition =
    document.getElementById("bookPosition");


/* =========================================================
   MOBILE BOOK HEIGHT
========================================================= */

function updateMobileBookHeight() {

    const book =
        document.getElementById("legendBook");

    if (!book) return;


    /*
       Desktop uses the original book layout.
       Remove the JS height on larger screens.
    */

    if (window.innerWidth > 600) {

        book.style.height = "";

        return;

    }


    /*
       Find the currently visible spread.
    */

    const activeSpread =
        document.querySelector(
            ".book-spread.active"
        );

    if (!activeSpread) return;


    /*
       Give the book exactly enough height
       for the active mobile page.
    */

    book.style.height =
        activeSpread.scrollHeight + "px";

}


/* =========================================================
   PAGE NAMES
========================================================= */

const pageNames = [

    "CONTENTS",
    "CHRISTIAN",
    "COURAGE & RESCUE",
    "HUMANITARIANS",
    "EXPLORERS",
    "SPACE",
    "SCIENCE & DISCOVERY"

];


/* =========================================================
   SETTINGS
========================================================= */

const TURN_DURATION = 900;

let currentPage = 0;

let isTurning = false;


/* =========================================================
   UPDATE BUTTONS / POSITION
========================================================= */

function updateControls() {

    if (bookPosition) {

        bookPosition.textContent =
            pageNames[currentPage] ||
            "CONTENTS";

    }


    if (previousButton) {

        previousButton.disabled =
            currentPage === 0;

    }


    if (nextButton) {

        nextButton.disabled =
            currentPage === spreads.length - 1;

    }

}


/* =========================================================
   CLEAR ANIMATION CLASSES
========================================================= */

function clearAnimationClasses() {

    spreads.forEach((spread, index) => {

        spread.classList.remove(

            "turn-next",
            "turn-prev",
            "enter-next",
            "enter-prev"

        );

        spread.style.zIndex = "";


        if (index === 0) {

            spread.classList.add("active");

        }

    });


    currentPage = 0;

    updateControls();

    updateMobileBookHeight();

}


/* =========================================================
   PAGE TURN
========================================================= */

function turnPage(targetPage) {

    /*
       Don't allow:
       - clicking the current page
       - turning beyond the book
       - another turn while animation is running
    */

    if (isTurning) {

        return;

    }


    if (

        targetPage < 0 ||
        targetPage >= spreads.length ||
        targetPage === currentPage

    ) {

        return;

    }


    isTurning = true;


    const oldPage =
        spreads[currentPage];

    const newPage =
        spreads[targetPage];

    const movingForward =
        targetPage > currentPage;


    /* =====================================================
       PREPARE NEW PAGE
    ===================================================== */

    newPage.classList.remove(

        "active",
        "turn-next",
        "turn-prev",
        "enter-next",
        "enter-prev"

    );


    oldPage.classList.remove(

        "turn-next",
        "turn-prev",
        "enter-next",
        "enter-prev"

    );


    /*
       Put the new page underneath
       the page being turned.
    */

    newPage.style.zIndex = "1";

    oldPage.style.zIndex = "5";


    newPage.classList.add(

        movingForward
            ? "enter-next"
            : "enter-prev"

    );


    /*
       Force the browser to register
       the starting animation state.
    */

    void newPage.offsetWidth;


    oldPage.classList.add(

        movingForward
            ? "turn-next"
            : "turn-prev"

    );


    /*
       The new page becomes active
       during the animation.
    */

    newPage.classList.add("active");


    currentPage =
        targetPage;


    updateControls();

    updateMobileBookHeight();


    /* =====================================================
       FINISH ANIMATION
    ===================================================== */

    setTimeout(() => {

        oldPage.classList.remove(

            "active",
            "turn-next",
            "turn-prev",
            "enter-next",
            "enter-prev"

        );


        newPage.classList.remove(

            "turn-next",
            "turn-prev",
            "enter-next",
            "enter-prev"

        );


        newPage.classList.add("active");


        oldPage.style.zIndex = "";

        newPage.style.zIndex = "";


        isTurning = false;


        /*
           Recalculate the mobile book height
           after the page-turn animation.
        */

        updateMobileBookHeight();


        /*
           Keep the book at the top after turning.
        */

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });


    }, 760);

}


/* =========================================================
   NEXT BUTTON
========================================================= */

if (nextButton) {

    nextButton.onclick = () => {

        goToPage(
            currentPage + 1
        );

    };

}


/* =========================================================
   PREVIOUS BUTTON
========================================================= */

if (previousButton) {

    previousButton.onclick = () => {

        goToPage(
            currentPage - 1
        );

    };

}


/* =========================================================
   CONTENTS CATEGORY LINKS
========================================================= */

const pageLinks =
    document.querySelectorAll("[data-go-to]");


pageLinks.forEach(link => {

    link.onclick = event => {

        event.preventDefault();


        const targetPage =
            Number(
                link.getAttribute(
                    "data-go-to"
                )
            );


        if (!Number.isNaN(targetPage)) {

            goToPage(targetPage);

        }

    };

});


/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
           Don't interfere with typing
           into an input.
        */

        const activeElement =
            document.activeElement;


        if (

            activeElement &&
            (
                activeElement.tagName === "INPUT" ||
                activeElement.tagName === "TEXTAREA" ||
                activeElement.isContentEditable
            )

        ) {

            return;

        }


        if (event.key === "ArrowRight") {

            event.preventDefault();

            goToPage(
                currentPage + 1
            );

        }


        if (event.key === "ArrowLeft") {

            event.preventDefault();

            goToPage(
                currentPage - 1
            );

        }

    }
);


/* =========================================================
   URL HASH
========================================================= */

const hashPages = {

    christian: 1,

    courage: 2,

    humanitarians: 3,

    explorers: 4,

    space: 5,

    science: 6

};


/* =========================================================
   OPEN HASH PAGE
========================================================= */

function openHashPage() {

    const hash =
        window.location.hash
            .replace("#", "")
            .toLowerCase();


    if (

        hash &&
        Object.prototype.hasOwnProperty.call(
            hashPages,
            hash
        )

    ) {

        const targetPage =
            hashPages[hash];


        /*
           Start directly on the requested
           category when the page loads.
        */

        spreads.forEach(
            (spread, index) => {

                spread.classList.remove(

                    "active",
                    "turn-next",
                    "turn-prev",
                    "enter-next",
                    "enter-prev"

                );


                spread.style.zIndex = "";


                if (index === targetPage) {

                    spread.classList.add(
                        "active"
                    );

                }

            }
        );


        currentPage =
            targetPage;


        updateControls();

    }

}


/* =========================================================
   UPDATE HASH WHEN TURNING
========================================================= */

function updateHash(pageNumber) {

    const hashNames = [

        "",

        "christian",

        "courage",

        "humanitarians",

        "explorers",

        "space",

        "science"

    ];


    const hash =
        hashNames[pageNumber];


    if (!hash) {

        history.replaceState(

            null,

            "",

            window.location.pathname +
            window.location.search

        );

        return;

    }


    history.replaceState(

        null,

        "",

        "#" + hash

    );

}


/* =========================================================
   HASH-AWARE PAGE TURNING
========================================================= */

function goToPage(targetPage) {

    if (isTurning) {

        return;

    }


    if (

        targetPage < 0 ||
        targetPage >= spreads.length ||
        targetPage === currentPage

    ) {

        return;

    }


    turnPage(targetPage);

    updateHash(targetPage);

}


/* =========================================================
   BROWSER BACK / FORWARD
========================================================= */

window.addEventListener(
    "hashchange",
    () => {

        const hash =
            window.location.hash
                .replace("#", "")
                .toLowerCase();


        if (

            hash &&
            Object.prototype.hasOwnProperty.call(
                hashPages,
                hash
            )

        ) {

            const targetPage =
                hashPages[hash];


            /*
               If already on the requested page,
               do nothing.
            */

            if (
                targetPage === currentPage
            ) {

                return;

            }


            /*
               For browser navigation,
               switch pages without creating
               another history entry.
            */

            spreads.forEach(
                (spread, index) => {

                    spread.classList.remove(

                        "active",
                        "turn-next",
                        "turn-prev",
                        "enter-next",
                        "enter-prev"

                    );


                    spread.style.zIndex = "";


                    if (
                        index === targetPage
                    ) {

                        spread.classList.add(
                            "active"
                        );

                    }

                }
            );


            currentPage =
                targetPage;


            updateControls();

            updateMobileBookHeight();

        }

    }
);


/* =========================================================
   INITIALIZE BOOK
========================================================= */

/*
   The first spread already has
   class="active" in the HTML,
   so no separate initializeBook()
   function is needed.
*/

openHashPage();

updateControls();

updateMobileBookHeight();


/* =========================================================
   WINDOW RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        updateMobileBookHeight();

    }
);
