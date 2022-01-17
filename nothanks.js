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
let p1cards = [];
let p2cards = [];
let p3cards = [];
let p4cards = [];
let activePlayers = 4;
let gameStatus = false;
let counters = 11;
let p1counters = counters;
let p2counters = counters;
let p3counters = counters;
let p4counters = counters;
let p1sum;
let p2sum;
let p3sum;
let p4sum;

function setUp() {
    p1counters = counters;
    p2counters = counters;
    p3counters = counters;
    p4counters = counters;
    currentPlayer = 1;
    currentCounters = 0;
    availableCards = [];
    for (var i = minCard; i <= maxCard; i++) {
        availableCards.push(i);
    }
    document.getElementById("p1counters").innerHTML = p1counters;
    document.getElementById("p2counters").innerHTML = p2counters;
    document.getElementById("p3counters").innerHTML = p3counters;
    document.getElementById("p4counters").innerHTML = p4counters;
    document.getElementById("availableCards").innerHTML = availableCards;
    p1cards = [];
    p2cards = [];
    p3cards = [];
    p4cards = [];
    document.getElementById("p1cards").innerHTML = p1cards;
    document.getElementById("p2cards").innerHTML = p2cards;
    document.getElementById("p3cards").innerHTML = p3cards;
    document.getElementById("p4cards").innerHTML = p4cards;
    document.getElementById("p1score").innerHTML = -counters;
    document.getElementById("p2score").innerHTML = -counters;
    document.getElementById("p3score").innerHTML = -counters;
    document.getElementById("p4score").innerHTML = -counters;
    document.getElementById("currentCard").innerHTML = "wow, such empty";
    gameStatus = false;
}

function startGame() {
    if (gameStatus == false) {
        gameStatus = true;
        chosenCard = Math.floor(Math.random()*(availableCards.length));
        currentCard = availableCards[chosenCard];
        document.getElementById("currentCard").innerHTML = currentCard;
        availableCards.splice(chosenCard, 1);
        document.getElementById("availableCards").innerHTML = availableCards;
    }
    else {
        window.alert("The game has already started!");
    }
}

function passItOn() {
    if (currentPlayer == 1) {
        if (p1counters > 0) {
            p1counters -= 1;
            document.getElementById("p1counters").innerHTML = p1counters;
            updateCurrentCounter("pass");
            updateScore();
            incrementPlayer();
        }
        else {
            window.alert("You don't have enough counters!");
        }
    }
    else if (currentPlayer == 2) {
        if (p2counters > 0) {
            p2counters -= 1;
            document.getElementById("p2counters").innerHTML = p2counters;
            updateCurrentCounter("pass");
            updateScore();
            incrementPlayer();
        }
        else {
            window.alert("You don't have enough counters!");
        }
    }
    else if (currentPlayer == 3) {
        if (p3counters > 0) {
            p3counters -= 1;
            document.getElementById("p3counters").innerHTML = p3counters;
            updateCurrentCounter("pass");
            updateScore();
            incrementPlayer();
        }
        else {
            window.alert("You don't have enough counters!");
        }
    }
    else if (currentPlayer == 4) {
        if (p4counters > 0) {
            p4counters -= 1;
            document.getElementById("p4counters").innerHTML = p4counters;
            updateCurrentCounter("pass");
            updateScore();
            incrementPlayer();
        }
        else {
            window.alert("You don't have enough counters!");
        }
    }
    
}

function takeCard() {
    updateCurrentCounter("take");

    if (currentPlayer == 1) {
        p1cards.push(currentCard);
        p1cards.sort((a,b)=>a-b);
        document.getElementById("p1cards").innerHTML = p1cards;
    }
    else if (currentPlayer == 2) {
        p2cards.push(currentCard);
        p2cards.sort((a,b)=>a-b);
        document.getElementById("p2cards").innerHTML = p2cards;
    }
    else if (currentPlayer == 3) {
        p3cards.push(currentCard);
        p3cards.sort((a,b)=>a-b);
        document.getElementById("p3cards").innerHTML = p3cards;
    }
    else {
        p4cards.push(currentCard);
        p4cards.sort((a,b)=>a-b);
        document.getElementById("p4cards").innerHTML = p4cards;
    }
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
        if (currentPlayer == 1) {
            p1counters += currentCounters;
            document.getElementById("p1counters").innerHTML = p1counters;
        }
        else if (currentPlayer == 2) {
            p2counters += currentCounters;
            document.getElementById("p2counters").innerHTML = p2counters;
        }
        else if (currentPlayer == 3) {
            p3counters += currentCounters;
            document.getElementById("p3counters").innerHTML = p3counters;
        }
        else {
            p4counters += currentCounters;
            document.getElementById("p4counters").innerHTML = p4counters;
        }
        currentCounters = 0;
        document.getElementById("currentCounters").innerHTML = currentCounters;
    }
}

function updateScore() {
    if (currentPlayer == 1) {
        p1sum = 0;
        for (var j = p1cards.length - 1; j >= 0; j--) {
            if (j == 0) {
                p1sum += p1cards[j];
            }
            else if (p1cards[j-1] + 1 != p1cards[j]) {
                p1sum += p1cards[j];
            }
        }
        p1sum -= p1counters;
        document.getElementById("p1score").innerHTML = p1sum;
    }
    else if (currentPlayer == 2) {
        p2sum = 0;
        for (var j = p2cards.length - 1; j >= 0; j--) {
            if (j == 0) {
                p2sum += p2cards[j];
            }
            else if (p2cards[j-1] + 1 != p2cards[j]) {
                p2sum += p2cards[j];
            }
        }
        p2sum -= p2counters;
        document.getElementById("p2score").innerHTML = p2sum;
    }
    else if (currentPlayer == 3) {
        p3sum = 0;
        for (var j = p3cards.length - 1; j >= 0; j--) {
            if (j == 0) {
                p3sum += p3cards[j];
            }
            else if (p3cards[j-1] + 1 != p3cards[j]) {
                p3sum += p3cards[j];
            }
        }
        p3sum -= p3counters;
        document.getElementById("p3score").innerHTML = p3sum;
    }
    else if (currentPlayer == 4) {
        p4sum = 0;
        for (var j = p4cards.length - 1; j >= 0; j--) {
            if (j == 0) {
                p4sum += p4cards[j];
            }
            else if (p4cards[j-1] + 1 != p4cards[j]) {
                p4sum += p4cards[j];
            }
        }
        p4sum -= p4counters;
        document.getElementById("p4score").innerHTML = p4sum;
    }
}

function updateActivePlayers(a) {
    if (gameStatus == true) {
        window.alert("Can't change the number of players after the game has started - please reset!");
        return 0;
    }
    if (a == 0) {
        if (activePlayers < 8) {
            activePlayers += 1;
        }
        else {
            window.alert("You have already reached the maximum number of players!");
        }
    }
    else {
        if (activePlayers > 2) {
            activePlayers -= 1;
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
    p1counters = counters;
    p2counters = counters;
    p3counters = counters;
    p4counters = counters;
    document.getElementById("counters").innerHTML = counters;
    document.getElementById("p1counters").innerHTML = counters;
    document.getElementById("p2counters").innerHTML = counters;
    document.getElementById("p3counters").innerHTML = counters;
    document.getElementById("p4counters").innerHTML = counters;
}

// Take out 5 cards at the start
// Hide counters
// Hide remaining cards
// Announce game winner when last card has been taken
// Increase max. number of players to 8
// Make it look pretty

// Stuff I still don't know how to make it online multiplayer :")
// Maybe add some Flask and jinja