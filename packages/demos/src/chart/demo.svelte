<script lang="ts">
import {
	Background,
	Badge,
	CartesianGrid,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	Line,
	LineChart,
	ReferenceArea,
	SelectionArea,
	XAxis,
	YAxis,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";
import { localeProp, VISITORS, VISITORS_CONFIG } from "../data/visitors";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof ChartContainer>>(props));
const pLine = $derived(controlProps<ComponentProps<typeof LineChart>>(props));
const pBg = $derived(controlProps<ComponentProps<typeof Background>>(props));
const pGrid = $derived(controlProps<ComponentProps<typeof CartesianGrid>>(props));
const pRef = $derived(controlProps<ComponentProps<typeof ReferenceArea>>(props));
const pSel = $derived(controlProps<ComponentProps<typeof SelectionArea>>(props));
const pTooltipContent = $derived(
	controlProps<ComponentProps<typeof ChartTooltipContent>>(props),
);
const pLegendContent = $derived(
	controlProps<ComponentProps<typeof ChartLegendContent>>(props),
);

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
		aspect={p.aspect ?? "video"}
		locale={localeProp(props.locale)}
	>
		<LineChart data={VISITORS} status={pLine.status ?? "ready"}>
			{#if props.background && props.background !== "none"}
				<Background variant={pBg.variant} />
			{/if}
			<CartesianGrid variant={pGrid.variant ?? "dashed"} />
			{#if props.tone && props.tone !== "none"}
				<ReferenceArea y1={2400} y2={3000} label="Target" tone={pRef.tone} />
			{/if}
			<YAxis />
			<XAxis />
			<SelectionArea edge={pSel.edge ?? "dashed"} />
			<Line dataKey="desktop" />
			<Line dataKey="mobile" />
			<ChartTooltip datePill={props.datePill !== false}>
				{#snippet content()}
					<ChartTooltipContent indicator={pTooltipContent.indicator ?? "dot"} />
				{/snippet}
			</ChartTooltip>
		</LineChart>
		<ChartLegend>
			{#snippet content()}
				<ChartLegendContent align={pLegendContent.align ?? "center"} />
			{/snippet}
		</ChartLegend>
	</ChartContainer>
</div>
