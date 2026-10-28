<script lang="ts">
import { Candlestick, CandlestickChart } from "@baby-ui/svelte";
import {
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartTooltip,
	XAxis,
	YAxis,
} from "@baby-ui/svelte/chart";

const data = [
	{ date: new Date("2026-04-01"), open: 182.4, high: 186.1, low: 180.9, close: 185.2 },
	{ date: new Date("2026-04-02"), open: 185.2, high: 187.8, low: 183.0, close: 183.6 },
	{ date: new Date("2026-04-03"), open: 183.6, high: 189.4, low: 182.7, close: 188.9 },
	{ date: new Date("2026-04-04"), open: 188.9, high: 190.2, low: 185.1, close: 186.0 },
];

const config = {
	up: { label: "Rising", color: "var(--chart-positive)" },
	down: { label: "Falling", color: "var(--chart-negative)" },
} satisfies ChartConfig;
</script>

<ChartContainer {config} title="Share price">
	<CandlestickChart {data}>
		<CartesianGrid />
		<YAxis tickFormatter={(v) => `$${v}`} />
		<XAxis />
		<Candlestick />
		<ChartTooltip dots={false} />
	</CandlestickChart>
	<ChartLegend />
</ChartContainer>
