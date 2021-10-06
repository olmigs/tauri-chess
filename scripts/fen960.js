import { INITIAL_FEN } from '../src/chess';
// const INITIAL_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getNew(pieces) {
    // should pieces be "scrambled" each time?
    let newPieces = [];
    for (let i = 0; i < 8; i++) {
        let randIndex = getRandomInt(8-i);
        let piece = pieces[randIndex];
        newPieces.push(piece);
        let piecesFore = pieces.slice(0, randIndex);
        let piecesAft = pieces.slice(randIndex+1, pieces.length);
        pieces = [...piecesFore, ...piecesAft];
    }
    return newPieces;
}

// migsnote: logic should be used for a genFen() function in utils.js
export function fen960() {
    let backArr = generateBackboard();
    let backStr = backArr.join('');
    let fieldsArr = INITIAL_FEN.split(' ');
    let posArr = fieldsArr[0].split('/');
    posArr[0] = backStr; // black
    posArr[7] = backStr.toUpperCase(); // WHITE
    fieldsArr[0] = posArr.join('/');
    return fieldsArr.join(' ');
}

function generateBackboard () {
    const pieces = ['k', 'q', 'r', 'r', 'b', 'b', 'n', 'n'];
    let pieces2 = getNew(pieces);
    let tries = 1;
    while (!validatePieces(pieces2)) {
        pieces2 = getNew(pieces);
        tries++;
    }
    console.log("Attempts made: " + tries);
    return pieces2;
}

function validatePieces(pieces) {
    let bishopFirstIs = 'null';
    let rookIn = false;
    let rookInKingIn = false;
    let rookOut = false;
    let i = 0;
    for (let piece of pieces) {
        switch (piece) {
            case 'b':
                if (bishopFirstIs == 'null') {
                    if (i % 2 == 0) {
                        bishopFirstIs = 'even';
                    } else {
                        bishopFirstIs = 'odd';
                    }
                } else {
                    if (i % 2 == 0) { // index is even
                        if (bishopFirstIs == 'even') {
                            return false;
                        }
                    } else {
                        if (bishopFirstIs == 'odd') {
                            return false;
                        }
                    }
                } 
                break;
            case 'r':
                if (rookIn) {
                    if (!rookInKingIn) {
                        return false;
                    } else {
                        rookOut = true;
                    }
                } else {
                    rookIn = true;
                }
                break;
            case 'k':
                if (rookIn) {
                    rookInKingIn = true;
                }
                break;
            case 'x':
                return false;
        }
        i++;
    }
    if (rookOut) {
        return true;
    } else return false;
}