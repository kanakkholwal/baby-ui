<script lang="ts">
import {
	CartesianGrid,
	ChartContainer,
	ChartLegend,
	ChartTooltip,
	ComposedChart,
	Line,
	SeriesBar,
	XAxis,
	YAxis,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";
import { REVENUE, REVENUE_CONFIG } from "../data/revenue";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof SeriesBar>>(props));
const pChart = $derived(controlProps<ComponentProps<typeof ComposedChart>>(props));

const barSize = $derived(Number(props.barSize ?? 0));
const bar = $derived({
	variant: p.variant ?? "solid",
	radius: Number(props.radius ?? 3),
});
</script>

<div class="w-full max-w-3xl">
	<ChartContainer config={REVENUE_CONFIG} title="Daily sales">
		<ComposedChart
			data={REVENUE}
			stacked={props.stacked === true}
			barSize={barSize > 0 ? barSize : undefined}
			barGap={Number(props.barGap ?? 4)}
			status={pChart.status ?? "ready"}
		>
			<CartesianGrid />
			<YAxis />
			<XAxis />
			<SeriesBar dataKey="online" {...bar} />
			<SeriesBar dataKey="store" {...bar} />
			<Line dataKey="target" curve="monotone" variant="dashed" fadeEdges={false} />
			<ChartTooltip />
		</ComposedChart>
		<ChartLegend />
	</ChartContainer>
</div>
