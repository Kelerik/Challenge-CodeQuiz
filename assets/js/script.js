// array of names and their corresponding scores
var highscores = [];

// game status
var gameSkipped = false;
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
        question: "Which of the following is a data type?",
        choices: ["Boolean", "Letter", "Alphanumeric", "Sentence"],
    },
    {
        question:
            "What method is used to communicate with the developer without disrupting the user?",
        choices: [
            "console.log()",
            "console.alert()",
            "console.prompt()",
            "console.print()",
        ],
    },
    {
        question: "A function block must be enclosed in what?",
        choices: [
            "Curly braces",
            "Parenthesis",
            "Square brackets",
            "Quotation marks",
        ],
    },
    {
        question:
            "Which of the following options best describes an empty string?",
        choices: ["Falsy", "Truthy", "False", "True"],
    },
    {
        question:
            "The first option to consider when repeating the same task multiple times is...",
        choices: [
            "Use a loop",
            "Repeat the code",
            "Ask management for advice",
            "It's impossible",
        ],
    },
    {
        question: "What can JavaScript do in regards to the DOM?",
        choices: [
            "All of these options",
            "Modify existing text",
            "Add new text",
            "Remove existing text",
        ],
    },
    {
        question:
            "Which of the following options are NOT true about JavaScript?",
        choices: [
            "It always adapts to the website's needs",
            "It can enhance websites",
            "It can ruin websites",
            "Websites can function without it",
        ],
    },
];

var highscoreLinkEl = document.querySelector("#highscore-link");
var scoreEl = document.querySelector("#score-display");
var mainTextEl = document.querySelector("#main-text");
var subTextEl = document.querySelector("#sub-text");
var highscoreListEl = document.querySelector("#highscore-list");
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
    highscoreListEl.innerHTML = "";
    feedbackEl.textContent = "";
    createButton("Start", "start");
};

