<script>
	import { beforeNavigate, afterNavigate } from '$app/navigation';
	import { fade } from 'svelte/transition';

	let progress = 0;
	let showProgress = false;
	let progressInterval = null;

	beforeNavigate(() => {
		progress = 0;
		showProgress = true;
		progressInterval = setInterval(() => {
			if (progress < 70) progress++;
		}, 10);
	});

	afterNavigate(() => {
		clearInterval(progressInterval);
		progress = 100;
		setTimeout(() => {
			showProgress = false;
			progress = 0;
		}, 300);
	});
</script>

{#if showProgress}
	<div class="pointer-events-none fixed top-0 left-0 w-full h-1 z-20" out:fade>
		<div class="h-1 rounded-b-md bg-teal-500 transition-all" style="width: {progress}%" />
	</div>
{/if}
