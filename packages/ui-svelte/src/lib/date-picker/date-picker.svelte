<script lang="ts">
import { CalendarDate, type DateValue } from "@internationalized/date";
import { untrack } from "svelte";
import { button } from "../button/variants";
import Calendar from "../calendar/calendar.svelte";
import type { CalendarCaptionLayout } from "../calendar/variants";
import FieldError from "../field/field-error.svelte";
import InputGroup from "../input-group/input-group.svelte";
import InputGroupAddon from "../input-group/input-group-addon.svelte";
import InputGroupInput from "../input-group/input-group-input.svelte";
import { inputGroup } from "../input-group/variants";
import { cn } from "../lib/cn";
import Popover from "../popover/popover.svelte";
import PopoverContent from "../popover/popover-content.svelte";
import PopoverTrigger from "../popover/popover-trigger.svelte";
import {
	DATE_PICKER_LABELS,
	type DateParts,
	type DatePickerLabels,
	formatDateParts,
	invalidDateMessage,
	isOutsideRange,
	parseDateInput,
} from "./core";
import { type DatePickerSize, datePicker } from "./variants";

let {
	value = $bindable(),
	onValueChange,
	locale,
	min,
	max,
	isDateDisabled,
	disabled = false,
	open = $bindable(false),
	onOpenChange,
	captionLayout = "dropdown",
	size = "md",
	labels: labelsProp,
	id: idProp,
	name,
	"aria-label": ariaLabel,
	"aria-describedby": describedBy,
	class: classProp,
}: {
	/** Bindable; `undefined` when empty, as bits-ui's calendar does. */
	value?: DateValue;
	onValueChange?: (value: DateValue | undefined) => void;
	/** BCP 47 locale for parsing typed dates and formatting the field. */
	locale?: string;
	min?: DateValue;
	max?: DateValue;
	/** Extra rule for unavailable days, e.g. weekends. */
	isDateDisabled?: (date: DateValue) => boolean;
	disabled?: boolean;
	/** Bindable. */
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	captionLayout?: CalendarCaptionLayout;
	size?: DatePickerSize;
	labels?: Partial<DatePickerLabels>;
	id?: string;
	name?: string;
	"aria-label"?: string;
	"aria-describedby"?: string;
	class?: string;
} = $props();

const labels = $derived({ ...DATE_PICKER_LABELS, ...labelsProp });
const uid = $props.id();
const id = $derived(idProp ?? `${uid}-input`);
const errorId = `${uid}-error`;
const s = $derived(datePicker({ size }));

const toParts = (d: DateValue): DateParts => ({
	year: d.year,
	month: d.month,
	day: d.day,
});
const formatted = $derived(value ? formatDateParts(toParts(value), locale) : "");

let text = $state("");
let editing = false;
let error = $state<string | null>(null);

// Only a change to `value` rewrites the field; an invalid entry stays for the user to fix.
$effect(() => {
	const next = formatted;
	untrack(() => {
		if (!editing) text = next;
	});
});

function set(next: DateValue | undefined) {
	value = next;
	onValueChange?.(next);
}

function commit() {
	editing = false;
	if (!text.trim()) {
		error = null;
		if (value) set(undefined);
		return;
	}
	if (text === formatted) return;
	const parts = parseDateInput(text, locale);
	if (!parts) {
		error = invalidDateMessage(labels, locale);
		return;
	}
	if (isOutsideRange(parts, min && toParts(min), max && toParts(max))) {
		error = labels.outOfRange;
		return;
	}
	error = null;
	set(new CalendarDate(parts.year, parts.month, parts.day));
	text = formatDateParts(parts, locale);
}

const iconButton = cn(
	button({ variant: "ghost", size: "icon-xs" }),
	inputGroup().button(),
);
</script>

<div data-slot="date-picker" class={cn(s.root(), classProp)}>
	<InputGroup {size} data-disabled={disabled || undefined}>
		<InputGroupInput
			{id}
			{name}
			bind:value={text}
			{disabled}
			placeholder={labels.placeholder}
			aria-label={ariaLabel}
			aria-invalid={error ? true : undefined}
			aria-describedby={[describedBy, error ? errorId : undefined].filter(Boolean).join(" ") ||
				undefined}
			autocomplete="off"
			oninput={() => (editing = true)}
			onblur={commit}
			onkeydown={(e: KeyboardEvent) => {
				if (e.key === "Enter") commit();
				if (e.key === "ArrowDown" && e.altKey) open = true;
			}}
		/>
		<InputGroupAddon align="inline-end">
			{#if value && !disabled}
				<button
					type="button"
					aria-label={labels.clear}
					class={iconButton}
					onclick={() => {
						error = null;
						text = "";
						set(undefined);
					}}
				>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M18 6 6 18M6 6l12 12" />
					</svg>
				</button>
			{/if}
			<Popover bind:open onOpenChange={(next) => onOpenChange?.(next)}>
				<PopoverTrigger {disabled} aria-label={labels.choose} class={iconButton}>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM16 3v4M8 3v4M4 11h16" />
					</svg>
				</PopoverTrigger>
				<PopoverContent align="end" class={s.content()}>
					<Calendar
						type="single"
						{value}
						onValueChange={(next: DateValue | undefined) => {
							error = null;
							set(next);
							open = false;
							onOpenChange?.(false);
						}}
						minValue={min}
						maxValue={max}
						{isDateDisabled}
						{captionLayout}
						{locale}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
		</InputGroupAddon>
	</InputGroup>
	<FieldError id={errorId} errors={error ? [{ message: error }] : undefined} />
</div>
