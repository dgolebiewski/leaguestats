<script context="module">
	export const load = ({ error, status }) => ({
		props: {
			error,
			status
		}
	});
</script>

<script>
	import errorImage from '$assets/images/error.png';
	import Header from '$components/Header.svelte';

	export let error;
	export let status;
</script>

<Header />
<div class="h-screen w-full flex flex-col justify-center items-center">
	<img src={errorImage} alt="crying amumu" class="block w-64 h-auto mb-8" />
	<h2 class="text-6xl font-bold font-sans-secondary text-gray-400 mb-2 text-center">
		{status}
	</h2>
	<h1 class="text-4xl font-bold font-sans-secondary mb-2 text-center">
		{#if status === 404}
			how did you get here?
		{:else if status === 401}
			hmmm... you're not supposed to be here
		{:else}
			whoops... an error occured.
		{/if}
	</h1>
	<h3>
		<a class="text-teal-500 hover:text-teal-400 transition-colors text-center" href="/"
			>back to the home page</a
		>
	</h3>
</div>
