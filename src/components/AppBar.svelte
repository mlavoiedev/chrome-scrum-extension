<script>
    import CurrentUser from "./CurrentUser.svelte";
    import Timer from "./Timer.svelte";
    import Button from "./Button.svelte";

    export let users;

    const OPEN_PANNEL_TEXT = 'Pour débuter, ouvrir le panneau des participants';
    const START_TEXT = 'Débuter le scrum';

    let currentUserIndex = 0;
    let isStarted = false;
    let isPlaying = false;

    const onPlayButtonClick = () => {
        isPlaying = !isPlaying;
    }

    const onNextButtonClick = () => {
        currentUserIndex = (currentUserIndex + 1 >= users.length) ? 0 : currentUserIndex + 1;
    }

    const onStartClick = () => {
        isStarted = true;
    }
</script>

<style>
	.app-bar {
        align-items: center;
        background: white;
        border-radius: 0 0 8px 8px;
        display: flex;
        height: 48px;
        left: 50%;
        font-size: 0.7rem;
        overflow: hidden;
        position: fixed;
        top: 0;     
        transform: translateX(-50%);
        z-index: 1;
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
    {:else if (!isStarted && !users.length)}
        <p>{OPEN_PANNEL_TEXT}</p>
    {:else}
        <Button on:clickEvent={onStartClick}>
            {START_TEXT}
        </Button>
    {/if}
</div>