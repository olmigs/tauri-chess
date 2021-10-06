import ChessWebAPI from 'chess-web-api';
import colors from 'colors';

colors.setTheme({
  info: 'green',
  string: 'cyan',
  user: 'yellow',
  success: 'bgBlue',
  error: 'red'
});

const chessAPI = new ChessWebAPI();
var myArgs = process.argv.slice(2);

function cleanUsername(user) {
    return user.replace('https://api.chess.com/pub/player/', '');
}

function iterateFens(games) {
    console.log('-------'.info);
    for (let game of games) {
        console.log('WHITE: ' + cleanUsername(game.white).user)
        console.log('BLACK: ' + cleanUsername(game.black).user);
        console.log('FEN: ' + game.fen.string);
        console.log('-------'.info);
    }
}

chessAPI.getPlayerCurrentDailyChess(myArgs[0])
    .then(resp => console.log(iterateFens(resp.body.games)))
    .catch(err => console.log(colors.error(err)));