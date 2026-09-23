<script lang="ts">
import { extent } from "d3-array";
import { scaleLinear, scaleTime } from "d3-scale";
import { type Snippet, untrack } from "svelte";
import { cn } from "../lib/cn";
import { setActivePoint, setPlot, useChart } from "./context";
import {
	type ActivePoint,
	type ChartPhase,
	type ChartStatus,
	type Datum,
	DEFAULT_MARGIN,
	type Domain,
	LOADING_DOMAIN,
	lerpDomain,
	type Margin,
	nearestIndex,
	nextPhase,
	resolveDomain,
	type SeriesConfig,
	shouldTweenDomain,
	summarize,
	toDate,
} from "./core";
import { CHART_DURATION, type Playback, tween } from "./motion";
import { chart } from "./variants";

/** Room around the reveal clip so round caps and dots at the plot edge are not cut. */
const CLIP_PAD = 8;

let {
	data,
	xKey = "date",
	xLabel = "Date",
	margin: marginProp,
	status = "ready",
	animate = true,
	activeIndex = $bindable(null),
	onActiveIndexChange,
	roleDescription,
	class: className,
	children,
}: {
	data: Datum[];
	/** Key holding each row's date. */
	xKey?: string;
	/** Header of the date column in the screen-reader table. */
	xLabel?: string;
	margin?: Partial<Margin>;
	status?: ChartStatus;
	animate?: boolean;
	activeIndex?: number | null;
	onActiveIndexChange?: (index: number | null) => void;
	roleDescription: string;
	class?: string;
	children?: Snippet;
} = $props();

const chartContext = useChart();
const uid = $props.id();
const clipId = `${uid}-reveal`;
let plotEl = $state<HTMLDivElement | null>(null);
let width = $state(0);
let height = $state(0);
$effect(() => {
	const el = plotEl;
	if (!el) return;
	const measure = () => {
		width = Math.floor(el.clientWidth);
		height = Math.floor(el.clientHeight);
	};
	measure();
	const observer = new ResizeObserver(measure);
	observer.observe(el);
	return () => observer.disconnect();
});

const margin = $derived<Margin>({ ...DEFAULT_MARGIN, ...marginProp });
const innerWidth = $derived(Math.max(0, width - margin.left - margin.right));
const innerHeight = $derived(Math.max(0, height - margin.top - margin.bottom));

let registered = $state<SeriesConfig[]>([]);
function register(next: SeriesConfig) {
	const index = registered.findIndex((s) => s.key === next.key);
	if (index === -1) registered = [...registered, next];
	else if (registered[index]?.color !== next.color)
		registered = registered.map((s, i) => (i === index ? next : s));
	return () => {
		registered = registered.filter((s) => s.key !== next.key);
	};
}
const series = $derived(registered.filter((s) => !chartContext.hidden.has(s.key)));
const seriesKeys = $derived(series.map((s) => s.key).join("|"));
const target = $derived.by(() =>
	resolveDomain(data, seriesKeys ? seriesKeys.split("|") : []),
);

// svelte-ignore state_referenced_locally
let phase = $state<ChartPhase>(
	status === "loading" ? "loading" : animate ? "revealing" : "ready",
);
function advance(event: "status-ready" | "status-loading" | "done") {
	phase = nextPhase(phase, event) ?? phase;
}
// svelte-ignore state_referenced_locally
let prevStatus = status;
$effect(() => {
	if (prevStatus === status) return;
	prevStatus = status;
	advance(status === "ready" ? "status-ready" : "status-loading");
});

// svelte-ignore state_referenced_locally
let domain = $state<Domain>(status === "loading" ? LOADING_DOMAIN : target);
let domainTween: Playback | null = null;
function moveDomain(to: Domain, onDone?: () => void) {
	domainTween?.stop();
	const from = domain;
	if (!animate || !shouldTweenDomain(from, to)) {
		domain = to;
		onDone?.();
		return;
	}
	domainTween = tween({
		duration: CHART_DURATION.update,
		onUpdate: (p) => {
			domain = lerpDomain(from, to, p);
		},
		onComplete: onDone,
	});
}
$effect(() => () => domainTween?.stop());

