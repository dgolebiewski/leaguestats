<script>
	import { t } from '$lib/i18n';

	import { getRankedEmblemUrl } from '$lib/util/assets';

	export let rankedStats = [];

	const RANKED_SOLO_KEY = 'RANKED_SOLO_5x5';
	const RANKED_FLEX_KEY = 'RANKED_TEAM_5x5';

	$: soloRank = rankedStats.find((r) => r.queueType === RANKED_SOLO_KEY);
	$: flexRank = rankedStats.find((r) => r.queueType === RANKED_FLEX_KEY);
</script>

<div
	class="bg-gray-700 rounded-lg flex justify-center lg:justify-start px-8 py-2 shadow-md hover:shadow-lg transition-all"
>
	<div class="flex items-center justify-center pr-6 py-2 border-r border-gray-600">
		<img
			class="block w-auto h-24 mr-4"
			src={getRankedEmblemUrl(soloRank?.tier)}
			alt="ranked solo / duo tier icon"
		/>
		<div>
			<p class="text-xs text-gray-200">
				{$t('summoner.rankedPanel.soloQueue')}
			</p>
			<h4 class="font-bold">
				{soloRank ? `${soloRank.tier} ${soloRank.rank}` : 'UNRANKED'}
			</h4>
			{#if soloRank}
				<p class="text-xs">
					{$t('summoner.rankedPanel.lp', { value: soloRank.leaguePoints })}
				</p>
			{/if}
		</div>
	</div>
	<div class="flex items-center justify-center pl-6 py-2">
		<img
			class="block w-auto h-20 mr-3"
			src={getRankedEmblemUrl(flexRank?.tier)}
			alt="ranked flex tier icon"
		/>
		<div>
			<p class="text-xs text-gray-200">
				{$t('summoner.rankedPanel.flexQueue')}
			</p>
			<h5 class="text-sm font-bold">
				{flexRank ? `${flexRank.tier} ${flexRank.rank}` : 'UNRANKED'}
			</h5>
			{#if flexRank}
				<p class="text-xs">
					{$t('summoner.rankedPanel.lp', { value: flexRank.leaguePoints })}
				</p>
			{/if}
		</div>
	</div>
</div>
