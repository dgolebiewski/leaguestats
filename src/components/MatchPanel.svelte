<script>
	import { t } from '$lib/i18n';
	import {
		getChampionByKey,
		getChampionSquareImageUrl,
		getSummonerSpellByKey,
		getSummonerSpellImageUrl
	} from '$lib/util/assets';

	export let match;
	export let summonerPuuid;

	$: me = match.participants.find((p) => p.puuid === summonerPuuid);
	$: myChampion = getChampionByKey(me.championId);
	$: myTeam = match.teams.find((t) => t.teamId === me.teamId);

	const getSummonerSpells = () => {
		return [1, 2].map((n) => {
			const spell = getSummonerSpellByKey(me[`summonerSpell${n}Id`]);

			spell.imageUrl = getSummonerSpellImageUrl(spell.id);

			return spell;
		});
	};
</script>

<div class="flex bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all mb-6">
	<div class="flex mr-4">
		<div>
			<img
				class="block w-16 h-16 rounded-lg border border-gray-500 mb-2"
				src={getChampionSquareImageUrl(myChampion.id)}
				alt="champion square art"
			/>
			<div class="flex justify-between px-1">
				{#each getSummonerSpells() as spell}
					<img
						class="block w-6 h-6 rounded-md"
						src={spell.imageUrl}
						alt={`summoner spell - ${spell.name}`}
					/>
				{/each}
			</div>
		</div>
	</div>
	<div>
		<h3
			class={`text-xl leading-6 font-bold font-sans-secondary ${
				myTeam.win ? 'text-victory-blue' : 'text-defeat-red'
			}`}
		>
			{myTeam.win ? $t('match.victory') : $t('match.defeat')}
		</h3>
		<p class="text-xs leading-6 font-medium mb-1 text-gray-400">
			{$t(`match.queueType.${match.queueId}`)}
		</p>
	</div>
</div>
