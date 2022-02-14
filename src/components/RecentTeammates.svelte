<script>
	import { t } from '$lib/i18n';
	import { getProfileIconUrl } from '$lib/util/assets';
	import { getWinrateTextColor } from '$lib/util/style';

	import SidebarPanel from './SidebarPanel.svelte';

	export let loading = false;
	export let region;
	export let recentTeammates = [];
</script>

<SidebarPanel {loading} title={$t('summoner.recentTeammates')}>
	{#each recentTeammates as teammate}
		<a
			href={`/${region}/summoner/${teammate.name}`}
			class="flex justify-between items-center -mx-4 px-4 py-2 hover:bg-gray-750 transition-colors"
		>
			<div class="flex">
				<img
					class="block w-10 h-10 mr-2 rounded-lg border border-gray-500"
					src={getProfileIconUrl(teammate.profileIconId)}
					alt="teammate profile icon"
				/>
				<div class="flex flex-col justify-between">
					<p class="font-bold text-sm">{teammate.name}</p>
					<p class="text-xs">
						{$t('summoner.gameCount', { value: teammate.gameCount })}
					</p>
				</div>
			</div>
			<p class={`text-xs ${getWinrateTextColor((teammate.wins / teammate.gameCount) * 100)}`}>
				{$t('summoner.winrate', { value: Math.round((teammate.wins / teammate.gameCount) * 100) })}
			</p>
		</a>
	{/each}
</SidebarPanel>
