
const coordToIndices = new Map();
const indicesToCoords = new Map();
//hash maps for easy of converting between indices and alphanumeric coordinates
function setMaps() {
    let letters = "abcdefgh";
    for (let i = 0; i < letters.length; i++) {
        for (let j = 0; j < 8; j++) {
            coordToIndices.set(letters[i] + (j+1), [i, j])
        } 
    }
    for (let i = 0; i < letters.length; i++) {
        for (let j = 0; j < 8; j++) {
            indicesToCoords.set(i.toString() + j.toString(), letters[i] + (j+1))
        } 
    }

} setMaps();


// the rest is pretty self explanatory, its just the possible moves a certain piece can make 
// given its position and the board composition at the moment
function bishopMoves(piece, square) {
    possibleMoves = [];
    let currPos = coordToIndices.get(square);
    let currCol = boardPosition[currPos[0]][currPos[1]][0];

    let i = currPos[0];
    let j = currPos[1];
    i++; j++;
    while ((i < 8) && (j < 8)) {
        if (boardPosition[i][j][0] == "e") {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
        }
        else if (boardPosition[i][j][0] != currCol) {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
            break;
        }
        else {
            break;
        }
        i++; j++;
    }

    i = currPos[0] - 1;
    j = currPos[1] - 1;
    while ((i >= 0) && (j >= 0)) {
        if (boardPosition[i][j][0] == "e") {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
        }
        else if (boardPosition[i][j][0] != currCol) {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
            break;
        }
        else {
            break;
        }
        i--; j--;
    }

    i = currPos[0] + 1;
    j = currPos[1] - 1;
    while ((i < 8) && (j >= 0)) {
        if (boardPosition[i][j][0] == "e") {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
        }
        else if (boardPosition[i][j][0] != currCol) {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
            break;
        }
        else {
            break;
        }
        i++; j--;
    }

    i = currPos[0] - 1;
    j = currPos[1] + 1;
    while ((i >= 0) && (j < 8)) {
        if (boardPosition[i][j][0] == "e") {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
        }
        else if (boardPosition[i][j][0] != currCol) {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
            break;
        }
        else {
            break;
        }
        i--; j++;
    }

    return possibleMoves;
}

function kingMoves(piece, square) {
    possibleMoves = [];
    let currPos = coordToIndices.get(square);
    let currCol = boardPosition[currPos[0]][currPos[1]][0];

    let i = currPos[0] + 1;
    let j = currPos[1] + 1;
    if ((i < 8) && (j < 8)) {
        if ((boardPosition[i][j][0] == "e") || (boardPosition[i][j][0] != currCol)) {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
        }
    }

    i = currPos[0] - 1;
    j = currPos[1] - 1;
    if ((i >= 0) && (j >= 0)) {
        if ((boardPosition[i][j][0] == "e") || (boardPosition[i][j][0] != currCol)) {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
        }
    }

    i = currPos[0] + 1;
    j = currPos[1] - 1;
    if ((i < 8) && (j >= 0)) {
        if ((boardPosition[i][j][0] == "e") || (boardPosition[i][j][0] != currCol)) {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
        }
    }

    i = currPos[0] - 1;
    j = currPos[1] + 1;
    if ((i >= 0) && (j < 8)) {
        if ((boardPosition[i][j][0] == "e") || (boardPosition[i][j][0] != currCol)) {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
        }
    }

    i = currPos[0] - 1;
    j = currPos[1];
    if ((i >= 0)) {
        if ((boardPosition[i][j][0] == "e") || (boardPosition[i][j][0] != currCol)) {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
        }
    }

    i = currPos[0] + 1;
    j = currPos[1];
    if ((i < 8)) {
        if ((boardPosition[i][j][0] == "e") || (boardPosition[i][j][0] != currCol)) {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
        }
    }

    i = currPos[0];
    j = currPos[1] - 1;
    if ((j >= 0)) {
        if ((boardPosition[i][j][0] == "e") || (boardPosition[i][j][0] != currCol)) {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
        }
    }

    i = currPos[0];
    j = currPos[1] + 1;
    if ((j < 8)) {
        if ((boardPosition[i][j][0] == "e") || (boardPosition[i][j][0] != currCol)) {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
        }
    }

    return possibleMoves;
}

