<script>
	import { t } from '$lib/i18n';
	import { getChampionSquareImageUrl } from '$lib/util/assets';
	import { getWinrateTextColor } from '$lib/util/style';
	import collapse from 'svelte-collapse';
	import SidebarPanel from './SidebarPanel.svelte';
	import StatTable from './StatTable.svelte';

	export let loading = false;
	export let recentChampions = [];

	let expandedChampions = [];

	const toggleChampion = (id) => {
		const index = expandedChampions.findIndex((c) => c === id);
		if (index < 0) {
			expandedChampions = [...expandedChampions, id];
		} else {
			let _expandedChampions = [...expandedChampions];
			_expandedChampions.splice(index, 1);
			expandedChampions = _expandedChampions;
		}
	};
</script>

<SidebarPanel {loading} title={$t('summoner.recentChampions')}>
	{#each recentChampions as item}
		<div
			class="flex justify-between py-1 -mx-4 px-4 hover:bg-gray-750 transition-colors cursor-pointer"
			on:click={toggleChampion(item.champion.id)}
		>
			<div class="flex">
				<img
					class="block w-10 h-10 mr-2 rounded-lg border border-gray-500"
					src={getChampionSquareImageUrl(item.champion.id)}
					alt="champion square art"
				/>
				<div class="flex flex-col justify-between">
					<h5 class="font-bold uppercase text-sm">{item.champion.name}</h5>
					<p class="text-xs">
						{$t('summoner.gameCount', { value: item.gameCount })}
					</p>
				</div>
			</div>
			<div class="flex flex-col justify-between text-right">
				<p class={`text-xs ${getWinrateTextColor((item.wins / item.gameCount) * 100)}`}>
					{$t('summoner.winrate', {
						value: Math.round((item.wins / item.gameCount) * 100)
					})}
				</p>
				<p class="text-xs font-medium">
					{$t('summoner.kda', {
						value: Math.round(((item.kills + item.assists) / item.deaths) * 100) / 100
					})}
				</p>
			</div>
		</div>
		<div
			use:collapse={{ open: expandedChampions.includes(item.champion.id) }}
			class="h-0 overflow-hidden flex justify-center"
		>
			<!-- <h4 class="text-3xl">TEST</h4> -->
			<div class="py-3">
				<StatTable stats={item.stats} />
			</div>
		</div>
	{/each}
</SidebarPanel>
