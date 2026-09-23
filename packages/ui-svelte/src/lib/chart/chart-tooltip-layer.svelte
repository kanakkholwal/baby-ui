<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";
import ChartTooltipContent from "./chart-tooltip-content.svelte";
import { portal, setActivePoint, useActivePoint, useChart, usePlot } from "./context";
import { type ActivePoint, toDate } from "./core";
import { follow } from "./follow.svelte";
import { CHART_SPRING, Spring } from "./motion";
import { chartTooltip } from "./variants";

let {
	target,
	content,
	datePill,
	class: className,
}: {
	target: HTMLElement;
	content?: Snippet;
	datePill: boolean;
	class?: string;
} = $props();

const TICKER_ROW = 24;
const COMPACT_TICKER = 60;
const BOX_OFFSET = 16;

const chart = useChart();
const plot = usePlot();
const pointer = useActivePoint();
const styles = chartTooltip();

let last: ActivePoint | null = null;
const shownPoint = $derived.by(() => {
	if (pointer.active) last = pointer.active;
	return pointer.active ?? last;
});
setActivePoint({
	get active() {
		return shownPoint;
	},
	get instant() {
		return pointer.instant;
	},
});

let outer = $state<HTMLDivElement | null>(null);
let panel = $state<HTMLDivElement | null>(null);
let flipped = $state(false);
let size = { w: 180, h: 80 };
const left = new Spring(0, CHART_SPRING.tooltipBox, (v) => {
	if (outer) outer.style.left = `${v}px`;
});
const top = new Spring(0, CHART_SPRING.tooltipBox, (v) => {
	if (outer) outer.style.top = `${v}px`;
});
const entrance = new Spring(0, CHART_SPRING.panel, (p) => {
	if (!panel) return;
	const offset = (1 - p) * (panel.dataset.flipped === "true" ? 20 : -20);
	panel.style.transform = `translateX(${offset}px) scale(${0.85 + 0.15 * p})`;
	panel.style.opacity = String(Math.min(1, Math.max(0, p)));
});

const anchor = $derived(pointer.active ? pointer.active.x + plot.margin.left : null);
let boxShown = false;
$effect(() => {
	const x = anchor;
	const instant = pointer.instant;
	if (x === null) {
		boxShown = false;
		return;
	}
	if (outer) size = { w: outer.offsetWidth || 180, h: outer.offsetHeight || 80 };
	const flip = x + size.w + BOX_OFFSET > plot.width;
	const tx = flip ? x - BOX_OFFSET - size.w : x + BOX_OFFSET;
	const ty = Math.max(
		BOX_OFFSET,
		Math.min(plot.margin.top - size.h / 2, plot.height - size.h - BOX_OFFSET),
	);
	if (!boxShown || instant) {
		left.jump(tx);
		top.jump(ty);
	} else {
		left.set(tx);
		top.set(ty);
	}
	if (!boxShown || flip !== flipped) {
		if (panel) panel.dataset.flipped = String(flip);
		entrance.jump(0);
		entrance.set(1);
		flipped = flip;
	}
	boxShown = true;
});
$effect(() => () => {
	left.stop();
	top.stop();
	entrance.stop();
});

let pill = $state<HTMLDivElement | null>(null);
let dayStack = $state<HTMLDivElement | null>(null);
let monthStack = $state<HTMLDivElement | null>(null);
const pillLeft = new Spring(0, CHART_SPRING.tooltip, (v) => {
	if (pill) pill.style.left = `${v}px`;
});
follow(
	pillLeft,
	() => (pill ? anchor : null),
	() => pointer.instant,
);
const day = new Spring(0, CHART_SPRING.ticker, (v) => {
	if (dayStack) dayStack.style.transform = `translateY(${v}px)`;
});
const month = new Spring(0, CHART_SPRING.ticker, (v) => {
	if (monthStack) monthStack.style.transform = `translateY(${v}px)`;
});
const compact = $derived(plot.data.length > COMPACT_TICKER);
const ticker = $derived.by(() => {
	const dates = plot.data.map((d) => toDate(d[plot.xKey]));
	const months: { key: string; label: string }[] = [];
	const monthOf: number[] = [];
	dates.forEach((date, i) => {
		const label = chart.format.month(date);
		if (months.at(-1)?.label !== label) months.push({ key: `${label}-${i}`, label });
		monthOf.push(months.length - 1);
	});
	return { days: dates.map((date) => chart.format.day(date)), months, monthOf };
});
let tickerShown = false;
$effect(() => {
	const active = pointer.active;
	const instant = pointer.instant;
	if (!active || compact || !dayStack || !monthStack) {
		tickerShown = false;
		return;
	}
	const dayTarget = -active.index * TICKER_ROW;
	const monthTarget = -(ticker.monthOf[active.index] ?? 0) * TICKER_ROW;
	if (!tickerShown) {
		day.jump(0);
		month.jump(0);
	}
	if (instant) {
		day.jump(dayTarget);
		month.jump(monthTarget);
	} else {
		day.set(dayTarget);
		month.set(monthTarget);
	}
	tickerShown = true;
});
$effect(() => () => {
	day.stop();
	month.stop();
});
</script>

<div {@attach portal(target)} class="contents">
	<div
		bind:this={outer}
		data-slot="chart-tooltip"
		data-open={pointer.active ? "" : undefined}
		aria-hidden="true"
		class="pointer-events-none absolute z-30 opacity-0 transition-opacity duration-[var(--duration-exit)] ease-[var(--ease-out)] data-open:opacity-100 data-open:duration-100"
	>
		<div
			bind:this={panel}
			class={cn(styles.panel(), className)}
			style:transform-origin={flipped ? "right top" : "left top"}
		>
			{#if content}
				{@render content()}
			{:else}
				<ChartTooltipContent />
			{/if}
		</div>
	</div>
	{#if datePill && pointer.active}
		{@const active = pointer.active}
		<div
			bind:this={pill}
			data-slot="chart-date-pill"
			aria-hidden="true"
			class="-translate-x-1/2 absolute bottom-1 z-20"
		>
			<div class={styles.pill()}>
				{#if compact}
					<span class="whitespace-nowrap">{plot.labels[active.index]}</span>
				{:else}
					<div class="flex h-6 items-start gap-1 overflow-hidden">
						<div bind:this={monthStack} class="flex flex-col">
							{#each ticker.months as m (m.key)}
								<span class="flex h-6 items-center whitespace-nowrap">{m.label}</span>
							{/each}
						</div>
						<div bind:this={dayStack} class="flex flex-col">
							{#each ticker.days as d, i (i)}
								<span class="flex h-6 items-center justify-center tabular-nums">{d}</span>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
