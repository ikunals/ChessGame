
const socket = io('http://localhost:3000');
socket.on('connect', () => {});

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

socket.on("serverHandshake", (signal) => {
    socket.emit("received", roomName, timeControl);
    handshakeFin = signal;
    document.getElementById("roombanner").innerHTML = `Room ${roomName}: Game In Progress`;
    document.getElementById("whotoplay").innerHTML = "White to Play";
});

socket.on("setTimeControl", (timeSent) => {
    timeControl = timeSent;
    timeEnd = oldNow + (timeControl * 60 * 1000);
    document.getElementById("blacktimer").innerHTML = timeControl.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}) + ":00";
    handshakeFin = true;
    document.getElementById("roombanner").innerHTML = `Room ${roomName}: Game In Progress`;
    document.getElementById("whotoplay").innerHTML = "White to Play";
});

socket.on("posChange", (oldPos, newPos) => {

    let oldTarget = document.getElementById(oldPos);
    let oldPiece = oldTarget.classList[2];
    let originalColor = oldTarget.classList[1];
    oldTarget.className = "";
    oldTarget.classList.add("square");
    oldTarget.classList.add(originalColor);
    oldTarget.classList.add("empty");

    let oldCoords = coordToIndices.get(oldPos);
    let newCoords = coordToIndices.get(newPos);

    if ((oldPiece == "w_pawn") && (newCoords[1] == 7)) {
        oldPiece = "w_queen";
    }
    else if ((oldPiece == "b_pawn") && (newCoords[1] == 0)) {
        oldPiece = "b_queen";
    }

    let target = document.getElementById(newPos);
    let capturedPiece = target.classList[2];
    let saveColor = target.style.backgroundColor;
    target.className = "";
    target.classList.add("square");
    target.classList.add(saveColor);
    target.classList.add(oldPiece);
    
    boardPosition[oldCoords[0]][oldCoords[1]] = "empty";
    boardPosition[newCoords[0]][newCoords[1]] = oldPiece;

    (whoToPlay == "w") ? whoToPlay = "b" : whoToPlay = "w";

    if (whoToPlay == "w") {
        document.getElementById("whotoplay").innerHTML = "White to Play";
    }
    else {
        document.getElementById("whotoplay").innerHTML = "Black to Play";
    }

    if ((playerColor == "white") && (capturedPiece == "w_king")) {
        document.getElementById("whotoplay").innerHTML = "CHECKMATE - BLACK HAS WON";
        document.getElementById("roombanner").innerHTML = `Room ${roomName}: Game Finished`;
        gameEnded = true;
        checkmateSequence();
    }
    else if ((playerColor == "black") && (capturedPiece == "b_king")) {
        document.getElementById("whotoplay").innerHTML = "CHECKMATE - BLACK HAS WON";
        document.getElementById("roombanner").innerHTML = `Room ${roomName}: Game Finished`;
        gameEnded = true;
        checkmateSequence();
    } 
    else {
        socket.emit("turnChangeServer", roomName, whoToPlay);
    }
});

socket.on("turnChangeClient", (receivedColor) => {
    whoToPlay = receivedColor;
});

document.getElementById("whotoplay").style.display = "none";
document.getElementById("roombanner").style.display = "none";
document.getElementById("wTimerContainer").style.display = "none";

function startGame() {
    if (document.getElementById("jRname").value == "") {
        timeControl = Number(document.getElementById("timeSlider").value);
        timeEnd = oldNow + (timeControl * 60 * 1000);
        roomName = document.getElementById("crRname").value;
        playerColor = "white";
        socket.emit("roomkey", roomName, timeControl);
    }
    else {
        roomName = document.getElementById("jRname").value;
        playerColor = "black";
        socket.emit("roomkey", roomName);
        socket.emit("handshake", roomName);
    }
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

                let oldTarget = document.getElementById(oldSq);
                let oldPiece = oldTarget.classList[2];
                let originalColor = oldTarget.classList[1];
                let capturedPiece = target.classList[2];

                oldTarget.style.backgroundColor = originalColor;

                if (coloredSquares.includes(target.id)) {
                    oldTarget.className = "";
                    oldTarget.classList.add("square");
                    oldTarget.classList.add(originalColor);
                    oldTarget.classList.add("empty");

                    let oldCoords = coordToIndices.get(oldSq);
                    let newCoords = coordToIndices.get(target.id);

                    if ((oldPiece == "w_pawn") && (newCoords[1] == 7)) {
                        oldPiece = "w_queen";
                    }
                    else if ((oldPiece == "b_pawn") && (newCoords[1] == 0)) {
                        oldPiece = "b_queen";
                    }

                    saveColor = target.style.backgroundColor;
                    target.className = "";
                    target.classList.add("square");
                    target.classList.add(saveColor);
                    target.classList.add(oldPiece);
                    
                    boardPosition[oldCoords[0]][oldCoords[1]] = "empty";
                    boardPosition[newCoords[0]][newCoords[1]] = oldPiece;

                    socket.emit("playerMove", oldSq, target.id, roomName);

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
                    }
                    else if (capturedPiece == "b_king") {
                        document.getElementById("whotoplay").innerHTML = "CHECKMATE - WHITE HAS WON";
                        document.getElementById("roombanner").innerHTML = `Room ${roomName}: Game Finished`;
                        gameEnded = true;
                        checkmateSequence();
                    }
                }
                selectOn = true;
            }
        }
    });
}

setInterval(() => {
    if (!handshakeFin)
        timeSinceRefresh += 1000;
}, 1000);