<script lang="ts">
import { cn } from "../lib/cn";
import { type NumberInputSize, numberInput } from "./variants";

let {
	value = $bindable(null),
	onValueChange,
	min,
	max,
	step = 1,
	largeStep = 10,
	formatOptions,
	locale,
	label,
	size = "md",
	disabled = false,
	invalid = false,
	name,
	placeholder,
	id: idProp,
	"aria-label": ariaLabel,
	class: classProp,
	decrementLabel = "Decrease",
	incrementLabel = "Increase",
}: {
	/** Bindable; `null` is an empty field. */
	value?: number | null;
	onValueChange?: (value: number | null) => void;
	min?: number;
	max?: number;
	step?: number;
	/** PageUp/PageDown and Shift+Arrow step. */
	largeStep?: number;
	/** Display format, e.g. `{ style: "currency", currency: "USD" }`. */
	formatOptions?: Intl.NumberFormatOptions;
	locale?: string;
	/** Visible label; dragging it sideways scrubs the value. */
	label?: string;
	size?: NumberInputSize;
	disabled?: boolean;
	invalid?: boolean;
	name?: string;
	placeholder?: string;
	id?: string;
	"aria-label"?: string;
	class?: string;
	decrementLabel?: string;
	incrementLabel?: string;
} = $props();

const s = $derived(numberInput({ size }));
const fallbackId = $props.id();
const id = $derived(idProp ?? fallbackId);
const formatter = $derived(new Intl.NumberFormat(locale, formatOptions));
const percent = $derived(formatOptions?.style === "percent");
// Percent values are fractions, so a percent field steps by hundredths.
const unit = $derived(percent ? 0.01 : 1);
const decimal = $derived(
	new Intl.NumberFormat(locale).formatToParts(1.1).find((p) => p.type === "decimal")
		?.value ?? ".",
);

let editing = $state(false);
let draft = $state("");
const shown = $derived(editing ? draft : value === null ? "" : formatter.format(value));

function clamp(next: number): number {
	const decimals = Math.max(0, -Math.floor(Math.log10(step * unit)) + 2);
	const rounded = Number(next.toFixed(decimals));
	return Math.min(
		max ?? Number.POSITIVE_INFINITY,
		Math.max(min ?? Number.NEGATIVE_INFINITY, rounded),
	);
}

function set(next: number | null) {
	const clean = next === null || Number.isNaN(next) ? null : clamp(next);
	if (clean === value) return;
	value = clean;
	onValueChange?.(clean);
}

function parse(text: string): number | null {
	const cleaned = text
		.split(decimal)
		.map((part) => part.replace(/[^\d-]/g, ""))
		.join(".");
	if (!cleaned || cleaned === "-") return null;
	const parsed = Number.parseFloat(cleaned);
	return Number.isNaN(parsed) ? value : percent ? parsed / 100 : parsed;
}

function stepBy(amount: number) {
	set((value ?? min ?? 0) + amount * unit);
}

function commit() {
	if (editing) set(parse(draft));
	editing = false;
}

// Hold to repeat: one step on press, then a run after a short pause, like a native spinner.
let holdTimer: ReturnType<typeof setTimeout> | undefined;
let repeatTimer: ReturnType<typeof setInterval> | undefined;
function stopHold() {
	clearTimeout(holdTimer);
	clearInterval(repeatTimer);
}
function startHold(amount: number) {
	commit();
	stepBy(amount);
	stopHold();
	holdTimer = setTimeout(() => {
		repeatTimer = setInterval(() => stepBy(amount), 60);
	}, 400);
}
$effect(() => stopHold);

// Drag the label sideways to scrub, one step per 4px, as Base UI's ScrubArea does.
let scrubX: number | null = null;
function onScrubDown(event: PointerEvent) {
	if (disabled || event.button !== 0) return;
	scrubX = event.clientX;
	(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
}
function onScrubMove(event: PointerEvent) {
	if (scrubX === null) return;
	const steps = Math.trunc((event.clientX - scrubX) / 4);
	if (!steps) return;
	scrubX += steps * 4;
	stepBy(steps * step);
}
</script>

<div data-slot="number-input" class={cn(s.root(), classProp)}>
	{#if label}
		<!-- A pointer shortcut; the input takes the keyboard. -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<span
			class={s.label()}
			data-disabled={disabled || undefined}
			onpointerdown={onScrubDown}
			onpointermove={onScrubMove}
			onpointerup={() => (scrubX = null)}
			onpointercancel={() => (scrubX = null)}
		>
			<label for={id}>{label}</label>
		</span>
	{/if}
	<div class={s.group()}>
		<button
			type="button"
			tabindex={-1}
			aria-label={decrementLabel}
			aria-controls={id}
			disabled={disabled || (min !== undefined && value !== null && value <= min)}
			class={s.button()}
			onpointerdown={(e) => {
				if (e.button === 0) startHold(-step);
			}}
			onpointerup={stopHold}
			onpointerleave={stopHold}
			onpointercancel={stopHold}
			onclick={(e) => {
				if (e.detail === 0) stepBy(-step);
			}}
		>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
				<path d="M5 12h14" />
			</svg>
		</button>
		<input
			{id}
			type="text"
			inputmode="decimal"
			autocomplete="off"
			role="spinbutton"
			aria-valuenow={value ?? undefined}
			aria-valuemin={min}
			aria-valuemax={max}
			aria-valuetext={value === null ? undefined : formatter.format(value)}
			aria-label={label ? undefined : ariaLabel}
			aria-invalid={invalid || undefined}
			{placeholder}
			{disabled}
			value={shown}
			class={s.input()}
			onfocus={() => {
				draft = value === null ? "" : formatter.format(value);
				editing = true;
			}}
			oninput={(e) => (draft = e.currentTarget.value)}
			onblur={commit}
			onkeydown={(e) => {
				const big = e.shiftKey ? largeStep : step;
				const moves: Record<string, () => void> = {
					ArrowUp: () => stepBy(big),
					ArrowDown: () => stepBy(-big),
					PageUp: () => stepBy(largeStep),
					PageDown: () => stepBy(-largeStep),
					Home: () => min !== undefined && set(min),
					End: () => max !== undefined && set(max),
					Enter: () => commit(),
				};
				const move = moves[e.key];
				if (!move) return;
				e.preventDefault();
				if (e.key !== "Enter") commit();
				move();
				if (e.key !== "Enter") {
					draft = value === null ? "" : formatter.format(value);
					editing = true;
				}
			}}
		/>
		<button
			type="button"
			tabindex={-1}
			aria-label={incrementLabel}
			aria-controls={id}
			disabled={disabled || (max !== undefined && value !== null && value >= max)}
			class={s.button()}
			onpointerdown={(e) => {
				if (e.button === 0) startHold(step);
			}}
			onpointerup={stopHold}
			onpointerleave={stopHold}
			onpointercancel={stopHold}
			onclick={(e) => {
				if (e.detail === 0) stepBy(step);
			}}
		>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
				<path d="M12 5v14M5 12h14" />
			</svg>
		</button>
	</div>
	{#if name}<input type="hidden" {name} value={value ?? ""} />{/if}
</div>
