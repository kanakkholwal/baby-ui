<script lang="ts">
import { CalendarDate, type DateValue } from "@internationalized/date";
import type { DateRange } from "bits-ui";
import Button from "../button/button.svelte";
import { cn } from "../lib/cn";
import Popover from "../popover/popover.svelte";
import PopoverContent from "../popover/popover-content.svelte";
import PopoverTrigger from "../popover/popover-trigger.svelte";
import RangeCalendar from "../range-calendar/range-calendar.svelte";
import {
	DATE_RANGE_PICKER_LABELS,
	type DateRangeParts,
	type DateRangePickerLabels,
	type DateRangePreset,
	DEFAULT_RANGE_PRESETS,
	formatDateRange,
	type RangeDateParts,
	sameRange,
	todayParts,
} from "./core";
import { type DateRangePickerSize, dateRangePicker } from "./variants";

let {
	value = $bindable(),
	onValueChange,
	locale,
	presets = DEFAULT_RANGE_PRESETS,
	confirm = false,
	min,
	max,
	isDateDisabled,
	disabled = false,
	open = $bindable(false),
	onOpenChange,
	size = "md",
	labels: labelsProp,
	id,
	"aria-label": ariaLabel,
	class: classProp,
}: {
	/** Bindable; `end` is missing while the second day is being picked. */
	value?: DateRange;
	onValueChange?: (value: DateRange | undefined) => void;
	locale?: string;
	presets?: DateRangePreset[];
	/** Hold the pick in a draft until Apply, instead of committing each click. */
	confirm?: boolean;
	min?: DateValue;
	max?: DateValue;
	isDateDisabled?: (date: DateValue) => boolean;
	disabled?: boolean;
	/** Bindable. */
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	size?: DateRangePickerSize;
	labels?: Partial<DateRangePickerLabels>;
	id?: string;
	"aria-label"?: string;
	class?: string;
} = $props();

const labels = $derived({ ...DATE_RANGE_PICKER_LABELS, ...labelsProp });
const s = $derived(dateRangePicker({ size }));

const toParts = (d: DateValue): RangeDateParts => ({
	year: d.year,
	month: d.month,
	day: d.day,
});
const toDate = (p: RangeDateParts) => new CalendarDate(p.year, p.month, p.day);
const rangeParts = (r: DateRange | undefined): DateRangeParts | null =>
	r?.start && r.end ? { from: toParts(r.start), to: toParts(r.end) } : null;

let draft = $state<DateRange | undefined>();
let month = $state<DateValue | undefined>();
let wide = $state(false);

$effect(() => {
	const query = matchMedia("(min-width: 640px)");
	const sync = () => (wide = query.matches);
	sync();
	query.addEventListener("change", sync);
	return () => query.removeEventListener("change", sync);
});

const shown = $derived(confirm ? draft : value);
const committed = $derived(rangeParts(value));
const label = $derived(
	committed ? formatDateRange(committed, locale) : labels.placeholder,
);
const today = todayParts();

function setOpen(next: boolean) {
	if (next) {
		draft = value;
		month = value?.start ?? min;
	}
	open = next;
	onOpenChange?.(next);
}

function commit(next: DateRange | undefined) {
	value = next;
	onValueChange?.(next);
}

function pick(next: DateRange | undefined) {
	if (confirm) draft = next;
	else commit(next);
}
</script>

<Popover bind:open={() => open, setOpen}>
	<PopoverTrigger
		{id}
		{disabled}
		aria-label={ariaLabel ? `${ariaLabel}: ${label}` : undefined}
		data-placeholder={committed ? undefined : ""}
		class={cn(s.trigger(), classProp)}
	>
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM16 3v4M8 3v4M4 11h16" />
		</svg>
		<span class={s.value()}>{label}</span>
	</PopoverTrigger>
	<PopoverContent align="start" class={s.content()}>
		{#if presets.length}
			<fieldset aria-label={labels.presets} class={s.rail()}>
				{#each presets as preset (preset.label)}
					{@const range = preset.range(today)}
					<button
						type="button"
						aria-pressed={sameRange(rangeParts(shown), range)}
						class={s.preset()}
						onclick={() => {
							pick({ start: toDate(range.from), end: toDate(range.to) });
							// Show where the range starts, so a preset never lands off screen.
							month = toDate(range.from);
						}}
					>
						{preset.label}
					</button>
				{/each}
			</fieldset>
		{/if}
		<div class={s.main()}>
			<RangeCalendar
				value={shown}
				onValueChange={(next: DateRange) => pick(next)}
				bind:placeholder={month}
				numberOfMonths={wide ? 2 : 1}
				minValue={min}
				maxValue={max}
				{isDateDisabled}
				{locale}
			/>
			{#if confirm}
				<div class={s.footer()}>
					<Button variant="ghost" size="sm" onclick={() => setOpen(false)}>{labels.cancel}</Button>
					<Button
						size="sm"
						onclick={() => {
							commit(draft);
							setOpen(false);
						}}>{labels.apply}</Button
					>
				</div>
			{/if}
		</div>
	</PopoverContent>
</Popover>
