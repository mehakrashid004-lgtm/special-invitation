
/* =====================================================
   GET ALL ELEMENTS
===================================================== */

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");
const page4 = document.getElementById("page4");

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

const noMessage = document.getElementById("noMessage");

const dateInput = document.getElementById("dateInput");
const dateNext = document.getElementById("dateNext");
const dateBack = document.getElementById("dateBack");

const timeInput = document.getElementById("timeInput");
const timeBack = document.getElementById("timeBack");
const confirmButton = document.getElementById("confirmButton");

const datePreview = document.getElementById("datePreview");
const chosenDate = document.getElementById("chosenDate");

const karachiTime = document.getElementById("karachiTime");

const finalDate = document.getElementById("finalDate");
const finalTime = document.getElementById("finalTime");


/* =====================================================
   PAGE FUNCTION
===================================================== */

function showPage(page) {

    page1.classList.remove("active");
    page2.classList.remove("active");
    page3.classList.remove("active");
    page4.classList.remove("active");

    page.classList.add("active");
}


/* =====================================================
   NO BUTTON
   THIS BUTTON WILL KEEP MOVING
===================================================== */

let noCount = 0;


/*
   This function moves the NO button
   anywhere on the phone screen.
*/

function moveNoButton() {

    noCount++;


    /* ---------------------------------------------
       Make sure the button is visible
    --------------------------------------------- */

    noButton.style.display = "block";


    /* ---------------------------------------------
       IMPORTANT:
       fixed = whole screen, NOT the card
    --------------------------------------------- */

    noButton.style.position = "fixed";


    /* ---------------------------------------------
       Get button size
    --------------------------------------------- */

    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;


    /* ---------------------------------------------
       Space from screen edges
    --------------------------------------------- */

    const padding = 20;


    /* ---------------------------------------------
       Calculate available screen area
    --------------------------------------------- */

    const maxLeft =
        window.innerWidth -
        buttonWidth -
        padding;


    const maxTop =
        window.innerHeight -
        buttonHeight -
        padding;


    /* ---------------------------------------------
       RANDOM X POSITION
       Left ↔ Right
    --------------------------------------------- */

    const randomLeft =
        Math.floor(
            Math.random() *
            (maxLeft - padding)
        ) + padding;


    /* ---------------------------------------------
       RANDOM Y POSITION
       Top ↕ Bottom
    --------------------------------------------- */

    const randomTop =
        Math.floor(
            Math.random() *
            (maxTop - padding)
        ) + padding;


    /* ---------------------------------------------
       MOVE BUTTON
    --------------------------------------------- */

    noButton.style.left =
        randomLeft + "px";

    noButton.style.top =
        randomTop + "px";


    /* ---------------------------------------------
       Funny messages
    --------------------------------------------- */

    if (noCount === 1) {

        noMessage.innerHTML =
            "HAHAHA nice try 😭🤍";

    }

    else if (noCount === 2) {

        noMessage.innerHTML =
            "Oops! I moved 😂";

    }

    else if (noCount === 3) {

        noMessage.innerHTML =
            "Catch me if you can 🏃😭";

    }

    else if (noCount === 4) {

        noMessage.innerHTML =
            "Why are you chasing me? 😭😂";

    }

    else if (noCount === 5) {

        noMessage.innerHTML =
            "The NO button is running away 😭";

    }

    else {

        noMessage.innerHTML =
            "Bro just press YES already 😭🤍";

    }

}


/* =====================================================
   DESKTOP
   Mouse cursor NO button ke paas jayega
   to button move karega.
===================================================== */

noButton.addEventListener(
    "mouseenter",
    function () {

        moveNoButton();

    }
);


/* =====================================================
   MOBILE
   Finger NO button ko touch karegi
   to button turant move karega.
===================================================== */

noButton.addEventListener(
    "touchstart",
    function (event) {

        /*
           Browser ka normal click rok do
           taake page change na ho.
        */

        event.preventDefault();

        event.stopPropagation();


        /*
           Move button
        */

        moveNoButton();

    },
    {
        passive: false
    }
);


/* =====================================================
   CLICK
   NO button kabhi page change nahi karega.
===================================================== */

noButton.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        event.stopPropagation();

        moveNoButton();

    }
);


/* =====================================================
   YES BUTTON
===================================================== */

yesButton.addEventListener(
    "click",
    function () {

        /*
           YES press karne par
           Date page open hoga.
        */

        showPage(page2);


        /*
           Karachi ki current date
        */

        dateInput.min =
            getKarachiDate();


        /*
           NO button ko ab hide kar sakte hain
           kyunki hum Page 2 par aa gaye hain.
        */

        noButton.style.display = "none";

    }
);


/* =====================================================
   KARACHI DATE
===================================================== */

function getKarachiDate() {

    const now = new Date();


    const parts =
        new Intl.DateTimeFormat(
            "en-CA",
            {
                timeZone: "Asia/Karachi",

                year: "numeric",

                month: "2-digit",

                day: "2-digit"
            }
        ).formatToParts(now);


    let year = "";
    let month = "";
    let day = "";


    parts.forEach(function (part) {

        if (part.type === "year") {

            year = part.value;

        }

        if (part.type === "month") {

            month = part.value;

        }

        if (part.type === "day") {

            day = part.value;

        }

    });


    return `${year}-${month}-${day}`;

}


