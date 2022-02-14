<script>
	import { t } from '$lib/i18n';

	export let stats;
</script>

<table>
	<tbody>
		{#each stats as stat}
			<tr>
				<td class="text-right pr-1 font-bold">{stat.value}</td>
				<th class="text-gray-400 text-left font-sans-secondary font-bold text-sm"
					>{$t(stat.label)}</th
				>
			</tr>
		{/each}
	</tbody>
</table>