// Only the phase change starts a lifecycle tween; target changes are handled below.
$effect(() => {
	const current = phase;
	untrack(() => {
		if (current === "gridTweenReady") moveDomain(target, () => advance("done"));
		else if (current === "gridTweenLoading")
			moveDomain(LOADING_DOMAIN, () => advance("done"));
	});
});
$effect(() => {
	const next = target;
	untrack(() => {
		if (phase === "ready") moveDomain(next);
		else if (phase === "revealing") {
			domainTween?.stop();
			domain = next;
		}
	});
});

let clipRect = $state<SVGRectElement | null>(null);
const hasSize = $derived(innerWidth > 0);
$effect.pre(() => {
	const current = phase;
	const rect = clipRect;
	if ((current !== "revealing" && current !== "concealing") || !hasSize || !rect) return;
	const full = untrack(() => innerWidth) + CLIP_PAD * 2;
	const reveal = current === "revealing";
	const draw = (p: number) => {
		const w = reveal ? full * p : full * (1 - p);
		rect.setAttribute("width", String(w));
		rect.setAttribute("x", String(reveal ? -CLIP_PAD : -CLIP_PAD + full - w));
	};
	draw(0);
	const playback = tween({
		duration: untrack(() => animate) ? CHART_DURATION.enter : 0,
		onUpdate: draw,
		onComplete: () => advance("done"),
	});
	return () => playback.stop();
});

const xScale = $derived.by(() => {
	const [min = 0, max = min] = extent(data, (d) => toDate(d[xKey]).getTime());
	return scaleTime().domain([min, max]).range([0, innerWidth]);
});
const yScale = $derived(scaleLinear().domain(domain).range([innerHeight, 0]));
const x = $derived((d: Datum) => xScale(toDate(d[xKey])));
const labels = $derived(data.map((d) => chartContext.format.tick(toDate(d[xKey]))));

let instant = $state(false);
function setActive(index: number | null, fromKeyboard: boolean) {
	instant = fromKeyboard;
	activeIndex = index;
	onActiveIndexChange?.(index);
}
const interactive = $derived(phase === "ready" && data.length > 0);

let pending: { index: number; frame: number } | null = null;
function onpointermove(event: PointerEvent & { currentTarget: SVGSVGElement }) {
	if (!interactive) return;
	const bounds = event.currentTarget.getBoundingClientRect();
	const time = xScale.invert(event.clientX - bounds.left - margin.left).getTime();
	const index = nearestIndex(data, xKey, time);
	if (pending) {
		pending.index = index;
		return;
	}
	const frame = requestAnimationFrame(() => {
		const next = pending?.index ?? index;
		pending = null;
		if (next !== activeIndex) setActive(next, false);
	});
	pending = { index, frame };
}
function onpointerleave() {
	if (pending) cancelAnimationFrame(pending.frame);
	pending = null;
	if (activeIndex !== null) setActive(null, false);
}

function onkeydown(event: KeyboardEvent) {
	if (!interactive) return;
	const last = data.length - 1;
	const step = Math.max(1, Math.ceil(data.length / 10));
	const current = activeIndex;
	let next: number | null;
	switch (event.key) {
		case "ArrowRight":
			next = current === null ? 0 : Math.min(last, current + 1);
			break;
		case "ArrowLeft":
			next = current === null ? last : Math.max(0, current - 1);
			break;
		case "PageDown":
			next = Math.min(last, (current ?? -1) + step);
			break;
		case "PageUp":
			next = Math.max(0, (current ?? last + 1) - step);
			break;
		case "Home":
			next = 0;
			break;
		case "End":
			next = last;
			break;
		case "Escape":
			if (current === null) return;
			next = null;
			break;
		default:
			return;
	}
	event.preventDefault();
	setActive(next, true);
}

