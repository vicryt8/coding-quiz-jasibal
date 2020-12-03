var deleteBtns: NodeListOf<HTMLElement>;
var highscoreTable = document.querySelector("#highscores") as HTMLElement;

type scoreType = {
	score: number;
	initial: string;
	id: string;
};
var scoreArray: scoreType[] = [];

function init(): void {
	for (var i = 0; i < localStorage.length; i++) {
		var storedScoreNames = localStorage.key(i)!;
		if (storedScoreNames.search("quiz-score") !== -1) {
			scoreArray.push(JSON.parse(localStorage.getItem(storedScoreNames)!));
		}
	}
	scoreArray.sort((a, b) => b.score - a.score);
	loadTable();
}
function loadTable(): void {
	for (var i = 0; i < scoreArray.length; i++) {
		var newTablerow = document.createElement("tr");
		newTablerow.setAttribute("id", scoreArray[i].id);
		var rankData = "<td>" + String(i + 1) + "</td>";
		var deleteData = "<td data-deleteid=" + scoreArray[i].id + '><button class="btn red delete">Delete</button></td>';
		var initialsData = "<td>" + scoreArray[i].initial.toUpperCase() + "  " + "</td>";
		var scoreData = "<td>" + String(scoreArray[i].score) + "</td>";
		newTablerow.innerHTML = rankData + initialsData + scoreData + deleteData;
		highscoreTable.append(newTablerow);
	}
	deleteBtns = document.querySelectorAll(".btn.red.delete");
	deleteBtns.forEach((item) => {
		item.addEventListener("click", (event: MouseEvent) => deleteRow(event));
	});
}
function deleteRow(event: MouseEvent): void {
	var deleteID = String((<HTMLElement>(<HTMLElement>event.target).parentNode).dataset.deleteid);
	localStorage.removeItem("quiz-score-" + deleteID);
	document.querySelector(`#${CSS.escape(deleteID)}`)!.remove();
}

init();
