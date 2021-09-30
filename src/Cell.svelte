
<script>
    // import { onMount } from 'svelte';
    import { getImg } from '../scripts/utils.js';
    export let id, value, isDark;
    let cssVarStyles = `--cell-color:${isDark ? '#ddd' : '#779ec6'};`;
    function isCapturable(dest, src) {
        return false;
    }
</script>
<td 
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

    td.selectedSrc {
        border-color: #ff0;
    }

    td.selectedDest {
        border-color: #0f0;
    }

    td.capturable {
        border-color: #f00;
    }
</style>