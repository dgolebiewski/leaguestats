<script>
	export let loading = false;
	export let title;
</script>

<div
	class="py-3 px-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all w-100"
	class:animate-pulse={loading}
>
	{#if title}
		<h4 class="text-center mb-2">{title}</h4>
	{/if}
	<slot />
</div>
