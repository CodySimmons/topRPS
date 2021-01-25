let playerWinCount = 0;
let computerWinCount = 0;

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

//window prompt for player's choice. lower cases player input for ease
function userPlay(playerSelection) {
  // let playerSelection = prompt(
  //   "Please enter rock, paper, or scissors:",
  //   "rock/paper/scissors"
  // );
  // while (true) {
    // playerSelection = playerSelection.toLowerCase();
  //   if (
  //     playerSelection === "rock" ||
  //     playerSelection === "paper" ||
  //     playerSelection === "scissors"
  //   ) {
  //     break;
  //   } else {
  //     playerSelection = prompt(
  //       "Incorrect response, please enter rock, paper, or scissors:",
  //       "rock/paper/scissors"
  //     );
  //   }
  // }
  return playerSelection;
}

//return strings for game result, increases the winners score
function gameTie(playerSelection, computerSelection) {
  return `Tie! You both picked ${playerSelection}!`;
}

function gamePlayerWin(playerSelection, computerSelection) {
  playerWinCount++;
  return `You win! ${playerSelection} beats ${computerSelection}`;
}

function gameComputerWin(playerSelection, computerSelection) {
  computerWinCount++;
  return `You lose! ${computerSelection} beats ${playerSelection}`;
}

//take player & computer's selection, runs logic to check if a win, lose, tie
function playRound(playerSelection, computerSelection) {
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
  } else {
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

const rock = document.querySelector('#rock');
rock.addEventListener('click', () => {
  playRound("rock", computerPlay());
})

const paper = document.querySelector('#paper')
paper.addEventListener('click', () => {
  playRound("paper", computerPlay());
})

const scissors = document.querySelector('#scissors')
paper.addEventListener('click', () => {
  playRound("scissors", computerPlay());
})