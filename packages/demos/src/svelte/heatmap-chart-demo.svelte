<script lang="ts">
import {
	ChartContainer,
	type ChartStatus,
	HeatmapChart,
	HeatmapLegend,
	type HeatmapShape,
	type HeatmapWeekStart,
} from "@baby-ui/svelte";
import { DAILY_ACTIVITY } from "../data/flows";
import { localeProp } from "../data/visitors";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const shape = $derived((props.shape as HeatmapShape) ?? "rounded");
const patterns = $derived(props.patterns === true);
const locale = $derived(localeProp(props.locale));
</script>

<div class="w-full max-w-3xl">
	<ChartContainer config={{}} title="Daily activity" aspect="auto" class="h-56" {locale}>
		<HeatmapChart
			data={DAILY_ACTIVITY}
			{shape}
			{patterns}
			weekStart={(props.weekStart as HeatmapWeekStart) ?? "auto"}
			gap={Number(props.gap ?? 3)}
			{locale}
			status={(props.status as ChartStatus) ?? "ready"}
		/>
		{#if props.legend !== false}
			<HeatmapLegend {shape} {patterns} />
		{/if}
	</ChartContainer>
</div>
