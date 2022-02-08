<script>
	export let size = 'medium';

	let classes = 'w-8 h-8';

	$: {
		switch (size) {
			case 'small':
				classes = 'border-2 w-4 h-4';
				break;
			case 'large':
				classes = 'border-4 w-12 h-12';
				break;
			default:
				classes = 'border-4 w-8 h-8';
				break;
		}
	}
	$: offset = size === 'small' ? '2' : '4';
</script>

<div class="flex justify-center items-center">
	<div class={`border-white border-opacity-40 rounded-full relative ${classes}`}>
		<div
			class={`absolute top-[-${offset}px] left-[-${offset}px] animate-spin inline-block order-transparent border-t-white rounded-full ${classes}`}
			role="status"
		/>
	</div>
</div>
