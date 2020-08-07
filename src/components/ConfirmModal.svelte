<script>
    import { createEventDispatcher } from "svelte";

    export let users;

    const EMPTY_USERS_TEXT = 'Pour ajouter les participants, ouvrir le panneau des participants.';
    const SEARCH_USERS_BUTTON = 'Rechercher des participants';
    const CONFIRM_BUTTON = 'Confirmer';
    const CLOSE_BUTTON = 'Fermer';

    const dispatch = createEventDispatcher();

    const onConfirmButtonClick = () => {
        dispatch('confirmButtonClick');
    }

    const onBackdropClick = () => {
        dispatch('backdropClick');
    }

    const onSearchUsersClick = () => {
        dispatch('searchUsersClick');
    }

    const onRemoveUserClick = (user) => {
        dispatch('removeUserClick', user);
    }

</script>

<style>
    .wrapper {
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 400px;
        height: 100vh;
        z-index: 9;
        display: flex;
        flex-direction: column;
    }
    .inner {
        background: var(--gm-background-color);
        box-shadow: 0px -1px 43px 1px rgba(0,0,0,0.75);
        padding: 24px;
        margin: auto;
        display: flex;
        flex-direction: column;
        width: 100%;
        border-radius: 8px;
        position: relative;
        z-index: 0;
    }
    /* .backdrop {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    } */
    ul {
        list-style: none;
        padding: 24px 0;
        margin: 0;
    }
    li {
        display: flex;
        margin-top: 12px;
        align-items: center;
    }
    img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin-right: 12px;
    }

    select {
        border: none;
        font-size: 16px;
    }

    .round-button {
        margin: 24px auto 12px auto;
        border: 0;
        background: black;
        border-radius: 24px;
        height: 48px;
        background: var(--gm-theme-color--base);
        cursor: pointer;
        box-shadow: 0 1px 2px 0 rgba(60,64,67,.30), 0 1px 3px 1px rgba(60,64,67,.15);
        display: flex;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: .25px;
        line-height: 36px;
        color: #fff;
        align-items: center;
        padding: 0 24px;
    }

    .link-button {
        cursor: pointer;
        margin-left: auto;
        background-color: transparent;
        border: none;
    }
    
</style>


<div class="wrapper">
    <!-- <div class="backdrop" on:click={onBackdropClick}></div> -->
    <div class="inner">
        <button class="link-button" type="button" on:click={onBackdropClick}>{CLOSE_BUTTON}</button>
        <h3>Liste des participants</h3>
        {#if users.length}
            <ul>
                {#each users as { imageURL, name, id }}
                    <li>
                        <img src={imageURL} alt="">
                        <p>{name}</p>
                        <button class="link-button" type="button" on:click={() => onRemoveUserClick({id, imageURL})}>Retirer</button>
                    </li>
                {/each}
            </ul>
        {:else}
            <p>{EMPTY_USERS_TEXT}</p>
        {/if}

        <button class="round-button" type="button" on:click={onSearchUsersClick}>{SEARCH_USERS_BUTTON}</button>

        {#if users.length}
            <h3>Temps à répartir</h3>
            <select name="" id="">
                <option value="">10 minutes</option>
                <option value="">15 minutes</option>
                <option value="">20 minutes</option>
            </select>
            <button class="round-button" type="button" on:click={onConfirmButtonClick}>{CONFIRM_BUTTON}</button>
        {/if}
    </div>
</div>