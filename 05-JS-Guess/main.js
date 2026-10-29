"use strict";

let randomNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;
let inputt = 0;

function playerWin(){
    Swal.fire("Win Game 🥇");
    document.querySelector(".message").textContent = "Correct Number";
    document.querySelector(".number").textContent = inputt;
    document.querySelector("body").style.backgroundColor = "#25750d";
    document.querySelector(".check").style.backgroundColor = "#25750d";
    document.querySelector(".check").style.color = "#25750d";
    document.querySelector(".check").classList.remove();
    if (highscore < score) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }
    document.querySelector(".guess").value = 0;
}
function playerlose(){
    score = 0;
    Swal.fire("Lose Game ⛔");
    document.querySelector(".message").textContent = "Not Guess 😅";
    document.querySelector("body").style.backgroundColor = "#b30000";
    document.querySelector(".check").style.backgroundColor = "#b30000";
    document.querySelector(".check").style.color = "#b30000";
    document.querySelector(".check").classList.remove();
    document.querySelector(".guess").value = -1;
}
function LowerinputNumber(){
document.querySelector(".message").textContent = "Low inputNumber!";
}
function HigherinputNumber(){
document.querySelector(".message").textContent = "Hight inputNumber!";
}

document.querySelector(".check").addEventListener("click", function () {
  inputt = +(document.querySelector(".guess").value);
  score--;
  document.querySelector(".label-score .score").textContent = score;
  if (score <= 0) {
    playerlose();
  } else if (randomNumber === inputt) {
    playerWin();
  } else if (randomNumber > inputt) {
    LowerinputNumber();
  } else {
    HigherinputNumber()
  }
});
document.querySelector(".again").addEventListener("click", function () {
  document.querySelector(".message").textContent = "Start Guessing... ";
  score = 20;
  document.querySelector(".label-score .score").textContent = score;
  randomNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector(".number").textContent = "?";
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".guess").value = 0;
  document.querySelector(".check").style.backgroundColor = "#eee";
  document.querySelector(".check").style.color = "#222";
});
