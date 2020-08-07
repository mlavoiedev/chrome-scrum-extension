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

		users =  users.splice(userIndex, 1);
	}
</script>

<AppBar users={users} isStarted={isStarted} on:openModal={onOpenModal} />

{#if modalOpened}
	<ConfirmModal 
		users={users} 
		on:backdropClick={onBackdropClick} 
		on:confirmButtonClick={onConfirmButtonClick}
		on:searchUsersClick={searchUsers}
	/>
{/if}
