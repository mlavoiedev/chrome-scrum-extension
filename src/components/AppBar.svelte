<script>
    import { createEventDispatcher } from 'svelte';

    import CurrentUser from "./CurrentUser.svelte";
    import Timer from "./Timer.svelte";
    import Button from "./Button.svelte";

    export let users;
    export let isStarted;

    const START_TEXT = 'Débuter le scrum';

    let currentUserIndex = 0;
    let isPlaying = false;

    const dispatch = createEventDispatcher();

    const onPlayButtonClick = () => {
        isPlaying = !isPlaying;
    }

    const onNextButtonClick = () => {
        currentUserIndex = (currentUserIndex + 1 >= users.length) ? 0 : currentUserIndex + 1;
    }

    const onStartClick = () => {
        dispatch('openModal');
    }
</script>

<style>
	.app-bar {
        align-items: center;
        background: white;
        border-radius: 8px;
        display: flex;
        height: 48px;
        left: 50%;
        font-size: 0.7rem;
        overflow: hidden;
        position: fixed;
        bottom: 100px;     
        transform: translateX(-50%);
        z-index: 8;
    }

    :global(#chrome-scrum-extension .app-bar > *) {
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 24px;
        position: relative;
    }
    
    :global(#chrome-scrum-extension .app-bar > *:not(:first-child):before) {
        background: #f1f3f4;
        content: "";
        height: 24px;
        width: 1px;
        position: absolute;
        left: 0;
    }
</style>

<div class="app-bar">
    {#if isStarted && users.length}
        <Button on:clickEvent={onPlayButtonClick}>
            {isPlaying ? '⏸️' : '▶️'} 
        </Button>
        <CurrentUser user={users[currentUserIndex]} />
        <Timer />
        <Button on:clickEvent={onNextButtonClick}>
            ⏭️
        </Button>
    {:else}
        <Button on:clickEvent={onStartClick}>
            {START_TEXT}
        </Button>
    {/if}
</div>