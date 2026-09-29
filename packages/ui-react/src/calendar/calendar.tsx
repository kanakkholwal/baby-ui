"use client";

import { type ComponentProps, createContext, useContext, useEffect, useRef } from "react";
import {
	type DayButton,
	DayPicker,
	getDefaultClassNames,
	type Locale,
} from "react-day-picker";
import { type ButtonVariant, button } from "../button/variants";
import { cn } from "../lib/cn";
import { type CalendarSize, calendar } from "./variants";

export type CalendarProps = ComponentProps<typeof DayPicker> & {
	/** Variant of the previous/next month buttons. */
	buttonVariant?: ButtonVariant;
	size?: CalendarSize;
};

function Chevron({
	orientation,
	className,
}: {
	orientation?: string;
	className?: string;
}) {
	const d =
		orientation === "left"
			? "m15 6-6 6 6 6"
			: orientation === "right"
				? "m9 6 6 6-6 6"
				: "m6 9 6 6 6-6";
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			className={cn("size-4", className)}
		>
			<path d={d} />
		</svg>
	);
}

// The month each grid shows, so the grid re-keys and replays `calendar-weeks-in` on change.
const MonthKey = createContext("");

/** A date grid on react-day-picker, as shadcn's: `mode="single" | "multiple" | "range"`. */
export function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	captionLayout = "label",
	buttonVariant = "ghost",
	size = "md",
	locale,
	formatters,
	components,
	...props
}: CalendarProps) {
	const defaults = getDefaultClassNames();
	const s = calendar({ size });
	const navButton = cn(button({ variant: buttonVariant, size: "icon" }), s.navButton());

	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn(s.root(), className)}
			captionLayout={captionLayout}
			locale={locale}
			formatters={{
				formatMonthDropdown: (date) =>
					date.toLocaleString(locale?.code, { month: "short" }),
				...formatters,
			}}
			classNames={{
				root: cn("w-fit", defaults.root),
				months: cn(s.months(), defaults.months),
				month: cn(s.month(), defaults.month),
				nav: cn(s.nav(), defaults.nav),
				button_previous: cn(navButton, defaults.button_previous),
				button_next: cn(navButton, defaults.button_next),
				month_caption: cn(s.header(), defaults.month_caption),
				dropdowns: cn(
					"flex w-full items-center justify-start gap-0.5",
					defaults.dropdowns,
				),
				dropdown_root: cn(s.dropdown(), defaults.dropdown_root),
				dropdown: cn("absolute inset-0 bg-popover opacity-0", defaults.dropdown),
				caption_label: cn(
					captionLayout === "label" ? s.heading() : s.dropdownLabel(),
					defaults.caption_label,
				),
				month_grid: cn(s.grid(), defaults.month_grid),
				weekdays: cn(s.gridRow(), defaults.weekdays),
				weekday: cn(s.headCell(), defaults.weekday),
				week: cn(s.gridRow(), "mt-2", defaults.week),
				week_number_header: cn(
					"w-(--cell-size) select-none",
					defaults.week_number_header,
				),
				week_number: cn(
					"text-[0.8rem] text-muted-foreground select-none",
					defaults.week_number,
				),
				day: cn(s.cell(), s.rangeCell(), defaults.day),
				outside: defaults.outside,
				disabled: defaults.disabled,
				hidden: cn("invisible", defaults.hidden),
				...classNames,
			}}
			components={{
				Root: ({ className, rootRef, ...rest }) => (
					<div data-slot="calendar" ref={rootRef} className={className} {...rest} />
				),
				Chevron,
				Month: ({ calendarMonth, displayIndex: _displayIndex, ...rest }) => (
					<MonthKey.Provider value={calendarMonth.date.toISOString()}>
						<div {...rest} />
					</MonthKey.Provider>
				),
				MonthGrid: (gridProps) => <KeyedGrid {...gridProps} />,
				DayButton: (dayProps) => <CalendarDayButton size={size} {...dayProps} />,
				WeekNumber: ({ children, ...rest }) => (
					<td {...rest}>
						<div className="flex size-(--cell-size) items-center justify-center text-center">
							{children}
						</div>
					</td>
				),
				...components,
			}}
			{...props}
		/>
	);
}

function KeyedGrid(props: ComponentProps<"table">) {
	return <table key={useContext(MonthKey)} {...props} />;
}

/** One day. Carries the same data attributes as bits-ui's day, so both ports share classes. */
export function CalendarDayButton({
	className,
	day,
	modifiers,
	size = "md",
	locale,
	...props
}: ComponentProps<typeof DayButton> & { size?: CalendarSize; locale?: Partial<Locale> }) {
	const s = calendar({ size });
	const ref = useRef<HTMLButtonElement>(null);
	useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);

	return (
		<button
			ref={ref}
			type="button"
			data-slot="calendar-day"
			data-day={day.date.toLocaleDateString(locale?.code)}
			data-selected={modifiers.selected || undefined}
			data-today={modifiers.today || undefined}
			data-outside-month={modifiers.outside || undefined}
			data-disabled={modifiers.disabled || undefined}
			data-range-start={modifiers.range_start || undefined}
			data-range-end={modifiers.range_end || undefined}
			data-range-middle={modifiers.range_middle || undefined}
			className={cn(s.day(), s.rangeDay(), className)}
			{...props}
		/>
	);
}
