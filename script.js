let correct = document.querySelector("#l-holder");
let incorrect = document.querySelector("#r-holder");
let fallingWord = document.querySelector("#float");
let fallingArea = document.querySelector(".float-area");
let score = document.querySelector("#score");
let displaywinScore = document.querySelector(".form-container .form #display")
let scorecount = 0;
let wordbox = ["hii", "persistent", "body", "maid", "fraud", "pepcoding", "fast", "bluf", "maker", "gesture", "runner", "stammer", "glamour"];
fallingWord.innerText = wordbox[0];

function getRandom(wb) {
    let Rindex = Math.round(Math.random() * wb.length) % wb.length;
    return Rindex;
}

let posY = 0;
console.log(fallingArea);
let curWord = wordbox[0];
let matchedOrNot = false;
fallingArea.style.marginTop = 0 + "px";
let speed = 1;
let prevscore = 0;
let stopGame;
const wordFall = () => {
    if (posY >= 330) {
        const RI = getRandom(wordbox);
        fallingWord.innerText = wordbox[RI]
        if (!matchedOrNot) putWords(curWord);
        curWord = wordbox[RI];
        posY = 0;
        matchedOrNot = false;
        input.value = "";
        score.innerText = "" + scorecount;
        // speed increment code
        if (scorecount > 0 && Math.abs(scorecount - prevscore) == 5) {
            speed++;
            prevscore = scorecount;
            console.log(scorecount)
        }

    } else {
        posY += speed;
        fallingArea.style.top = posY + "px";
    }

    if (scorecount == 10) {
        cancelAnimationFrame(stopGame);
        AlertWinCondition();
    } else {
        requestAnimationFrame(wordFall);
    }
};
stopGame = requestAnimationFrame(wordFall);

//correct incorrect push code
function putWords(curWord1) {
    let word = `<div class="t-box">${curWord1}</div>`
    if (matchedOrNot === true) {
        correct.innerHTML = correct.innerHTML + word;
    } else {
        incorrect.innerHTML = incorrect.innerHTML + word;
    }
}


let input = document.querySelector(".center-box input");
console.log(input);
input.addEventListener("keypress", function(e) {
    let textEntered = input.value;
    var key = e.keyCode;
    if (key === 13) {
        if (textEntered === (curWord)) {
            matchedOrNot = true;
            putWords(curWord);
            posY = 340;
            scorecount++;
            console.log("done");
        } else {
            scorecount--;
        }
        input.value = "";
    }
});

let scoreDialog = document.querySelector(".score-alert")

function AlertWinCondition() {
    displaywinScore.innerText = scorecount;
    scoreDialog.style.display = "flex";
    console.log(stopGame)
}

let cross = document.querySelector(".cross");
cross.addEventListener("click", () => {
    scoreDialog.style.display = "none";
    location.reload();
})