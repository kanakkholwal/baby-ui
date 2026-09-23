<script lang="ts">
import {
	CartesianGrid,
	type ChartAspect,
	ChartContainer,
	type ChartGridVariant,
	ChartLegend,
	type ChartLegendAlign,
	ChartLegendContent,
	type ChartStatus,
	ChartTooltip,
	ChartTooltipContent,
	type ChartTooltipIndicator,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from "@baby-ui/svelte";
import { localeProp, VISITORS, VISITORS_CONFIG } from "../data/visitors";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="w-full max-w-3xl">
	<ChartContainer
		config={VISITORS_CONFIG}
		title="Daily visitors"
		aspect={(props.aspect as ChartAspect) ?? "video"}
		locale={localeProp(props.locale)}
	>
		<LineChart data={VISITORS} status={(props.status as ChartStatus) ?? "ready"}>
			<CartesianGrid variant={(props.variant as ChartGridVariant) ?? "dashed"} />
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
