<script>
	import { t } from '$lib/i18n';
	import {
		getChampionByKey,
		getChampionSquareImageUrl,
		getItemImageUrl,
		getRuneImageUrl,
		getStyleImageUrl,
		getSummonerSpellByKey,
		getSummonerSpellImageUrl
	} from '$lib/util/assets';
	import { formatTime } from '$lib/util/time';
	import { onMount } from 'svelte';

	export let match;
	export let summonerPuuid;

	let mainRuneImage = null;
	let secondaryStyleImage = null;

	$: me = match.participants.find((p) => p.puuid === summonerPuuid);
	$: myChampion = getChampionByKey(me.championId);
	$: myTeam = match.teams.find((t) => t.teamId === me.teamId);
	$: participantsBlue = match.participants
		.filter((p) => p.teamId === 100)
		.map((p) => ({ ...p, champion: getChampionByKey(p.championId) }));
	$: participantsRed = match.participants
		.filter((p) => p.teamId === 200)
		.map((p) => ({ ...p, champion: getChampionByKey(p.championId) }));

	const getSummonerSpells = () => {
		return [1, 2].map((n) => {
			const spell = getSummonerSpellByKey(me[`summonerSpell${n}Id`]);

			spell.imageUrl = getSummonerSpellImageUrl(spell.id);

			return spell;
		});
	};

	onMount(async () => {
		const _mainRuneImage = getRuneImageUrl(
			me.perks.styles[0].style,
			me.perks.styles[0].selections[0].perk
		);
		const _secondaryStyleImage = getStyleImageUrl(me.perks.styles[1].style);

		const images = await Promise.all([_mainRuneImage, _secondaryStyleImage]);

		mainRuneImage = images[0];
		secondaryStyleImage = images[1];
	});
</script>

<div
	class="flex justify-between bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-all mb-6"
>
	<div class="flex mr-4">
		<div class="mr-2">
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
		{#if mainRuneImage && secondaryStyleImage}
			<div class="flex flex-col items-center">
				<img class="w-8 h-8 mb-2" src={mainRuneImage} alt="main rune" />
				<img class="w-4 h-4" src={secondaryStyleImage} alt="secondary style" />
			</div>
		{/if}
	</div>
	<div class="flex flex-col">
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
		<p class="text-xs text-white font-bold mb-3">
			<i class="uil uil-clock" />
			{formatTime(match.gameDuration)}
		</p>
		<div class="flex items-center mt-auto">
			{#each me.items as item}
				<div class="h-8 w-8 rounded-md bg-gray-950 mr-1">
					{#if item}
						<img class="h-8 w-8 rounded-md" src={getItemImageUrl(item)} alt="item" />
					{/if}
				</div>
			{/each}
		</div>
	</div>
	<table class="mt-auto">
		<tbody>
			<tr>
				<td class="text-right pr-1 font-bold">{me.kills}/{me.deaths}/{me.assists}</td>
				<th class="text-gray-400 text-left font-sans-secondary font-bold text-sm"
					>{$t('match.kda')}</th
				>
			</tr>
			<tr>
				<td class="text-right pr-1 font-bold">
					{me.totalMinionsKilled}
				</td>
				<th class="text-gray-400 text-left font-sans-secondary font-bold text-sm"
					>{$t('match.cs')}</th
				>
			</tr>
			<tr>
				<td class="text-right pr-1 font-bold">
					{Math.round((me.totalMinionsKilled / (match.gameDuration / 60)) * 100) / 100}
				</td>
				<th class="text-gray-400 text-left font-sans-secondary font-bold text-sm"
					>{$t('match.csm')}</th
				>
			</tr>
			{#if match.queueId !== 450}
				<tr>
					<td class="text-right pr-1 font-bold">
						{me.visionScore}
					</td>
					<th class="text-gray-400 text-left font-sans-secondary font-bold text-sm"
						>{$t('match.vs')}</th
					>
				</tr>
			{/if}
		</tbody>
	</table>
	<div class="flex">
		<div
			class="py-1 px-2 bg-team-blue bg-opacity-10 rounded-l-lg w-48 flex flex-col justify-center"
		>
			{#each participantsBlue as participant}
				<div class="flex justify-end align-center">
					<p
						class={`block overflow-hidden text-ellipsis whitespace-nowrap text-sm mr-1 ${
							participant.puuid === me.puuid ? 'text-gold' : 'text-white'
						} font-medium`}
					>
						{participant.summonerName}
					</p>
					<img
						class="w-4 h-4"
						src={getChampionSquareImageUrl(participant.champion.id)}
						alt="champion"
					/>
				</div>
			{/each}
		</div>
		<div class="py-1 px-2 bg-team-red bg-opacity-10 rounded-r-lg w-48 flex flex-col justify-center">
			{#each participantsRed as participant}
				<div class="flex justify-start align-center">
					<img
						class="w-4 h-4"
						src={getChampionSquareImageUrl(participant.champion.id)}
						alt="champion"
					/>
					<p
						class={`block overflow-hidden text-ellipsis whitespace-nowrap text-sm ml-1 ${
							participant.puuid === me.puuid ? 'text-gold' : 'text-white'
						} font-medium`}
					>
						{participant.summonerName}
					</p>
				</div>
			{/each}
		</div>
	</div>
</div>
