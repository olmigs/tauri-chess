import { writable, derived } from 'svelte/store';
import { INITIAL_BOARD, INITIAL_FEN, ROW_LABELS, COL_LABELS } from './chess';
import { callEndpoint } from '../scripts/client_http';

// const storedFEN = localStorage.getItem('filename');
export const FEN = writable(INITIAL_FEN);
// FEN.subscribe(value => {
//     localStorage.setItem('FEN', value === null ? '' : value);
// });

export const BOARD = derived(FEN, ($FEN) => checkBoard(INITIAL_BOARD, $FEN));

export const SELECTED_CELL = writable({ row: -1, col: -1 });
export const SOURCE_ID = derived(SELECTED_CELL, ($CELL, set) => {
    if ($CELL.row != -1 && $CELL.col != -1) {
        set(COL_LABELS[$CELL.col] + ROW_LABELS[$CELL.row]);
    } else {
        set('');
    }
});
// export const CAPTURES_FOR_SRC = derived(SOURCE_ID, $SRC => {getCapturesForSrc($SRC, CAPTURES)});

export const DESTINATION_ID = writable('');
export const CAPTURES = writable([]);
export const TURN = writable();

export function updateFEN(new_fen, serv = 'UNSET') {
    FEN.set(new_fen);
    if (serv != 'UNSET') {
        setCaptures(serv);
        setTurn(new_fen);
    }
}

function setCaptures(serv) {
    callEndpoint(serv, 'moves', 'json')
        .then((captures) => {
            // console.log(captures);
            CAPTURES.set(captures);
        })
        .catch((err) => console.log(err));
}

function setTurn(fen) {
    var FENarr = fen.split(' ');
    TURN.set(FENarr[1]);
}

function concat1DStringArray(arr) {
    let retStr = '';
    for (let str of arr) {
        retStr += str;
    }
    return retStr;
}

function isNumeric(num) {
    return !isNaN(num);
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

// migsnote: god object potential?
function checkBoard(board, fen) {
    // migstodo: validate fen?
    // CAPTURES.set(getCaptures('http://localhost:8080'));
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
            // setCaptures('http://localhost:8080'); // migsnote: need to change this to 'update' flag; can be used for further processing
            // return false;
        }
        i++;
    }
    return board;
}
