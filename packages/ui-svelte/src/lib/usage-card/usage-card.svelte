<script lang="ts">
import Card from "../card/card.svelte";
import CardContent from "../card/card-content.svelte";
import CardDescription from "../card/card-description.svelte";
import CardHeader from "../card/card-header.svelte";
import CardTitle from "../card/card-title.svelte";
import ChartContainer from "../chart/chart-container.svelte";
import ChartLegendContent from "../chart/chart-legend-content.svelte";
import type { ChartConfig } from "../chart/context";
import type { Datum } from "../chart/core";
import { cn } from "../lib/cn";
import RingChart from "../ring-chart/ring-chart.svelte";
import type { RingCap } from "../ring-chart/variants";
import { type UsageCardLayout, usageCard } from "./variants";

let {
	title,
	description,
	data,
	config,
	dataKey = "value",
	maxKey = "max",
	nameKey = "name",
	layout = "side",
	cap = "round",
	centerLabel,
	locale,
	activeIndex = $bindable(null),
	onActiveIndexChange,
	class: className,
}: {
	title: string;
	description?: string;
	data: Datum[];
	/** Label and colour per ring, keyed by `nameKey`. */
	config: ChartConfig;
	/** Key holding each ring's value. */
	dataKey?: string;
	/** Key holding each ring's maximum; missing or non-positive maxima count as 100. */
	maxKey?: string;
	/** Key holding each ring's name; matches `config` keys. */
	nameKey?: string;
	layout?: UsageCardLayout;
	cap?: RingCap;
	centerLabel?: string;
	locale?: string;
	activeIndex?: number | null;
	onActiveIndexChange?: (index: number | null) => void;
	class?: string;
} = $props();

const styles = $derived(usageCard({ layout }));

function setActive(index: number | null) {
	activeIndex = index;
	onActiveIndexChange?.(index);
}
</script>

<Card data-slot="usage-card" class={cn(styles.root(), className)}>
	<CardHeader class={styles.header()}>
		<CardTitle class={styles.title()}>{title}</CardTitle>
		{#if description}
			<CardDescription class={styles.description()}>{description}</CardDescription>
		{/if}
	</CardHeader>
	<CardContent class={styles.body()}>
		<ChartContainer {config} {title} aspect="auto" {locale} class={styles.chart()}>
			<RingChart
				{data}
				{dataKey}
				{maxKey}
				{nameKey}
				{cap}
				{centerLabel}
				bind:activeIndex={() => activeIndex, setActive}
				class={styles.plot()}
			/>
			<ChartLegendContent align="start" class={styles.legend()} />
		</ChartContainer>
	</CardContent>
</Card>
