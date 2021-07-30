import { writable, derived } from 'svelte/store';
import { INITIAL_BOARD, INITIAL_FEN, ROW_LABELS, COL_LABELS } from './chess.js';
import { checkBoard } from '../scripts/utils.js';

// const storedFEN = localStorage.getItem('filename');
export const FEN = writable(INITIAL_FEN);
//export const TEST_STR = writable('');
// FEN.subscribe( value => {
//     localStorage.setItem('FEN', value === null ? '' : value);
// });

export const BOARD = derived(FEN, $FEN => checkBoard(INITIAL_BOARD, $FEN));

export const SELECTED_CELL = writable({row: -1, col: -1});
export const SOURCE_ID = derived(SELECTED_CELL, ($CELL, set) => {
    if ($CELL.row != -1 && $CELL.col != -1) {
        set(COL_LABELS[$CELL.col] + ROW_LABELS[$CELL.row])
    } else {
        set('')
    }
});

export const DESTINATION_ID = writable('');