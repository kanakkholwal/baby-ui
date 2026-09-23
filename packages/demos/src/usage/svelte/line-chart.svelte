<script lang="ts">
import { Line, LineChart } from "@baby-ui/svelte";
import {
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	XAxis,
	YAxis,
} from "@baby-ui/svelte/chart";

const data = [
	{ date: new Date("2026-06-01"), revenue: 4200 },
	{ date: new Date("2026-06-02"), revenue: 5100 },
	{ date: new Date("2026-06-03"), revenue: 4800 },
	{ date: new Date("2026-06-04"), revenue: 6200 },
];

const config = {
	revenue: { label: "Revenue", color: "var(--chart-1)" },
} satisfies ChartConfig;

let active = $state<number | null>(null);
</script>

<ChartContainer {config} title="Revenue">
	<LineChart {data} bind:activeIndex={active}>
		<CartesianGrid />
		<YAxis tickFormatter={(v) => `$${v / 1000}k`} />
		<XAxis />
		<Line dataKey="revenue" curve="monotone" />
		<ChartTooltip />
	</LineChart>
</ChartContainer>
