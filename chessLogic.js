
const coordToIndices = new Map();
const indicesToCoords = new Map();

function setMaps() {
    let letters = "abcdefgh";
    for (let i = 0; i < letters.length; i++) {
        for (let j = 0; j < 8; j++) {
            coordToIndices.set(letters[i] + (j+1), [i, j])
        } 
    }
    for (let i = 0; i < letters.length; i++) {
        for (let j = 0; j < 8; j++) {
            indicesToCoords.set([i, j], letters[i] + (j+1))
        } 
    }

} setMaps();

function letterToPiece(letter) {
    if (letter == "b") 
        return "b_bishop";
    else if (letter == "k")
        return "b_king";
    else if (letter == "n")
        return "b_knight";
    else if (letter == "p")
        return "b_pawn";
    else if (letter == "q")
        return "b_queen";
    else if (letter == "r")
        return "b_rook";
    else if (letter == "B")
        return "w_bishop";
    else if (letter == "K")
        return "w_king";
    else if (letter == "N")
        return "w_knight";
    else if (letter == "P")
        return "w_pawn";
    else if (letter == "Q")
        return "w_queen";
    else if (letter == "R")
        return "w_rook";
    else
        return "";
}


function fenBoardInterrupt(fen) {
    
    let eachRow = fen.split("/");
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (letterToPiece(eachRow[i][j]) != "") {
                boardPosition[j][i] = letterToPiece(eachRow[i][j]);
            }
            else {
                for (let k = 0; k < Number(eachRow[i][j]); k++) {
                    boardPosition[j+k][i] = "empty";
                }
                j += Number(eachRow[i][j])
            }
        }
    }
    //console.log(eachRow);
    
}

fenBoardInterrupt("rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR");
console.log(boardPosition);

function bishopMoves(piece, square) {
    possibleMoves = [];
    let currPos = coordToIndices.get(square);
    return possibleMoves;
}

function kingMoves(piece, square) {
    possibleMoves = [];
    let currPos = coordToIndices.get(square);
    return possibleMoves;
}

function knightMoves(piece, square) {
    possibleMoves = [];
    let currPos = coordToIndices.get(square);
    return possibleMoves;
}

function pawnMoves(piece, square) {
    possibleMoves = [];
    let currPos = coordToIndices.get(square);
    return possibleMoves;
}

function queenMoves(piece, square) {
    possibleMoves = [];
    let currPos = coordToIndices.get(square);
    return possibleMoves;
}

function rookMoves(piece, square) {
    possibleMoves = [];
    let currPos = coordToIndices.get(square);
    return possibleMoves;
}

function parseMoves(piece, square) {
    if (piece.slice(2, piece.length) == "bishop")
        return bishopMoves(piece, square);
    else if (piece.slice(2, piece.length) == "king")
        return kingMoves(piece, square);
    else if (piece.slice(2, piece.length) == "knight")
        return knightMoves(piece, square);
    else if (piece.slice(2, piece.length) == "pawn")
        return pawnMoves(piece, square);
    else if (piece.slice(2, piece.length) == "queen")
        return queenMoves(piece, square);
    else if (piece.slice(2, piece.length) == "rook")
        return rookMoves(piece, square);
}