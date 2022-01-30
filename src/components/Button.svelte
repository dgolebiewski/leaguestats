<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const onClick = (e) => dispatch('click', e);
</script>

<button
	class="bg-teal-500 hover:bg-teal-400 px-14 py-3 font-bold text-xl rounded-lg transition-all shadow-md hover:shadow-lg"
	on:click={onClick}
>
	<slot />
</button>
