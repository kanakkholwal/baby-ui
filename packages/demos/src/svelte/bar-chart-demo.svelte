<script lang="ts">
import {
	Bar,
	BarChart,
	BarTooltip,
	BarXAxis,
	BarYAxis,
	CartesianGrid,
	ChartContainer,
	ChartLegend,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { MONTHLY, MONTHLY_CONFIG } from "../data/monthly";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Bar>>(props));
const pChart = $derived(controlProps<ComponentProps<typeof BarChart>>(props));

const orientation = $derived(pChart.orientation ?? "vertical");
const bar = $derived({
	lineCap: p.lineCap ?? "round",
	texture: props.texture === true,
});
</script>

<div class="w-full max-w-3xl">
	<ChartContainer config={MONTHLY_CONFIG} title="Monthly revenue and profit">
		<BarChart
			data={MONTHLY}
			{orientation}
			variant={pChart.variant ?? "bar"}
			entrance={pChart.entrance ?? "grow"}
			stacked={props.stacked === true}
			status={pChart.status ?? "ready"}
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
