<script context="module">
	export const load = ({ error, status }) => ({
		props: {
			error,
			status
		}
	});
</script>

<script>
	import { t } from '$lib/i18n';
	import errorImage from '$assets/images/error.png';
	import Header from '$components/Header.svelte';

	export let status;
</script>

<Header />
<div class="h-screen w-full flex flex-col justify-center items-center">
	<img src={errorImage} alt="crying amumu" class="block w-64 h-auto mb-8" />
	<h2 class="text-6xl font-bold font-sans-secondary text-gray-400 mb-2 text-center">
		{status}
	</h2>
	<h1 class="text-4xl font-bold font-sans-secondary mb-2 text-center">
		{#if [401, 404].includes(status)}
			{$t(`error.${status}`)}
		{:else}
			{$t(`error.generic`)}
		{/if}
	</h1>
	<h3>
		<a class="text-teal-500 hover:text-teal-400 transition-colors text-center" href="/"
			>{$t('error.backToHome')}</a
		>
	</h3>
</div>
