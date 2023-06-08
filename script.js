
let boardPosition = [];

let playerTurn = 0;
let gameEnded = false;
let playerColor = "white";
let whoToPlay = "w";
if (whoToPlay == "w") {
    document.getElementById("whotoplay").innerHTML = "White to Play";
}
else {
    document.getElementById("whotoplay").innerHTML = "Black to Play";
}

function createSquares() {
    letters = "abcdefgh"
    // diff player colors means diff numbers
    if (playerColor == "white") {
        letterCount = 1;
        numCount = 8;
        colorSelect = 0;
    }
    else {
        letterCount = 8;
        numCount = 1;
        colorSelect = 0;
    }
    
    for (let i = 0; i < 64; i++) {
        // a lot of shenanigans here, i just played around until i got the right stuff
        if (letterCount == 9 && playerColor == "white")  { 
            letterCount = 1; 
            colorSelect++;
            numCount--;
        }
        
        if (letterCount == 0 && playerColor == "black")  { 
            letterCount = 8; 
            colorSelect++;
            numCount++;
        }
    
        let board = document.getElementById("board");
        let newSquare = document.createElement('div');
        
        //important to note that all squares are id'ed correctly! this means orientation never causes problems
        newSquare.id = letters[letterCount - 1] + numCount;
        newSquare.className = "square";

        board.appendChild(newSquare);
        
        if (colorSelect % 2 == 1) {
            newSquare.style.backgroundColor = 'green';
            newSquare.classList.add("green");
        }   
        else {
            newSquare.style.backgroundColor = 'white';
            newSquare.classList.add("white");
        }

        (playerColor == "white") ? letterCount++ : letterCount--;
        colorSelect++;
    }    
}

function setPieces() {
    let piece_list = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    let letters = "abcdefgh"
    let styles = ``;
    //sets the class of a square to a piece, or "empty"
    //the images are already set in the stylesheet
    //by id'ing each square correctly, we don't need to worry about player color
    for (let i = 0; i < piece_list.length; i++) {
        let row_1 = document.getElementById(`${letters[i]}1`);
        let row_2 = document.getElementById(`${letters[i]}2`);

        let row_3 = document.getElementById(`${letters[i]}3`);
        let row_4 = document.getElementById(`${letters[i]}4`);
        let row_5 = document.getElementById(`${letters[i]}5`);
        let row_6 = document.getElementById(`${letters[i]}6`);

        let row_7 = document.getElementById(`${letters[i]}7`);
        let row_8 = document.getElementById(`${letters[i]}8`);
        
        boardPosition.push([]);

        row_1.classList.add(`w_${piece_list[i]}`);
        boardPosition[boardPosition.length - 1].push(`w_${piece_list[i]}`);
        row_2.classList.add(`w_pawn`);
        boardPosition[boardPosition.length - 1].push(`w_pawn`);

        row_3.classList.add(`empty`);
        boardPosition[boardPosition.length - 1].push(`empty`);
        row_4.classList.add(`empty`);
        boardPosition[boardPosition.length - 1].push(`empty`);
        row_5.classList.add(`empty`);
        boardPosition[boardPosition.length - 1].push(`empty`);
        row_6.classList.add(`empty`);
        boardPosition[boardPosition.length - 1].push(`empty`);

        row_7.classList.add(`b_pawn`);
        boardPosition[boardPosition.length - 1].push(`b_pawn`);
        row_8.classList.add(`b_${piece_list[i]}`); 
        boardPosition[boardPosition.length - 1].push(`b_${piece_list[i]}`);
    }

    let styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.body.appendChild(styleSheet);
}

function checkmateSequence() { 

}

createSquares();
setPieces();

let selectOn = true;
window.onload = function() {
    let squares = document.getElementsByClassName("square");
    let oldSq = "";
    let coloredSquares = [];
    Array.from(squares).forEach((element) => {
        element.onmousedown = function(event) {
            if (selectOn && !gameEnded) {
                let target = event.target;
                let chosenCol = target.classList[2][0];
                if (!element.classList.contains("empty") && (chosenCol == whoToPlay)) {
                    oldSq = target.id;
                    target.style.backgroundColor = 'yellow';
                    selectOn = false;

                    let possibleMoves = parseMoves(target.classList[2], target.id);
                    console.log(possibleMoves);
                    possibleMoves.forEach((move) => {
                        let moveSq = document.getElementById(move);
                        moveSq.style.backgroundColor = "purple";
                        coloredSquares.push(move);
                    });
                }
            }
            else if (!gameEnded) {
                
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

                    saveColor = target.style.backgroundColor;
                    target.className = "";
                    target.classList.add("square");
                    target.classList.add(saveColor);
                    target.classList.add(oldPiece);
                    
                    let oldCoords = coordToIndices.get(oldSq);
                    let newCoords = coordToIndices.get(target.id);
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
                        gameEnded = true;
                        checkmateSequence();
                    }
                    else if (capturedPiece == "b_king") {
                        document.getElementById("whotoplay").innerHTML = "CHECKMATE - WHITE HAS WON";
                        gameEnded = true;
                        checkmateSequence();
                    }
                    playerTurn += 1;
                }
                selectOn = true;
            }
            //console.log(parseMoves(target.classList[2], target.id));
        }
    });
}