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

var startContainer = document.querySelector("#start-container") as HTMLElement;
var quizContainer = document.querySelector("#quiz-container") as HTMLElement;
var finishContainer = document.querySelector("#finish-container") as HTMLElement;

var startButton = document.querySelector("#start") as HTMLElement;
var retryButton = document.querySelector("#retry") as HTMLElement;
var anwerBtns = document.querySelectorAll(".answer.btn.purple") as NodeListOf<HTMLElement>;
var submitButton = document.querySelector("#submit") as HTMLElement;

var timerElement = document.querySelector("#time") as HTMLElement;
var quizHeader = document.querySelector("#quiz-question") as HTMLElement;
var quizNumber = document.querySelector("#quiz-number") as HTMLElement;
var quizScore = document.querySelector("#score") as HTMLElement;
var quizResult = document.querySelector("#result") as HTMLElement;
var initials = document.querySelector("#initials") as HTMLInputElement;
var submitStatus = document.querySelector("#submit-status") as HTMLElement;

var q = 0;
var currentTime = maxTime + 1;
var quizComplete = false;
var quizTimer: any;
var textFade: any;
var questionOrder: number[];
var submitted = false;

var charBounds = [[0], [97, 122], [65, 90], [48, 57]];

function initQuizState(fromContainer: HTMLElement): void {
	submitStatus.textContent = "";
	initials.value = "";
	questionOrder = genNumberArray(0, questions.length - 1, false);
	newQuizTimer();
	quizTimer = setInterval(newQuizTimer, 1000);
	displayElements(fromContainer, quizContainer);
	displayQuestion();
	submitted = false;
}
function newQuizTimer(): void {
	validateTime();
	currentTime--;
	if (currentTime >= 0) {
		timerElement.textContent = "Time Remaining: " + String(currentTime);
	}
}
function validateTime(): void {
	if (currentTime <= 0 && quizComplete === false) {
		endQuiz(0);
	}
}
function displayQuestion(): void {
	quizNumber.textContent = "Question " + String(q + 1) + "/" + String(questions.length);
	quizHeader.textContent = questions[questionOrder[q]].title;
	var answerOrder = genNumberArray(0, questions[questionOrder[q]].choices.length - 1, questions[questionOrder[q]].respectOrder);
	for (var i = 0; i < 4; i++) {
		document.querySelector("#" + "option-" + String(i + 1))!.innerHTML = String(i + 1) + ". " + questions[questionOrder[q]].choices[answerOrder[i]];
	}
}
function validateAnwer(event: MouseEvent): void {
	quizResult.classList.remove("fade-out");
	clearTimeout(textFade);
	if (q < questions.length - 1) {
		var incorrectPenalty = (<HTMLElement>event.target).innerText.search(questions[questionOrder[q]].answer) > 0 ? 0 : penalty;
		currentTime = currentTime - incorrectPenalty > 0 ? currentTime - incorrectPenalty : 0;
		timerElement.textContent = "Time Remaining: " + String(currentTime);
		var isCorrect = incorrectPenalty === 0 ? "Correct 😀" : "Wrong 😣";
		q++;
		displayQuestion();
		displayFade(quizResult, isCorrect);
	} else {
		quizComplete = true;
		endQuiz(currentTime);
	}
	validateTime();
}
function displayFade(fadeContainer: HTMLElement, fadeText: string): void {
	fadeContainer.textContent = fadeText;
	fadeContainer.setAttribute("class", "fade-out");
	textFade = setTimeout(() => {
		fadeContainer.textContent = "";
	}, 2800);
}
function endQuiz(score: number): void {
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
function displayElements(hideElement: HTMLElement, showElement: HTMLElement): void {
	hideElement.style.display = "none";
	showElement.style.display = "block";
}
function genNumberArray(start: number, end: number, respectOrder: boolean): number[] {
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
function submitScore(): void {
	var submitMessage = submitted ? "Already submitted a highscore! Retry the quiz to submit another highscore" : "Submitted!";
	clearTimeout(textFade);
	submitStatus.classList.remove("fade-out");
	var userInitials = initials.value;
	initials.value = "";
	if (!(userInitials.length <= 3) && !(userInitials.length === 0) && submitted === false) {
		alert("Please enter valid initials");
		submitMessage = "Try again!";
	} else if (!submitted) {
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
function generateRandomID(length: number): string {
	var generatedID = "";
	for (var n = 0; n < length; n++) {
		var randCharBound = generateRandomInt(1, charBounds.length - 1);
		generatedID = generatedID + String.fromCharCode(generateRandomInt(charBounds[randCharBound][0], charBounds[randCharBound][1]));
	}
	return generatedID;
}
function generateRandomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
function keyboardClick(event: KeyboardEvent): void {
	if (quizContainer.style.display !== "none") {
		console.log(event.key);
		switch (event.key) {
			case "1":
				anwerBtns[0].click();
				break;
			case "2":
				anwerBtns[1].click();
				break;
			case "3":
				anwerBtns[2].click();
				break;
			case "4":
				anwerBtns[3].click();
				break;
		}
	}
}

anwerBtns.forEach((item) => {
	item.addEventListener("click", (event: MouseEvent) => validateAnwer(event));
});

startButton.addEventListener("click", () => initQuizState(startContainer));

retryButton.addEventListener("click", () => initQuizState(finishContainer));

submitButton.addEventListener("click", () => submitScore());

document.addEventListener("keydown", (event: KeyboardEvent) => keyboardClick(event));
