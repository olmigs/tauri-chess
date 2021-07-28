import { writable, derived } from 'svelte/store';
import { INITIAL_BOARD, INITIAL_FEN } from './chess.js';
import { checkBoard } from '../scripts/utils.js';

// const storedFEN = localStorage.getItem('filename');
export const FEN = writable(INITIAL_FEN);
// FEN.subscribe( value => {
//     localStorage.setItem('FEN', value === null ? '' : value);
// });

export const BOARD = derived(FEN, $FEN => checkBoard(INITIAL_BOARD, $FEN));