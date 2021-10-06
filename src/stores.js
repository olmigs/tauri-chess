import { writable, derived } from 'svelte/store';
import { INITIAL_BOARD, INITIAL_FEN } from './chess';
import { callEndpoint } from '../scripts/client_http';

// const storedFEN = localStorage.getItem('FEN');
export const FEN = writable(INITIAL_FEN);
// FEN.subscribe(value => {
//     localStorage.setItem('FEN', value === null ? '' : value);
// });

export const BOARD = derived(FEN, ($FEN) => checkBoard(INITIAL_BOARD, $FEN));

export const MOVES = writable([]);
export const TURN = writable();

export const MOVES_FROM_SRC = writable([]);
export const FLIP = writable(false);
export const R_INDICES = derived(FLIP, ($FLIP) => flipIndices($FLIP));
export const C_INDICES = derived(FLIP, ($FLIP) => flipIndices($FLIP));

function flipIndices(flip) {
    if (!flip) {
        return [0, 1, 2, 3, 4, 5, 6, 7];
    } else {
        return [7, 6, 5, 4, 3, 2, 1, 0];
    }
}

export function updateFEN(new_fen, serv = 'UNSET') {
    FEN.set(new_fen);
    if (serv != 'UNSET') {
        setMoves(serv);
        setTurn(new_fen);
        MOVES_FROM_SRC.set([]);
    }
}

export function updateMovesFromSrc(src, moves) {
    let new_mfs = [];
    for (let mov of moves) { 
        if (mov.includes(src)) {
            new_mfs.push(mov);
        }
    }
    MOVES_FROM_SRC.set(new_mfs);
}

export function flip(value) {
    if (value) {
        FLIP.set(false);
    } else {
        FLIP.set(true);
    }
}

function setMoves(serv) {
    callEndpoint(serv, 'moves', 'json')
        .then((captures) => {
            // console.log(captures);
            MOVES.set(captures);
        })
        .catch((err) => console.log(err));
}

function setTurn(fen) {
    var FENarr = fen.split(' ');
    TURN.set(FENarr[1]);
}

function isNumeric(num) {
    return !isNaN(num);
}

function numToDot(num) {
    if (num.slice(num.length-1, num.length) == 0) {
        return num.slice(0, num.length-1);
    }
    return numToDot('.' + num.slice(0, num.length-1) + (num.slice(num.length-1, num.length) - 1));
}

function rankToRow(str) {
    var retStr = '';
    var strArr = [...str];
    for (let i = 0; i < strArr.length; i++) {
        if (isNumeric(strArr[i])) {
            retStr += numToDot(strArr[i]);
        } else {
            retStr += strArr[i];
        }
    }
    return retStr;
}

export function checkBoard(board, fen) {
    var fieldsArr = fen.split(' '); 
    var posArr = fieldsArr[0].split('/');
    var i = 0;
    for (let pos of posArr) {
        // console.log('FEN rank: ' + pos + ' to row: ' + rankToRow(pos) + ' | BOARD row: ' + board[i].join(''));
        pos = rankToRow(pos);
        if (pos !== board[i].join('')) {
            board[i] = [...pos];
        }
        i++;
    }
    return board;
}
