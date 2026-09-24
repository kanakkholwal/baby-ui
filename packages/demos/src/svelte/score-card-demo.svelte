<script lang="ts">
import { type GaugeChartLayout, type GaugeChartTone, ScoreCard } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="w-full max-w-xs">
	<ScoreCard
		title="Performance"
		description="Lighthouse, last deploy"
		value={87}
		trend={4}
		tone={(props.tone as GaugeChartTone) ?? "primary"}
		layout={(props.layout as GaugeChartLayout) ?? "arc"}
	/>
</div>
