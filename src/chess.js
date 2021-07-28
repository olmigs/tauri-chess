export const WHITE_PAWN   = "w/w_pawn.svg"
export const BLACK_PAWN   = "b/b_pawn.svg"
export const WHITE_ROOK   = "w/w_rook.svg"
export const BLACK_ROOK   = "b/b_rook.svg"
export const WHITE_BISHOP = "w/w_bishop.svg"
export const BLACK_BISHOP = "b/b_bishop.svg"
export const WHITE_KNIGHT = "w/w_knight.svg"
export const BLACK_KNIGHT = "b/b_knight.svg"
export const WHITE_QUEEN  = "w/w_queen.svg"
export const BLACK_QUEEN  = "b/b_queen.svg"
export const WHITE_KING   = "w/w_king.svg"
export const BLACK_KING   = "b/b_king.svg"

export const WHITES = WHITE_PAWN + WHITE_ROOK + WHITE_BISHOP + WHITE_KNIGHT + WHITE_QUEEN + WHITE_KING;
export const BLACKS = BLACK_PAWN + BLACK_ROOK + BLACK_BISHOP + BLACK_KNIGHT + BLACK_QUEEN + BLACK_KING;
export const PAWNS = WHITE_PAWN + BLACK_PAWN;
export const ROOKS = WHITE_ROOK + BLACK_ROOK;
export const KNIGHTS = WHITE_KNIGHT + BLACK_KNIGHT;
export const BISHOPS = WHITE_BISHOP + BLACK_BISHOP;
export const QUEENS = WHITE_QUEEN + BLACK_QUEEN;
export const KINGS = WHITE_KING + BLACK_KING;

export const ORTHOGONALS = QUEENS + ROOKS;
export const DIAGONALS = QUEENS + BISHOPS;

export const INITIAL_BOARD = [
    ['r','n','b','q','k','b','n','r'],
    ['p','p','p','p','p','p','p','p'],
    ['.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.'],
    ['.','.','.','.','.','.','.','.'],
    ['P','P','P','P','P','P','P','P'],
    ['R','N','B','Q','K','B','N','R']];

export const INITIAL_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"