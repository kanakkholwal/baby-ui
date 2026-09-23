<script lang="ts">
import type { Snippet } from "svelte";
import ChartLegendContent from "./chart-legend-content.svelte";

let { content }: { content?: Snippet } = $props();
</script>

{#if content}
	{@render content()}
{:else}
	<ChartLegendContent />
{/if}
