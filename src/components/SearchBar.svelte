<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { REGIONS } from '$lib/util/consts';
	import { t } from '$lib/i18n';
	import Spinner from './Spinner.svelte';
	import Button from './Button.svelte';
	import { clickOutside } from '$lib/directive/clickOutside';

	export let small = false;

	let region = REGIONS[0].platformPrefix;
	let summonerName = '';
	let isSearching = false;
	let recentSearches = [];
	let recentSearchesOpen = false;

	const setRegion = (e) => {
		localStorage.setItem('region', e.target.value);
	};

	const search = async (recentSearch = null) => {
		const _summonerName = recentSearch?.summonerName || summonerName;
		const _region = recentSearch?.region || region;

		if (!_region || !_summonerName || _summonerName.length < 3 || isSearching) {
			return;
		}

		recentSearchesOpen = false;

		isSearching = true;
		await goto(`/${_region}/summoner/${_summonerName}`);
		``;
		isSearching = false;

		if (!recentSearches.find((s) => s.region === _region && s.summonerName === _summonerName)) {
			recentSearches = [
				{
					region: _region,
					summonerName: _summonerName
				},
				...recentSearches
			];

			recentSearches = recentSearches.slice(0, 5);
			localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
		}

		summonerName = '';
		region = _region;
		localStorage.setItem('region', region);
	};

	onMount(() => {
		if (typeof localStorage !== 'undefined') {
			region = localStorage.getItem('region');
			recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
		}
	});

	$: selectClasses = small ? 'text-xs leading-none py-0 px-2' : 'px-6 py-3';
	$: inputClasses = small ? 'block h-8 p-2 w-48 text-xs leading-none' : 'p-3 leading-6 w-96';
	$: recentSearchesClasses = small ? 'top-8 right-8' : 'top-[51px] right-0';
</script>

<div
	use:clickOutside
	on:click-outside={() => (recentSearchesOpen = false)}
	class={`relative flex justify-center align-middle shadow-md hover:shadow-lg transition-all rounded-lg${
		!small ? ' mb-8' : ''
	}`}
>
	<select
		class={`bg-gray-600 border border-gray-500 leading-none focus:outline-none ${selectClasses} ${
			recentSearchesOpen ? 'rounded-tl-lg' : 'rounded-l-lg'
		}`}
		bind:value={region}
		on:change={setRegion}
	>
		{#each REGIONS as region}
			<option value={region.platformPrefix}>{region.nameShort}</option>
		{/each}
	</select>
	<input
		on:focus={() => (recentSearchesOpen = true)}
		class={`bg-gray-900 placeholder:text-gray-300 placeholder:text-sm placeholder:leading-none focus:outline-none hover:bg-gray-700 focus:bg-gray-700 transition-colors ${inputClasses} ${
			!small ? (recentSearchesOpen ? 'rounded-tr-lg' : 'rounded-r-lg') : ''
		}`}
		type="text"
		placeholder={$t('common.searchBar.summonerName')}
		on:keydown={(e) => {
			if (e.key === 'Enter') search();
		}}
		bind:value={summonerName}
	/>
	{#if small}
		<button
			class="bg-teal-500 hover:bg-teal-400 shadow-md hover:shadow-lg px-2 rounded-r-lg"
			on:click={search}
		>
			{#if !isSearching}
				<i class="uil uil-search text-xs leading-none w-4 h-4 flex justify-center items-center" />
			{:else}
				<Spinner size="small" />
			{/if}
		</button>
	{/if}
	{#if recentSearchesOpen}
		<div class={`absolute left-0 rounded-b-lg ${recentSearchesClasses}`}>
			{#each recentSearches as item, i}
				<div
					class={`w-100 px-4 py-2 bg-gray-700 hover:bg-gray-600 cursor-pointer border-gray-600${
						i < recentSearches.length - 1 ? ' border-b' : ' rounded-b-lg'
					}`}
					on:click={() => search(item)}
				>
					<span class="text-xs mr-8"
						>{REGIONS.find((r) => item.region === r.platformPrefix).nameShort}</span
					>
					<span class="text-sm">{item.summonerName}</span>
				</div>
			{/each}
		</div>
	{/if}
</div>

{#if !small}
	<div class="text-center">
		<Button on:click={search}>
			{#if !isSearching}
				{$t('common.searchBar.search')}
			{:else}
				<Spinner />
			{/if}
		</Button>
	</div>
{/if}
