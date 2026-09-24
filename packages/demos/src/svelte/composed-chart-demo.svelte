<script lang="ts">
import {
	CartesianGrid,
	ChartContainer,
	ChartLegend,
	type ChartStatus,
	ChartTooltip,
	ComposedChart,
	Line,
	SeriesBar,
	type SeriesBarVariant,
	XAxis,
	YAxis,
} from "@baby-ui/svelte";
import { REVENUE, REVENUE_CONFIG } from "../data/revenue";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const barSize = $derived(Number(props.barSize ?? 0));
const bar = $derived({
	variant: (props.variant as SeriesBarVariant) ?? "solid",
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
			status={(props.status as ChartStatus) ?? "ready"}
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
