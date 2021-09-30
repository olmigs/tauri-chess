import { writable, derived } from 'svelte/store';
import { INITIAL_BOARD, INITIAL_FEN, ROW_LABELS, COL_LABELS } from './chess';
import { callEndpoint } from '../scripts/client_http';

// const storedFEN = localStorage.getItem('filename');
export const FEN = writable(INITIAL_FEN);
// FEN.subscribe(value => {
//     localStorage.setItem('FEN', value === null ? '' : value);
// });

export const BOARD = derived(FEN, ($FEN) => checkBoard(INITIAL_BOARD, $FEN));

// export const SELECTED_CELL = writable({ row: -1, col: -1 });
// export const SOURCE_ID = derived(SELECTED_CELL, ($CELL, set) => {
//     if ($CELL.row != -1 && $CELL.col != -1) {
//         set(COL_LABELS[$CELL.col] + ROW_LABELS[$CELL.row]);
//     } else {
//         set('');
//     }
// });

// export const DESTINATION_ID = writable('');
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
