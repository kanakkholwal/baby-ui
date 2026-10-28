<script lang="ts">
import { HeatmapChart, HeatmapLegend } from "@baby-ui/svelte";
import { ChartContainer } from "@baby-ui/svelte/chart";

const data = [
	{ date: "2026-03-02", value: 4 },
	{ date: "2026-03-03", value: 9 },
	{ date: "2026-03-05", value: 2 },
	{ date: "2026-03-09", value: 6 },
];

let day = $state<number | null>(null);
</script>

<ChartContainer config={{}} title="Commits" aspect="auto" class="h-48">
	<HeatmapChart {data} bind:activeIndex={day} formatLabel={(value) => `${value} commits`} />
	<HeatmapLegend />
</ChartContainer>
