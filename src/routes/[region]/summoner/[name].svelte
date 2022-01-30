<script context="module">
	export async function load({ params, fetch }) {
		const response = await fetch(`/api/${params.region}/summoner/${params.name}`);

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
	import Breadcrumbs from '$components/Breadcrumbs.svelte';
	import WinrateChart from '$components/WinrateChart.svelte';
	import { getProfileIconUrl } from '$lib/util/assets';

	export let summoner;
	export let region;
</script>

<div class="mt-16">
	<Breadcrumbs
		items={[
			{
				label: 'summoner'
			},
			{
				label: summoner.name,
				path: `/${region}/summoner/${summoner.name}`
			}
		]}
	/>
	<div class="flex justify-between items-center">
		<div class="flex">
			<img
				class="w-32 h-32 rounded-lg border border-gray-500"
				src={getProfileIconUrl(summoner.profileIconId)}
				alt="profile icon"
			/>
			<div class="flex flex-col justify-between items-start ml-4">
				<div>
					<h1 class="font-sans-secondary text-2xl font-bold mr-2 mb-1">{summoner.name}</h1>
					<p class="text-xs font-medium">level {summoner.summonerLevel}</p>
				</div>

				<div class="flex items-center">
					{#if summoner.stats.total > 0}
						<div class="w-12 h-12 mr-2">
							<WinrateChart wins={summoner.stats.wins} losses={summoner.stats.losses} />
						</div>
					{/if}
					<span class="text-sm font-medium"
						>{summoner.stats.wins} wins / {summoner.stats.losses} losses</span
					>
				</div>
			</div>
		</div>
	</div>

	<pre>{JSON.stringify(summoner, null, 2)}</pre>
</div>
