<script>
    import Grid from './Grid.svelte';
    // import Importer from './Importer.svelte'
    import { FEN, BOARD } from './stores.js';
    import { INITIAL_FEN } from './chess.js';
    // import { checkBoard } from '../scripts/utils.js';

    function newGame() {
        FEN.set(INITIAL_FEN);
        document.getElementById('fenbox').value = INITIAL_FEN;
    }
    function handleInput() {
        var inputStr = document.getElementById('fenbox').value;
        // console.log(inputStr);
        if (inputStr != FEN) {
            // BOARD.update(b => checkBoard(b, inputStr));
            FEN.set(inputStr);
        }   
    }
</script>

<main>
    <Grid />
    <input id="fenbox" type="text" />
    <br />
    <button on:click|preventDefault={newGame}>New Game</button>
    <button on:click|preventDefault={handleInput}>Import from FEN</button>
</main>

<style>
    main {
        text-align: center;
    }
    input {
        width: 80%;
    }
</style>