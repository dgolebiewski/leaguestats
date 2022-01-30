<script>
	export let items = [];

	$: allItems = [
		{
			label: 'home',
			path: '/'
		},
		...items
	];
</script>

<div class="flex items-center py-4">
	{#each allItems as item, i}
		<div
			class={`text-xxs leading-4 text-gray-400 transition-colors${
				item.path ? ' hover:text-gray-300' : ''
			}`}
		>
			{#if item.path}
				<a href={item.path}>{item.label}</a>
			{:else}
				<span>{item.label}</span>
			{/if}
			{#if i < allItems.length - 1}
				<i class="uil uil-angle-right" />
			{/if}
		</div>
	{/each}
</div>
