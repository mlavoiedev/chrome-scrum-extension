<script>
	import AppBar from "./components/AppBar.svelte";

	import { getUserFromNode } from './utils/getUserFromNode'; 

	let users = [];

	/**
     * Using mutation observer to init app when participants are found
     */
    const targetNode = document.body;
    const config = { childList: true, subtree: true};
    const onMutation = (mutationsList, observer,) => {
		const elements = document.querySelectorAll("[data-participant-id]");
		if (elements.length) {
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

<AppBar users={users}/>