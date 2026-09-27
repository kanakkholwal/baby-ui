"use client";

import { useEffect, useState } from "react";
import type { DateRange, Matcher } from "react-day-picker";
import { Button } from "../button/button";
import { cn } from "../lib/cn";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";
import { RangeCalendar } from "../range-calendar/range-calendar";
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

export type { DateRange, DateRangePickerLabels, DateRangePickerSize, DateRangePreset };

export interface DateRangePickerProps {
	/** Controlled range; `to` may be missing while the second day is being picked. */
	value: DateRange | undefined;
	onValueChange: (value: DateRange | undefined) => void;
	locale?: string;
	presets?: DateRangePreset[];
	/** Hold the pick in a draft until Apply, instead of committing each click. */
	confirm?: boolean;
	min?: Date;
	max?: Date;
	disabledDates?: Matcher | Matcher[];
	disabled?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	size?: DateRangePickerSize;
	labels?: Partial<DateRangePickerLabels>;
	id?: string;
	"aria-label"?: string;
	className?: string;
}

const toParts = (d: Date): RangeDateParts => ({
	year: d.getFullYear(),
	month: d.getMonth() + 1,
	day: d.getDate(),
});
const toDate = (p: RangeDateParts) => new Date(p.year, p.month - 1, p.day);
const rangeParts = (r: DateRange | undefined): DateRangeParts | null =>
	r?.from && r.to ? { from: toParts(r.from), to: toParts(r.to) } : null;

function useWideScreen() {
	const [wide, setWide] = useState(false);
	useEffect(() => {
		const query = matchMedia("(min-width: 640px)");
		const sync = () => setWide(query.matches);
		sync();
		query.addEventListener("change", sync);
		return () => query.removeEventListener("change", sync);
	}, []);
	return wide;
}

/** A range trigger with a two-month calendar (one on phones) and a presets rail. */
export function DateRangePicker({
	value,
	onValueChange,
	locale,
	presets = DEFAULT_RANGE_PRESETS,
	confirm = false,
	min,
	max,
	disabledDates,
	disabled = false,
	open: openProp,
	onOpenChange,
	size = "md",
	labels: labelsProp,
	id,
	"aria-label": ariaLabel,
	className,
}: DateRangePickerProps) {
	const labels = { ...DATE_RANGE_PICKER_LABELS, ...labelsProp };
	const s = dateRangePicker({ size });
	const wide = useWideScreen();

	const [internalOpen, setInternalOpen] = useState(false);
	const open = openProp ?? internalOpen;
	const [draft, setDraft] = useState<DateRange | undefined>(value);
	const [month, setMonth] = useState<Date | undefined>(value?.from ?? min);
	const setOpen = (next: boolean) => {
		if (next) {
			setDraft(value);
			setMonth(value?.from ?? min);
		}
		if (openProp === undefined) setInternalOpen(next);
		onOpenChange?.(next);
	};

	const shown = confirm ? draft : value;
	const pick = (next: DateRange | undefined) =>
		confirm ? setDraft(next) : onValueChange(next);

	const committed = rangeParts(value);
	const label = committed ? formatDateRange(committed, locale) : labels.placeholder;
	const today = todayParts();
	const matchers: Matcher[] = [
		...(min ? [{ before: min }] : []),
		...(max ? [{ after: max }] : []),
		...(disabledDates ? ([] as Matcher[]).concat(disabledDates) : []),
	];

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger
				id={id}
				disabled={disabled}
				aria-label={ariaLabel ? `${ariaLabel}: ${label}` : undefined}
				data-placeholder={committed ? undefined : ""}
				className={cn(s.trigger(), className)}
			>
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
				<span className={s.value()}>{label}</span>
			</PopoverTrigger>
			<PopoverContent align="start" className={s.content()}>
				{presets.length ? (
					<fieldset aria-label={labels.presets} className={s.rail()}>
						{presets.map((preset) => {
							const range = preset.range(today);
							return (
								<button
									key={preset.label}
									type="button"
									aria-pressed={sameRange(rangeParts(shown), range)}
									onClick={() => {
										pick({ from: toDate(range.from), to: toDate(range.to) });
										// Show where the range starts, so a preset never lands off screen.
										setMonth(toDate(range.from));
									}}
									className={s.preset()}
								>
									{preset.label}
								</button>
							);
						})}
					</fieldset>
				) : null}
				<div className={s.main()}>
					<RangeCalendar
						selected={shown}
						onSelect={pick}
						numberOfMonths={wide ? 2 : 1}
						month={month}
						onMonthChange={setMonth}
						disabled={matchers}
						startMonth={min}
						endMonth={max}
						autoFocus
					/>
					{confirm ? (
						<div className={s.footer()}>
							<Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
								{labels.cancel}
							</Button>
							<Button
								size="sm"
								onClick={() => {
									onValueChange(draft);
									setOpen(false);
								}}
							>
								{labels.apply}
							</Button>
						</div>
					) : null}
				</div>
			</PopoverContent>
		</Popover>
	);
}
