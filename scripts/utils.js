import {
    ROW_LABELS,
    COL_LABELS,
    WHITE_PAWN,
    BLACK_PAWN,
    WHITE_ROOK,
    BLACK_ROOK,
    WHITE_BISHOP,
    BLACK_BISHOP,
    WHITE_KNIGHT,
    BLACK_KNIGHT,
    WHITE_QUEEN,
    BLACK_QUEEN,
    BLACK_KING,
    WHITE_KING,
} from '../src/chess';
import { callEndpoint } from './client_http';
import { updateFEN } from '../src/stores';

export function getImg(val) {
    let retStr = 'assets/';
    switch (val) {
        case 'P':
            retStr += WHITE_PAWN;
            break;
        case 'p':
            retStr += BLACK_PAWN;
            break;
        case 'R':
            retStr += WHITE_ROOK;
            break;
        case 'r':
            retStr += BLACK_ROOK;
            break;
        case 'B':
            retStr += WHITE_BISHOP;
            break;
        case 'b':
            retStr += BLACK_BISHOP;
            break;
        case 'N':
            retStr += WHITE_KNIGHT;
            break;
        case 'n':
            retStr += BLACK_KNIGHT;
            break;
        case 'Q':
            retStr += WHITE_QUEEN;
            break;
        case 'q':
            retStr += BLACK_QUEEN;
            break;
        case 'K':
            retStr += WHITE_KING;
            break;
        case 'k':
            retStr += BLACK_KING;
            break;
        default:
            retStr = '';
            break;
    }
    return retStr;
}

export function getRandomBoard(serv) {
    callEndpoint(serv, 'rand', 'text')
        .then((fen) => updateFEN(fen))
        .catch((err) => console.log(err));
}

export function connectToServer(serv) {
    callEndpoint(serv, 'pos', 'text')
        .then((fen) => {
            updateFEN(fen, serv);
        })
        .catch((err) => console.log(err));
}

export function sendUCI(uci, serv) {
    var uci_wrapper = { uci: uci };
    callEndpoint(serv, 'move', 'text', 'POST', uci_wrapper)
        .then((fen) => updateFEN(fen.slice(1, fen.length - 1), serv)) // removes double quotes
        .catch((err) => console.log(err));
}

export function sendFEN(fen, serv) {
    var fen_wrapper = { fen: fen };
    callEndpoint(serv, 'set', 'text', 'PUT', fen_wrapper)
        .then((serv_fen) => updateFEN(serv_fen, serv))
        .catch((err) => console.log(err));
}

// -- nothing
// -- useful
// -- below 09/20/21

export function updateLoc(loc, r, c) {
    let newLoc = '';
    let locArr = [...loc];
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getNew(pieces) {
    // should pieces be "scrambled" each time?
    var newPieces = [];
    for (let i = 0; i < 8; i++) {
        let randIndex = getRandomInt(8 - i);
        let piece = pieces[randIndex];
        newPieces.push(piece);
        piecesFore = pieces.slice(0, randIndex);
        piecesAft = pieces.slice(randIndex + 1, pieces.length);
        pieces = [...piecesFore, ...piecesAft];
    }
    return newPieces;
}

function generateBackboard() {
    const pieces = ['k', 'q', 'r', 'r', 'b', 'b', 'n', 'n'];
    var pieces2 = getNew(pieces);
    var tries = 1;
    while (!validatePieces(pieces2)) {
        pieces2 = getNew(pieces);
        tries++;
    }
    console.log('Attempts made: ' + tries);
    return pieces2;
}

function validatePieces(pieces) {
    var rookIn = false;
    var rookInKingIn = false;
    var rookOut = false;
    for (let piece of pieces) {
        switch (piece) {
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
    }
    if (rookOut) {
        return true;
    } else return false;
}
