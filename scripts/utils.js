import {
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
import { fen960 } from './fen960';

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

export async function sendUCI(bot, uci, serv) {
    let uci_wrapper = { uci: uci };
    let endpoint;
    if (bot) {
        endpoint = 'play/move';
    } else {
        endpoint = 'move';
    }
    await callEndpoint(serv, endpoint, 'text', 'POST', uci_wrapper)
        .then((fen) => updateFEN(fen.slice(1, fen.length - 1), serv)) // removes double quotes
        .catch((err) => console.log(err));
}

export function sendFEN(fen, serv) {
    let fen_wrapper = { fen: fen };
    callEndpoint(serv, 'set', 'text', 'PUT', fen_wrapper)
        .then((serv_fen) => updateFEN(serv_fen, serv))
        .catch((err) => console.log(err));
}

export function new960() {
    updateFEN(fen960());
}

export function undoMove(serv) {
    callEndpoint(serv, 'prev', 'text')
        .then((serv_fen) => updateFEN(serv_fen.slice(1, serv_fen.length - 1), serv))
        .catch((err) => console.log(err));
}