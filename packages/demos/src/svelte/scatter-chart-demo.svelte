<script lang="ts">
import {
	CartesianGrid,
	ChartContainer,
	ChartLegend,
	type ChartStatus,
	ChartTooltip,
	Scatter,
	ScatterChart,
	type ScatterShape,
	type ScatterSize,
	XAxis,
	YAxis,
} from "@baby-ui/svelte";
import { READINGS, READINGS_CONFIG } from "../data/prices";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const size = $derived((props.size as ScatterSize) ?? "md");
const shape = $derived(
	props.shape && props.shape !== "auto" ? (props.shape as ScatterShape) : undefined,
);
</script>

<div class="w-full max-w-3xl">
	<ChartContainer config={READINGS_CONFIG} title="Sensor readings">
		<ScatterChart data={READINGS} status={(props.status as ChartStatus) ?? "ready"}>
			<CartesianGrid />
			<YAxis />
			<XAxis />
			<Scatter dataKey="north" {size} {shape} />
			<Scatter dataKey="south" {size} {shape} />
			<Scatter dataKey="east" {size} {shape} />
			<ChartTooltip dots={false} />
		</ScatterChart>
		<ChartLegend />
	</ChartContainer>
</div>
