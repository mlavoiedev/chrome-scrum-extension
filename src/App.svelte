<script>
	import AppBar from "./components/AppBar.svelte";
	import ConfirmModal from "./components/ConfirmModal.svelte";

	import { getUserFromNode } from './utils/getUserFromNode'; 

	let users = [];
	
	let modalOpened = false;
	let isStarted = false;

	const onOpenModal = () => {
		modalOpened = true;
	}

	const onBackdropClick = () => {
		modalOpened = false;
	}

	const onConfirmButtonClick = () => {
		modalOpened = false;
		isStarted = true;
	}

	/**
     * Using mutation observer to init app when participants are found
     */
    const targetNode = document.body;
    const config = { childList: true, subtree: true};
    const onMutation = (mutationsList, observer,) => {
		const participantElement = document.querySelector("[data-participant-id]");
		if (participantElement) {
		    observer.disconnect();

		    // TODO : 
		    // replace setTimeout hack with something 
		    // like store.dispatch('addUser')
		    // when founding new user
		    setTimeout(() => {
				console.log("Participant found, initializing extension");
				const usersElements = document.querySelectorAll("[data-participant-id]");
				
				const userElements = document.querySelectorAll("[data-participant-id]");
				users = Array.from(userElements).map(node => getUserFromNode(node));
		    }, 1000);
		}
        
    };
    const observer = new MutationObserver(onMutation);
    observer.observe(document.body, config);
</script>

<AppBar users={users} isStarted={isStarted} on:openModal={onOpenModal} />

{#if modalOpened}
	<ConfirmModal users={users} on:backdropClick={onBackdropClick} on:confirmButtonClick={onConfirmButtonClick}/>
{/if}
