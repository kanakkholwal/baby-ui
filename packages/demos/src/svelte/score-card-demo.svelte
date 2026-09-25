<script lang="ts">
import {
	type GaugeChartLayout,
	type GaugeChartTone,
	ScoreCard,
	type ScoreCardSize,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="w-full max-w-xs">
	<ScoreCard
		title="Performance"
		description="Lighthouse, last deploy"
		value={87}
		min={Number(props.min ?? 0)}
		max={Number(props.max ?? 100)}
		trend={4}
		tone={(props.tone as GaugeChartTone) ?? "primary"}
		layout={(props.layout as GaugeChartLayout) ?? "arc"}
		size={(props.size as ScoreCardSize) ?? "md"}
	/>
</div>
