<script lang="ts">
import { cn } from "../lib/cn";
import {
	displayHour,
	formatTime,
	localeHourCycle,
	parseTime,
	periodLabel,
	stepHour,
	stepMinute,
	TIME_PICKER_LABELS,
	type TimeParts,
	type TimePickerLabels,
	type TimeValue,
	togglePeriod,
	typedHour,
} from "./core";
import { type TimePickerSize, timePicker } from "./variants";

let {
	value = $bindable(null),
	onValueChange,
	hourCycle: hourCycleProp,
	step = 1,
	locale,
	disabled = false,
	size = "md",
	labels: labelsProp,
	id,
	"aria-label": ariaLabel,
	class: classProp,
}: {
	/** Bindable 24-hour "HH:mm", or `null` when empty. */
	value?: TimeValue | null;
	onValueChange?: (value: TimeValue | null) => void;
	/** Defaults to the locale's own clock. */
	hourCycle?: 12 | 24;
	/** Minutes moved per arrow press; typed minutes are not snapped. */
	step?: number;
	locale?: string;
	disabled?: boolean;
	size?: TimePickerSize;
	labels?: Partial<TimePickerLabels>;
	id?: string;
	"aria-label"?: string;
	class?: string;
} = $props();

type Segment = "hour" | "minute" | "period";

const labels = $derived({ ...TIME_PICKER_LABELS, ...labelsProp });
const hourCycle = $derived(hourCycleProp ?? localeHourCycle(locale));
const s = $derived(timePicker({ size }));
const parts = $derived(parseTime(value));
const segments = $derived<Segment[]>(
	hourCycle === 12 ? ["hour", "minute", "period"] : ["hour", "minute"],
);

const refs: Record<Segment, HTMLSpanElement | null> = $state({
	hour: null,
	minute: null,
	period: null,
});
// The first typed digit of a segment waits here for the second.
let pending = $state<{ segment: Segment; digit: number } | null>(null);

const focus = (segment: Segment | undefined) => segment && refs[segment]?.focus();
const neighbour = (segment: Segment, delta: number) =>
	segments[segments.indexOf(segment) + delta];

function base(): TimeParts {
	if (parts) return parts;
	const now = new Date();
	return { hour: now.getHours(), minute: now.getMinutes() };
}

function set(next: TimeValue | null) {
	value = next;
	onValueChange?.(next);
}
const emit = (next: TimeParts) => set(formatTime(next));

function onkeydown(segment: Segment, event: KeyboardEvent) {
	if (disabled) return;
	const key = event.key;
	if (key === "ArrowUp" || key === "ArrowDown") {
		event.preventDefault();
		pending = null;
		const delta = key === "ArrowUp" ? 1 : -1;
		emit(
			segment === "hour"
				? stepHour(base(), delta)
				: segment === "minute"
					? stepMinute(base(), delta, step)
					: togglePeriod(base()),
		);
	} else if (key === "ArrowLeft" || key === "ArrowRight") {
		event.preventDefault();
		pending = null;
		focus(neighbour(segment, key === "ArrowLeft" ? -1 : 1));
	} else if (key === "Backspace" || key === "Delete") {
		event.preventDefault();
		pending = null;
		set(null);
	} else if (segment === "period" && /^[ap]$/i.test(key)) {
		event.preventDefault();
		const current = base();
		if ((key.toLowerCase() === "p") !== current.hour >= 12) emit(togglePeriod(current));
	} else if (/^\d$/.test(key) && segment !== "period") {
		event.preventDefault();
		typeDigit(segment, Number(key));
	}
}

function typeDigit(segment: "hour" | "minute", digit: number) {
	const current = base();
	const first = pending?.segment === segment ? pending.digit : null;
	const typed = first === null ? digit : first * 10 + digit;
	const limit = segment === "hour" ? (hourCycle === 12 ? 1 : 2) : 5;
	emit(
		segment === "hour"
			? typedHour(current, typed, hourCycle)
			: { ...current, minute: Math.min(typed, 59) },
	);
	// A second digit, or a first digit that can't start a two-digit value, completes the segment.
	if (first !== null || digit > limit) {
		pending = null;
		focus(neighbour(segment, 1));
	} else {
		pending = { segment, digit };
	}
}

function text(segment: Segment): string {
	if (!parts) return labels.empty;
	if (segment === "hour")
		return String(displayHour(parts.hour, hourCycle)).padStart(2, "0");
	if (segment === "minute") return String(parts.minute).padStart(2, "0");
	return periodLabel(parts.hour, locale);
}

function range(segment: Segment) {
	const max =
		segment === "hour" ? (hourCycle === 12 ? 12 : 23) : segment === "minute" ? 59 : 1;
	const min = segment === "hour" && hourCycle === 12 ? 1 : 0;
	const now = !parts
		? undefined
		: segment === "hour"
			? displayHour(parts.hour, hourCycle)
			: segment === "minute"
				? parts.minute
				: parts.hour >= 12
					? 1
					: 0;
	return { min, max, now };
}
</script>

{#snippet spin(segment: Segment)}
	{@const r = range(segment)}
	<span
		bind:this={refs[segment]}
		role="spinbutton"
		tabindex={disabled ? -1 : 0}
		aria-label={labels[segment]}
		aria-valuemin={r.min}
		aria-valuemax={r.max}
		aria-valuenow={r.now}
		aria-valuetext={parts ? text(segment) : labels.empty}
		aria-disabled={disabled || undefined}
		data-empty={parts ? undefined : ""}
		onkeydown={(e) => onkeydown(segment, e)}
		onblur={() => (pending = null)}
		class={cn(s.segment(), segment === "period" && s.period())}>{text(segment)}</span
	>
{/snippet}

<fieldset
	{id}
	aria-label={ariaLabel ?? labels.group}
	aria-disabled={disabled || undefined}
	data-slot="time-picker"
	class={cn(s.root(), classProp)}
>
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0M12 7v5l3 3" />
	</svg>
	{@render spin("hour")}
	<span aria-hidden="true" class={s.separator()}>:</span>
	{@render spin("minute")}
	{#if hourCycle === 12}
		{@render spin("period")}
	{/if}
</fieldset>
