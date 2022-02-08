<script>
	import { t } from '$lib/i18n';
	import { getProfileIconUrl } from '$lib/util/assets';
	import { getWinrateTextColor } from '$lib/util/style';

	import SidebarPanel from './SidebarPanel.svelte';

	export let recentTeammates = [];
</script>

<SidebarPanel title={$t('summoner.recentTeammates')}>
	{#each recentTeammates as teammate}
		<div class="flex justify-between items-center mb-2">
			<div class="flex">
				<img
					class="block w-10 h-10 mr-2 rounded-lg border border-gray-500"
					src={getProfileIconUrl(teammate.profileIconId)}
					alt="teammate profile icon"
				/>
				<div class="flex flex-col justify-between">
					<h5 class="font-bold text-sm">{teammate.name}</h5>
					<p class="text-xs">
						{$t('summoner.gameCount', { value: teammate.gameCount })}
					</p>
				</div>
			</div>
			<p class={`text-xs ${getWinrateTextColor((teammate.wins / teammate.gameCount) * 100)}`}>
				{$t('summoner.winrate', { value: Math.round((teammate.wins / teammate.gameCount) * 100) })}
			</p>
		</div>
	{/each}
</SidebarPanel>
