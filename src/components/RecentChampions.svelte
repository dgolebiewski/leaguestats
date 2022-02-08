<script>
	import { t } from '$lib/i18n';
	import { getChampionSquareImageUrl } from '$lib/util/assets';
	import { getWinrateTextColor } from '$lib/util/style';
	import SidebarPanel from './SidebarPanel.svelte';

	export let recentChampions = [];
</script>

<SidebarPanel title={$t('summoner.recentChampions')}>
	{#each recentChampions as item}
		<div class="flex justify-between py-1">
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
	{/each}
</SidebarPanel>
