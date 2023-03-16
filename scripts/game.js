function resetGameStatus(){
    activePlayer = 0;
    currentRound = 1;
    gameIsOver = false;
    gameOver.firstElementChild.innerHTML = "You won, <span id=\"winner-name\">PLAYER NAME</span>!";
    gameOver.style.display = "none";

    let gameBoardIndex = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameData[i][j] = 0;
            const gameBoardItem = gameBoard.children[gameBoardIndex];
            gameBoardItem.textContent = "";
            gameBoardItem.classList.remove("disabled");
            gameBoardIndex++
        } 
    }
}

function startNewGame() {
    if (players[0].name === "" || players[1].name === "") {
        saveErrorsOutput.textContent = "Please enter a valid name!";
        saveErrorsOutput.style.display = "block";
        return;
    }
    resetGameStatus();
    activePlayerName.textContent = players[activePlayer].name;
    gameAreaElement.style.display = "block";
}


function switchPlayer() {
    if (activePlayer === 0) {
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    activePlayerName.textContent = players[activePlayer].name;
}

function selectGameField(event) {
    if (event.target.tagName !== "LI" || gameIsOver) {
        return;
    }

    const selectedField = event.target;
    const selectedRow = +selectedField.dataset.row - 1;
    const selectedColumn = +selectedField.dataset.col - 1;

    if (gameData[selectedRow][selectedColumn] > 0) {
        alert("Select an empty field!")
        return;
    }

    selectedField.textContent = players[activePlayer].symbol;
    selectedField.classList.add("disabled");

    gameData[selectedRow][selectedColumn] = activePlayer + 1;
    const winnerId = checkForGameOver();
    console.log(winnerId)
    
    if (winnerId !== 0 ){
        endGame(winnerId);
    }

    currentRound++;
    switchPlayer();
}

function checkForGameOver() {
    //Checking the rows for equality
    for (let i = 0; i < 3; i++) {
        if (
            gameData[i][0] > 0 &&
            gameData[i][0] === gameData[i][1] &&
            gameData[i][1] === gameData[i][2]
        ) {
            return gameData[i][0];
        }
    }
    
    //Checking the columns for equality
    for (let i = 0; i < 3; i++) {
        if (
            gameData[0][i] > 0 &&
            gameData[0][i] === gameData[1][i] &&
            gameData[0][i] === gameData[2][i]
        ) {
            return gameData[0][i];
        }
    }
    //Diagonal: Top left to bottom right
    if (
        gameData[0][0] > 0 &&
        gameData[0][0] === gameData[1][1]&& 
        gameData[1][1] === gameData[2][2]
    )
    {
        return gameData[0][0];
    }
    //Diagonal: Bottom left to top right
    if (
        gameData[2][0] > 0 &&
        gameData[2][0] === gameData[1][1]&&
        gameData[1][1] === gameData[0][2]
    )
    {
        return gameData[2][0];
    }
    
    if (currentRound === 9 ){
        return -1;
    }
    
    return 0;
}

function endGame(winnerId) {
    gameOver.style.display = "block";
   gameIsOver = true;
    if (winnerId > 0){
        const winnerName = players[winnerId - 1].name;
        gameOver.firstElementChild.firstElementChild.textContent = winnerName;
    }else {
        gameOver.firstElementChild.textContent = "It's a draw";
    }
}