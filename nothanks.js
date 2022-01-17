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
let playerCounters = [11, 11, 11, 11];
let playerScores = [0, 0, 0, 0];

function setUp() {
    currentPlayer = 1;
    currentCounters = 0;
    availableCards = [];
    for (var i = minCard; i <= maxCard; i++) {
        availableCards.push(i);
    }
    document.getElementById("availableCards").innerHTML = availableCards;
    for (let j = 1; j <= activePlayers; j++) {
        let pCounters = "p" + j.toString() + "counters";
        document.getElementById(pCounters).innerHTML = counters;
        let pCards = "p" + j.toString() + "cards";
        document.getElementById(pCards).innerHTML = [];
        let pScore = "p" + j.toString() + "score";
        document.getElementById(pScore).innerHTML = -counters;

    }
    document.getElementById("currentCard").innerHTML = "wow, such empty";
    gameStatus = false;
}

function startGame() {
    if (gameStatus == false) {
        gameStatus = true;
        chosenCard = Math.floor(Math.random()*(availableCards.length));
        currentCard = availableCards[chosenCard];
        var ul = document.getElementById("displayPlayerNames");
        for (var i = ul.children.length; i >= 1; i--) {
            ul.appendChild(ul.children[Math.ceil(Math.random() * i)]);
        }
        document.getElementById("currentCard").innerHTML = currentCard;
        availableCards.splice(chosenCard, 1);
        document.getElementById("availableCards").innerHTML = availableCards;
    }
    else {
        window.alert("The game has already started!");
    }
}

function passItOn() {
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
    updateCurrentCounter("take");

    playerCards[currentPlayer - 1].push(currentCard)
    playerCards[currentPlayer - 1].sort((a,b)=>a-b);
    document.getElementById("p" + currentPlayer.toString() + "cards").innerHTML = playerCards[currentPlayer - 1];


    chosenCard = Math.floor(Math.random()*(availableCards.length));
    currentCard = availableCards[chosenCard];
    document.getElementById("currentCard").innerHTML = currentCard;
    availableCards.splice(chosenCard, 1);
    document.getElementById("availableCards").innerHTML = availableCards;
    
    updateScore();
    incrementPlayer();
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
    document.getElementById("p" + currentPlayer.toString() + "score").innerHTML = currScore;
}

function updateActivePlayers(a) {
    if (gameStatus == true) {
        window.alert("Can't change the number of players after the game has started - please reset!");
        return 0;
    }
    if (a == 0) {
        if (activePlayers < 8) {
            activePlayers += 1;
            // TODO:
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

// Take out 5 cards at the start
// Hide counters
// Hide remaining cards
// Announce game winner when last card has been taken
// Increase max. number of players to 8
// Make it look pretty

// Stuff I still don't know how to make it online multiplayer :")
// Maybe add some Flask and jinja