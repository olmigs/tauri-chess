<script>
    import { onMount } from 'svelte';
    import Cell from './Cell.svelte';
    import { BOARD } from './stores.js';

    const rows = [0, 1, 2, 3, 4, 5, 6, 7];
    const cols = [0, 1, 2, 3, 4, 5, 6, 7];
    const ROW_LABELS = ['8', '7', '6', '5', '4', '3', '2', '1'];
    const COL_LABELS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    
    // selected cell
    let col = -1;
    let row = -1;

    onMount(() => {
        if (row != -1 && col != -1) {
            console.log("hello!");
        }
    })
    
    function showMoves(r, c) {
        row = r;
        col = c;
    }
</script>

<table>
    <tbody>
        {#each rows as r}
        <tr>
            <th>{ROW_LABELS[r]}</th>
            {#each cols as c}
            <Cell
                value={$BOARD[r][c]}
                on:click={() => showMoves(r, c)}
                isDark={(r % 2 == 0 && c % 2 == 0) || (r % 2 != 0 && c % 2 != 0)}
                />
            {/each}
        </tr>
        {/each}
    </tbody>
    <tfoot>
        <tr>
            <th></th>
            {#each cols as c}
            <th>{COL_LABELS[c]}</th>
            {/each}
            <th></th>
        </tr>
    </tfoot>
</table>

<style>
    table {
        margin: 1ex auto;
    }

    th {
        text-align: center;
        vertical-align: middle;
        padding: 4ex 4ex;
        font-weight: normal;
        color: #888;
        border: 4px solid transparent;
    }

</style>