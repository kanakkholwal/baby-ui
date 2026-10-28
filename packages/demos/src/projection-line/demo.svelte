<script lang="ts">
import {
	buildProjection,
	CartesianGrid,
	ChartContainer,
	ChartTooltip,
	Line,
	LineChart,
	ProjectionLine,
	XAxis,
	YAxis,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";
import { VISITORS, VISITORS_CONFIG } from "../data/visitors";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof ProjectionLine>>(props));

const projection = $derived(
	buildProjection({
		data: VISITORS,
		dataKey: "desktop",
		horizon: Number(props.horizon ?? 7),
	}),
);
</script>

<div class="w-full max-w-3xl">
	<ChartContainer config={VISITORS_CONFIG} title="Desktop visitors with forecast">
		<LineChart data={VISITORS}>
			<CartesianGrid />
			<YAxis />
			<XAxis />
			<Line dataKey="desktop" fadeEdges="left" />
			<ProjectionLine
				data={projection}
				variant={p.variant ?? "dashed"}
				curve={p.curve ?? "linear"}
				endMarker={props.endMarker !== false}
			/>
			<ChartTooltip />
		</LineChart>
	</ChartContainer>
</div>
