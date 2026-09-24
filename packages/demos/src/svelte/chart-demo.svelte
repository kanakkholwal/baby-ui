<script lang="ts">
import {
	Background,
	Badge,
	CartesianGrid,
	type ChartAspect,
	type ChartBackgroundVariant,
	ChartContainer,
	type ChartGridVariant,
	ChartLegend,
	type ChartLegendAlign,
	ChartLegendContent,
	type ChartReferenceTone,
	type ChartStatus,
	ChartTooltip,
	ChartTooltipContent,
	type ChartTooltipIndicator,
	Line,
	LineChart,
	ReferenceArea,
	XAxis,
	YAxis,
} from "@baby-ui/svelte";
import { localeProp, VISITORS, VISITORS_CONFIG } from "../data/visitors";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const BASE_PARTS = ["Grid", "Axes", "Tooltip", "Legend"];
</script>

<div class={["w-full max-w-3xl", props.aspect === "auto" && "h-80"]}>
	<div class="mb-2 flex flex-wrap gap-1.5">
		{#each BASE_PARTS as part (part)}
			<Badge variant="outline" size="sm">{part}</Badge>
		{/each}
	</div>
	<ChartContainer
		config={VISITORS_CONFIG}
		title="Chart base"
		aspect={(props.aspect as ChartAspect) ?? "video"}
		locale={localeProp(props.locale)}
	>
		<LineChart data={VISITORS} status={(props.status as ChartStatus) ?? "ready"}>
			{#if props.background && props.background !== "none"}
				<Background variant={props.background as ChartBackgroundVariant} />
			{/if}
			<CartesianGrid variant={(props.variant as ChartGridVariant) ?? "dashed"} />
			{#if props.tone && props.tone !== "none"}
				<ReferenceArea y1={2400} y2={3000} label="Target" tone={props.tone as ChartReferenceTone} />
			{/if}
			<YAxis />
			<XAxis />
			<Line dataKey="desktop" />
			<Line dataKey="mobile" />
			<ChartTooltip datePill={props.datePill !== false}>
				{#snippet content()}
					<ChartTooltipContent indicator={(props.indicator as ChartTooltipIndicator) ?? "dot"} />
				{/snippet}
			</ChartTooltip>
		</LineChart>
		<ChartLegend>
			{#snippet content()}
				<ChartLegendContent align={(props.align as ChartLegendAlign) ?? "center"} />
			{/snippet}
		</ChartLegend>
	</ChartContainer>
</div>