/* =====================================================
   DATE SELECT
===================================================== */

dateInput.addEventListener(
    "change",
    function () {

        if (!dateInput.value) {

            datePreview.innerHTML =
                "Select a date above ♡";

            return;

        }


        const date =
            new Date(
                dateInput.value +
                "T00:00:00"
            );


        const formatted =
            date.toLocaleDateString(
                "en-PK",
                {
                    weekday: "long",

                    day: "numeric",

                    month: "long",

                    year: "numeric"
                }
            );


        datePreview.innerHTML =
            "♡ " + formatted;

    }
);


/* =====================================================
   DATE → TIME PAGE
===================================================== */

dateNext.addEventListener(
    "click",
    function () {

        if (!dateInput.value) {

            datePreview.innerHTML =
                "Please choose a day first 🥺";

            return;

        }


        const date =
            new Date(
                dateInput.value +
                "T00:00:00"
            );


        const formatted =
            date.toLocaleDateString(
                "en-PK",
                {
                    weekday: "long",

                    day: "numeric",

                    month: "long",

                    year: "numeric"
                }
            );


        chosenDate.innerHTML =
            formatted;


        showPage(page3);


        updateKarachiClock();

    }
);


/* =====================================================
   BACK → PAGE 1
===================================================== */

dateBack.addEventListener(
    "click",
    function () {

        showPage(page1);


        /*
           NO button ko wapas show karo.
        */

        noButton.style.display = "block";


        /*
           IMPORTANT:
           Wapas card ke andar reset nahi karna.
           Isko screen par random position par rakho.
        */

        noButton.style.position = "fixed";

        noButton.style.left = "50%";

        noButton.style.top = "65%";

    }
);


/* =====================================================
   BACK → DATE PAGE
===================================================== */

timeBack.addEventListener(
    "click",
    function () {

        showPage(page2);

    }
);


/* =====================================================
   KARACHI LIVE CLOCK
===================================================== */

function updateKarachiClock() {

    const now = new Date();


    const time =
        new Intl.DateTimeFormat(
            "en-PK",
            {
                timeZone: "Asia/Karachi",

                hour: "2-digit",

                minute: "2-digit",

                second: "2-digit",

                hour12: true
            }
        ).format(now);


    karachiTime.innerHTML =
        time;

}


updateKarachiClock();


setInterval(
    updateKarachiClock,
    1000
);


/* =====================================================
   CONFIRM TIME
===================================================== */

confirmButton.addEventListener(
    "click",
    function () {

        if (!timeInput.value) {

            alert(
                "Please choose a time first 🥺"
            );

            return;

        }


        /* ---------------------------------------------
           FORMAT DATE
        --------------------------------------------- */

        const date =
            new Date(
                dateInput.value +
                "T00:00:00"
            );


        const formattedDate =
            date.toLocaleDateString(
                "en-PK",
                {
                    weekday: "long",

                    day: "numeric",

                    month: "long",

                    year: "numeric"
                }
            );


        /* ---------------------------------------------
           FORMAT TIME
        --------------------------------------------- */

        const timeParts =
            timeInput.value.split(":");


        let hour =
            parseInt(timeParts[0]);


        const minutes =
            timeParts[1];


        const ampm =
            hour >= 12
                ? "PM"
                : "AM";


        hour =
            hour % 12 || 12;


        const formattedTime =
            `${hour}:${minutes} ${ampm}`;


        /* ---------------------------------------------
           FINAL PAGE
        --------------------------------------------- */

        finalDate.innerHTML =
            formattedDate;


        finalTime.innerHTML =
            formattedTime;


        showPage(page4);


        createConfetti();

    }
);


/* =====================================================
   CONFETTI
===================================================== */

function createConfetti() {

    const symbols = [
        "♡",
        "♥",
        "✦",
        "✧",
        "✨"
    ];


    for (
        let i = 0;
        i < 80;
        i++
    ) {

        const piece =
            document.createElement("div");


        piece.innerHTML =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        piece.style.position =
            "fixed";


        piece.style.left =
            Math.random() *
            100 +
            "vw";


        piece.style.top =
            "-30px";


        piece.style.fontSize =
            14 +
            Math.random() *
            22 +
            "px";


        piece.style.zIndex =
            "9999";


        document.body.appendChild(
            piece
        );


        const animation =
            piece.animate(
                [
                    {
                        transform:
                            "translateY(0) rotate(0deg)",

                        opacity: 1
                    },

                    {
                        transform:
                            `translateY(110vh)
                             rotate(${Math.random() * 720}deg)`,

                        opacity: 0
                    }
                ],
                {
                    duration:
                        1800 +
                        Math.random() *
                        2500,

                    easing:
                        "ease-out"
                }
            );


        animation.onfinish =
            function () {

                piece.remove();

            };

    }

}
    
