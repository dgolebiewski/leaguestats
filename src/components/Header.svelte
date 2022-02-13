<script>
	import SearchBar from './SearchBar.svelte';
	import { t } from '$lib/i18n';
</script>

<div
	class="fixed top-0 left-0 w-full bg-gray-800 border-b border-gray-500 px-8 py-4 flex justify-between items-center z-10"
>
	<a href="/">
		<h2 class="font-sans-secondary text-2xl text-bold">{$t('common.title')}</h2>
	</a>
	<SearchBar small />
</div>
