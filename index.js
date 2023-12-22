"use strict";

let score = 20;
let highestScore = 0;

const message = document.querySelector("#message");
const checkBtn = document.querySelector(".check");
const restartBtn = document.querySelector(".restart");
const scoreEl = document.querySelector("#score");
const highestScoreEl = document.querySelector("#highest-score");
const secretNumberEl = document.querySelector("#secret-number");
const numberBox = document.querySelector(".number-box");

let secretNumber;
const generateSecretNumber = function() {
   secretNumber = Math.floor(Math.random() * 20) + 1;
}
generateSecretNumber();

const changeSecretBgColor = function(color) {
    numberBox.style.backgroundColor = color;
}

const displayMessage = function(messageText) {
    message.textContent = messageText;
}

const displayScore = function() {
    scoreEl.textContent = score;
}

// Check Guesses
checkBtn.addEventListener("click", function() {
    const guess = Number(document.querySelector("#guess").value);
    if(!guess) { // invalid guess
        displayMessage("⛔ Enter a number!");
    } else if(guess === secretNumber) { // correct guess
        displayMessage("🎉 Correct number!");
        secretNumberEl.textContent = secretNumber;
        displayScore();
        checkBtn.disabled = true;
        changeSecretBgColor("rgb(10, 127, 10)");
        if(score > highestScore) { // highest score check
            highestScore = score;
            highestScoreEl.textContent = highestScore;
        }
    } else if(guess !== secretNumber) { // wrong guess
        if(score > 1) {
            displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
            score--;
            displayScore();
        } else {
            scoreEl.textContent = 0;
            displayMessage("💥 You lost! Play again...");
            changeSecretBgColor("rgb(212, 5, 5)");
        }
    } 
})

// Restart Game
restartBtn.addEventListener("click", function() {
    generateSecretNumber();
    document.querySelector("#guess").value = "";
    score = 20;
    displayScore();
    changeSecretBgColor("rgb(31, 31, 31)");
    displayMessage("▶ Start guessing...")
    secretNumberEl.textContent = "?";
    checkBtn.disabled = false;
})