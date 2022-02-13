<script>
	import { createEventDispatcher } from 'svelte';

	export let size = 'md';
	export let color = 'teal';
	export let shadow = true;

	const dispatch = createEventDispatcher();

	const onClick = (e) => dispatch('click', e);

	let sizeClasses;
	let colorClasses;

	$: {
		switch (size) {
			case 'sm':
				sizeClasses = 'px-4 py-1';
				break;
			case 'md':
				sizeClasses = 'px-6 py-2';
				break;
			case 'lg':
				sizeClasses = 'px-14 py-3';
				break;
		}

		switch (color) {
			case 'teal':
				colorClasses = 'bg-teal-500 hover:bg-teal-400';
				break;
			case 'dark':
				colorClasses = 'bg-gray-800 hover:bg-gray-700';
				break;
		}
	}
</script>

<button
	class="{colorClasses} {sizeClasses} font-bold text-xl rounded-lg transition-all {shadow
		? 'shadow-md hover:shadow-lg'
		: ''}"
	on:click={onClick}
>
	<slot />
</button>
