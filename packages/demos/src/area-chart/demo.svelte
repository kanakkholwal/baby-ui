<script lang="ts">
import {
	Area,
	AreaChart,
	CartesianGrid,
	ChartContainer,
	ChartLegend,
	ChartTooltip,
	XAxis,
	YAxis,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";
import { fadeProp, VISITORS, VISITORS_CONFIG } from "../data/visitors";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Area>>(props));
const pChart = $derived(controlProps<ComponentProps<typeof AreaChart>>(props));

const area = $derived({
	variant: p.variant ?? "gradient",
	curve: p.curve ?? "natural",
	line: props.line !== false,
	fillOpacity: Number(props.fillOpacity ?? 0.4),
	fadeEdges: fadeProp(props.fadeEdges ?? "none"),
	loadingStyle: p.loadingStyle ?? "pulse",
	showMarkers: props.showMarkers === true,
});
</script>

<div class="w-full max-w-3xl">
	<ChartContainer config={VISITORS_CONFIG} title="Daily visitors">
		<AreaChart
			data={VISITORS}
			stacked={props.stacked === true}
			status={pChart.status ?? "ready"}
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
