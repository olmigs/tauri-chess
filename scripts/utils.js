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

export function callServer(endpoint, server) {

}

export function getRandomBoard(serv) {
    const url = serv + '/game/rand';
    callEndpoint(url, 'text')
        .then(fen => FEN.set(fen))
        .catch(err => console.log(err));
} 

export function connectToServer(serv) {
    const url = serv + '/game/pos';
    callEndpoint(url, 'text')
        .then(fen => FEN.set(fen))
        .catch(err => console.log(err));
}

export function sendUCI(uci, serv) {
    const url = serv + '/game/move';
    var uci_wrapper = {"uci": uci};
    callEndpoint(url, 'text', 'POST', uci_wrapper)
        .then(fen => FEN.set(fen.slice(1, fen.length-1))) // removes double quotes
        .catch(err => console.log(err));
}

export function sendFEN(fen, serv) {
    const url = serv + '/game/set';
    var fen_wrapper = { "fen": fen };
    callEndpoint(url, 'text', 'PUT', fen_wrapper)
        .then(fen => FEN.set(fen))
        .catch(err => console.log(err));
}

export function generateMoves(src, serv) {
    console.log("SOURCE SQ: " + src);
}

export function getCaptures(serv) {
    const url = serv + '/game/captures';
    callEndpoint(url, 'text')
        .then(captures => { 
            // console.log(captures);
            CAPTURES.set(captures); 
        })
        .catch(err => console.log(err));
}

export function getCapturesForSrc(src, captures) {
    var arr = new Array();
    for (let mov of captures) {
        if (mov.slice(0, 2) == src) {
            arr.push(mov);
        }
    }
    return arr;
}

export function updateLoc(loc, r, c) {
    let newLoc = ''
    let locArr = [...loc]
}

export function callEndpoint(url, responseType, method = 'GET', data = '') {
    const http = window.__TAURI__.http;
    var type;
    switch (responseType) {
        case 'json':
            type = http.ResponseType.JSON;
            break;
        case 'text':
            type = http.ResponseType.Text;
            break;
    }
    if (method === 'GET') {
        return http
            .fetch(url, {
                method: 'GET',
                responseType: type
            }).then(resp => {
                return resp.data
            });
    } else {
        return http
            .fetch(url, {
                method: method,
                body: http.Body.json(data),
                responseType: type
            }).then(resp => { 
                return resp.data
            });
    }
}