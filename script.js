//global
var playerWinCount = 0;
var computerWinCount = 0;

const playerButtons = document.querySelectorAll(".player-hand");

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

  if (playerSelection === "rock") {
    if (computerSelection === "Rock") {
      return gameTie(playerSelection, computerSelection);
    } else if (computerSelection === "Paper") {
      return gameComputerWin(playerSelection, computerSelection);
    } else {
      return gamePlayerWin(playerSelection, computerSelection);
    }
  } else if (playerSelection === "paper") {
    if (computerSelection === "Rock") {
      return gamePlayerWin(playerSelection, computerSelection);
    } else if (computerSelection === "Paper") {
      return gameTie(playerSelection, computerSelection);
    } else {
      return gameComputerWin(playerSelection, computerSelection);
    }
  } else if (playerSelection === "scissors") {
    if (computerSelection === "Rock") {
      return gameComputerWin(playerSelection, computerSelection);
    } else if (computerSelection === "Paper") {
      return gamePlayerWin(playerSelection, computerSelection);
    } else {
      return gameTie(playerSelection, computerSelection);
    }
  }
}

//Starts the game logic, current win rounds needed
function game() {
  playerWinCount = 0;
  computerWinCount = 0;
  let roundCount = 0;
  let maxRoundCount = 5;

  for (let i = 1; i <= maxRoundCount; i++) {
    let playerSelection = userPlay();
    let computerSelection = computerPlay();
    roundResult = playRound(playerSelection, computerSelection);
    roundCount++;

    console.log(`Round Count ${roundCount}`);
    console.log(`You chose ${playerSelection}`);
    console.log(`The computer chose ${computerSelection}`);
    console.log(roundResult);
    console.log(`Current score: ${playerWinCount}-${computerWinCount}`);

    if (i === maxRoundCount) {
      if (
        playerWinCount < Math.ceil(maxRoundCount / 2) &&
        computerWinCount < maxRoundCount / 2
      ) {
        i--;
      }
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
    gameOverButton.innerText = "GAME OVER! Press to restart";
    gameOverButton.addEventListener("click", () => {
      location.reload();
    });
    playerButtons.forEach((btn) => {
      btn.setAttribute("disabled", "");
    });
    document.body.appendChild(gameOverButton);
  }
}

//ui
playerButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("rock-button")) {
      gameResults.textContent = playRound("rock", computerPlay());
    } else if (btn.classList.contains("paper-button")) {
      gameResults.textContent = playRound("paper", computerPlay());
    } else {
      gameResults.textContent = playRound("scissors", computerPlay());
    }
    gameOverCheck();
  });
});

//game results text
const gameResults = document.getElementById("gameResultsDiv");
gameResults.style.cssText =
  "background-color: lightgray; border: medium solid black";
gameResults.textContent = "Please select you hand to start!";

//win counter
const winCounter = document.getElementById("winCounterDiv");
winCounter.textContent = `${playerWinCount} - ${computerWinCount}`;
