<script lang="ts">
import { cn } from "../lib/cn";
import {
	type ScrubFieldSize,
	type ScrubFieldTone,
	scrubField,
	snapToStep,
} from "./variants";

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
	/** Doubles as the accessible name and the draggable scrub handle. */
	label: string;
	value?: number;
	defaultValue?: number;
	onValueChange?: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
	/** Step size while holding Shift. */
	largeStep?: number;
	suffix?: string;
	size?: ScrubFieldSize;
	/** `edited` is a visual hook for callers tracking a changed-from-default state. */
	tone?: ScrubFieldTone;
	disabled?: boolean;
	class?: string;
} = $props();

// svelte-ignore state_referenced_locally -- intentional one-time seed, matching React's useState(initialValue)
let internal = $state(defaultValue);
const current = $derived(value ?? internal);
const s = $derived(scrubField({ size, tone }));

function commit(next: number) {
	let n = snapToStep(next, step);
	if (min !== undefined) n = Math.max(min, n);
	if (max !== undefined) n = Math.min(max, n);
	if (n === current) return;
	if (value === undefined) internal = n;
	onValueChange?.(n);
}

let dragStart = $state<{ x: number; v: number } | null>(null);

// Typed text stays exactly what the user typed until blur; deriving it from `current`
// on every keystroke fights the field when a keystroke clamps back to the same number.
let draft = $state<string | null>(null);
const displayValue = $derived(draft ?? String(current));
let focusSnapshot: number | null = null;

const nudge = (event: KeyboardEvent | WheelEvent, direction: number) =>
	commit(current + direction * (event.shiftKey ? largeStep : step));
</script>

<!-- bits-ui ships no NumberField/ScrubArea primitive; hand-rolled to match Base UI's React one. -->
<div
	data-slot="scrub-field"
	data-scrubbing={dragStart ? "" : undefined}
	data-disabled={disabled ? "" : undefined}
	class={cn(s.root(), classProp)}
>
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
			event.currentTarget.setPointerCapture(event.pointerId);
			dragStart = { x: event.clientX, v: current };
		}}
		onpointermove={(event) => {
			if (!dragStart) return;
			// Two pixels per step, ten times faster with Shift, like Base UI's ScrubArea.
			const perStep = event.shiftKey ? largeStep : step;
			commit(dragStart.v + ((event.clientX - dragStart.x) / 2) * perStep);
		}}
		onpointerup={() => (dragStart = null)}
		onpointercancel={() => (dragStart = null)}
		onkeydown={(event) => {
			if (disabled) return;
			if (event.key === "ArrowUp" || event.key === "ArrowRight") {
				event.preventDefault();
				nudge(event, 1);
			} else if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
				event.preventDefault();
				nudge(event, -1);
			}
		}}
		class={s.label()}
	>
		{label}
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class={s.grip()}>
			<path d="M5 4.5 1.5 8 5 11.5M11 4.5 14.5 8 11 11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</span>
	<input
		inputmode="decimal"
		{disabled}
		value={displayValue}
		onfocus={() => {
			focusSnapshot = current;
		}}
		oninput={(event) => {
			const raw = event.currentTarget.value;
			draft = raw;
			if (raw.trim() === "") return;
			const n = Number(raw.replace(/[^\d.-]/g, ""));
			if (!Number.isNaN(n)) commit(n);
		}}
		onblur={() => {
			draft = null;
		}}
		onwheel={(event) => {
			// Only a focused field takes the wheel, so scrolling past it never edits it.
			if (document.activeElement !== event.currentTarget) return;
			event.preventDefault();
			nudge(event, event.deltaY < 0 ? 1 : -1);
		}}
		onkeydown={(event) => {
			if (event.key === "ArrowUp" || event.key === "ArrowDown") {
				event.preventDefault();
				nudge(event, event.key === "ArrowUp" ? 1 : -1);
			} else if (event.key === "Escape") {
				if (focusSnapshot !== null) commit(focusSnapshot);
				draft = null;
				event.currentTarget.blur();
			} else if (event.key === "Enter") {
				event.currentTarget.blur();
			}
		}}
		aria-label={`${label} value`}
		class={s.input()}
	/>
	{#if suffix}
		<span class={s.suffix()}>{suffix}</span>
	{/if}
</div>
