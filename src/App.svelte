<script>
    import Grid from './Grid.svelte';
    // import Importer from './Importer.svelte'
    import { FEN, SOURCE_ID, DESTINATION_ID} from './stores.js';
    import { INITIAL_FEN } from './chess.js';
    import { callServer, connectToServer, sendUCI, getRandomBoard, updateLoc, sendFEN } from '../scripts/utils.js';
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
    <Grid />
    <div class="ctrl">
        <input id="fenbox" type="text" readonly="readonly" bind:value={$FEN}/>
        <button class="implemented" on:click={newGame}>New Game</button>
        <br />
        <button class="implemented" on:click={() => connectToServer(server)}>Current Server FEN</button>
        <button class="implemented" on:click={() => getRandomBoard(server)}>Get Random</button>
        <button class="implemented" on:click={() => sendFEN($FEN, server)}>Send FEN to Server</button>
        <button class="implemented" on:click={() => sendUCI($SOURCE_ID + $DESTINATION_ID, server)}>Complete & Send Move: {$SOURCE_ID} -</button>
        <input id="ucibox" type="text" bind:value={$DESTINATION_ID} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
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
    }
    input {
        border-radius: 7px;
    }
    #fenbox {
        width: 65%;
        color:dimgrey;
        background-color: lightgray;
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
    /* button.unimplemented {
        background-color: #6d1e1e;
    } */
    button.implemented {
        background-color: #3aaf28;
    }
</style>