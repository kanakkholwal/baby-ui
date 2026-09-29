<script lang="ts">
import {
	CartesianGrid,
	ChartBrush,
	ChartContainer,
	ChartTooltip,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";
import { VISITORS, VISITORS_CONFIG } from "../data/visitors";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof ChartBrush>>(props));

let range = $state<[Date, Date]>([
	VISITORS[7]?.date ?? new Date(),
	VISITORS[21]?.date ?? new Date(),
]);
</script>

<div class="w-full max-w-3xl">
	<ChartContainer config={VISITORS_CONFIG} title="Daily visitors" aspect="auto" class="h-96">
		<LineChart data={VISITORS} xDomain={range}>
			<CartesianGrid />
			<YAxis />
			<XAxis />
			<Line dataKey="desktop" />
			<Line dataKey="mobile" />
			<ChartTooltip />
		</LineChart>
		<ChartBrush
			data={VISITORS}
			dataKeys={["desktop", "mobile"]}
			bind:range
			variant={p.variant ?? "area"}
			height={Number(props.height ?? 64)}
		/>
	</ChartContainer>
</div>
