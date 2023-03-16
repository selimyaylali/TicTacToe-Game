const gameData = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
];

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;

const players = [
    {
        name:"",
        symbol: "X"
    },
    {
        name: "",
        symbol: "O"
    },
];

const playerConfigOverlay = document.getElementById("config-overlay");
const backdropElement = document.getElementById("backdrop");
const formElement = document.querySelector("form");
const playerName = document.getElementById("player-name");
const errorsOutput = document.getElementById("config-errors");
const saveErrorsOutput = document.getElementById("start-game-error");
const gameAreaElement = document.getElementById("active-game");
const activePlayerName = document.getElementById("active-player-name");
const gameOver = document.getElementById("game-over");


const editPlayer1Button = document.getElementById("edit-player-1-button");
const editPlayer2Button = document.getElementById("edit-player-2-button");
const cancelOverlayButton = document.getElementById("cancel-config-btn");
const startNewGameButton = document.getElementById("start-game-btn");
const gameBoard = document.getElementById("game-board")


editPlayer1Button.addEventListener("click",openPlayerConfig);
editPlayer2Button.addEventListener("click",openPlayerConfig);

cancelOverlayButton.addEventListener("click", closePlayerConfig);
backdropElement.addEventListener("click",closePlayerConfig);

formElement.addEventListener("submit", savePlayerConfig);

startNewGameButton.addEventListener("click", startNewGame);

gameBoard.addEventListener("click", selectGameField);

