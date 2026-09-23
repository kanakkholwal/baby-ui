<script lang="ts">
import {
	CartesianGrid,
	ChartContainer,
	ChartLegend,
	type ChartStatus,
	ChartTooltip,
	Line,
	LineChart,
	type LineCurve,
	type LineVariant,
	XAxis,
	YAxis,
} from "@baby-ui/svelte";
import { fadeProp, VISITORS, VISITORS_CONFIG } from "../data/visitors";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const line = $derived({
	curve: (props.curve as LineCurve) ?? "natural",
	variant: (props.variant as LineVariant) ?? "solid",
	strokeWidth: Number(props.strokeWidth ?? 2.5),
	fadeEdges: fadeProp(props.fadeEdges),
});
</script>

<div class="w-full max-w-3xl">
	<ChartContainer config={VISITORS_CONFIG} title="Daily visitors">
		<LineChart data={VISITORS} status={(props.status as ChartStatus) ?? "ready"}>
			<CartesianGrid />
			<YAxis />
			<XAxis />
			<Line dataKey="desktop" {...line} />
			<Line dataKey="mobile" {...line} />
			<ChartTooltip />
		</LineChart>
		<ChartLegend />
	</ChartContainer>
</div>
