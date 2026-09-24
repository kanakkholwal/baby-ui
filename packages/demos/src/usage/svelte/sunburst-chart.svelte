<script lang="ts">
import { SunburstChart } from "@baby-ui/svelte";
import { type ChartConfig, ChartContainer } from "@baby-ui/svelte/chart";

const data = {
	name: "Revenue",
	children: [
		{
			name: "americas",
			children: [
				{ name: "United States", value: 7700 },
				{ name: "Canada", value: 1550 },
			],
		},
		{
			name: "europe",
			children: [
				{ name: "Germany", value: 3100 },
				{ name: "France", value: 1300 },
			],
		},
	],
};

const config = {
	americas: { label: "Americas", color: "var(--chart-1)" },
	europe: { label: "Europe", color: "var(--chart-2)" },
} satisfies ChartConfig;

let focus = $state("Revenue");
</script>

<ChartContainer {config} title="Revenue by region" aspect="square">
	<SunburstChart {data} bind:focus />
</ChartContainer>
