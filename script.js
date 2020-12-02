var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses",
    },
    {
        title: "Arrays in JavaScript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above",
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes",
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
        answer: "console.log",
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
var timerElement = document.querySelector("#time");
var quizHeader = document.querySelector("#quiz-question");
var quizNumber = document.querySelector("#quiz-number");
var quizScore = document.querySelector("#score");
var quizResult = document.querySelector("#result");
var q = 0;
var currentTime = maxTime + 1;
var quizComplete = false;
var quizTimer;
var textFade;
function initQuizState(fromContainer) {
    console.log(fromContainer.id);
    newQuizTimer();
    quizTimer = setInterval(newQuizTimer, 1000);
    displayElements(fromContainer, quizContainer);
    displayQuestion(q);
}
function newQuizTimer() {
    console.log("iq: " + currentTime);
    validateTime();
    currentTime--;
    if (currentTime >= 0) {
        timerElement.textContent = "Time Remaining: " + String(currentTime);
    }
}
function validateTime() {
    console.log("vt");
    if (currentTime <= 0 && quizComplete === false) {
        endQuiz(0);
    }
}
function displayQuestion(currentQuestionIndex) {
    console.log("dq");
    quizNumber.textContent = "Question " + String(currentQuestionIndex + 1);
    quizHeader.textContent = questions[currentQuestionIndex].title;
    for (var i = 0; i < 4; i++) {
        document.querySelector("#" + "option-" + String(i + 1)).innerHTML = String(i + 1) + ". " + questions[currentQuestionIndex].choices[i];
    }
}
function displayResult(result) {
    quizResult.textContent = result;
    console.log(result);
    quizResult.setAttribute("class", "fade-out");
    textFade = setTimeout(() => {
        quizResult.textContent = "";
    }, 2200);
}
function validateAnwer(event) {
    quizResult.classList.remove("fade-out");
    clearTimeout(textFade);
    console.log("validateAnswer " + q);
    if (q < questions.length - 1) {
        var incorrectPenalty = event.target.innerText.search(questions[q].answer) > 0 ? 0 : penalty;
        currentTime = currentTime - incorrectPenalty > 0 ? currentTime - incorrectPenalty : 0;
        timerElement.textContent = "Time Remaining: " + String(currentTime);
        var isCorrect = incorrectPenalty === 0 ? "Correct 😀" : "Wrong 😣";
        q++;
        displayQuestion(q);
        displayResult(isCorrect);
    }
    else {
        quizComplete = true;
        endQuiz(currentTime);
    }
    validateTime();
}
function endQuiz(score) {
    console.log("eq: " + score);
    clearInterval(quizTimer);
    displayElements(quizContainer, finishContainer);
    currentTime = maxTime + 1;
    q = 0;
    quizResult.textContent = "";
    quizComplete = false;
    quizTimer = null;
    quizScore.textContent = String(score);
    clearTimeout(textFade);
    textFade = null;
}
function displayElements(hideElement, showElement) {
    hideElement.style.display = "none";
    showElement.style.display = "block";
}
anwerBtns.forEach((item) => {
    item.addEventListener("click", (event) => validateAnwer(event));
});
startButton.addEventListener("click", () => initQuizState(startContainer));
retryButton.addEventListener("click", () => initQuizState(finishContainer));
/* document.querySelector("#submit-hs").addEventListener("click", (event) => validateAnwer(event)); */
/* function submitHighscore():  */
/* function randomNumberArr(arrayLength: number): number[]  */
/* function displayHighscores() */
