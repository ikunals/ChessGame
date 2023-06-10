
const socket = io.connect();
//----------
let boardPosition = [];

let initGame = false;
let gameEnded = false;
let selectOn = true;

let roomName = "";
let timeControl = 1;
let playerColor = "black";
let whoToPlay = "w";

let handshakeFin = false;
let oldNow = new Date().getTime();
let timeEnd = 0;
let timeSinceRefresh = 0;

// START SEQUENCE
document.getElementById("whotoplay").style.display = "none";
document.getElementById("roombanner").style.display = "none";
document.getElementById("wTimerContainer").style.display = "none";
//-------

//SOCKET STUFFS

//player 1 is ready by this point
socket.on("serverHandshake", (signal) => {
    socket.emit("receivedHandshake", roomName, timeControl);
    handshakeFin = signal;
    document.getElementById("roombanner").innerHTML = `Room ${roomName}: Game In Progress`;
    document.getElementById("whotoplay").innerHTML = "White to Play";
});

//player 2 is ready by this point
socket.on("setTimeControl", (timeSent) => {
    timeControl = timeSent;
    timeEnd = oldNow + (timeControl * 60 * 1000);
    document.getElementById("blacktimer").innerHTML = timeControl.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}) + ":00";
    handshakeFin = true;
    document.getElementById("roombanner").innerHTML = `Room ${roomName}: Game In Progress`;
    document.getElementById("whotoplay").innerHTML = "White to Play";
});

socket.on("posChange", (oldPos, newPos) => {
    if (makeMove(oldPos, newPos)) {
        socket.emit("turnChangeServer", roomName, whoToPlay);
    }
});

socket.on("turnChangeClient", (receivedColor) => {
    whoToPlay = receivedColor;
});

function startGame() {
    if (document.getElementById("jRname").value == "") {
        timeControl = Number(document.getElementById("timeSlider").value);
        timeEnd = oldNow + (timeControl * 60 * 1000);
        roomName = document.getElementById("crRname").value;
        playerColor = "white";
        socket.emit("roomkey", roomName);
    }
    else {
        roomName = document.getElementById("jRname").value;
        playerColor = "black";
        socket.emit("roomkey", roomName);
        socket.emit("initHandshake", roomName);
    }
    setupBoard();
    addSquareLogic();
}

function setupBoard() {
    initRooms = true;
    document.getElementById("roomSetup").remove();

    document.getElementById("whotoplay").style.display = "block";
    document.getElementById("wTimerContainer").style.display = "block";
    document.getElementById("roombanner").style.display = "block";
    
    createSquares();
    setPieces();
    createTimers();

    document.getElementById("whitetimer").innerHTML = timeControl.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}) + ":00";
    document.getElementById("blacktimer").innerHTML = timeControl.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}) + ":00";
    initGame = true;
}

function addSquareLogic() {
    let squares = document.getElementsByClassName("square");
    let oldSq = "";
    let coloredSquares = [];
    Array.from(squares).forEach((element) => {
        element.onmousedown = function(event) {
            if (selectOn && !gameEnded && (playerColor[0] == whoToPlay) && handshakeFin) {
                let target = event.target;
                let chosenCol = target.classList[2][0];
                if (!element.classList.contains("empty") && (chosenCol == whoToPlay)) {
                    oldSq = target.id;
                    target.style.backgroundColor = 'yellow';
                    selectOn = false;
                    coloredSquares = [];
                    let possibleMoves = parseMoves(target.classList[2], target.id);
                    possibleMoves.forEach((move) => {
                        let moveSq = document.getElementById(move);
                        moveSq.style.backgroundColor = "purple";
                        coloredSquares.push(move);
                    });
                }
            }
            else if (!gameEnded && (playerColor[0] == whoToPlay) && handshakeFin) {
                let target = event.target;

                coloredSquares.forEach((eachSq) => {
                    let sqTarget = document.getElementById(eachSq);
                    sqTarget.style.backgroundColor = sqTarget.classList[1];
                });

                if (coloredSquares.includes(target.id)) {
                    makeMove(oldSq, target.id);
                    socket.emit("playerMove", oldSq, target.id, roomName);
                }
                selectOn = true;
            }
        }
    });
}

function makeMove(oldTarget, newTarget) {
    oldTarget = document.getElementById(oldTarget);
    newTarget = document.getElementById(newTarget);

    let capturedPiece = newTarget.classList[2];
    let oldPiece = oldTarget.classList[2];
    let originalColor = oldTarget.classList[1];

    oldTarget.className = "";
    oldTarget.classList.add("square");
    oldTarget.classList.add(originalColor);
    oldTarget.classList.add("empty");
    oldTarget.style.backgroundColor = originalColor;

    let oldCoords = coordToIndices.get(oldTarget.id);
    let newCoords = coordToIndices.get(newTarget.id);

    if ((oldPiece == "w_pawn") && (newCoords[1] == 7)) {
        oldPiece = "w_queen";
    }
    else if ((oldPiece == "b_pawn") && (newCoords[1] == 0)) {
        oldPiece = "b_queen";
    }

    saveColor = newTarget.style.backgroundColor;
    newTarget.className = "";
    newTarget.classList.add("square");
    newTarget.classList.add(saveColor);
    newTarget.classList.add(oldPiece);
    newTarget.style.backgroundColor = saveColor;

    boardPosition[oldCoords[0]][oldCoords[1]] = "empty";
    boardPosition[newCoords[0]][newCoords[1]] = oldPiece;

    (whoToPlay == "w") ? whoToPlay = "b" : whoToPlay = "w";
    if (whoToPlay == "w") {
        document.getElementById("whotoplay").innerHTML = "White to Play";
    }
    else {
        document.getElementById("whotoplay").innerHTML = "Black to Play";
    }

    if (capturedPiece == "w_king") {
        document.getElementById("whotoplay").innerHTML = "CHECKMATE - BLACK HAS WON";
        document.getElementById("roombanner").innerHTML = `Room ${roomName}: Game Finished`;
        gameEnded = true;
        checkmateSequence();
        return false;
    }
    else if (capturedPiece == "b_king") {
        document.getElementById("whotoplay").innerHTML = "CHECKMATE - WHITE HAS WON";
        document.getElementById("roombanner").innerHTML = `Room ${roomName}: Game Finished`;
        gameEnded = true;
        checkmateSequence();
        return false;
    }
    else {
        return true;
    }
}

setInterval(() => {
    if (!handshakeFin)
        timeSinceRefresh += 1000;
}, 1000);
