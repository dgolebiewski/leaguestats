<script>
	import { REGIONS } from '$lib/util/consts';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Button from '$components/Button.svelte';
	import Footer from '$components/Footer.svelte';
	import SearchBar from '$components/SearchBar.svelte';

	let region = REGIONS[0].platformPrefix;
	let summonerName = '';

	const setRegion = (e) => {
		localStorage.setItem('region', e.target.value);
	};

	const search = () => {
		if (!region || !summonerName || summonerName.length < 3) {
			return;
		}

		goto(`/${region}/summoner/${summonerName}`);
	};

	onMount(() => {
		if (typeof localStorage !== 'undefined') {
			region = localStorage.getItem('region');
		}
	});
</script>

<div class="w-full h-screen flex justify-center items-center">
	<div>
		<h1 class="text-center font-sans-secondary text-5xl leading-tight mb-2 font-bold">
			leaguestats.gg
		</h1>
		<h2 class="text-center text-lg leading-7 mb-11">search for summoners</h2>
		<SearchBar />
	</div>
	<Footer absolute />
</div>
