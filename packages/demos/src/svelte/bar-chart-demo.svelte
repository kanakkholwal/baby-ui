<script lang="ts">
import {
	Bar,
	BarChart,
	type BarEntrance,
	type BarLineCap,
	type BarOrientationVariant,
	BarTooltip,
	type BarVariant,
	BarXAxis,
	BarYAxis,
	CartesianGrid,
	ChartContainer,
	ChartLegend,
	type ChartStatus,
} from "@baby-ui/svelte";
import { MONTHLY, MONTHLY_CONFIG } from "../data/monthly";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const orientation = $derived((props.orientation as BarOrientationVariant) ?? "vertical");
const bar = $derived({
	lineCap: (props.lineCap as BarLineCap) ?? "round",
	texture: props.texture === true,
});
</script>

<div class="w-full max-w-3xl">
	<ChartContainer config={MONTHLY_CONFIG} title="Monthly revenue and profit">
		<BarChart
			data={MONTHLY}
			{orientation}
			variant={(props.variant as BarVariant) ?? "bar"}
			entrance={(props.entrance as BarEntrance) ?? "grow"}
			stacked={props.stacked === true}
			status={(props.status as ChartStatus) ?? "ready"}
			margin={orientation === "horizontal" ? { left: 48, bottom: 28 } : undefined}
		>
			<CartesianGrid />
			<BarTooltip />
			<Bar dataKey="revenue" {...bar} />
			<Bar dataKey="profit" {...bar} />
			<BarXAxis />
			<BarYAxis />
		</BarChart>
		<ChartLegend />
	</ChartContainer>
</div>
