<script>
    import { createEventDispatcher } from "svelte";

    export let users;

    const dispatch = createEventDispatcher();

    const onConfirmButtonClick = () => {
        dispatch('confirmButtonClick');
    }

    const onBackdropClick = () => {
        dispatch('backdropClick');
    }
</script>

<style>
    .wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 1;
        background: rgba(0,0,0, 0.3);
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .inner {
        background: white;
        padding: 24px;
        margin: auto;
        width: 400px;
        border-radius: 8px;
        position: relative;
        z-index: 1;
    }
    .backdrop {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }
    ul {
        list-style: none;
        padding: 24px 0;
        margin: 0;
    }
    li {
        display: flex;
        align-items: center;
    }
    img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin-right: 12px;
    }

    button {
        margin: 24px auto 12px auto;
        border: 0;
        background: black;
        border-radius: 24px;
        height: 48px;
        background: #00796b;
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
    
</style>


<div class="wrapper">
    <div class="backdrop" on:click={onBackdropClick}></div>
    <div class="inner">
        <h3>Liste des participants</h3>
        <ul>
            {#each users as { imageURL, name }}
                <li>
                    <img src={imageURL} alt="">
                    <p>{name}</p>
                </li>
            {/each}
        </ul>
        <h3>Temps à répartir</h3>
        <select name="" id="">
            <option value="">10 minutes</option>
            <option value="">15 minutes</option>
            <option value="">20 minutes</option>
        </select>
        <button type="button" on:click={onConfirmButtonClick}>Confirmer</button>
    </div>
</div>