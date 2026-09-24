<script lang="ts">
import { Progress as ProgressPrimitive } from "bits-ui";
import { cn } from "../lib/cn";
import {
	PROGRESS_RING,
	type ProgressSize,
	type ProgressTone,
	type ProgressVariant,
	progress,
	progressPercent,
} from "./variants";

let {
	value = 0,
	min = 0,
	max = 100,
	indeterminate = false,
	size = "md",
	tone = "default",
	variant = "linear",
	label,
	helper,
	showValue = false,
	formatValue = (_: number, percent: number) => `${Math.round(percent)}%`,
	indeterminateLabel = "Loading",
	class: classProp,
}: {
	value?: number;
	min?: number;
	max?: number;
	/** Unknown duration: the bar sweeps instead of filling. */
	indeterminate?: boolean;
	size?: ProgressSize;
	tone?: ProgressTone;
	variant?: ProgressVariant;
	/** Accessible name; also the header title when `showValue` or `helper` is set. */
	label?: string;
	helper?: string;
	/** Header value on a bar, centre value on a ring. */
	showValue?: boolean;
	formatValue?: (value: number, percent: number) => string;
	/** Shown in place of the value while indeterminate. */
	indeterminateLabel?: string;
	class?: string;
} = $props();

const id = $props.id();
const clamped = $derived(Math.min(max, Math.max(min, value)));
const percent = $derived(progressPercent(clamped, min, max));
const styles = $derived(progress({ size, tone, variant }));
const display = $derived(
	indeterminate ? indeterminateLabel : formatValue(clamped, percent),
);
const header = $derived(variant === "linear" && (showValue || !!helper));
const { radius, stroke, gap } = PROGRESS_RING;
const circumference = 2 * Math.PI * radius;
const arc = (share: number) =>
	`${(Math.max(0, share) / 100) * circumference} ${circumference}`;
</script>

<ProgressPrimitive.Root
	value={indeterminate ? null : clamped}
	{min}
	{max}
	aria-label={header ? undefined : label}
	aria-labelledby={header && label ? `${id}-label` : undefined}
	aria-valuetext={display}
	data-slot="progress"
	data-variant={variant}
	class={cn(styles.root(), variant === "circular" && "w-auto", classProp)}
>
	{#if header}
		<div class={styles.header()}>
			<div class={styles.titles()}>
				{#if label}
					<span id="{id}-label" class={styles.title()}>{label}</span>
				{/if}
				{#if helper}
					<p class={styles.helper()}>{helper}</p>
				{/if}
			</div>
			{#if showValue}
				<span class={styles.value()}>{display}</span>
			{/if}
		</div>
	{/if}
	{#if variant === "circular"}
		<div class={styles.ring()}>
			<svg
				viewBox="0 0 100 100"
				aria-hidden="true"
				class={cn(styles.ringSvg(), indeterminate && "progress-spin")}
			>
				{#if indeterminate}
					<circle cx="50" cy="50" r={radius} stroke-width={stroke} class={styles.ringTrack()} />
				{:else}
					<circle
						cx="50"
						cy="50"
						r={radius}
						stroke-width={stroke}
						stroke-linecap="round"
						stroke-dasharray={arc(100 - percent - 2 * gap)}
						class={cn(styles.ringTrack(), "progress-ring")}
						style:transform="rotate({(percent + gap) * 3.6}deg)"
						style:transform-origin="50px 50px"
					/>
				{/if}
				<circle
					cx="50"
					cy="50"
					r={radius}
					stroke-width={stroke}
					stroke-linecap="round"
					stroke-dasharray={arc(indeterminate ? 28 : percent)}
					class={styles.ringFill()}
				/>
			</svg>
			{#if showValue}
				<span class={styles.ringLabel()}>{display}</span>
			{/if}
		</div>
	{:else}
		<div class={styles.track()}>
			{#if indeterminate}
				<div aria-hidden="true" class={styles.sweep()}></div>
			{:else}
				<div class={styles.fill()} style:transform="scaleX({percent / 100})"></div>
			{/if}
		</div>
	{/if}
</ProgressPrimitive.Root>
