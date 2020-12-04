"use strict";
var deleteBtns;
var highscoreTable = document.querySelector("#highscores");
var scoreArray = [];
function init() {
    for (var i = 0; i < localStorage.length; i++) {
        var storedScoreNames = localStorage.key(i);
        if (storedScoreNames.search("quiz-score") !== -1) {
            scoreArray.push(JSON.parse(localStorage.getItem(storedScoreNames)));
        }
    }
    scoreArray.sort((a, b) => b.score - a.score);
    loadTable();
}
function loadTable() {
    for (var i = 0; i < scoreArray.length; i++) {
        var newTablerow = document.createElement("tr");
        newTablerow.setAttribute("id", scoreArray[i].id);
        var rankData = "<td class=rank>" + String(i + 1) + "</td>";
        var deleteData = "<td data-deleteid=" + scoreArray[i].id + '><button class="btn red delete">Delete</button></td>';
        var initialsData = "<td>" + scoreArray[i].initial.toUpperCase() + "</td>";
        var scoreData = "<td>" + String(scoreArray[i].score) + "</td>";
        newTablerow.innerHTML = rankData + initialsData + scoreData + deleteData;
        highscoreTable.append(newTablerow);
    }
    deleteBtns = document.querySelectorAll(".btn.red.delete");
    deleteBtns.forEach((item) => {
        item.addEventListener("click", (event) => deleteRow(event));
    });
}
function deleteRow(event) {
    var deleteID = String(event.target.parentNode.dataset.deleteid);
    localStorage.removeItem("quiz-score-" + deleteID);
    document.querySelector(`#${CSS.escape(deleteID)}`).remove();
    var remainingRow = document.querySelectorAll(".rank");
    remainingRow.forEach((item, index) => {
        item.textContent = String(index + 1);
    });
}
init();
