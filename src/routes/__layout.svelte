<script context="module">
	import { locale, loadTranslations } from '$lib/i18n';

	export const load = async ({ url }) => {
		const _url = new URL(url);

		const defaultLocale = 'en';

		const initLocale = locale.get() || defaultLocale;

		await loadTranslations(initLocale, _url.pathname);

		return {
			props: {
				url: _url
			}
		};
	};
</script>

<script>
	import { t } from '$lib/i18n';
	import Header from '$components/Header.svelte';
	import PageTransition from '$components/PageTransition.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import '$assets/app.css';
	import LoadingBar from '$components/LoadingBar.svelte';

	export let url;
</script>

<svelte:head>
	<title>{$t('common.title')}</title>
</svelte:head>

<LoadingBar />

{#if url.pathname !== '/'}
	<Header />
{/if}
<PageTransition refresh={url.pathname}>
	<slot />
</PageTransition>

<SvelteToast />

<style>
	:root {
		--toastContainerTop: 2rem;
		--toastContainerRight: auto;
		--toastContainerBottom: auto;
		--toastContainerLeft: calc(50vw - 8rem);
	}

	._toastBar {
		display: none !important;
	}
</style>
