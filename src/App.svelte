<script>
    import Grid from './Grid.svelte';
    import { FEN, CAPTURES, TURN} from './stores';
    import { INITIAL_FEN } from './chess';
    import { connectToServer, sendUCI, getRandomBoard, sendFEN, new960 } from '../scripts/utils';
    export let server;
    // let cssVarStyles = `--turn-color:${TURN === 'b' ? '#ddd' : '#779ec6'};`;

    function newGame() {
        FEN.set(INITIAL_FEN);
        document.getElementById('fenbox').value = INITIAL_FEN;
    }

    function getStyleBasedOnTurn(turn) {
        return turn == 'w' ? '#ddd' : '#779ec6';
    }
</script>

<!-- <svelte:window on:keydown={handleKeydown}/> -->

<main>
    <div>
        <Grid />
        <input id="fenbox" type="text" readonly="readonly" bind:value={$FEN}/>
        <button class="implemented" on:click={() => sendFEN($FEN, server)}>Send to Server</button>
    </div>
    
    <div class="ctrl">
        <h1>chess man</h1>
        <button class="implemented" on:click={() => connectToServer(server)}>Server Connect</button><br/>
        <button class="implemented" on:click={newGame}>New</button>
        <button class="implemented" on:click={new960}>New 960</button>
        <button class="implemented" on:click={() => getRandomBoard(server)}>Random</button>
        <!-- <div class="unflex">
            <button class="implemented" on:click={() => sendUCI($SOURCE_ID + $DESTINATION_ID, server)}>Send Move: {$SOURCE_ID}</button>
            <input id="ucibox" type="text" bind:value={$DESTINATION_ID} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
        </div> -->
        <!-- <button class="unimplemented" on:click={() => generateMoves($SOURCE_ID, server)}>Show Moves</button> -->
        <h4>moves</h4>
        <div class="moves">
            {#each $CAPTURES as mov}
                <p class="move" on:click={() => sendUCI(mov, server)} style="background-color: {getStyleBasedOnTurn($TURN)}">{mov}</p>
            {/each}
        </div>
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
        /* margin: 100px; */
        margin-left: -30px;
    }

    .moves {
        width: 250px;
        display: flex;
        flex-wrap: wrap;
    }

    .move {
        width: 50px;
        margin: 5px;
        padding: 7px;
        text-align: center;
        border-radius: 25px;
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