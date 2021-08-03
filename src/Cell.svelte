
<script>
    // import { onMount } from 'svelte';
    import { getImg } from '../scripts/utils.js';
    import { SOURCE_ID, DESTINATION_ID} from './stores.js';
    export let id, value, isDark;
    $: cssVarStyles = `--cell-color:${isDark ? '#ddd' : '#779ec6'};`;
    function isCapturable(dest, src) {
        // var captsArr = capts.slice(1,capts.length-1);
        // if (captsArr.length) {
        //     captsArr = captsArr.replaceAll('\"', '');
        //     captsArr = captsArr.split(',');
        //     for (let i = 0; i < captsArr.length; i++) {
        //         // capt = capt.replace('\"', '');
        //         if (captsArr[i].includes(src)) {
        //             console.log(captsArr[i]);
        //         }

        //     }
        // }
        return false;
    }
</script>
<!-- class:capturable="{() => isCapturable(id, $SOURCE_ID, $CAPTURES)}" -->
<td class:selectedSrc="{id === $SOURCE_ID}" 
    class:selectedDest="{id === $DESTINATION_ID}"
    class:capturable="{isCapturable(id, $SOURCE_ID)}"
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