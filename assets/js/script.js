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

// show intro text and start button
var gameIntro = function () {};

// start game, begin score countdown, display question and multiple choice answers,
// show feedback when picking answer then display next question, cycle through 10 questions,
// then show results
var gameStart = function () {};

// show results and input form to enter name into leaderboard
var gameEnd = function () {};

// display leaderboard and button to return to intro
var gameLeaderboard = function () {};
