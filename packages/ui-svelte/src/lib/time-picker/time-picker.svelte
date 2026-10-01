<script lang="ts">
import { Time } from "@internationalized/date";
import { TimeField } from "bits-ui";
import { stepMinute } from "../date-field/core";
import { dateField } from "../date-field/variants";
import { cn } from "../lib/cn";
import {
	formatTime,
	parseTime,
	TIME_PICKER_LABELS,
	type TimePickerLabels,
	type TimeValue,
} from "./core";
import type { TimePickerSize } from "./variants";

let {
	value = $bindable(null),
	onValueChange,
	hourCycle,
	step = 1,
	locale,
	disabled = false,
	invalid = false,
	size = "md",
	labels: labelsProp,
	id,
	name,
	"aria-label": ariaLabel,
	"aria-describedby": describedBy,
	class: classProp,
}: {
	/** Bindable 24-hour "HH:mm", or `null` while empty or half typed. */
	value?: TimeValue | null;
	onValueChange?: (value: TimeValue | null) => void;
	/** Defaults to the locale's own clock. */
	hourCycle?: 12 | 24;
	/** Minutes moved per arrow press; typed minutes are not snapped. */
	step?: number;
	locale?: string;
	disabled?: boolean;
	/** Marks the field invalid from outside, e.g. a form error. */
	invalid?: boolean;
	size?: TimePickerSize;
	labels?: Partial<TimePickerLabels>;
	id?: string;
	/** Submits the time as "HH:mm". */
	name?: string;
	"aria-label"?: string;
	"aria-describedby"?: string;
	class?: string;
} = $props();

const labels = $derived({ ...TIME_PICKER_LABELS, ...labelsProp });
const s = $derived(dateField({ size }));
const time = $derived.by(() => {
	const parts = parseTime(value);
	return parts ? new Time(parts.hour, parts.minute) : undefined;
});

function set(next: Time | undefined) {
	const text = next ? formatTime({ hour: next.hour, minute: next.minute }) : null;
	if (text === value) return;
	value = text;
	onValueChange?.(text);
}

// bits-ui steps minutes by one; a larger step takes the key before it does.
function onMinuteKey(event: KeyboardEvent) {
	if (step <= 1 || !time || (event.key !== "ArrowUp" && event.key !== "ArrowDown"))
		return;
	event.preventDefault();
	set(
		time.set({ minute: stepMinute(time.minute, event.key === "ArrowUp" ? 1 : -1, step) }),
	);
}
</script>

<TimeField.Root
	bind:value={() => time, set}
	{hourCycle}
	{locale}
	{disabled}
	granularity="minute"
	validate={invalid ? () => labels.group : undefined}
>
	<div
		data-slot="time-picker"
		data-disabled={disabled || undefined}
		aria-invalid={invalid || undefined}
		class={cn(s.group(), "w-fit", classProp)}
	>
		<span class={s.icon()}>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0M12 7v5l3 3" />
			</svg>
		</span>
		<TimeField.Input
			{id}
			aria-label={ariaLabel ?? labels.group}
			aria-describedby={describedBy}
			class={s.input()}
		>
			{#snippet children({ segments })}
				{#each segments as { part, value: text }, i (i)}
					<TimeField.Segment
						{part}
						class={s.segment()}
						onkeydown={part === "minute" ? onMinuteKey : undefined}>{text}</TimeField.Segment
					>
				{/each}
			{/snippet}
		</TimeField.Input>
		{#if name}
			<input type="hidden" {name} value={value ?? ""} />
		{/if}
	</div>
</TimeField.Root>
