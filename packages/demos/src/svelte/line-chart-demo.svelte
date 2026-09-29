<script lang="ts">
import {
	CartesianGrid,
	ChartContainer,
	ChartLegend,
	ChartTooltip,
	Line,
	LineChart,
	ProfitLossLine,
	XAxis,
	YAxis,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { PNL, PNL_CONFIG } from "../data/pnl";
import { controlProps } from "../data/preview-props";
import { fadeProp, VISITORS, VISITORS_CONFIG } from "../data/visitors";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof LineChart>>(props));
const pLine = $derived(controlProps<ComponentProps<typeof Line>>(props));
const pProfitLoss = $derived(controlProps<ComponentProps<typeof ProfitLossLine>>(props));

const status = $derived(p.status ?? "ready");
const dashFromIndex = $derived(Number(props.dashFromIndex ?? -1));
const line = $derived({
	curve: pLine.curve ?? "natural",
	variant: pLine.variant ?? "solid",
	strokeWidth: Number(props.strokeWidth ?? 2.5),
	fadeEdges: fadeProp(props.fadeEdges),
	loadingStyle: pLine.loadingStyle ?? "pulse",
	showMarkers: props.showMarkers === true,
	terminalMarker: props.terminalMarker === true,
	showHighlight: props.showHighlight !== false,
	dashFromIndex: dashFromIndex >= 0 ? dashFromIndex : undefined,
});
const profitLoss = $derived(props.encoding === "dashed" || props.encoding === "dotted");
</script>

<div class="w-full max-w-3xl">
	{#if profitLoss}
		<ChartContainer config={PNL_CONFIG} title="Daily profit and loss">
			<LineChart data={PNL} {status}>
				<CartesianGrid />
				<YAxis />
				<XAxis />
				<ProfitLossLine
					dataKey="pnl"
					encoding={pProfitLoss.encoding}
					curve={line.curve}
					strokeWidth={line.strokeWidth}
				/>
				<ChartTooltip />
			</LineChart>
		</ChartContainer>
	{:else}
		<ChartContainer config={VISITORS_CONFIG} title="Daily visitors">
			<LineChart data={VISITORS} {status}>
				<CartesianGrid />
				<YAxis />
				<XAxis />
				<Line dataKey="desktop" {...line} />
				<Line dataKey="mobile" {...line} />
				<ChartTooltip />
			</LineChart>
			<ChartLegend />
		</ChartContainer>
	{/if}
</div>
