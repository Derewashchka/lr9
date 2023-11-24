const MAX_ROUNDS = 3;
const cards = ['6', '7', '8', '9', '10', '2', '3', '4', '11'];

let playerPoints = 0;
let computerPoints = 0;
let playerNickname;
let round = 0;

document.addEventListener('DOMContentLoaded', function () {
    updateCardDisplay(1, "playerCardImg", "playerCardValue");
    updateCardDisplay(1, "computerCardImg", "computerCardValue");
	
	const startButton = document.getElementById("startButton");
    startButton.addEventListener('click', startGame);
});

function startGame() {
    playerNickname = prompt('Enter your nickname:');
    const startButton = document.getElementById("startButton");
    startButton.disabled = true;

    initializeGame();
}

function initializeGame() {
    document.getElementById("playerName").textContent = playerNickname;
    updatePointsDisplay();
    playRounds(MAX_ROUNDS);
}

function updatePointsDisplay() {
    document.getElementById("playerPoints").textContent = `Points: ${playerPoints}`;
    document.getElementById("computerPoints").textContent = `Points: ${computerPoints}`;
}

function playRounds(rounds) {
    let currentRound = 0;

    function playNextRound() {
        if (currentRound < rounds) {
            setTimeout(() => {
                playRound();
                currentRound++;
                if (currentRound < rounds) {
                    setTimeout(playNextRound, 500);
                } else {
                    determineWinner();
                    const startButton = document.getElementById("startButton");
                    startButton.disabled = false;
                }
            }, 100);
        }
    }

    playNextRound();
}

function playRound() {
    const playerCardValue = getRandomCardValue();
    const computerCardValue = getRandomCardValue();

    playerPoints += playerCardValue;
    computerPoints += computerCardValue;

    round++;
    updatePointsDisplay();
    updateCardDisplay(playerCardValue, "playerCardImg", "playerCardValue");
    updateCardDisplay(computerCardValue, "computerCardImg", "computerCardValue");

    if (round === MAX_ROUNDS) {
        determineWinner();
        const startButton = document.getElementById("startButton");
        startButton.disabled = false;
    }
}

function getRandomCardValue() {
    return Math.ceil(Math.random() * cards.length);
}

function updateCardDisplay(cardValue, cardImgId, cardValueId) {
    const card = cards[cardValue - 1];
    const cardImg = document.getElementById(cardImgId);
    const cardValueDisplay = document.getElementById(cardValueId);

    cardImg.src = `${card}.png`;
    cardValueDisplay.textContent = `Value: ${card}`;
}

function determineWinner() {
    const winnerElement = document.getElementById("Winner");
    if (playerPoints > computerPoints) {
        winnerElement.textContent = `${playerNickname} wins!`;
    } else if (computerPoints > playerPoints) {
        winnerElement.textContent = "Computer wins!";
    } else {
        winnerElement.textContent = "It's a tie!";
    }
}