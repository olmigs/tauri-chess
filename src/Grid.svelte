<script>
    // import { onMount } from 'svelte';
    import Cell from './Cell.svelte';
    import { ROW_LABELS, COL_LABELS } from './chess.js';
    import { BOARD, SELECTED_CELL } from './stores.js';

    const rows = [0, 1, 2, 3, 4, 5, 6, 7];
    const cols = [0, 1, 2, 3, 4, 5, 6, 7];
    
    function handleClick(r, c) {
        // if (r != selected_cell.row || c != selected_cell.col) {
            SELECTED_CELL.set({row: r, col: c});
        // }
    }
</script>

<table id="board">
    <tbody>
        {#each rows as r}
        <tr>
            <th>{ROW_LABELS[r]}</th>
            {#each cols as c}
            <Cell
                id={COL_LABELS[c] + ROW_LABELS[r]}
                value={$BOARD[r][c]}
                on:click={() => handleClick(r, c)}
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
        margin: 0 auto;
    }

    th {
        text-align: center;
        vertical-align: middle;
        padding: 4ex 4ex;
        font-weight: normal;
        color: #000;
        border: 4px solid transparent;
    }

</style>