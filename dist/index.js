"use strict";
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
        respectOrder: false,
    },
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
        respectOrder: false,
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses",
        respectOrder: false,
    },
    {
        title: "Arrays in JavaScript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above",
        respectOrder: true,
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes",
        respectOrder: false,
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log",
        respectOrder: false,
    },
    {
        title: "YEET",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
        respectOrder: false,
    },
    {
        title: "Tquestion ",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses",
        respectOrder: false,
    },
    {
        title: "Question 8",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above",
        respectOrder: true,
    },
    {
        title: "Questino 9",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes",
        respectOrder: false,
    },
    {
        title: "Question 10",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log",
        respectOrder: false,
    },
];
const maxTime = 75;
const penalty = 10;
var startContainer = document.querySelector("#start-container");
var quizContainer = document.querySelector("#quiz-container");
var finishContainer = document.querySelector("#finish-container");
var startButton = document.querySelector("#start");
var retryButton = document.querySelector("#retry");
var anwerBtns = document.querySelectorAll(".answer.btn.purple");
var submitButton = document.querySelector("#submit");
var timerElement = document.querySelector("#time");
var quizHeader = document.querySelector("#quiz-question");
var quizNumber = document.querySelector("#quiz-number");
var quizScore = document.querySelector("#score");
var quizResult = document.querySelector("#result");
var initials = document.querySelector("#initials");
var submitStatus = document.querySelector("#submit-status");
var q = 0;
var currentTime = maxTime + 1;
var quizComplete = false;
var quizTimer;
var textFade;
var questionOrder;
var submitted = false;
var charBounds = [[0], [97, 122], [65, 90], [48, 57]];
function initQuizState(fromContainer) {
    submitStatus.textContent = "";
    questionOrder = genNumberArray(0, questions.length - 1, false);
    newQuizTimer();
    quizTimer = setInterval(newQuizTimer, 1000);
    displayElements(fromContainer, quizContainer);
    displayQuestion();
    submitted = false;
}
function newQuizTimer() {
    validateTime();
    currentTime--;
    if (currentTime >= 0) {
        timerElement.textContent = "Time Remaining: " + String(currentTime);
    }
}
function validateTime() {
    if (currentTime <= 0 && quizComplete === false) {
        endQuiz(0);
    }
}
function displayQuestion() {
    quizNumber.textContent = "Question " + String(q + 1) + "/" + String(questions.length);
    quizHeader.textContent = questions[questionOrder[q]].title;
    var answerOrder = genNumberArray(0, questions[questionOrder[q]].choices.length - 1, questions[questionOrder[q]].respectOrder);
    for (var i = 0; i < 4; i++) {
        document.querySelector("#" + "option-" + String(i + 1)).innerHTML = String(i + 1) + ". " + questions[questionOrder[q]].choices[answerOrder[i]];
    }
}
function validateAnwer(event) {
    quizResult.classList.remove("fade-out");
    clearTimeout(textFade);
    if (q < questions.length - 1) {
        var incorrectPenalty = event.target.innerText.search(questions[questionOrder[q]].answer) > 0 ? 0 : penalty;
        currentTime = currentTime - incorrectPenalty > 0 ? currentTime - incorrectPenalty : 0;
        timerElement.textContent = "Time Remaining: " + String(currentTime);
        var isCorrect = incorrectPenalty === 0 ? "Correct 😀" : "Wrong 😣";
        q++;
        displayQuestion();
        displayFade(quizResult, isCorrect);
    }
    else {
        quizComplete = true;
        endQuiz(currentTime);
    }
    validateTime();
}
function displayFade(fadeContainer, fadeText) {
    fadeContainer.textContent = fadeText;
    fadeContainer.setAttribute("class", "fade-out");
    textFade = setTimeout(() => {
        fadeContainer.textContent = "";
    }, 2800);
}
function endQuiz(score) {
    clearInterval(quizTimer);
    clearTimeout(textFade);
    displayElements(quizContainer, finishContainer);
    quizResult.textContent = "";
    quizScore.textContent = String(score);
    currentTime = maxTime + 1;
    q = 0;
    quizComplete = false;
    quizTimer = null;
}
function displayElements(hideElement, showElement) {
    hideElement.style.display = "none";
    showElement.style.display = "block";
}
function genNumberArray(start, end, respectOrder) {
    var sequentialArray = Array(end - start + 1)
        .fill(0)
        .map((item, index) => start + index);
    var randomisedArray = [...sequentialArray];
    for (let i = randomisedArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randomisedArray[i], randomisedArray[j]] = [randomisedArray[j], randomisedArray[i]];
    }
    return respectOrder ? sequentialArray : randomisedArray;
}
function submitScore() {
    var submitMessage = submitted ? "Already submitted a highscore! Retry the quiz to submit another highscore" : "Submitted!";
    clearTimeout(textFade);
    submitStatus.classList.remove("fade-out");
    var userInitials = initials.value;
    if (!(userInitials.length <= 3) && !(userInitials.length === 0) && submitted === false) {
        alert("Please enter valid initials");
        submitMessage = "Try again!";
    }
    else if (!submitted) {
        var newScoreEntry = {
            score: Number(quizScore.textContent),
            initial: userInitials,
            id: generateRandomID(5),
        };
        localStorage.setItem("quiz-score-" + newScoreEntry.id, JSON.stringify(newScoreEntry));
        submitted = true;
        initials.value = "";
    }
    textFade = setTimeout(() => displayFade(submitStatus, submitMessage), 10);
}
function generateRandomID(length) {
    var generatedID = "";
    for (var n = 0; n < length; n++) {
        var randCharBound = generateRandomInt(1, charBounds.length - 1);
        generatedID = generatedID + String.fromCharCode(generateRandomInt(charBounds[randCharBound][0], charBounds[randCharBound][1]));
    }
    return generatedID;
}
function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
anwerBtns.forEach((item) => {
    item.addEventListener("click", (event) => validateAnwer(event));
});
startButton.addEventListener("click", () => initQuizState(startContainer));
retryButton.addEventListener("click", () => initQuizState(finishContainer));
submitButton.addEventListener("click", () => submitScore());
