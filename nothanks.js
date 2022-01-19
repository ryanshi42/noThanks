let currentPlayer = 1;
let currentCounters = 0;
let availableCards = [];
let minCard = 3;
let maxCard = 35;
for (var i = minCard; i <= maxCard; i++) {
    availableCards.push(i);
}
let currentCard = 0;
let chosenCard = 0;
let playerCards = [[], [], [], []];
let activePlayers = 4;
let gameStatus = false;
let counters = 11;
let playerOrder = [1, 2, 3, 4];
let playerCounters = [11, 11, 11, 11];
let playerScores = [0, 0, 0, 0];
let initDelete = false;
let showCounters = true;
let showCards = true;

function setUp() {
    currentPlayer = 1;
    currentCounters = 0;
    availableCards = [];
    for (var i = minCard; i <= maxCard; i++) {
        availableCards.push(i);
    }
    document.getElementById("availableCards").innerHTML = showCards == true ? availableCards : "Hidden";
    for (let j = 1; j <= activePlayers; j++) {
        let pCounters = "p" + j.toString() + "counters";
        document.getElementById(pCounters).innerHTML = showCounters == true ? counters : "Hidden";
        let pCards = "p" + j.toString() + "cards";
        document.getElementById(pCards).innerHTML = [];
        let pScore = "p" + j.toString() + "score";
        document.getElementById(pScore).innerHTML = -counters;

    }
    document.getElementById("currentCard").innerHTML = "wow, such empty";
    gameStatus = false;
}

function hiddenCounter(a) {
    showCounters = a == 0 ? false : true;
    for (let j = 1; j <= activePlayers; j++) {
        document.getElementById("p" + j.toString() + "counters").innerHTML = a == 0 ? "Hidden" : playerCounters[j];
    }
}

function hiddenCards(a) {
    showCards = a == 0 ? false : true;
    document.getElementById("availableCards").innerHTML = a == 0 ?  "Hidden" : availableCards;
}

function startGame() {
    if (gameStatus == false) {
        gameStatus = true;
        chosenCard = Math.floor(Math.random()*(availableCards.length));
        currentCard = availableCards[chosenCard];

        // Shuffle the order of the players
        var ul = document.getElementById("displayPlayerNames");
        playerOrder = [];
        for (let i = ul.children.length; i >= 1; i--) {
            newIndex = Math.ceil(Math.random() * i);
            playerOrder.push(ul.children[newIndex].innerHTML[7]);
            ul.appendChild(ul.children[newIndex]);
        }
        playerOrder.splice(0, 1);
        for (let i = 0; i < 6; i++) {
            chosenCard = Math.floor(Math.random()*(availableCards.length));
            currentCard = availableCards[chosenCard];
            document.getElementById("currentCard").innerHTML = currentCard;
            availableCards.splice(chosenCard, 1);
            document.getElementById("availableCards").innerHTML = showCards == true ? availableCards : "Hidden";
        }
        document.getElementById("availableCards").innerHTML = showCards == true ? availableCards : "Hidden";
    }
    else {
        window.alert("The game has already started!");
    }
}

function passItOn() {
    if (gameStatus == false) {
        window.alert("You haven't started the game yet!");
        return 0;
    }
    if (playerCounters[currentPlayer - 1] > 0) {
        playerCounters[currentPlayer - 1] -= 1;
        document.getElementById("p" + currentPlayer.toString() + "counters").innerHTML = playerCounters[currentPlayer - 1];
        updateCurrentCounter("pass");
        updateScore();
        incrementPlayer();
    }
    else {
        window.alert("You don't have enough counters!");
    }
        
}

function takeCard() {
    if (gameStatus == false) {
        window.alert("You haven't started the game yet!");
        return 0;
    }
    updateCurrentCounter("take");

    playerCards[currentPlayer - 1].push(currentCard)
    playerCards[currentPlayer - 1].sort((a,b)=>a-b);
    document.getElementById("p" + currentPlayer.toString() + "cards").innerHTML = playerCards[currentPlayer - 1];

    chosenCard = Math.floor(Math.random()*(availableCards.length));
    currentCard = availableCards[chosenCard];
    document.getElementById("currentCard").innerHTML = currentCard;
    availableCards.splice(chosenCard, 1);
    document.getElementById("availableCards").innerHTML = showCards == true ? availableCards : "Hidden";
    
    updateScore();
    incrementPlayer();

    if (currentCard == undefined) {
        announceWinner();
        return 0;
    }
}

function incrementPlayer() {
    currentPlayer += 1;
    if (currentPlayer > activePlayers) {
        currentPlayer = 1;
    }
    document.getElementById("playerID").innerHTML = currentPlayer;
}

function updateCurrentCounter(action) {
    if (action === "pass") {
        currentCounters += 1;
        document.getElementById("currentCounters").innerHTML = currentCounters;
    }
    else {
        playerCounters[currentPlayer - 1] += currentCounters;
        document.getElementById("p" + currentPlayer.toString() + "counters").innerHTML = playerCounters[currentPlayer - 1];
        currentCounters = 0;
        document.getElementById("currentCounters").innerHTML = currentCounters;
    }
}

