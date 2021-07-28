
<script>
    // import { onMount } from 'svelte';
    import { getImg } from '../scripts/utils.js';
    export let value, isDark;
    $: cssVarStyles = `--cell-color:${isDark ? '#ddd' : '#6b6b6b'};`;
</script>

<td style={cssVarStyles} on:click >
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
        width: 4ex;
        height: 4ex;
        font-size: 150%;
        border: 4px solid transparent;
        transition: all .4s ease-out;
        background-color: var(--cell-color, #f00);
    }
</style>