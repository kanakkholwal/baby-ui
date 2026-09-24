<script lang="ts">
import {
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	XAxis,
	YAxis,
} from "@baby-ui/svelte/chart";
import { Line, LineChart } from "@baby-ui/svelte/line-chart";

let { loading = false }: { loading?: boolean } = $props();

const data = [
	{ date: new Date("2026-06-01"), revenue: 4200 },
	{ date: new Date("2026-06-02"), revenue: 5100 },
	{ date: new Date("2026-06-03"), revenue: 4800 },
	{ date: new Date("2026-06-04"), revenue: 6200 },
];

const config = {
	revenue: { label: "Revenue", color: "var(--chart-1)" },
} satisfies ChartConfig;
</script>

<ChartContainer {config} title="Revenue">
	<LineChart {data} status={loading ? "loading" : "ready"}>
		<CartesianGrid />
		<YAxis />
		<XAxis />
		<Line dataKey="revenue" showMarkers terminalMarker dashFromIndex={2} loadingStyle="sweep" />
		<ChartTooltip />
	</LineChart>
</ChartContainer>
