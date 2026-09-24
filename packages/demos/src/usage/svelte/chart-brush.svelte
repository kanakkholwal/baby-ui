<script lang="ts">
import { ChartBrush } from "@baby-ui/svelte";
import {
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	XAxis,
	YAxis,
} from "@baby-ui/svelte/chart";
import { Line, LineChart } from "@baby-ui/svelte/line-chart";

const data = Array.from({ length: 60 }, (_, i) => ({
	date: new Date(Date.UTC(2026, 0, 1 + i)),
	orders: 120 + Math.round(40 * Math.sin(i / 5)),
}));

const config = {
	orders: { label: "Orders", color: "var(--chart-1)" },
} satisfies ChartConfig;

let range = $state<[Date, Date]>();
</script>

<ChartContainer {config} title="Orders" aspect="auto" class="h-96">
	<LineChart {data} xDomain={range}>
		<CartesianGrid />
		<YAxis />
		<XAxis />
		<Line dataKey="orders" />
	</LineChart>
	<ChartBrush {data} dataKeys={["orders"]} bind:range />
</ChartContainer>
