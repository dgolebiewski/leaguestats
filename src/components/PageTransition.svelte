<script>
	import { fly } from 'svelte/transition';
	export let refresh = '';
</script>

{#key refresh}
	<div in:fly={{ y: 5, duration: 200, delay: 200 }} out:fly={{ y: -5, duration: 200 }}>
		<slot />
	</div>
{/key}
