<script>
	import { t } from '$lib/i18n';
	import Footer from '$components/Footer.svelte';
	import SearchBar from '$components/SearchBar.svelte';
</script>

<div class="w-full h-screen flex justify-center items-center">
	<div>
		<h1 class="text-center font-sans-secondary text-5xl leading-tight mb-2 font-bold">
			{$t('common.title')}
		</h1>
		<h2 class="text-center text-lg leading-7 mb-11">{$t('home.searchForSummoners')}</h2>
		<SearchBar />
	</div>
	<Footer absolute />
</div>
