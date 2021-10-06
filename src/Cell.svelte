
<script>
    import { MOVES_FROM_SRC } from './stores';
    import { getImg } from '../scripts/utils';
    export let id, value, isDark;
    let cssVarStyles = `--cell-color:${isDark ? '#ddd' : '#779ec6'};`;
    // migstodo
    function isMoveable(cell, moves) {
        for (let mov of moves) { 
            if (mov.includes(cell)) {
                return true;
            }
        }
    }
</script>
<td 
    class:moveable="{isMoveable(id, $MOVES_FROM_SRC)}"
    id={id} style={cssVarStyles} on:click >
    {#if value !== '.'}
        <img src={getImg(value)} alt={value}>
    {:else}
        <p />
    {/if}
</td>

<style>
    td {
        text-align: center;
        vertical-align: middle;
        width: 1ex;
        height: 1ex;
        font-size: 150%;
        border: 4px solid transparent;
        transition: all .4s ease-out;
        background-color: var(--cell-color, #779ec6);
    }

    td.moveable {
        border-color: #0f0;
    }
</style>