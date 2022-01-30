<script>
	export let size = 'medium';

	let classes = 'w-8 h-8';

	$: {
		switch (size) {
			case 'small':
				classes = 'w-4 h-4';
				break;
			case 'large':
				classes = 'w-12 h-12';
				break;
			default:
				classes = 'w-8 h-8';
				break;
		}
	}
</script>

<div class="flex justify-center items-center">
	<div
		class={`spinner-border animate-spin inline-block border-2 border-r-transparent rounded-full ${classes}`}
		role="status"
	/>
</div>
