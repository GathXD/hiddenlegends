
const introScreen = document.getElementById("introScreen");
const introSparrow = document.getElementById("introSparrow");
const introPrompt = document.querySelector(".intro-prompt");

let introStarted = false;

function enterHiddenLegends() {

    if (introStarted) return;

    introStarted = true;

    introScreen.classList.add("light-reveal");

    setTimeout(() => {

        introScreen.classList.add("finished");

    }, 1750);

}

if (introSparrow) {

    introSparrow.addEventListener(
        "click",
        enterHiddenLegends
    );

}

if (introPrompt) {

    introPrompt.addEventListener(
        "click",
        enterHiddenLegends
    );

}

const spreads = document.querySelectorAll(".book-spread");

const previousButton = document.getElementById("previousPage");
const nextButton = document.getElementById("nextPage");
const bookPosition = document.getElementById("bookPosition");

const pageNames = [
    "CONTENTS",
    "CHRISTIAN",
    "COURAGE & RESCUE",
    "HUMANITARIANS",
    "EXPLORERS",
    "SPACE",
    "SCIENCE & DISCOVERY"
];


const TURN_DURATION = 900;

let currentPage = 0;
let isTurning = false;


function updateControls() {

    bookPosition.textContent = pageNames[currentPage];

    previousButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === spreads.length - 1;
}

function clearAnimationClasses() {

    spreads.forEach((spread) => {

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

}

function updateControls() {

    if (bookPosition) {
        bookPosition.textContent =
            pageNames[currentPage] || "CONTENTS";
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

function turnPage(targetPage) {

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


    const oldPage = spreads[currentPage];
    const newPage = spreads[targetPage];

    const movingForward = targetPage > currentPage;
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

    newPage.style.zIndex = "1";
    oldPage.style.zIndex = "5";


    newPage.classList.add(
        movingForward ? "enter-next" : "enter-prev"
    );

    void newPage.offsetWidth;


    oldPage.classList.add(
        movingForward ? "turn-next" : "turn-prev"
    );

    newPage.classList.add("active");


    currentPage = targetPage;

    updateControls();

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

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 760);

}

if (nextButton) {

    nextButton.addEventListener("click", () => {

        turnPage(currentPage + 1);

    });

}

if (previousButton) {

    previousButton.addEventListener("click", () => {

        turnPage(currentPage - 1);

    });

}

const pageLinks = document.querySelectorAll("[data-go-to]");

pageLinks.forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        const targetPage = Number(
            link.getAttribute("data-go-to")
        );

        if (!Number.isNaN(targetPage)) {

            turnPage(targetPage);

        }

    });

});

document.addEventListener("keydown", event => {

    const activeElement = document.activeElement;

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

        turnPage(currentPage + 1);

    }


    if (event.key === "ArrowLeft") {

        event.preventDefault();

        turnPage(currentPage - 1);

    }

});

const hashPages = {

    christian: 1,
    courage: 2,
    humanitarians: 3,
    explorers: 4,
    space: 5,
    science: 6

};


function openHashPage() {

    const hash = window.location.hash
        .replace("#", "")
        .toLowerCase();


    if (
        hash &&
        Object.prototype.hasOwnProperty.call(
            hashPages,
            hash
        )
    ) {

        const targetPage = hashPages[hash];

        spreads.forEach((spread, index) => {

            spread.classList.remove(
                "active",
                "turn-next",
                "turn-prev",
                "enter-next",
                "enter-prev"
            );

            spread.style.zIndex = "";

            if (index === targetPage) {
                spread.classList.add("active");
            }

        });

        currentPage = targetPage;

        updateControls();

    }

}

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

    const hash = hashNames[pageNumber];

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

const originalTurnPage = turnPage;

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

    originalTurnPage(targetPage);

    updateHash(targetPage);

}

if (nextButton) {

    nextButton.onclick = () => {

        goToPage(currentPage + 1);

    };

}


if (previousButton) {

    previousButton.onclick = () => {

        goToPage(currentPage - 1);

    };

}


pageLinks.forEach(link => {

    link.onclick = event => {

        event.preventDefault();

        const targetPage = Number(
            link.getAttribute("data-go-to")
        );

        if (!Number.isNaN(targetPage)) {

            goToPage(targetPage);

        }

    };

});

document.addEventListener("keydown", event => {

    const activeElement = document.activeElement;

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

        goToPage(currentPage + 1);

    }


    if (event.key === "ArrowLeft") {

        event.preventDefault();

        goToPage(currentPage - 1);

    }

});

window.addEventListener("hashchange", () => {

    const hash = window.location.hash
        .replace("#", "")
        .toLowerCase();

    if (
        hash &&
        Object.prototype.hasOwnProperty.call(
            hashPages,
            hash
        )
    ) {

        const targetPage = hashPages[hash];

        if (targetPage === currentPage) {
            return;
        }

        spreads.forEach((spread, index) => {

            spread.classList.remove(
                "active",
                "turn-next",
                "turn-prev",
                "enter-next",
                "enter-prev"
            );

            spread.style.zIndex = "";

            if (index === targetPage) {
                spread.classList.add("active");
            }

        });

        currentPage = targetPage;

        updateControls();

    }

});

initializeBook();

openHashPage();