const active = $derived.by<ActivePoint | null>(() => {
	if (activeIndex === null || !interactive) return null;
	const datum = data[activeIndex];
	if (!datum) return null;
	const y: Record<string, number> = {};
	for (const s of series) {
		const value = datum[s.key];
		if (typeof value === "number") y[s.key] = yScale(value);
	}
	return { index: activeIndex, datum, x: x(datum), y };
});

function seriesLabel(key: string) {
	const label = chartContext.config[key]?.label;
	return typeof label === "string" ? label : key;
}
const announcement = $derived(
	active && instant
		? `${chartContext.format.title(toDate(active.datum[xKey]))}: ${series
				.map((s) => {
					const value = active.datum[s.key];
					return `${seriesLabel(s.key)} ${typeof value === "number" ? chartContext.format.number(value) : ""}`;
				})
				.join(", ")}`
		: "",
);
const summary = $derived(
	chartContext.description ??
		summarize({
			data,
			xKey,
			series: series.map((s) => ({ key: s.key, label: seriesLabel(s.key) })),
			format: chartContext.format,
		}),
);

setPlot({
	get data() {
		return data;
	},
	get xKey() {
		return xKey;
	},
	get width() {
		return width;
	},
	get height() {
		return height;
	},
	get innerWidth() {
		return innerWidth;
	},
	get innerHeight() {
		return innerHeight;
	},
	get margin() {
		return margin;
	},
	get xScale() {
		return xScale;
	},
	get yScale() {
		return yScale;
	},
	get x() {
		return x;
	},
	get labels() {
		return labels;
	},
	get series() {
		return series;
	},
	register,
	get phase() {
		return phase;
	},
	get animate() {
		return animate;
	},
	clipId,
	get plotEl() {
		return plotEl;
	},
});
setActivePoint({
	get active() {
		return active;
	},
	get instant() {
		return instant;
	},
});

const clipFull = $derived(innerWidth + CLIP_PAD * 2);
const clipWidth = $derived(
	phase === "ready"
		? clipFull
		: phase === "revealing" || phase === "concealing"
			? undefined
			: 0,
);
const styles = chart();
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
<div
	bind:this={plotEl}
	data-slot="chart-plot"
	data-phase={phase}
	role="group"
	aria-roledescription={roleDescription}
	aria-labelledby="{uid}-title"
	aria-describedby="{uid}-summary"
	tabindex="0"
	{onkeydown}
	onblur={() => {
		if (activeIndex !== null && instant) setActive(null, true);
	}}
	class={cn(styles.plot(), className)}
>
	<span id="{uid}-title" class={styles.srOnly()}>{chartContext.title}</span>
	{#if width > 0 && height > 0}
		<svg
			aria-hidden="true"
			{width}
			{height}
			class="absolute inset-0 block overflow-visible"
			style:cursor={interactive ? "crosshair" : undefined}
			{onpointermove}
			{onpointerleave}
		>
			<defs>
				<clipPath id={clipId}>
					<rect
						bind:this={clipRect}
						x={-CLIP_PAD}
						y={-CLIP_PAD}
						width={clipWidth}
						height={innerHeight + CLIP_PAD * 2}
					/>
				</clipPath>
			</defs>
			<g transform="translate({margin.left},{margin.top})">
				<rect width={innerWidth} height={innerHeight} fill="transparent" />
				{@render children?.()}
			</g>
		</svg>
	{/if}
	<p id="{uid}-summary" class={styles.srOnly()}>{summary}</p>
	<table class={styles.srOnly()}>
		<caption>{chartContext.title}</caption>
		<thead>
			<tr>
				<th scope="col">{xLabel}</th>
				{#each series as s (s.key)}
					<th scope="col">{seriesLabel(s.key)}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each data as datum, index (index)}
				<tr>
					<th scope="row">{chartContext.format.title(toDate(datum[xKey]))}</th>
					{#each series as s (s.key)}
						{@const value = datum[s.key]}
						<td>{typeof value === "number" ? chartContext.format.number(value) : ""}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
	<div aria-live="polite" class={styles.srOnly()}>{announcement}</div>
</div>
