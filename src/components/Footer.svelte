<script>
	export let absolute = false;

	$: classes = `flex justify-end items-center w-full p-6 text-bold text-gray-400 text-xs${
		absolute ? ' absolute bottom-0' : ''
	}`;
</script>

<div class={classes}>© 2022 Daniel Gołębiewski</div>