function updateScore() {
    currScore = 0;
    for (var j = playerCards[currentPlayer - 1].length - 1; j >= 0; j--) {
        if (j == 0) {
            currScore += playerCards[currentPlayer - 1][j];
        }
        else if (playerCards[currentPlayer - 1][j-1] + 1 != playerCards[currentPlayer - 1][j]) {
            currScore += playerCards[currentPlayer - 1][j];
        }
    }
    currScore -= playerCounters[currentPlayer - 1];
    playerScores[currentPlayer - 1] = currScore;
    document.getElementById("p" + currentPlayer.toString() + "score").innerHTML = showCounters == true ? currScore : "Hidden";
}

function updateActivePlayers(a) {
    if (gameStatus == true) {
        window.alert("Can't change the number of players after the game has started - please reset!");
        return 0;
    }
    if (a == 0) {
        if (activePlayers < 8) {
            activePlayers += 1;
            initDelete = true;
            playerCards.push([]);
            playerScores.push(0);
            playerCounters.push(11);

            var th = document.createElement("th");
            th.innerText = "Player " + activePlayers.toString() + ": ";
            var inp = document.createElement("input");
            inp.setAttribute("placeholder", "bobsmiley");
            th.appendChild(inp);
            document.getElementById("displayPlayerNames").appendChild(th);

            var td = document.createElement("td");
            td.id = "p" + activePlayers.toString() + "counters";
            td.innerHTML = counters
            document.getElementById("displayCountersRemaining").appendChild(td);

            var td1 = document.createElement("td");
            td1.id = "p" + activePlayers.toString() + "cards";
            document.getElementById("displayCardsTaken").appendChild(td1);

            var td2 = document.createElement("td");
            td2.id = "p" + activePlayers.toString() + "score";
            td2.innerHTML = -counters;
            document.getElementById("displayCurrentScores").appendChild(td2);

            
        }
        else {
            window.alert("You have already reached the maximum number of players!");
        }
    }
    else {
        if (activePlayers > 2) {
            activePlayers -= 1;
            playerCards.pop();
            playerScores.pop();
            playerCounters.pop();

            // A funny bug where there might be duplicate names and needs double delete
            if (initDelete == false) {
                pn = document.getElementById("displayPlayerNames");
                pn.removeChild(pn.lastChild);

                pco = document.getElementById("displayCountersRemaining");
                pco.removeChild(pco.lastChild);

                pca = document.getElementById("displayCardsTaken") ;
                pca.removeChild(pca.lastChild);

                ps = document.getElementById("displayCurrentScores");
                ps.removeChild(ps.lastChild);
            }
            pn = document.getElementById("displayPlayerNames");
            pn.removeChild(pn.lastChild);

            pco = document.getElementById("displayCountersRemaining");
            pco.removeChild(pco.lastChild);

            pca = document.getElementById("displayCardsTaken") ;
            pca.removeChild(pca.lastChild);

            ps = document.getElementById("displayCurrentScores");
            ps.removeChild(ps.lastChild);
        }
        else {
            window.alert("You have already reached the minimum number of players!");
        }
    }
    document.getElementById("activePlayers").innerHTML = activePlayers;
}

function updateCounters(a) {
    if (gameStatus == true) {
        window.alert("Can't change the number of counters after the game has started - please reset!");
        return 0;
    }
    if (a == 0) {
        counters += 1;
    }
    else {
        counters -= 1;
    }
    
    document.getElementById("counters").innerHTML = counters;
    for (let i = 1; i <= activePlayers; i++) {
        document.getElementById("p" + i.toString() + "counters").innerHTML = counters;
    }
}

function announceWinner() {
    gameStatus = false;
    let scores = playerScores;
    let min = scores[0];
    let minPos = [0];
    for (var i = 1; i < activePlayers; i++) {
        if (scores[i] < min) {
            min = scores[i];
            minPos = [i];
        }
        else if (scores[i] == min) {
            minPos.push(i);
        }
    }

    let congratulationString = "Congratulations to ";

    for (var j = 0; j < minPos.length; j++) {
        minPos[j] = "Player " + playerOrder[minPos[j]];
    }

    if (minPos.length == 1) {
        congratulationString += (minPos + "!");
    }
    else {
        for (var k = 0; k < minPos.length - 2; k++) {
            congratulationString += (minPos[k] + ", ");
        }
        congratulationString += (minPos[k] + " and ");
        congratulationString += (minPos[minPos.length - 1] + "!");
    }
    window.alert(congratulationString);
}

// Take out 5 cards at the start
// Hide counters
// Hide remaining cards
// Announce game winner when last card has been taken
// Increase max. number of players to 8
// Make it look pretty

// Stuff I still don't know how to make it online multiplayer :")
// Maybe add some Flask and jinja