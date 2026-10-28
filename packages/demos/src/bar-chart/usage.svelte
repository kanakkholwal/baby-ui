<script lang="ts">
import { Bar, BarChart, BarTooltip, BarXAxis, BarYAxis } from "@baby-ui/svelte";
import {
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartLegend,
} from "@baby-ui/svelte/chart";

const data = [
	{ name: "Jan", revenue: 12400, profit: 4500 },
	{ name: "Feb", revenue: 15100, profit: 5200 },
	{ name: "Mar", revenue: 13800, profit: 3900 },
	{ name: "Apr", revenue: 17900, profit: 6800 },
];

const config = {
	revenue: { label: "Revenue", color: "var(--chart-1)" },
	profit: { label: "Profit", color: "var(--chart-2)" },
} satisfies ChartConfig;
</script>

<ChartContainer {config} title="Monthly revenue and profit">
	<BarChart {data} xKey="name">
		<CartesianGrid />
		<BarTooltip />
		<Bar dataKey="revenue" />
		<Bar dataKey="profit" />
		<BarXAxis />
		<BarYAxis tickFormatter={(v) => `$${v / 1000}k`} />
	</BarChart>
	<ChartLegend />
</ChartContainer>
