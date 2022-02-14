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
	import { toast } from '@zerodevx/svelte-toast';
	import InfiniteLoading from 'svelte-infinite-loading';
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
	import Button from '$components/Button.svelte';
	import { formatDate } from '$lib/util/time';

	export let summoner;
	export let region;

	let isRefreshing = false;

	const refresh = async () => {
		if (isRefreshing) {
			toast.push($t('summoner.warningAlreadyRefreshing'), {
				dismissable: false,
				duration: 1500,
				theme: {
					'--toastBackground': '#facc15',
					'--toastBarBackground': '#ca8a04'
				}
			});
			return;
		}

		isRefreshing = true;

		const response = await fetch(`/api/${region}/summoner/${summoner.name}?refresh=1`);

		if (response.ok) {
			summoner = (await response.json()).summoner;
		}

		isRefreshing = false;
	};

	const loadMore = async (e) => {
		try {
			const response = await fetch(
				`/api/${region}/summoner/${summoner.name}/matches?start=${summoner.matches.length}`
			);

			if (response.ok) {
				const matches = (await response.json()).matches;

				if (matches.length > 0) {
					summoner = {
						...summoner,
						matches: [...summoner.matches, ...matches]
					};
					e.detail.loaded();
				} else {
					e.detail.complete();
				}
			} else {
				e.detail.error();
			}
		} catch (err) {
			e.detail.error();
		}
	};

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
						<div class="flex items-center mr-3">
							<div class="w-12 h-12 mr-2">
								<WinrateChart wins={stats.wins} losses={stats.losses} />
							</div>
							<span class="text-sm font-medium">
								{$t('summoner.winratio', { wins: stats.wins, losses: stats.losses })}
							</span>
						</div>
					{/if}
					<Button on:click={refresh} size="sm" color="dark" shadow={false}>
						<div class="flex items-center justify-center">
							<i class="uil uil-redo ml-[-4px] mr-2" class:animate-spin={isRefreshing} />
							<div>
								<p class="text-left text-sm font-bold">{$t('summoner.refresh')}</p>
								<p class="text-gray-400 text-xs font-normal">{formatDate(summoner.updatedAt)}</p>
							</div>
						</div>
					</Button>
				</div>
			</div>
		</div>
		<RankedPanel loading={isRefreshing} rankedStats={summoner.rankedStats} />
	</div>
	<!-- <pre>{JSON.stringify(summoner, null, 2)}</pre> -->
</div>

<div class="bg-gray-700 py-8">
	<div class="container mx-auto">
		<div class="grid grid-cols-12 gap-10">
			<div class="col-span-3">
				<RecentChampions loading={isRefreshing} {recentChampions} />

				{#if recentTeammates && recentTeammates.length}
					<div class="h-4" />
					<RecentTeammates loading={isRefreshing} {region} {recentTeammates} />
				{/if}
			</div>
			<div class="col-span-9">
				{#each summoner.matches as match}
					<MatchPanel loading={isRefreshing} {match} summonerPuuid={summoner.puuid} />
				{/each}

				<InfiniteLoading on:infinite={loadMore}>
					<Spinner slot="spinner" />
					<span slot="noResults">
						{$t('summoner.noResults')}
					</span>
					<span slot="noMore">
						{$t('summoner.noMoreResults')}
					</span>
					<span slot="error">
						{$t('summoner.matchesLoadError')}
					</span>
				</InfiniteLoading>
			</div>
		</div>
	</div>
</div>

<Footer />
