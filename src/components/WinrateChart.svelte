<script>
	import Doughnut from 'svelte-chartjs/src/Doughnut.svelte';

	export let wins = 0;
	export let losses = 0;

	$: data = {
		labels: ['wins', 'losses'],
		datasets: [
			{
				data: [wins, losses],
				backgroundColor: ['#00A3FF', '#E83636']
			}
		]
	};
</script>

{#if wins > 0 || losses > 0}
	<div class="relative">
		<Doughnut
			{data}
			options={{
				borderWidth: 0,
				cutout: '75%',
				plugins: {
					tooltip: {
						enabled: false
					},
					legend: {
						display: false
					}
				}
			}}
		/>
		<div class="absolute top-0 font-sans-secondary text-sm leading-4 text-center w-full py-4">
			{(wins / (wins + losses)) * 100}%
		</div>
	</div>
{/if}
