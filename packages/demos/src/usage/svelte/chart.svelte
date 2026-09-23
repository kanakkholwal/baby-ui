<script lang="ts">
import {
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartTooltip,
	ChartTooltipContent,
	XAxis,
	YAxis,
} from "@baby-ui/svelte";
import { Line, LineChart } from "@baby-ui/svelte/line-chart";

const data = [
	{ date: new Date("2026-06-01"), desktop: 1840, mobile: 1320 },
	{ date: new Date("2026-06-02"), desktop: 2150, mobile: 1180 },
	{ date: new Date("2026-06-03"), desktop: 1990, mobile: 1460 },
	{ date: new Date("2026-06-04"), desktop: 2380, mobile: 1510 },
];

const config = {
	desktop: { label: "Desktop", color: "var(--chart-1)" },
	mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig;
</script>

<ChartContainer {config} title="Daily visitors">
	<LineChart {data}>
		<CartesianGrid />
		<YAxis />
		<XAxis />
		<Line dataKey="desktop" />
		<Line dataKey="mobile" />
		<ChartTooltip>
			{#snippet content()}
				<ChartTooltipContent indicator="line" />
			{/snippet}
		</ChartTooltip>
	</LineChart>
	<ChartLegend />
</ChartContainer>
