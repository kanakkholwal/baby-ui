<script lang="ts">
import {
	CartesianGrid,
	ChartContainer,
	ChartLegend,
	type ChartStatus,
	ChartTooltip,
	Line,
	LineChart,
	type LineCurve,
	type LineVariant,
	type ProfitLossEncoding,
	ProfitLossLine,
	type SeriesLoadingStyle,
	XAxis,
	YAxis,
} from "@baby-ui/svelte";
import { PNL, PNL_CONFIG } from "../data/pnl";
import { fadeProp, VISITORS, VISITORS_CONFIG } from "../data/visitors";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const status = $derived((props.status as ChartStatus) ?? "ready");
const dashFromIndex = $derived(Number(props.dashFromIndex ?? -1));
const line = $derived({
	curve: (props.curve as LineCurve) ?? "natural",
	variant: (props.variant as LineVariant) ?? "solid",
	strokeWidth: Number(props.strokeWidth ?? 2.5),
	fadeEdges: fadeProp(props.fadeEdges),
	loadingStyle: (props.loadingStyle as SeriesLoadingStyle) ?? "pulse",
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
					encoding={props.encoding as ProfitLossEncoding}
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
