<script lang="ts">
import { cn } from "../lib/cn";
import { type ScrubFieldSize, type ScrubFieldTone, scrubField } from "./variants";

let {
	label,
	value,
	defaultValue = 0,
	onValueChange,
	min,
	max,
	step = 1,
	largeStep = 10,
	suffix,
	size = "md",
	tone = "default",
	disabled = false,
	class: classProp,
}: {
	label: string;
	value?: number;
	defaultValue?: number;
	onValueChange?: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
	largeStep?: number;
	suffix?: string;
	size?: ScrubFieldSize;
	tone?: ScrubFieldTone;
	disabled?: boolean;
	class?: string;
} = $props();

// svelte-ignore state_referenced_locally -- intentional one-time seed, matching React's useState(initialValue)
let internal = $state(defaultValue);
const current = $derived(value ?? internal);
const classes = $derived(scrubField({ size, tone }));

function clamp(v: number) {
	let n = Math.round(v);
	if (min !== undefined) n = Math.max(min, n);
	if (max !== undefined) n = Math.min(max, n);
	return n;
}

function commit(next: number) {
	const clamped = clamp(next);
	if (value === undefined) internal = clamped;
	onValueChange?.(clamped);
}

let dragStart: { x: number; v: number } | null = null;

// Typed text stays exactly what the user typed until blur; deriving it from `current`
// on every keystroke fights the field when a keystroke clamps back to the same number.
let draft = $state<string | null>(null);
const displayValue = $derived(draft ?? String(current));
let focusSnapshot: number | null = null;
</script>

<!-- bits-ui ships no NumberField/ScrubArea primitive; hand-rolled to match Base UI's React one. -->
<div data-slot="scrub-field" class={cn(classes.root(), classProp)}>
	<span
		role="slider"
		aria-label={label}
		aria-valuenow={current}
		aria-valuemin={min}
		aria-valuemax={max}
		aria-disabled={disabled}
		tabindex={disabled ? -1 : 0}
		onpointerdown={(event) => {
			if (disabled) return;
			(event.target as HTMLElement).setPointerCapture(event.pointerId);
			dragStart = { x: event.clientX, v: current };
		}}
		onpointermove={(event) => {
			if (!dragStart) return;
			commit(dragStart.v + ((event.clientX - dragStart.x) / 2) * step);
		}}
		onpointerup={() => {
			dragStart = null;
		}}
		onkeydown={(event) => {
			if (disabled) return;
			const mult = event.shiftKey ? largeStep / step : 1;
			if (event.key === "ArrowUp" || event.key === "ArrowRight") {
				event.preventDefault();
				commit(current + step * mult);
			} else if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
				event.preventDefault();
				commit(current - step * mult);
			}
		}}
		class={classes.label()}
	>
		{label}
	</span>
	<input
		inputmode="numeric"
		{disabled}
		value={displayValue}
		onfocus={() => {
			focusSnapshot = current;
		}}
		oninput={(event) => {
			const raw = event.currentTarget.value;
			draft = raw;
			if (raw.trim() === "") return;
			const n = Number(raw.replace(/[^\d-]/g, ""));
			if (!Number.isNaN(n)) commit(n);
		}}
		onblur={() => {
			draft = null;
		}}
		onkeydown={(event) => {
			if (event.key === "Escape") {
				if (focusSnapshot !== null) commit(focusSnapshot);
				draft = null;
				event.currentTarget.blur();
			} else if (event.key === "Enter") {
				event.currentTarget.blur();
			}
		}}
		aria-label={`${label} value`}
		class={classes.input()}
	/>
	{#if suffix}
		<span class={classes.suffix()}>{suffix}</span>
	{/if}
</div>
