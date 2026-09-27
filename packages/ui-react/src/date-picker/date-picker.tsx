"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Matcher } from "react-day-picker";
import { button } from "../button/variants";
import { Calendar, type CalendarProps } from "../calendar/calendar";
import { FieldError } from "../field/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../input-group/input-group";
import { inputGroup } from "../input-group/variants";
import { cn } from "../lib/cn";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";
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

export type { DatePickerLabels, DatePickerSize };

export interface DatePickerProps {
	/** Controlled date; `null` when empty. */
	value: Date | null;
	onValueChange: (value: Date | null) => void;
	/** BCP 47 locale for parsing typed dates and formatting the field. */
	locale?: string;
	min?: Date;
	max?: Date;
	/** Extra react-day-picker matchers, e.g. `{ dayOfWeek: [0, 6] }` for weekends. */
	disabledDates?: Matcher | Matcher[];
	disabled?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	captionLayout?: CalendarProps["captionLayout"];
	size?: DatePickerSize;
	labels?: Partial<DatePickerLabels>;
	id?: string;
	name?: string;
	"aria-label"?: string;
	"aria-describedby"?: string;
	className?: string;
}

const toParts = (date: Date): DateParts => ({
	year: date.getFullYear(),
	month: date.getMonth() + 1,
	day: date.getDate(),
});
const toDate = (p: DateParts) => new Date(p.year, p.month - 1, p.day);

function CalendarIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM16 3v4M8 3v4M4 11h16" />
		</svg>
	);
}

function ClearIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="M18 6 6 18M6 6l12 12" />
		</svg>
	);
}

/** A typed date field with a calendar popover. Typing parses on blur in the locale's order. */
export function DatePicker({
	value,
	onValueChange,
	locale,
	min,
	max,
	disabledDates,
	disabled = false,
	open: openProp,
	onOpenChange,
	captionLayout = "dropdown",
	size = "md",
	labels: labelsProp,
	id: idProp,
	name,
	"aria-label": ariaLabel,
	"aria-describedby": describedBy,
	className,
}: DatePickerProps) {
	const labels = { ...DATE_PICKER_LABELS, ...labelsProp };
	const uid = useId();
	const id = idProp ?? `${uid}-input`;
	const errorId = `${uid}-error`;
	const s = datePicker({ size });

	const [internalOpen, setInternalOpen] = useState(false);
	const open = openProp ?? internalOpen;
	const setOpen = (next: boolean) => {
		if (openProp === undefined) setInternalOpen(next);
		onOpenChange?.(next);
	};

	const formatted = value ? formatDateParts(toParts(value), locale) : "";
	const [text, setText] = useState(formatted);
	const editing = useRef(false);
	const [error, setError] = useState<string | null>(null);

	// Only a change to `value` rewrites the field; an invalid entry stays for the user to fix.
	useEffect(() => {
		if (!editing.current) setText(formatted);
	}, [formatted]);

	const minParts = min ? toParts(min) : undefined;
	const maxParts = max ? toParts(max) : undefined;

	function commit() {
		editing.current = false;
		if (!text.trim()) {
			setError(null);
			if (value) onValueChange(null);
			return;
		}
		if (text === formatted) return;
		const parts = parseDateInput(text, locale);
		if (!parts) return setError(invalidDateMessage(labels, locale));
		if (isOutsideRange(parts, minParts, maxParts)) return setError(labels.outOfRange);
		setError(null);
		onValueChange(toDate(parts));
		setText(formatDateParts(parts, locale));
	}

	const matchers: Matcher[] = [
		...(min ? [{ before: min }] : []),
		...(max ? [{ after: max }] : []),
		...(disabledDates ? ([] as Matcher[]).concat(disabledDates) : []),
	];

	return (
		<div data-slot="date-picker" className={cn(s.root(), className)}>
			<InputGroup size={size} data-disabled={disabled || undefined}>
				<InputGroupInput
					id={id}
					name={name}
					value={text}
					disabled={disabled}
					placeholder={labels.placeholder}
					aria-label={ariaLabel}
					aria-invalid={error ? true : undefined}
					aria-describedby={
						[describedBy, error ? errorId : undefined].filter(Boolean).join(" ") ||
						undefined
					}
					autoComplete="off"
					onChange={(e) => {
						editing.current = true;
						setText(e.currentTarget.value);
					}}
					onBlur={commit}
					onKeyDown={(e) => {
						if (e.key === "Enter") commit();
						if (e.key === "ArrowDown" && e.altKey) setOpen(true);
					}}
				/>
				<InputGroupAddon align="inline-end">
					{value && !disabled ? (
						<button
							type="button"
							aria-label={labels.clear}
							onClick={() => {
								setError(null);
								setText("");
								onValueChange(null);
							}}
							className={cn(
								button({ variant: "ghost", size: "icon-xs" }),
								inputGroup().button(),
							)}
						>
							<ClearIcon />
						</button>
					) : null}
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger
							disabled={disabled}
							aria-label={labels.choose}
							className={cn(
								button({ variant: "ghost", size: "icon-xs" }),
								inputGroup().button(),
							)}
						>
							<CalendarIcon />
						</PopoverTrigger>
						<PopoverContent align="end" className={s.content()}>
							<Calendar
								mode="single"
								selected={value ?? undefined}
								defaultMonth={value ?? min ?? undefined}
								onSelect={(date) => {
									setError(null);
									onValueChange(date ?? null);
									setOpen(false);
								}}
								disabled={matchers}
								startMonth={min}
								endMonth={max}
								captionLayout={captionLayout}
								autoFocus
							/>
						</PopoverContent>
					</Popover>
				</InputGroupAddon>
			</InputGroup>
			<FieldError id={errorId} errors={error ? [{ message: error }] : undefined} />
		</div>
	);
}
