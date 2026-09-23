<script lang="ts">
import type { Component } from "svelte";
import { cn } from "../lib/cn";
import Toggle from "../toggle/toggle.svelte";
import { useChart } from "./context";
import { seriesColor } from "./core";
import { type ChartLegendAlign, chartLegend } from "./variants";

let {
	align = "center",
	hideIcon = false,
	class: className,
}: { align?: ChartLegendAlign; hideIcon?: boolean; class?: string } = $props();

const chart = useChart();
</script>

<div data-slot="chart-legend" class={cn(chartLegend({ align }).root(), className)}>
	{#each Object.entries(chart.config) as [key, entry] (key)}
		{@const styles = chartLegend({ hidden: chart.hidden.has(key) })}
		{@const Icon = entry.icon as Component | undefined}
		<span
			role="presentation"
			class={styles.item()}
			onpointerenter={() => (chart.highlighted = key)}
			onpointerleave={() => (chart.highlighted = null)}
			onfocusin={() => (chart.highlighted = key)}
			onfocusout={() => (chart.highlighted = null)}
		>
			<Toggle
				size="sm"
				bind:pressed={() => !chart.hidden.has(key), () => chart.toggleSeries(key)}
			>
				{#if Icon && !hideIcon}
					<Icon />
				{:else}
					<span aria-hidden="true" class={styles.swatch()} style="--swatch: {seriesColor(key)}"></span>
				{/if}
				{(entry.label as string | undefined) ?? key}
			</Toggle>
		</span>
	{/each}
</div>
