// array of names and their corresponding scores
var highscores = [];

// game status
var gameActive = false;
var score = 0;
var questionIndex = 0;

// all the quiz material
var quiz = [
    {
        question: "What is JavaScript?",
        // the FIRST item in the array is the correct answer
        choices: [
            "A programming language",
            "An operating system",
            "A super powerful AI",
            "A writing system used by our ancient ancestors",
        ],
    },
    {
        question: "q2",
        choices: ["a1", "a2", "a3", "a4"],
    },
    {
        question: "q3",
        choices: ["a1", "a2", "a3", "a4"],
    },
    {
        question: "q4",
        choices: ["a1", "a2", "a3", "a4"],
    },
    {
        question: "q5",
        choices: ["a1", "a2", "a3", "a4"],
    },
    {
        question: "q6",
        choices: ["a1", "a2", "a3", "a4"],
    },
    {
        question: "q7",
        choices: ["a1", "a2", "a3", "a4"],
    },
    {
        question: "q8",
        choices: ["a1", "a2", "a3", "a4"],
    },
    {
        question: "q9",
        choices: ["a1", "a2", "a3", "a4"],
    },
    {
        question: "q10",
        choices: ["a1", "a2", "a3", "a4"],
    },
];

var highscoreLinkEl = document.querySelector("#highscore-link");
var scoreEl = document.querySelector("#score-display");
var mainTextEl = document.querySelector("#main-text");
var subTextEl = document.querySelector("#sub-text");
var highscoreEl = document.querySelector("#highscore-list");
var buttonsEl = document.querySelector("#buttons-wrapper");
var higscoreFormEl = document.querySelector("#highscore-form");
var feedbackEl = document.querySelector("#feedback");

// show intro text and start button
// show link to leaderboard and timer in header
var gameIntro = function () {
    highscoreLinkEl.textContent = "View high scores";
    scoreEl.textContent = "Timer: 0";
    mainTextEl.textContent = "JavaScript Quiz Challenge";
    subTextEl.textContent =
        "Welcome to the JavaScript Quiz Challenge! In this challenge, you will have a limited number of time to answer various questions. Selecting an incorrect answer will result in a time penalty, so get ready and stay sharp!";
    createButton("Start", "start");
};

// start game, begin score countdown, display question and multiple choice answers,
// show feedback when picking answer then display next question, cycle through 10 questions,
// then show results
var gameStart = function () {
    // reset game status
    gameActive = true;
    score = 120;
    questionIndex = 0;

    // for better game responsiveness, update score instantly rather than waiting for the next setInterval
    updateScore();

    // start score countdown
    var countdownInterval = setInterval(function () {
        if (gameActive && score > 0) {
            score--;
            updateScore();
        } else {
            clearInterval(countdownInterval);
            // it's important that we don't call this function anywhere else, otherwise it could trigger twice:
            // once from that other instance, and again from this setInterval
            gameEnd();
        }
    }, 1000);

    // clear intro text and display the first question
    subTextEl.textContent = "";
    displayNextQuestion();
};

// show results and input form to enter name into leaderboard
var gameEnd = function () {
    // set flag so countdown stops
    gameActive = false;
    // display results
    mainTextEl.textContent = "All done!";
    subTextEl.textContent = "Your final score is " + score + ".";
    // hide the feedback after a set time
    setTimeout(function () {
        feedbackEl.textContent = "";
    }, 1500);
    // show input form and submit button
    higscoreFormEl.innerHTML =
        "<input type='text' placeholder='Enter your initials' maxlength='2' />";
    createButton("Submit", "submit");
};

// display leaderboard and button to return to intro
var gameLeaderboard = function () {};

// dynamically create a button in the buttons container
// btnText: the text to display in the button
// btnDataAttr: data attribute to describe the button's purpose
var createButton = function (btnText, btnDataAttr) {
    var newButtonEl = document.createElement("button");
    newButtonEl.textContent = btnText;
    newButtonEl.dataset.btnType = btnDataAttr;
    buttonsEl.appendChild(newButtonEl);
};

// simply delete ALL content in the buttons container
var clearButtons = function () {
    buttonsEl.innerHTML = "";
};

// button function
var buttonHandler = function (event) {
    // get the "btnType" data attribute from the click target
    var targetBtnType = event.target.dataset.btnType;

    // if a value was returned, we assume a button was clicked
    // in this program, the buttons always change when any are clicked,
    // so clear them now to prep for the next buttons to appear
    if (targetBtnType) {
        clearButtons();
    }

    // do things depending what button type it was
    switch (targetBtnType) {
        case "start":
            gameStart();
            break;
        case "correct":
            feedbackEl.textContent = "Correct!";
            displayNextQuestion();
            break;
        case "wrong":
            feedbackEl.textContent = "Wrong!";
            displayNextQuestion();
            score -= 10;
            // for better game responsiveness, update score instantly rather than waiting for the next setInterval
            updateScore();
            break;
        case "submit":
            submitScoreClick();
            break;
    }
};

// update score on screen
var updateScore = function () {
    score = Math.max(0, score);
    scoreEl.textContent = "Timer: " + score;
};

// display next question
var displayNextQuestion = function () {
    if (questionIndex < 10) {
        mainTextEl.textContent = quiz[questionIndex].question;
        createButton(quiz[questionIndex].choices[0], "correct");
        createButton(quiz[questionIndex].choices[1], "wrong");
        createButton(quiz[questionIndex].choices[2], "wrong");
        createButton(quiz[questionIndex].choices[3], "wrong");

        questionIndex++;
    } else {
        gameActive = false;
    }
};

// submit name and score to leaderboard
// this function is called when clicking the button.
var submitScoreClick = function () {
    // get the value from the input form
    var nameInput = document.querySelector("#highscore-form").value;
    // who ever said any input was actually required?
    if (!nameInput) {
        nameInput = "anonymous";
    }
    // append object to highscore array
    highscores.push({ savedName: nameInput, savedScore: score });
    // then move onto leaderboard screen
    gameLeaderboard();
};
// this function is called when hitting the Enter key
// we make a whole seperate function for that listener because
// the submit button is dynamically made generic, not a real "submit" type
var submitScoreEnter = function (event) {
    // prevent the page from refreshing, then run the real submit function
    event.preventDefault();
    submitScoreClick();
    // this is necessary because buttons are normally cleared only when clicked
    clearButtons();
};

// add click listener to the buttons container
buttonsEl.addEventListener("click", buttonHandler);

// add submit listener to the form
higscoreFormEl.addEventListener("submit", submitScoreEnter);

// begin
gameIntro();
