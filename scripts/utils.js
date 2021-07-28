import { WHITE_PAWN, BLACK_PAWN, WHITE_ROOK, BLACK_ROOK,
    WHITE_BISHOP, BLACK_BISHOP, WHITE_KNIGHT, BLACK_KNIGHT,
    WHITE_QUEEN, BLACK_QUEEN, BLACK_KING, WHITE_KING } from "../src/chess.js";

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
    // split into string array representing rows
    var FENarr = fen.split(' '); // FENarr.length === 6
    var pos = FENarr[0].split('/'); // pos.length === 8
    var i = 0;
    for (let posStr of pos) {
        console.log(board[i]);
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