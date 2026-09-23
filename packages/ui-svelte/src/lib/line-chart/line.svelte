<svelte:options namespace="svg" />

<script lang="ts">
import { untrack } from "svelte";
import { useActivePoint, useChart, usePlot } from "../chart/context";
import {
	type FadeEdges,
	fadeStops,
	interpolatePoints,
	linePath,
	type PathPoint,
	seriesColor,
	seriesPoints,
	seriesVisibleInPhase,
	toDate,
} from "../chart/core";
import { CHART_DURATION, tween } from "../chart/motion";
import { cn } from "../lib/cn";
import { LINE_CURVES, type LineCurve, type LineVariant, line } from "./variants";

let {
	dataKey,
	stroke,
	strokeWidth = 2.5,
	curve = "natural",
	variant = "solid",
	fadeEdges = true,
	class: className,
}: {
	dataKey: string;
	/** Defaults to the series colour from the chart config, `var(--color-<dataKey>)`. */
	stroke?: string;
	strokeWidth?: number;
	curve?: LineCurve;
	variant?: LineVariant;
	/** Fade the stroke into the plot edges. */
	fadeEdges?: FadeEdges;
	class?: string;
} = $props();

const plot = usePlot();
const chart = useChart();
const pointer = useActivePoint();
const uid = $props.id();
const gradientId = `${uid}-line`;
const color = $derived(stroke ?? seriesColor(dataKey));

$effect(() => {
	const next = { key: dataKey, color };
	return untrack(() => plot.register(next));
});

const target = $derived(
	seriesPoints(plot.data, dataKey, plot.x, (v) => plot.yScale(v), plot.xKey),
);

// Data, width and x-domain changes morph; y-domain moves are already tweened by the plot.
const signature = $derived(
	`${plot.innerWidth}|${plot.xScale.domain().map(Number).join(",")}|${plot.data
		.map((d) => `${toDate(d[plot.xKey]).getTime()}:${String(d[dataKey])}`)
		.join(",")}`,
);
let progress = $state(1);
let from: PathPoint[] = [];
let shown: PathPoint[] = [];
// svelte-ignore state_referenced_locally
let prevSignature = signature;
$effect.pre(() => {
	const next = signature;
	return untrack(() => {
		if (prevSignature === next) return;
		prevSignature = next;
		if (plot.phase !== "ready" || !plot.animate) {
			progress = 1;
			return;
		}
		from = shown;
		progress = 0;
		const playback = tween({
			duration: CHART_DURATION.update,
			onUpdate: (p) => {
				progress = p;
			},
		});
		return () => playback.stop();
	});
});

const points = $derived(
	progress >= 1 ? target : interpolatePoints(from, target, progress),
);
$effect.pre(() => {
	shown = points;
});

const isHidden = $derived(chart.hidden.has(dataKey));
const dimmed = $derived(
	pointer.active !== null ||
		(chart.highlighted !== null && chart.highlighted !== dataKey),
);
const drawn = $derived(seriesVisibleInPhase(plot.phase));
const fade = $derived(fadeEdges !== false);
</script>

<g data-slot="chart-line" data-series={dataKey} clip-path="url(#{plot.clipId})">
	{#if fade}
		<defs>
			<linearGradient
				id={gradientId}
				gradientUnits="userSpaceOnUse"
				x1={0}
				x2={plot.innerWidth}
				y1={0}
				y2={0}
			>
				{#each fadeStops(fadeEdges) as stop (stop.offset)}
					<stop offset={stop.offset} stop-color={color} stop-opacity={stop.opacity} />
				{/each}
			</linearGradient>
		</defs>
	{/if}
	<path
		d={linePath(points, LINE_CURVES[curve])}
		class={cn(line({ curve, variant }), className)}
		stroke={drawn ? (fade ? `url(#${gradientId})` : color) : "transparent"}
		stroke-width={strokeWidth}
		style:opacity={isHidden ? 0 : dimmed ? 0.3 : 1}
	/>
</g>
