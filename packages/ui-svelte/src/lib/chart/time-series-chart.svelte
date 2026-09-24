<script lang="ts" module>
import { getContext, setContext } from "svelte";

/** Extra room a part needs beyond the data: x in epoch ms, y in value units. */
export interface ChartExtent {
	x?: [number, number];
	y?: [number, number];
}

const EXTENTS = Symbol("chart-extents");

/** Lets a part such as ProjectionLine widen the x and y domains; returns an unregister. */
export function useExtentRegistry(): (id: string, extent: ChartExtent) => () => void {
	return getContext(EXTENTS) ?? (() => () => {});
}
</script>

<script lang="ts">
import { type Snippet, untrack } from "svelte";
import ChartFrame from "./chart-frame.svelte";
import { useChart } from "./context";
import {
	type ChartStatus,
	type Datum,
	type Margin,
	resolveDomain,
	summarize,
	toDate,
} from "./core";
import {
	createAnimatedDomain,
	createChartPhase,
	createSeriesRegistry,
} from "./lifecycle.svelte";
import TimeSeriesPlot from "./time-series-plot.svelte";

let {
	data: allData,
	xDomain,
	xKey = "date",
	xLabel = "Date",
	margin,
	status = "ready",
	animate = true,
	activeIndex = $bindable(null),
	onActiveIndexChange,
	roleDescription,
	class: className,
	children: content,
}: {
	data: Datum[];
	/** Visible date window, e.g. from ChartBrush; y-domain and interaction follow it. */
	xDomain?: [Date, Date];
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

const chart = useChart();
const uid = $props.id();
const registry = createSeriesRegistry(() => chart.hidden);
const seriesKeys = $derived(registry.series.map((s) => s.key).join("|"));
const EXTENT_KEY = "__extent";
const windowStart = $derived(xDomain?.[0].getTime());
const windowEnd = $derived(xDomain?.[1].getTime());
const data = $derived.by(() => {
	const start = windowStart;
	const end = windowEnd;
	if (start === undefined || end === undefined) return allData;
	return allData.filter((d) => {
		const time = toDate(d[xKey]).getTime();
		return time >= start && time <= end;
	});
});
let extents = $state<Map<string, ChartExtent>>(new Map());
setContext(EXTENTS, (id: string, extent: ChartExtent) => {
	extents = new Map(untrack(() => extents)).set(id, extent);
	return () => {
		const next = new Map(untrack(() => extents));
		next.delete(id);
		extents = next;
	};
});
const target = $derived.by(() => {
	const keys = seriesKeys ? seriesKeys.split("|") : [];
	const extra = [...extents.values()].flatMap((e) =>
		e.y ? e.y.map((value) => ({ [EXTENT_KEY]: value })) : [],
	);
	if (!extra.length) return resolveDomain(data, keys);
	return resolveDomain([...data, ...extra], [...keys, EXTENT_KEY]);
});
const extentMax = $derived.by(() => {
	const ends = [...extents.values()].flatMap((e) => (e.x ? [e.x[1]] : []));
	return ends.length ? Math.max(...ends) : undefined;
});
const lifecycle = createChartPhase(
	() => status,
	() => animate,
);
// svelte-ignore state_referenced_locally
const domain = createAnimatedDomain({
	target: () => target,
	phase: () => lifecycle.phase,
	loading: status === "loading",
	animate: () => animate,
	advance: lifecycle.advance,
});
let instant = $state(false);
const interactive = $derived(lifecycle.phase === "ready" && data.length > 0);

function setActive(index: number | null, fromKeyboard: boolean) {
	instant = fromKeyboard;
	activeIndex = index;
	onActiveIndexChange?.(index);
}

function seriesLabel(key: string) {
	const label = chart.config[key]?.label;
	return typeof label === "string" ? label : key;
}
const title = (datum: Datum) => chart.format.title(toDate(datum[xKey]));
const rows = (datum: Datum) =>
	registry.series.map((s) => {
		const value = datum[s.key];
		return {
			key: s.key,
			label: seriesLabel(s.key),
			color: s.color,
			value: typeof value === "number" ? value : null,
		};
	});
const activeDatum = $derived(
	activeIndex !== null && interactive ? data[activeIndex] : undefined,
);
const announcement = $derived(
	activeDatum && instant
		? `${title(activeDatum)}: ${rows(activeDatum)
				.map((r) => `${r.label} ${r.value === null ? "" : chart.format.number(r.value)}`)
				.join(", ")}`
		: "",
);
const summary = $derived(
	chart.description ??
		summarize({
			data,
			xKey,
			series: registry.series.map((s) => ({ key: s.key, label: seriesLabel(s.key) })),
			format: chart.format,
		}),
);
const table = $derived({
	columns: [xLabel, ...registry.series.map((s) => seriesLabel(s.key))],
	rows: data.map((datum) => ({
		header: title(datum),
		cells: registry.series.map((s) => {
			const value = datum[s.key];
			return typeof value === "number" ? chart.format.number(value) : "";
		}),
	})),
});
</script>

<ChartFrame
	{roleDescription}
	{summary}
	{table}
	count={data.length}
	{activeIndex}
	onActiveChange={setActive}
	{interactive}
	{announcement}
	phase={lifecycle.phase}
	class={className}
>
	{#snippet children(frame)}
		<TimeSeriesPlot
			{frame}
			{data}
			xExtent={windowStart !== undefined && windowEnd !== undefined
				? [windowStart, windowEnd]
				: undefined}
			{extentMax}
			{xKey}
			{margin}
			domain={domain.value}
			series={registry.series}
			register={registry.register}
			phase={lifecycle.phase}
			{animate}
			advance={lifecycle.advance}
			clipId="{uid}-reveal"
			{activeIndex}
			{instant}
			{interactive}
			{setActive}
			{title}
			{rows}
		>
			{@render content?.()}
		</TimeSeriesPlot>
	{/snippet}
</ChartFrame>
