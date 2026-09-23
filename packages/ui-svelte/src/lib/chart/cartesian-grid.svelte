<svelte:options namespace="svg" />

<script lang="ts">
import { cn } from "../lib/cn";
import { usePlot } from "./context";
import { CHART_DURATION, CHART_EASE_CSS } from "./motion";
import { type ChartGridVariant, chartGrid } from "./variants";

let {
	variant = "dashed",
	horizontal = true,
	vertical = false,
	rows = 5,
	columns = 10,
	fade = true,
	class: className,
}: {
	variant?: ChartGridVariant;
	horizontal?: boolean;
	vertical?: boolean;
	/** Tick-count hint for rows; d3 may return a nearby count. */
	rows?: number;
	columns?: number;
	/** Fade row ends into the plot edges. */
	fade?: boolean;
	class?: string;
} = $props();

const plot = usePlot();
const uid = $props.id();
const maskId = `${uid}-grid-fade`;
const slide = `transform ${CHART_DURATION.update}ms ${CHART_EASE_CSS}`;
const line = $derived(cn(chartGrid({ variant }), className));
</script>

<g data-slot="chart-grid">
	{#if horizontal && fade}
		<defs>
			<linearGradient id="{maskId}-g" x1="0%" x2="100%" y1="0%" y2="0%">
				<stop offset="0%" stop-color="white" stop-opacity={0} />
				<stop offset="10%" stop-color="white" stop-opacity={1} />
				<stop offset="90%" stop-color="white" stop-opacity={1} />
				<stop offset="100%" stop-color="white" stop-opacity={0} />
			</linearGradient>
			<mask id={maskId}>
				<rect width={plot.innerWidth} height={plot.innerHeight} fill="url(#{maskId}-g)" />
			</mask>
		</defs>
	{/if}
	{#if horizontal}
		<g mask={fade ? `url(#${maskId})` : undefined}>
			{#each plot.yScale.ticks(rows) as tick (tick)}
				<line
					class={line}
					x1={0}
					x2={plot.innerWidth}
					y1={0}
					y2={0}
					style:transform="translateY({plot.yScale(tick)}px)"
					style:transition={slide}
				/>
			{/each}
		</g>
	{/if}
	{#if vertical}
		{#each plot.xScale.ticks(columns) as tick (tick.getTime())}
			<line
				class={line}
				x1={plot.xScale(tick)}
				x2={plot.xScale(tick)}
				y1={0}
				y2={plot.innerHeight}
			/>
		{/each}
	{/if}
</g>
