// the actual square elements are created in html here
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

// each square is assigned its piece in the starting position
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

// the timers need to be put in the correct position
// also a bit convoluted how i do it, will fix later
function createTimers() {
    if (playerColor == "white") {
        document.getElementById("toptimer").id = "blacktimer";
        document.getElementById("bottomtimer").id = "whitetimer";
        document.getElementById("whitetimer").style.marginTop = "285px";
        document.getElementById("blacktimer").style.marginTop = "150px";
    }
    else {
        document.getElementById("toptimer").id = "whitetimer";
        document.getElementById("bottomtimer").id = "blacktimer";
    }
}

function resetGame() {
    window.location.reload();
}

// makes a big button when its game over
function checkmateSequence() { 
    let newButton = document.createElement("button");
    newButton.type = "button";
    newButton.id = "restartButton";
    newButton.innerHTML = "New Game";
    newButton.onclick = resetGame;
    let buttonContainer = document.getElementById("restart");
    buttonContainer.appendChild(newButton);
}