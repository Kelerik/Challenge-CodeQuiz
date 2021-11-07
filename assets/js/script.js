//  array of names and their corresponding scores
var highscores = [];

// current score/remaining time
var score = 0;

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
        "Welcome to the JavaScript Quiz Challenge! In this challenge, you will have a limited number of time to answer various questions. Selecting an incorrect answer will result in a time penalty, so stay get ready and stay sharp!";
    createButton("Start", "start");
};

// start game, begin score countdown, display question and multiple choice answers,
// show feedback when picking answer then display next question, cycle through 10 questions,
// then show results
var gameStart = function () {};

// show results and input form to enter name into leaderboard
var gameEnd = function () {};

// display leaderboard and button to return to intro
var gameLeaderboard = function () {};

// dynamically create a button in the buttons container
var createButton = function (btnText, btnDataAttr) {
    var newButtonEl = document.createElement("button");
    newButtonEl.textContent = btnText;
    newButtonEl.dataset.btnType = btnDataAttr;
    buttonsEl.appendChild(newButtonEl);
};

// clear all buttons
var clearButtons = function () {
    buttonsEl.innerHTML = "";
};

// begin
gameIntro();
