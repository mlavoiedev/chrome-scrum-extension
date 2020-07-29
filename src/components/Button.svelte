<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    const dispatchClickEvent = () => {
        dispatch('clickEvent');
    }
</script>

<style>
     button {
        cursor: pointer;
        background: transparent;
        border: 0;
        margin: 0;
        color: black;
    }

    button:hover {
        background-color: rgba(0, 121, 107, 0.04);
    }  
</style>

<button type="button" on:click={dispatchClickEvent}>
    <slot />
</button>