<script>
	import AppBar from "./components/AppBar.svelte";
	import ConfirmModal from "./components/ConfirmModal.svelte";

	import { getUserFromNode } from './utils/getUserFromNode'; 

	let users = [];
	
	let modalOpened = false;
	let isStarted = false;
	let isLoaded = true;

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

	const parseImageURL = (url) => url && url.split('=s')[0];

	const areUsersEquals = (user1, user2) => (user1.id === user2.id) || (parseImageURL(user1.imageURL) === parseImageURL(user2.imageURL))

	const getUser = (user) => users.find(u => areUsersEquals(u, user));

	const getUserIndex = (user) => users.findIndex(u => areUsersEquals(u, user));

	const searchUsers = () => {
		const userElements = document.querySelectorAll("[data-participant-id]");
		
		Array.from(userElements).forEach(node => {
			const newUser = getUserFromNode(node);

			if (!getUser(newUser)) {
				users = [...users, newUser];
			}
		});
	}

	const removeUser = (user) => {
		const userIndex = getUserIndex(user);

		users = users.filter(u => !areUsersEquals(u, user));
	}

	const watchForCallEnded = () => {
		/**
		 * Using mutation observer to close app when needed
		 */
		// Select the node that will be observed for mutations
		const targetNode = document.body;
		// Options for the observer (which mutations to observe)
		const config = { childList: true, subtree: true };
		// Create an observer instance linked to the callback function
		const observer = new MutationObserver((mutationsList, observer) => {
			const element = document.querySelector("[data-call-ended='true']");
			if (element !== null) {
				isLoaded = false;
				observer.disconnect();
			}
		});
		// Start observing the target node for configured mutations
		observer.observe(document.body, config);
	}

	watchForCallEnded();
</script>

{#if isLoaded}
	<AppBar users={users} isStarted={isStarted} on:openModal={onOpenModal} />

	{#if modalOpened}
		<ConfirmModal 
			users={users} 
			on:backdropClick={onBackdropClick} 
			on:confirmButtonClick={onConfirmButtonClick}
			on:searchUsersClick={searchUsers}
			on:removeUserClick={(event) => removeUser(event.detail)}
		/>
	{/if}
{/if}