function knightMoves(piece, square) {
    possibleMoves = [];
    let currPos = coordToIndices.get(square);
    let currCol = boardPosition[currPos[0]][currPos[1]][0];

    let i = currPos[0] + 2;
    let j = currPos[1] + 1;
    if ((i < 8) && (j < 8)) {
        if ((boardPosition[i][j][0] == "e") || (boardPosition[i][j][0] != currCol)) {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
        }
    }

    i = currPos[0] - 2;
    j = currPos[1] - 1;
    if ((i >= 0) && (j >= 0)) {
        if ((boardPosition[i][j][0] == "e") || (boardPosition[i][j][0] != currCol)) {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
        }
    }

    i = currPos[0] + 2;
    j = currPos[1] - 1;
    if ((i < 8) && (j >= 0)) {
        if ((boardPosition[i][j][0] == "e") || (boardPosition[i][j][0] != currCol)) {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
        }
    }

    i = currPos[0] - 2;
    j = currPos[1] + 1;
    if ((i >= 0) && (j < 8)) {
        if ((boardPosition[i][j][0] == "e") || (boardPosition[i][j][0] != currCol)) {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
        }
    }

    i = currPos[0] + 1;
    j = currPos[1] - 2;
    if ((i < 8) && (j >= 0)) {
        if ((boardPosition[i][j][0] == "e") || (boardPosition[i][j][0] != currCol)) {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
        }
    }

    i = currPos[0] + 1;
    j = currPos[1] + 2;
    if ((i < 8) && (j < 8)) {
        if ((boardPosition[i][j][0] == "e") || (boardPosition[i][j][0] != currCol)) {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
        }
    }

    i = currPos[0] - 1;
    j = currPos[1] - 2;
    if ((i >= 0) && (j >= 0)) {
        if ((boardPosition[i][j][0] == "e") || (boardPosition[i][j][0] != currCol)) {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
        }
    }

    i = currPos[0] - 1;
    j = currPos[1] + 2;
    if ((i >= 0) && (j < 8)) {
        if ((boardPosition[i][j][0] == "e") || (boardPosition[i][j][0] != currCol)) {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
        }
    }

    return possibleMoves;
}

function pawnMoves(piece, square) {
    possibleMoves = [];
    let currPos = coordToIndices.get(square);
    let currCol = boardPosition[currPos[0]][currPos[1]][0];

    let i = currPos[0];
    let j = currPos[1] + 1;

    if ((currCol == "w")) {
        if (j < 8) {
            if (boardPosition[i][j][0] == "e") {
                possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
            }
        }

        i = currPos[0] + 1;
        j = currPos[1] + 1;
        if ((j < 8) && (i < 8)) {
            if ((boardPosition[i][j][0] != "e") && (boardPosition[i][j][0] != currCol)) {
                possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
            }
        }

        i = currPos[0] - 1;
        j = currPos[1] + 1;
        if ((j < 8) && (i >= 0)) {
            if ((boardPosition[i][j][0] != "e") && (boardPosition[i][j][0] != currCol)) {
                possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
            }
        }

        i = currPos[0];
        j = currPos[1];
        if ((j == 1)){
            if ((boardPosition[i][j+1][0] == "e") && (boardPosition[i][j+2][0] == "e")) {
                possibleMoves.push(indicesToCoords.get(i.toString() + (j+2).toString()));
            }  
        }
    }

    else {
        i = currPos[0];
        j = currPos[1] - 1;
        if (j >= 0) {
            if (boardPosition[i][j][0] == "e") {
                possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
            }
        }

        i = currPos[0] + 1;
        j = currPos[1] - 1;
        if ((j >= 0) && (i < 8)) {
            if ((boardPosition[i][j][0] != "e") && (boardPosition[i][j][0] != currCol)) {
                possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
            }
        }

        i = currPos[0] - 1;
        j = currPos[1] - 1;
        if ((j >= 0) && (i >= 0)) {
            if ((boardPosition[i][j][0] != "e") && (boardPosition[i][j][0] != currCol)) {
                possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
            }
        }

        i = currPos[0];
        j = currPos[1];
        if ((j == 6)){
            if ((boardPosition[i][j-1][0] == "e") && (boardPosition[i][j-2][0] == "e")) {
                possibleMoves.push(indicesToCoords.get(i.toString() + (j-2).toString()));
            }  
        }
    }
    return possibleMoves;
}

function queenMoves(piece, square) {
    combinedMoves = [];
    bishopMoves(piece, square).forEach((move) => {
        combinedMoves.push(move);
    });
    rookMoves(piece, square).forEach((move) => {
        combinedMoves.push(move);
    });
    
    return combinedMoves;
}

function rookMoves(piece, square) {
    possibleMoves = [];
    let currPos = coordToIndices.get(square);
    let currCol = boardPosition[currPos[0]][currPos[1]][0];

    let i = currPos[0];
    let j = currPos[1];
    i++;
    while (i < 8) {
        if (boardPosition[i][j][0] == "e") {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
        }
        else if (boardPosition[i][j][0] != currCol) {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
            break;
        }
        else {
            break;
        }
        i++;
    }

    i = currPos[0]; j = currPos[1] + 1;
    while (j < 8) {
        if (boardPosition[i][j][0] == "e") {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
        }
        else if (boardPosition[i][j][0] != currCol) {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
            break;
        }
        else {
            break;
        }
        j++;
    }

    i = currPos[0] - 1; j = currPos[1];
    while (i >= 0) {
        if (boardPosition[i][j][0] == "e") {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
        }
        else if (boardPosition[i][j][0] != currCol) {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
            break;
        }
        else {
            break;
        }
        i--;
    }

    i = currPos[0]; j = currPos[1] - 1;
    while (j >= 0) {
        if (boardPosition[i][j][0] == "e") {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
        }
        else if (boardPosition[i][j][0] != currCol) {
            possibleMoves.push(indicesToCoords.get(i.toString() + j.toString()));
            break;
        }
        else {
            break;
        }
        j--;
    }

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