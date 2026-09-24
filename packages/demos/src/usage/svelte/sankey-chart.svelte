<script lang="ts">
import { SankeyChart } from "@baby-ui/svelte";
import { ChartContainer } from "@baby-ui/svelte/chart";

const data = {
	nodes: [
		{ name: "Search" },
		{ name: "Social" },
		{ name: "Pricing" },
		{ name: "Signup" },
	],
	links: [
		{ source: 0, target: 2, value: 1840 },
		{ source: 1, target: 2, value: 760 },
		{ source: 2, target: 3, value: 1310 },
	],
};
</script>

<ChartContainer config={{}} title="Visitor journeys" aspect="wide">
	<SankeyChart {data} linkColor="source" />
</ChartContainer>
