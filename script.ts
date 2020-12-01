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
const maxTime = 10;
const penalty = 10;

var timerElement = document.querySelector("#time");
var anwerBtns = document.querySelectorAll(".answer") as NodeListOf<HTMLElement>;
var questionElement = document.querySelector("#question-display");

var q = 0;
var currentTime = maxTime + 1;
var quizComplete = false;

function initQuizState(): void {
	console.log("iq: " + currentTime);
	validateTime();
	currentTime--;
	if (currentTime === maxTime) {
		displayQuestion(q);
	}
	if (currentTime >= 0) {
		timerElement.textContent = String(currentTime);
		setTimeout(() => initQuizState(), 1000);
	}
}

function validateTime() {
	console.log("vt");
	if (currentTime <= 0 && quizComplete === false) {
		endQuiz(0);
	}
}

function displayQuestion(currentQuestionIndex: number): void {
	console.log("dq");
	questionElement.textContent = questions[currentQuestionIndex].title;
	for (var i = 0; i < 4; i++) {
		document.querySelector("#" + "option-" + String(i + 1)).innerHTML = questions[currentQuestionIndex].choices[i];
	}
}

function endQuiz(score: number) {
	console.log("eq: " + score);
	timerElement.textContent = String(currentTime);
	currentTime = 0;
	questionElement.textContent = "All Done! Your score is: " + score;
	for (let btn of anwerBtns) {
		btn.style.display = "none";
	}
}

function validateAnwer(event): void {
	console.log("validateAnswer " + q);
	if (q < questions.length - 1) {
		var incorrectPenalty = questions[q].answer === event.target.innerText ? 0 : penalty;
		currentTime = currentTime - incorrectPenalty > 0 ? currentTime - incorrectPenalty : 0;
		timerElement.textContent = String(currentTime);
		q++;
		displayQuestion(q);
	} else {
		quizComplete = true;
		endQuiz(currentTime);
	}
	validateTime();
}

anwerBtns.forEach((item) => {
	item.addEventListener("click", (event) => validateAnwer(event));
});

document.querySelector("#start").addEventListener("click", () => initQuizState());

/* document.querySelector("#submit-hs").addEventListener("click", (event) => validateAnwer(event)); */

/* function submitHighscore():  */
/* function randomNumberArr(arrayLength: number): number[]  */
/* function displayHighscores() */
