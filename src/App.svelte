<script>
    import Grid from './Grid.svelte';
    // import Importer from './Importer.svelte'
    import { FEN, SOURCE_ID, DESTINATION_ID, CAPTURES} from './stores.js';
    import { INITIAL_FEN } from './chess.js';
    import { callServer, connectToServer, sendUCI, getRandomBoard, updateLoc, sendFEN, generateMoves } from '../scripts/utils.js';
import Cell from './Cell.svelte';
    export let server;

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

	function handleKeydown(event) {
		const keys = ['y', 'g']
        if (keys.includes(event.key)) {
            bindKey(event.key)
        }
	}

    let key1;
	let key2;
    function bindKey(key) {
        if (!key1) {
            key1 = key;
        } else if (!key2) {
            key2 = key;
        } else {
            let success = moveBasedOnKey(key1, key2);
            if (success) {
                key2 = null;
            }
        }
    }

    function moveBasedOnKey(sprite, loc) {
        var row = 0;
        var col = 0;
        switch (loc) {
            case 'ArrowUp':
                col++;
                break;
            case 'ArrowDown':
                col--;
                break;
            case 'ArrowLeft':
                row--;
                break;
            case 'ArrowRight':
                row++;
                break;
        }
        if (row != 0 || col != 0) {
            if (sprite === 'y') {
                SOURCE_ID.update(src => updateLoc(src, row, col))
            }
            if (sprite === 'g') {
                DESTINATION_ID.update(dest => updateLoc(dest, row, col))
            }
            return true;
        } else { return false; }
        
    }
</script>

<!-- <svelte:window on:keydown={handleKeydown}/> -->

<main>
    <!-- <p>{$CAPTURES}</p> -->
    <div>
        <Grid />
        <input id="fenbox" type="text" readonly="readonly" bind:value={$FEN}/>
        <button class="implemented" on:click={() => sendFEN($FEN, server)}>Send to Server</button>
    </div>
    
    <div class="ctrl">
        <h1>chess man</h1>
        <button class="implemented" on:click={() => connectToServer(server)}>Server FEN</button>
        <button class="implemented" on:click={newGame}>New Game</button>
        <button class="implemented" on:click={() => getRandomBoard(server)}>Random</button>
        <div class="unflex">
            <button class="implemented" on:click={() => sendUCI($SOURCE_ID + $DESTINATION_ID, server)}>Send Move: {$SOURCE_ID}</button>
            <input id="ucibox" type="text" bind:value={$DESTINATION_ID} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
        </div>
        <button class="unimplemented" on:click={() => generateMoves($SOURCE_ID, server)}>Show Moves</button>
        {#each $CAPTURES as mov}
            {#if mov.includes($SOURCE_ID)}
                <p>{mov}</p>
            {/if}
        {/each}
    </div>
</main>

<style>
    main {
        width: 100%;
        height: 100%;
        background-color: #8ed7da7c;
        text-align: center;
        padding-top: 20px;
        overflow-x: hidden;
        display: flex;
        flex-direction: row;
    }

    input {
        border-radius: 7px;
    }

    .ctrl {
        min-width: 200px;
        text-align: left;
        margin: 100px;
        margin-left: -40px;
    }

    .unflex {
        flex-direction: column;
    }

    #fenbox {
        width: 65%;
        color:dimgrey;
        background-color: lightgray;
        margin-bottom: 25px;
    }

    #ucibox {
        width: 50px;
    }

    button {
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 7px;
        padding: 10px;
    }

    button.unimplemented {
        background-color: #6d1e1e;
    }

    button.implemented {
        background-color: #3aaf28;
    }
</style>