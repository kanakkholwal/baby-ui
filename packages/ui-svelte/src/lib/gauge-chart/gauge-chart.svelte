<script lang="ts">
import Counter from "../counter/counter.svelte";
import { cn } from "../lib/cn";
import GaugeNotch from "./gauge-notch.svelte";
import {
	activeCount,
	arcNotches,
	clampStagger,
	LINEAR_HEIGHT,
	linearNotches,
	NOTCH_TIMING,
	scaleFill,
} from "./geometry";
import { type GaugeChartLayout, type GaugeChartTone, gaugeChart } from "./variants";

let {
	value,
	min = 0,
	max = 100,
	notches: total = 40,
	spacing = 25,
	layout = "arc",
	tone = "primary",
	label,
	showValue = true,
	format,
	locale,
	staggerScale = 1,
	animate = true,
	class: className,
}: {
	value: number;
	min?: number;
	max?: number;
	/** How many notches make up the track. */
	notches?: number;
	/** Share of the track left as gaps between notches, 0 to 100. */
	spacing?: number;
	layout?: GaugeChartLayout;
	tone?: GaugeChartTone;
	/** Accessible name; also printed under the value. */
	label?: string;
	showValue?: boolean;
	/** Formats the printed value; defaults to the locale's grouped number. */
	format?: (value: number) => string;
	/** BCP 47 locale for the default formatter. */
	locale?: string;
	/** Scales every enter delay, clamped to 0.25 to 2.5. */
	staggerScale?: number;
	animate?: boolean;
	class?: string;
} = $props();

let root = $state<HTMLDivElement | null>(null);
let width = $state(0);
let height = $state(0);
$effect(() => {
	const node = root;
	if (!node) return;
	const measure = () => {
		width = Math.floor(node.clientWidth);
		height = Math.floor(node.clientHeight);
	};
	measure();
	const observer = new ResizeObserver(measure);
	observer.observe(node);
	return () => observer.disconnect();
});

const formatter = $derived(
	format ?? ((v: number) => new Intl.NumberFormat(locale).format(Math.round(v))),
);
const stagger = $derived(clampStagger(staggerScale));
const count = $derived(activeCount(value, min, max, total));

const linear = $derived(layout === "linear");
const plotHeight = $derived(linear ? LINEAR_HEIGHT : height);
const geometry = $derived.by(() => {
	if (width <= 0 || plotHeight <= 0) return null;
	return linear
		? { notches: linearNotches({ width, height: plotHeight, total, spacing }), size: 0 }
		: arcNotches({ width, height: plotHeight, total, spacing });
});

function activeDelay(index: number) {
	if (from === null)
		return (NOTCH_TIMING.activeBase + index * NOTCH_TIMING.activeStep) * stagger;
	const step = NOTCH_TIMING.activeStep * stagger;
	return index >= from ? (index - from) * step : (from - 1 - index) * step;
}
// The first drawn value enters with bklit's base delay; later changes ripple from the old edge.
let from = $state<number | null>(null);
let settled: number | null = null;
$effect.pre(() => {
	const next = count;
	if (!geometry) return;
	if (settled !== next) {
		from = settled;
		settled = next;
	}
});
const styles = $derived(gaugeChart({ layout, tone }));
const text = $derived(formatter(value));
</script>

{#snippet track()}
	{#if geometry}
		<svg
			aria-hidden="true"
			width={width}
			height={plotHeight}
			class={cn("block overflow-visible", linear ? "" : "absolute inset-0")}
		>
			{#each geometry.notches as notch (`bg-${notch.index}`)}
				<GaugeNotch
					{notch}
					on
					delay={notch.index * NOTCH_TIMING.background * stagger}
					{animate}
					class={styles.track()}
				/>
			{/each}
			{#each geometry.notches as notch (`active-${notch.index}`)}
				<GaugeNotch
					{notch}
					on={notch.index < count}
					delay={activeDelay(notch.index)}
					{animate}
					class={styles.active()}
					fill={tone === "scale" ? scaleFill(notch.index, total) : undefined}
				/>
			{/each}
		</svg>
	{/if}
{/snippet}

<div
	bind:this={root}
	role="meter"
	aria-valuemin={min}
	aria-valuemax={max}
	aria-valuenow={value}
	aria-valuetext={text}
	aria-label={label}
	data-slot="gauge-chart"
	data-layout={layout}
	class={cn(styles.root(), className)}
>
	{#if linear}
		{#if showValue || label}
			<div class={styles.header()}>
				{#if label}<span class={styles.label()}>{label}</span>{:else}<span></span>{/if}
				{#if showValue}
					<Counter {value} format={formatter} size="sm" triggerOnView={false} class={styles.value()} />
				{/if}
			</div>
		{/if}
		{@render track()}
	{:else}
		{@render track()}
		{#if showValue}
			<div class={styles.center()} style:padding-top="{(geometry?.size ?? 0) * 0.08}px">
				<Counter {value} format={formatter} size="md" triggerOnView={false} class={styles.value()} />
				{#if label}<span class={styles.label()}>{label}</span>{/if}
			</div>
		{/if}
	{/if}
</div>
