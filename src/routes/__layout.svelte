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
	import '../app.css';

	export let url;
</script>

<svelte:head>
	<title>{$t('common.title')}</title>
</svelte:head>

{#if url.pathname !== '/'}
	<Header />
{/if}
<div class="container mx-auto">
	<PageTransition refresh={url.pathname}>
		<slot />
	</PageTransition>
</div>
