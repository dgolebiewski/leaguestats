<script context="module">
	export const load = async ({ url }) => ({
		props: {
			location: new URL(url)
		}
	});
</script>

<script>
	import Header from '$components/Header.svelte';
	import PageTransition from '$components/PageTransition.svelte';
	import '../app.css';

	export let location;
</script>

<svelte:head>
	<title>Bootleg OPGG</title>
</svelte:head>

{#if location.pathname !== '/'}
	<Header />
{/if}
<div class="container mx-auto">
	<PageTransition refresh={location.pathname}>
		<slot />
	</PageTransition>
</div>
