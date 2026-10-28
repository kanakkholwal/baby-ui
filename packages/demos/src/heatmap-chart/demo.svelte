<script lang="ts">
import { ChartContainer, HeatmapChart, HeatmapLegend } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { DAILY_ACTIVITY } from "../data/flows";
import { controlProps } from "../data/preview-props";
import { localeProp } from "../data/visitors";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof HeatmapChart>>(props));

const shape = $derived(p.shape ?? "rounded");
const patterns = $derived(props.patterns === true);
const locale = $derived(localeProp(props.locale));
</script>

<div class="w-full max-w-3xl">
	<ChartContainer config={{}} title="Daily activity" aspect="auto" class="h-56" {locale}>
		<HeatmapChart
			data={DAILY_ACTIVITY}
			{shape}
			{patterns}
			weekStart={p.weekStart ?? "auto"}
			gap={Number(props.gap ?? 3)}
			{locale}
			status={p.status ?? "ready"}
		/>
		{#if props.legend !== false}
			<HeatmapLegend {shape} {patterns} />
		{/if}
	</ChartContainer>
</div>
