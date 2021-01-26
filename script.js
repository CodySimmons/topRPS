//global
var playerWinCount = 0;
var computerWinCount = 0;

const playerButtons = document.querySelectorAll(".player-hand");

const pageContainer = document.querySelector(".page-container");

//randomizes computer's choice.
function computerPlay() {
  let computerHand = Math.floor(Math.random() * Math.floor(3)) + 1;

  switch (computerHand) {
    case 1:
      return "Rock";
      break;
    case 2:
      return "Paper";
      break;
    case 3:
      return "Scissors";
      break;
  }
}

//increases the winners score, return strings for game result,
function gameTie(playerSelection, computerSelection) {
  return `Tie! You both picked ${playerSelection}!`;
}

function gamePlayerWin(playerSelection, computerSelection) {
  playerWinCount++;
  winCounter.textContent = `${playerWinCount} - ${computerWinCount}`;
  return `You win the round! ${playerSelection} beats ${computerSelection}!`;
}

function gameComputerWin(playerSelection, computerSelection) {
  computerWinCount++;
  winCounter.textContent = `${playerWinCount} - ${computerWinCount}`;
  return `You lose the round! ${computerSelection} beats ${playerSelection}!`;
}

//take player & computer's selection, runs logic to check if a win, lose, tie
function playRound(playerSelection, computerSelection) {
  console.log(`Player Choice ${playerSelection}`);
  console.log(`Computer Choice ${computerSelection}`);

  if (playerSelection === "Rock") {
    if (computerSelection === "Rock") {
      return gameTie(playerSelection, computerSelection);
    } else if (computerSelection === "Paper") {
      return gameComputerWin(playerSelection, computerSelection);
    } else {
      return gamePlayerWin(playerSelection, computerSelection);
    }
  } else if (playerSelection === "Paper") {
    if (computerSelection === "Rock") {
      return gamePlayerWin(playerSelection, computerSelection);
    } else if (computerSelection === "Paper") {
      return gameTie(playerSelection, computerSelection);
    } else {
      return gameComputerWin(playerSelection, computerSelection);
    }
  } else if (playerSelection === "Scissors") {
    if (computerSelection === "Rock") {
      return gameComputerWin(playerSelection, computerSelection);
    } else if (computerSelection === "Paper") {
      return gamePlayerWin(playerSelection, computerSelection);
    } else {
      return gameTie(playerSelection, computerSelection);
    }
  }
}

function gameOverCheck() {
  if (playerWinCount === 5 || computerWinCount === 5) {
    if (playerWinCount === 5) {
      gameResults.textContent += `\r\nCongratulations, you win the match!`;
    } else {
      gameResults.textContent += `\r\nYou lose the match!`;
    }
    let gameOverButton = document.createElement("button");
    gameOverButton.id = "game-over";
    gameOverButton.innerText = "GAME OVER! Press to restart";
    gameOverButton.addEventListener("click", () => {
      location.reload();
    });
    playerButtons.forEach((btn) => {
      btn.setAttribute("disabled", "");
    });
    pageContainer.appendChild(gameOverButton);
  }
}

//ui
//game results text
const gameResults = document.getElementById("gameResultsDiv");
gameResults.style.cssText =
  "background-color: lightgray; font-weight: bold; color: green; border: medium solid black";
gameResults.textContent = "Please select you hand to start!";

//buttons
playerButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("rock-button")) {
      gameResults.textContent = playRound("Rock", computerPlay());
    } else if (btn.classList.contains("paper-button")) {
      gameResults.textContent = playRound("Paper", computerPlay());
    } else {
      gameResults.textContent = playRound("Scissors", computerPlay());
    }
    gameOverCheck();
  });
});

//win counter
const winCounter = document.getElementById("winCounterDiv");
winCounter.textContent = `${playerWinCount} - ${computerWinCount}`;
