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
        display: flex;
        flex-direction: column;
        height: 60vh;
        left: 50%;
        position: fixed;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        z-index: 9;
    }
    .inner {
        background: var(--gm-background-color);
        border-radius: 8px;
        box-shadow: 0px -1px 43px 1px rgba(0,0,0,0.75);
        display: flex;
        flex-direction: column;
        margin: auto;
        overflow: auto;
        padding: 24px;
        position: relative;
        width: 100%;
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
        margin: 0;
        padding: 0 0 24px 0;
    }
    li {
        align-items: center;
        display: flex;
        margin-top: 12px;
    }
    img {
        width: 32px;
        height: 32px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 12px;
    }

    select {
        border: none;
        font-size: 16px;
        margin-bottom: 24px;
    }

    .button--round {
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

    .button--link {
        cursor: pointer;
        margin-left: auto;
        background-color: transparent;
        border: none;
    }

    .button--sticky {
        bottom: 0;
        position: sticky;
        margin-top: auto;
    }

    .section-header {
        display: flex;
        justify-content: space-between;
    }
</style>


<div class="wrapper">
    <!-- <div class="backdrop" on:click={onBackdropClick}></div> -->
    <div class="inner">
        <button class="button--link" type="button" on:click={onBackdropClick}>{CLOSE_BUTTON}</button>

        {#if users.length}
            <h3>Temps à répartir</h3>
            <select name="" id="">
                <option value="">10 minutes</option>
                <option value="">15 minutes</option>
                <option value="">20 minutes</option>
            </select>
        {/if}
        
        <div class="section-header">
            <h3>Liste des participants</h3>
            {#if users.length}
                <button class="button--link" type="button" on:click={onSearchUsersClick}>🔄</button>
            {/if}
        </div>
        
        {#if users.length}
            <ul>
                {#each users as { imageURL, name, id }}
                    <li>
                        <img src={imageURL} alt="">
                        <p>{name}</p>
                        <button class="button--link" type="button" on:click={() => onRemoveUserClick({id, imageURL})}>Retirer</button>
                    </li>
                {/each}
            </ul>

            <button class="button--round button--sticky" type="button" on:click={onConfirmButtonClick}>{CONFIRM_BUTTON}</button>
        {:else}
            <p>{EMPTY_USERS_TEXT}</p>
            <button class="button--round" type="button" on:click={onSearchUsersClick}>{SEARCH_USERS_BUTTON}</button>
        {/if}
    </div>
</div>