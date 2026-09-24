<script lang="ts">
import type { Snippet } from "svelte";
import Area from "../area-chart/area.svelte";
import AreaChart from "../area-chart/area-chart.svelte";
import Badge from "../badge/badge.svelte";
import Card from "../card/card.svelte";
import CardAction from "../card/card-action.svelte";
import CardContent from "../card/card-content.svelte";
import CardHeader from "../card/card-header.svelte";
import CardTitle from "../card/card-title.svelte";
import ChartContainer from "../chart/chart-container.svelte";
import { type ChartStatus, type Datum, toDate } from "../chart/core";
import Counter from "../counter/counter.svelte";
import { cn } from "../lib/cn";
import Line from "../line-chart/line.svelte";
import LineChart from "../line-chart/line-chart.svelte";
import {
	periodTrend,
	type StatCardChartKind,
	type StatCardSize,
	statCard,
} from "./variants";

let {
	title,
	data,
	dataKey,
	xKey = "date",
	value,
	label,
	trend,
	chart = "area",
	size = "md",
	color = "var(--chart-1)",
	locale,
	formatValue,
	formatLabel,
	status = "ready",
	activeIndex = $bindable(null),
	onActiveIndexChange,
	class: className,
	children,
}: {
	/** Card heading; also the chart's accessible name. */
	title: string;
	data: Datum[];
	dataKey: string;
	xKey?: string;
	/** Headline at rest, e.g. the period average. */
	value: number;
	/** Caption under the headline at rest, e.g. "Avg". */
	label: string;
	/** Change over the whole period, in percent. */
	trend: number;
	chart?: StatCardChartKind;
	size?: StatCardSize;
	/** Series colour; defaults to the first chart slot. */
	color?: string;
	locale?: string;
	formatValue?: (value: number) => string;
	/** Caption for a hovered row. Defaults to the row's short month. */
	formatLabel?: (date: Date) => string;
	status?: ChartStatus;
	activeIndex?: number | null;
	onActiveIndexChange?: (index: number | null) => void;
	class?: string;
	children?: Snippet;
} = $props();

const number = $derived(
	formatValue ?? new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format,
);
const month = $derived(new Intl.DateTimeFormat(locale, { month: "short" }));
const percent = $derived(
	new Intl.NumberFormat(locale, {
		style: "percent",
		maximumFractionDigits: 1,
		signDisplay: "exceptZero",
	}),
);
const datum = $derived(activeIndex !== null ? data[activeIndex] : undefined);
const shownValue = $derived.by(() => {
	const hovered = datum?.[dataKey];
	return typeof hovered === "number" ? hovered : value;
});
const shownLabel = $derived(
	datum ? (formatLabel ?? ((d: Date) => month.format(d)))(toDate(datum[xKey])) : label,
);
const shownTrend = $derived(
	(datum ? periodTrend(data, activeIndex ?? 0, dataKey) : null) ?? trend,
);
const up = $derived(shownTrend >= 0);
const styles = $derived(statCard({ size, chart }));
const config = $derived({ [dataKey]: { label: title, color } });
const margin = { top: 4, right: 0, bottom: 0, left: 0 };

function setActive(index: number | null) {
	activeIndex = index;
	onActiveIndexChange?.(index);
}
</script>

<Card data-slot="stat-card" class={cn(styles.root(), className)}>
	<CardHeader class={styles.header()}>
		<CardTitle class={styles.title()}>{title}</CardTitle>
		<CardAction>
			<Badge variant={up ? "success" : "destructive"} size="sm">
				<svg aria-hidden="true" viewBox="0 0 12 12" class="size-3" fill="none">
					<path
						d={up ? "M3 9 9 3M4.5 3H9v4.5" : "M3 3l6 6M9 4.5V9H4.5"}
						stroke="currentColor"
						stroke-width={1.5}
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				{percent.format(shownTrend / 100)}
			</Badge>
		</CardAction>
	</CardHeader>
	<CardContent class={styles.body()}>
		<div class={styles.headline()}>
			<Counter value={shownValue} format={number} size="sm" durationMs={400} triggerOnView={false} />
			<span class={styles.label()}>{shownLabel}</span>
		</div>
		<div class={styles.chart()}>
			<ChartContainer {config} {title} aspect="auto" {locale}>
				{#if chart === "line"}
					<LineChart
						{data}
						{xKey}
						{margin}
						{status}
						bind:activeIndex={() => activeIndex, setActive}
					>
						<Line {dataKey} curve="monotone" strokeWidth={2} />
						{@render children?.()}
					</LineChart>
				{:else}
					<AreaChart
						{data}
						{xKey}
						{margin}
						{status}
						bind:activeIndex={() => activeIndex, setActive}
					>
						<Area {dataKey} curve="monotone" fillOpacity={0.45} />
						{@render children?.()}
					</AreaChart>
				{/if}
			</ChartContainer>
		</div>
	</CardContent>
</Card>
