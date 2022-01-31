<script>
	import { t } from '$lib/i18n';

	export let items = [];

	$: allItems = [
		{
			label: $t('common.home'),
			path: '/'
		},
		...items
	];
</script>

<div class="flex items-center py-5">
	{#each allItems as item, i}
		<div
			class={`leading-6 text-gray-400 transition-colors${item.path ? ' hover:text-gray-300' : ''}`}
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
