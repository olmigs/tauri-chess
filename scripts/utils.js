import { ROW_LABELS, COL_LABELS, WHITE_PAWN, BLACK_PAWN, WHITE_ROOK,   BLACK_ROOK, WHITE_BISHOP, BLACK_BISHOP, WHITE_KNIGHT, BLACK_KNIGHT,
    WHITE_QUEEN, BLACK_QUEEN, BLACK_KING, WHITE_KING } from '../src/chess.js';
// import { TauriHttpClient } from '../classes/TauriHttpClient.js';
import { FEN } from '../src/stores.js';

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

// const board = [
//     ['r','n','b','q','k','b','n','r'],
//     ['p','p','p','p','p','p','p','p'],
//     ['.','.','.','.','.','.','.','.'],
//     ['.','.','.','.','.','.','.','.'],
//     ['.','.','.','.','.','.','.','.'],
//     ['.','.','.','.','.','.','.','.'],
//     ['P','P','P','P','P','P','P','P'],
//     ['R','N','B','Q','K','B','N','R']];

// const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"

function concat1DStringArray(arr) {
    let retStr = '';
    for (let str of arr) {
        retStr += str;
    }
    return retStr;
}

function isNumeric(num){
    return !isNaN(num)
}

function chewStr(val) {
    if (isNumeric(val)) {
        let retStr = '';
        for (let i = 0; i < val; i++) {
            retStr += '.';
        }
        return retStr;
    } else {
        return val;
    }
}

// migsnote: BADLY IMPLEMENTED i.e. not recursive
function munch(str) {
    var retStr = '';
    var strArr = [...str];
    for (let i = 0; i < strArr.length; i++) {
        retStr += chewStr(strArr[i]);
    }
    return retStr;
}

// old attempt at recursion
function translate(str) {
    if (str.length == 8) {
        return str;
    }
    if (isNumeric(str.slice(0, 1))) {
        let preStr = ''; // can still get you pregnant
        let bacStr = str.slice(1, str.length)
        let firstChar = str.slice(0, 1);
        for (let i = 0; index < firstChar; ++i) {
            preStr += ".";
        }
        translate(preStr + newStr + bacStr);
    } else {
        translate(str); // ?
    }
}

export function checkBoard(board, fen) {
    // migstodo: validate fen?
    // split into string array representing rows
    var FENarr = fen.split(' '); // FENarr.length === 6
    var pos = FENarr[0].split('/'); // pos.length === 8
    var i = 0;
    for (let posStr of pos) {
        // console.log(board[i]);
        let boardRowStr = concat1DStringArray(board[i]);
        // console.log(boardRowStr);
        posStr = munch(posStr);
        if (posStr !== boardRowStr) {
            board[i] = [...posStr];
            // return false;
        }
        i++;
    }
    return board;
}

export function getRandomBoard(serv) {
    const url = serv + '/game/rand';
    callEndpoint(url)
        .then(fen => FEN.set(fen))
        .catch(err => console.log(err));
} 

export function connectToServer(serv) {
    const url = serv + '/game/pos';
    callEndpoint(url)
        .then(fen => FEN.set(fen))
        .catch(err => console.log(err));
}

export function sendUCI(uci, serv) {
    const url = serv + '/game/move';
    var uci_wrapper = {"uci": uci};
    callEndpoint(url, 'POST', uci_wrapper)
        .then(fen => FEN.set(fen.slice(1, fen.length-1))) // removes double quotes
        .catch(err => console.log(err));
}

export function sendFEN(fen, serv) {
    const url = serv + '/game/set';
    var fen_wrapper = {"fen": fen};
    callEndpoint(url, 'PUT', fen_wrapper)
        .then(fen => FEN.set(fen))
        .catch(err => console.log(err));
}

export function generateMoves(src, serv) {
    console.log("SOURCE SQ: " + src);
}

export function updateLoc(loc, r, c) {
    let newLoc = ''
    let locArr = [...loc]
}

function callEndpoint(url, method = 'GET', data = '') {
    const http = window.__TAURI__.http;
    if (method === 'GET') {
        return http
            .fetch(url, {
                method: 'GET',
                responseType: http.ResponseType.Text
            }).then(resp => {
                return resp.data
            });
    } else {
        return http
            .fetch(url, {
                method: method,
                body: http.Body.json(data),
                responseType: http.ResponseType.Text
            }).then(resp => { 
                return resp.data
            });
    }
}