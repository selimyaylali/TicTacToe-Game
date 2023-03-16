function openPlayerConfig(event){
    editedPlayer = +event.target.dataset.playerid; // '+' changes the type of playerid from str to number
    playerConfigOverlay.style.display = "block";
    backdropElement.style.display = "block";
}

function closePlayerConfig(){
    playerConfigOverlay.style.display = "none";
    backdropElement.style.display = "none";
    formElement.firstElementChild.classList.remove("error");
    errorsOutput.textContent = "";
    playerName.value = "";
    saveErrorsOutput.textContent = "";
    saveErrorsOutput.style.display = "none";
}

function savePlayerConfig(event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredPlayerName = formData.get("player-name").trim();
    
    if (enteredPlayerName === ""){
        event.target.firstElementChild.classList.add("error")
        errorsOutput.textContent = "Please enter a valid name!";
        return;
    }
    
    const updatedPlayerData = document.getElementById("player-" + editedPlayer + "-data");
    updatedPlayerData.children[1].textContent = enteredPlayerName;
    
    if (editedPlayer === 1){
        players[0].name = enteredPlayerName;
    }else {
        players[1].name = enteredPlayerName;
    }
    
    closePlayerConfig();
}
