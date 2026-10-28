<script lang="ts">
import { PieChart } from "@baby-ui/svelte";
import { type ChartConfig, ChartContainer, ChartLegend } from "@baby-ui/svelte/chart";

const data = [
	{ name: "direct", value: 4280 },
	{ name: "search", value: 3150 },
	{ name: "social", value: 1890 },
];

const config = {
	direct: { label: "Direct", color: "var(--chart-1)" },
	search: { label: "Search", color: "var(--chart-2)" },
	social: { label: "Social", color: "var(--chart-3)" },
} satisfies ChartConfig;

let active = $state<number | null>(null);
</script>

<ChartContainer {config} title="Traffic by channel" aspect="square">
	<PieChart {data} bind:activeIndex={active} />
	<ChartLegend />
</ChartContainer>
