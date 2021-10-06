<script>
    import Grid from './Grid.svelte';
    import { FEN, MOVES_FROM_SRC, TURN, FLIP, flip} from './stores';
    import { INITIAL_FEN } from './chess';
    import { connectToServer, sendUCI, getRandomBoard, sendFEN, new960, undoMove } from '../scripts/utils';
    export let server;
    let send = false;
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
        <input id="fen-box" type="text" readonly="readonly" bind:value={$FEN}/>
        <button class="backend" on:click={() => sendFEN($FEN, server)}>Send FEN</button>
    </div>
    
    <div class="ctrl">
        <h1>chess man</h1>
        <div id="legend-box" class="backend"> <p>server</p> </div>
        <div id="legend-box" class="frontend"> <p>client</p> </div>
        <br/>
        <label style="margin-left:10px;">
            <input type=checkbox bind:checked={send}>
            pleco play
        </label>
        <br/>
        <button class="backend" on:click={() => connectToServer(server)}>Receive FEN</button><br/>
        <button class="backend" on:click={() => getRandomBoard(server)}>Random</button><br/>
        <button class="frontend" on:click={newGame}>New</button>
        <button class="frontend" on:click={new960}>New 960</button><br/>
        <button class="frontend" on:click={() => flip($FLIP)}>Flip Board</button><br/>
        <!-- <div class="unflex">
            <button class="frontend" on:click={() => sendUCI($SOURCE_ID + $DESTINATION_ID, server)}>Send Move: {$SOURCE_ID}</button>
            <input id="ucibox" type="text" bind:value={$DESTINATION_ID} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
        </div> -->
        <button class="backend" on:click={() => undoMove(server)}>{'<'}</button>
        <h4>available moves</h4>
        <div class="moves">
            {#each $MOVES_FROM_SRC as mov}
                <p class="move" on:click={() => sendUCI(send, mov, server)} style="background-color: {getStyleBasedOnTurn($TURN)}">{mov}</p>
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

    #fen-box {
        width: 65%;
        color:dimgrey;
        background-color: lightgray;
        margin-bottom: 25px;
    }

    #legend-box {
        width: 20px;
        height: 20px; 
        margin: 10px;
        border-radius: 7px;
    }

    #legend-box p {
        margin-top: 0;
        margin-left: 30px;
    }

    /* .unflex {
        flex-direction: column;
    }

    #ucibox {
        width: 50px;
    } */

    button {
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 7px;
        padding: 10px;
    }

    .backend {
        background-color: #6d1e1e;
    }

    .frontend {
        background-color: #3aaf28;
    }
</style>