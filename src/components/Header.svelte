<script>
	import SearchBar from './SearchBar.svelte';
</script>

<div
	class="absolute top-0 left-0 w-full bg-gray-800 border-b border-gray-500 px-8 py-4 flex justify-between items-center"
>
	<a href="/">
		<h2 class="font-sans-secondary text-2xl text-bold">leaguestats.gg</h2>
	</a>
	<SearchBar small withButton />
</div>
