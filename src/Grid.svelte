<script>
    // import { onMount } from 'svelte';
    import Cell from './Cell.svelte';
    import { ROW_LABELS, COL_LABELS } from './chess.js';
    import { BOARD, MOVES, R_INDICES, C_INDICES, updateMovesFromSrc } from './stores.js';
</script>

<table id="board">
    <tbody>
        {#each $R_INDICES as r}
        <tr>
            <th>{ROW_LABELS[r]}</th>
            {#each $C_INDICES as c}
                <Cell
                    id={COL_LABELS[c] + ROW_LABELS[r]}
                    value={$BOARD[r][c]}
                    on:click={() => updateMovesFromSrc(COL_LABELS[c] + ROW_LABELS[r], $MOVES)}
                    isDark={(r % 2 == 0 && c % 2 == 0) || (r % 2 != 0 && c % 2 != 0)}
                />
            {/each}
        </tr>
        {/each}
    </tbody>
    <tfoot>
        <tr>
            <th></th>
            {#each $C_INDICES as c}
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
        padding: 2.4ex 2.4ex;
        font-weight: normal;
        color: #000;
        border: 4px solid transparent;
    }

</style>