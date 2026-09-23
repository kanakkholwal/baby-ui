<script lang="ts">
import type { Component, Snippet } from "svelte";
import { useActivePoint, useChart, usePlot } from "./context";
import { type Datum, toDate } from "./core";
import { type ChartTooltipIndicator, chartTooltip } from "./variants";

let {
	indicator = "dot",
	hideLabel = false,
	hideIndicator = false,
	labelKey,
	labelFormatter,
	formatter,
	class: className,
}: {
	indicator?: ChartTooltipIndicator;
	hideLabel?: boolean;
	hideIndicator?: boolean;
	/** Read the title from this key instead of formatting the row's date. */
	labelKey?: string;
	labelFormatter?: Snippet<[{ date: Date; datum: Datum }]>;
	formatter?: Snippet<[{ value: number; key: string; datum: Datum }]>;
	class?: string;
} = $props();

const chart = useChart();
const plot = usePlot();
const pointer = useActivePoint();
const styles = $derived(chartTooltip({ indicator }));
</script>

{#if pointer.active}
	{@const active = pointer.active}
	{@const date = toDate(active.datum[plot.xKey])}
	<div class={className}>
		{#if !hideLabel}
			<div class={styles.title()}>
				{#if labelFormatter}
					{@render labelFormatter({ date, datum: active.datum })}
				{:else if labelKey}
					{String(active.datum[labelKey] ?? "")}
				{:else}
					{chart.format.title(date)}
				{/if}
			</div>
		{/if}
		<div class={styles.rows()}>
			{#each plot.series as s (s.key)}
				{@const value = active.datum[s.key]}
				{@const entry = chart.config[s.key]}
				{@const Icon = entry?.icon as Component | undefined}
				<div class={styles.row()}>
					{#if Icon}
						<Icon />
					{:else if !hideIndicator}
						<span class={styles.indicator()} style="--indicator: {s.color}"></span>
					{/if}
					<span class={styles.label()}>{(entry?.label as string | undefined) ?? s.key}</span>
					{#if typeof value === "number"}
						<span class={styles.value()}>
							{#if formatter}
								{@render formatter({ value, key: s.key, datum: active.datum })}
							{:else}
								{chart.format.number(value)}
							{/if}
						</span>
					{/if}
				</div>
			{/each}
		</div>
	</div>
{/if}
