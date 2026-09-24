<script lang="ts">
import {
	Area,
	AreaChart,
	type AreaVariant,
	CartesianGrid,
	ChartContainer,
	ChartLegend,
	type ChartStatus,
	ChartTooltip,
	type LineCurve,
	type SeriesLoadingStyle,
	XAxis,
	YAxis,
} from "@baby-ui/svelte";
import { fadeProp, VISITORS, VISITORS_CONFIG } from "../data/visitors";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const area = $derived({
	variant: (props.variant as AreaVariant) ?? "gradient",
	curve: (props.curve as LineCurve) ?? "natural",
	line: props.line !== false,
	fillOpacity: Number(props.fillOpacity ?? 0.4),
	fadeEdges: fadeProp(props.fadeEdges ?? "none"),
	loadingStyle: (props.loadingStyle as SeriesLoadingStyle) ?? "pulse",
	showMarkers: props.showMarkers === true,
});
</script>

<div class="w-full max-w-3xl">
	<ChartContainer config={VISITORS_CONFIG} title="Daily visitors">
		<AreaChart
			data={VISITORS}
			stacked={props.stacked === true}
			status={(props.status as ChartStatus) ?? "ready"}
		>
			<CartesianGrid />
			<YAxis />
			<XAxis />
			<Area dataKey="mobile" {...area} />
			<Area dataKey="desktop" {...area} />
			<ChartTooltip />
		</AreaChart>
		<ChartLegend />
	</ChartContainer>
</div>