// start game, begin score countdown, display question and multiple choice answers,
// show feedback when picking answer then display next question, cycle through all questions,
// then show results
var gameStart = function () {
    // reset game status
    gameActive = true;
    gameSkipped = false;
    score = 120;
    questionIndex = 0;
    shuffleArray(quiz);

    // for better game responsiveness, update score instantly rather than waiting for the next setInterval
    updateScore();

    // start score countdown
    var countdownInterval = setInterval(function () {
        if (gameActive && score > 0) {
            score--;
            updateScore();
        } else {
            clearInterval(countdownInterval);
            // clicking the highscores link will skip the game. if that didn't happen, proceed normally
            if (!gameSkipped) {
                // this needs to be called in case the game times out
                clearButtons();
                // it's important that we don't call this function anywhere else, otherwise it could trigger twice:
                // once from that other instance, and again from this setInterval
                gameEnd();
            }
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
    hideHeader();
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
var gameHighscoreList = function () {
    mainTextEl.textContent = "Highscores";
    subTextEl.textContent = "";
    higscoreFormEl.innerHTML = "";

    // add list items, one for each saved score
    for (let i = 0; i < highscores.length; i++) {
        var newListItemEl = document.createElement("li");
        newListItemEl.textContent =
            highscores[i].savedName + ": " + highscores[i].savedScore;
        highscoreListEl.appendChild(newListItemEl);
    }

    // buttons
    createButton("Retake Quiz", "retake");
    createButton("Delete highscores", "delete");
};

// skip to the leaderboard
var skipToHighscoreList = function () {
    gameSkipped = true;
    gameActive = false;
    feedbackEl.textContent = "";
    clearButtons();
    hideHeader();
    gameHighscoreList();
};

// hide header
var hideHeader = function () {
    highscoreLinkEl.textContent = "";
    scoreEl.textContent = "";
};

// dynamically create a button in the buttons container
// btnText: the text to display in the button
// btnDataAttr: data attribute to describe the button's purpose
// btnOrder: (optional) order to display the button when multiple buttons are made
var createButton = function (btnText, btnDataAttr, btnOrder) {
    var newButtonEl = document.createElement("button");
    newButtonEl.textContent = btnText;
    newButtonEl.dataset.btnType = btnDataAttr;
    newButtonEl.style.order = btnOrder;
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
            case "retake":
                gameIntro();
                break;
            case "delete":
                highscores = [];
                highscoreListEl.innerHTML = "";
                feedbackEl.textContent = "Highscores deleted!";
                saveHighscores();
                setTimeout(function () {
                    gameIntro();
                }, 2000);
        }
    }
};

// update score on screen
var updateScore = function () {
    score = Math.max(0, score);
    scoreEl.textContent = "Timer: " + score;
};

// display next question
var displayNextQuestion = function () {
    var correctOrWrong = "";
    if (questionIndex < quiz.length) {
        // display question
        mainTextEl.textContent = quiz[questionIndex].question;
        // creat button for each choice one by one
        for (let i = 0; i < quiz[questionIndex].choices.length; i++) {
            // the FIRST item is the correct answer
            if (i === 0) {
                correctOrWrong = "correct";
            } else {
                correctOrWrong = "wrong";
            }
            createButton(
                quiz[questionIndex].choices[i],
                correctOrWrong,
                // randomize order (CSS flexbox property)
                Math.floor(Math.random() * 100)
            );
        }

        // keep track of how many questions have been done
        questionIndex++;
    } else {
        gameActive = false;
    }
};

// submit name and score to leaderboard
// this function is called when clicking the button.
var submitScoreClick = function () {
    // get the value from the input form and convert to uppercase
    var nameInput = document.querySelector("input").value.toUpperCase();
    // who ever said any input was actually required?
    if (!nameInput) {
        nameInput = "anonymous";
    }

    // add object to highscore array in order from highest score to lowest

    // if leaderboard is empty OR if score is higher than the first
    if (highscores.length === 0 || score > highscores[0].savedScore) {
        // insert at the start
        highscores.unshift({ savedName: nameInput, savedScore: score });
    } else {
        // loop backwards, starting from end
        for (let i = highscores.length - 1; i >= 0; i--) {
            // if score is lower than OR equal to current indexed score
            if (score < highscores[i].savedScore) {
                // insert after that index
                highscores.splice(i + 1, 0, {
                    savedName: nameInput,
                    savedScore: score,
                });
                break;
            }
            // if score is higher than current indexed score AND lower than previous indexed score
            else if (
                score > highscores[i].savedScore &&
                score < highscores[i - 1].savedScore
            ) {
                // insert at that index
                highscores.splice(i, 0, {
                    savedName: nameInput,
                    savedScore: score,
                });
                break;
            }
        }
    }
    // save then move onto leaderboard screen
    saveHighscores();
    gameHighscoreList();
};
// this function is called when hitting the Enter key
// we make a whole seperate function for that listener because
// the submit button is dynamically made generic, not a real "submit" type
var submitScoreEnter = function (event) {
    // prevent the page from refreshing
    event.preventDefault();
    // this is necessary because buttons are normally cleared only when clicked
    clearButtons();
    // (NOTE: do this AFTER clearing the buttons) run the real submit function
    submitScoreClick();
};

// save highscores to local storage
var saveHighscores = function () {
    // if not empty, save to local storage
    if (highscores.length > 0) {
        localStorage.setItem("savedHighscores", JSON.stringify(highscores));
    }
    // otherwise, delete from local storage
    else {
        localStorage.removeItem("savedHighscores");
    }
};

// load highscores from local storage
var loadHighscores = function () {
    var loadedHighscores = JSON.parse(localStorage.getItem("savedHighscores"));
    if (loadedHighscores) {
        highscores = loadedHighscores;
    }
};

/* Randomize array in-place using Durstenfeld shuffle algorithm */
// https://stackoverflow.com/a/12646864
var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
};

// add click listener to the "view high scores link"
highscoreLinkEl.addEventListener("click", skipToHighscoreList);
// add click listener to the buttons container
buttonsEl.addEventListener("click", buttonHandler);

// add submit listener to the form
higscoreFormEl.addEventListener("submit", submitScoreEnter);

// begin
loadHighscores();
gameIntro();
