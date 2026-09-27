"use client";

import type { DateRange, PropsBase, PropsRange } from "react-day-picker";
import { Calendar, type CalendarProps } from "../calendar/calendar";

export type { DateRange };

export type RangeCalendarProps = Omit<PropsBase, "mode"> &
	Omit<PropsRange, "mode"> &
	Pick<CalendarProps, "buttonVariant" | "size">;

/** Calendar in range mode, named to match the Svelte port's bits-ui RangeCalendar. */
export function RangeCalendar(props: RangeCalendarProps) {
	const rangeProps = { ...props, mode: "range" } as CalendarProps;
	return <Calendar {...rangeProps} />;
}
