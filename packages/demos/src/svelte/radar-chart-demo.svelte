<script lang="ts">
import {
	ChartContainer,
	ChartLegend,
	RadarArea,
	RadarAxis,
	RadarChart,
	RadarGrid,
	type RadarGridShape,
	RadarLabels,
	RadarTooltip,
	type RadarVariant,
} from "@baby-ui/svelte";
import { RADAR_CONFIG, RADAR_METRICS, RADAR_SERIES } from "../data/radar";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="w-full max-w-md">
	<ChartContainer config={RADAR_CONFIG} title="Player profiles" aspect="square">
		<RadarChart
			data={RADAR_SERIES}
			metrics={RADAR_METRICS}
			grid={(props.grid as RadarGridShape) ?? "polygon"}
			variant={(props.variant as RadarVariant) ?? "filled"}
			levels={Number(props.levels ?? 5)}
		>
			<RadarGrid />
			<RadarAxis />
			<RadarLabels />
			{#each RADAR_SERIES as s, i (s.label)}
				<RadarArea index={i} showPoints={props.showPoints !== false} />
			{/each}
			<RadarTooltip />
		</RadarChart>
		<ChartLegend />
	</ChartContainer>
</div>
