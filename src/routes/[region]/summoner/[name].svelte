<script context="module">
	export async function load({ params, fetch, url }) {
		const _url = new URL(url);
		const response = await fetch(`/api${_url.pathname}`);

		if (response.ok) {
			return {
				props: {
					...(await response.json()),
					region: params.region
				}
			};
		}

		return {
			status: response.status,
			error: new Error('Summoner not found')
		};
	}
</script>

<script>
	import { t } from '$lib/i18n';
	import Breadcrumbs from '$components/Breadcrumbs.svelte';
	import RankedPanel from '$components/RankedPanel.svelte';
	import WinrateChart from '$components/WinrateChart.svelte';
	import { getProfileIconUrl } from '$lib/util/assets';
	import {
		getSummonerRecentChampions,
		getSummonerRecentTeammates,
		getSummonerStats
	} from '$lib/util/summoner';
	import RecentChampions from '$components/RecentChampions.svelte';
	import RecentTeammates from '$components/RecentTeammates.svelte';
	import Spinner from '$components/Spinner.svelte';
	import MatchPanel from '$components/MatchPanel.svelte';
	import Footer from '$components/Footer.svelte';

	export let summoner;
	export let region;

	$: stats = getSummonerStats(summoner);
	$: recentChampions = getSummonerRecentChampions(summoner);
	$: recentTeammates = getSummonerRecentTeammates(summoner);
</script>

<div class="container mx-auto mt-16">
	<Breadcrumbs
		items={[
			{
				label: $t('summoner.summoner')
			},
			{
				label: summoner.name,
				path: `/${region}/summoner/${summoner.name}`
			}
		]}
	/>
	<div class="lg:flex justify-between items-center pb-8">
		<div class="flex mb-4 lg:mb-0">
			<img
				class="w-32 h-32 rounded-lg border border-gray-500"
				src={getProfileIconUrl(summoner.profileIconId)}
				alt="profile icon"
			/>
			<div class="flex flex-col justify-between items-start ml-4">
				<div>
					<h1 class="font-sans-secondary text-2xl font-bold mr-2 mb-1">{summoner.name}</h1>
					<p class="text-xs font-medium">
						{$t('summoner.level', { value: summoner.summonerLevel })}
					</p>
				</div>

				<div class="flex items-center">
					{#if stats.total > 0}
						<div class="w-12 h-12 mr-2">
							<WinrateChart wins={stats.wins} losses={stats.losses} />
						</div>
					{/if}
					<span class="text-sm font-medium">
						{$t('summoner.winratio', { wins: stats.wins, losses: stats.losses })}
					</span>
				</div>
			</div>
		</div>
		<RankedPanel rankedStats={summoner.rankedStats} />
	</div>
	<!-- <pre>{JSON.stringify(summoner, null, 2)}</pre> -->
</div>

<div class="bg-gray-700 py-8">
	<div class="container mx-auto">
		<div class="grid grid-cols-12 gap-10">
			<div class="col-span-3">
				<RecentChampions {recentChampions} />

				{#if recentTeammates && recentTeammates.length}
					<div class="h-4" />
					<RecentTeammates {recentTeammates} />
				{/if}
			</div>
			<div class="col-span-9">
				{#each summoner.matches as match}
					<MatchPanel {match} summonerPuuid={summoner.puuid} />
				{/each}
				<Spinner />
			</div>
		</div>
	</div>
</div>

<Footer />
