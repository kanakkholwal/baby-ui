"use client";

import {
	type CalendarProps,
	DatePicker,
	type DatePickerSize,
	type DateRange,
	DateRangePicker,
	type DateRangePickerSize,
	Field,
	FieldDescription,
	FieldLabel,
	TimePicker,
	type TimePickerSize,
} from "@baby-ui/react";
import { useState } from "react";

type Props = Record<string, unknown>;

// A booking form: nothing earlier than today can be picked or typed.
export function DatePickerDemo({ props }: { props: Props }) {
	const [checkIn, setCheckIn] = useState<Date | null>(null);
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const later = new Date(today);
	later.setMonth(later.getMonth() + 6);

	return (
		<Field className="w-full max-w-64">
			<FieldLabel htmlFor="demo-check-in">Check-in</FieldLabel>
			<DatePicker
				id="demo-check-in"
				value={checkIn}
				onValueChange={setCheckIn}
				min={today}
				max={later}
				locale={(props.locale as string) || undefined}
				captionLayout={
					(props.captionLayout as CalendarProps["captionLayout"]) ?? "dropdown"
				}
				size={(props.size as DatePickerSize) ?? "md"}
				aria-describedby="demo-check-in-hint"
			/>
			<FieldDescription id="demo-check-in-hint">
				Type a date or pick one. Up to six months ahead.
			</FieldDescription>
		</Field>
	);
}

// A report filter: empty until the reader picks a range or a preset.
export function DateRangePickerDemo({ props }: { props: Props }) {
	const [range, setRange] = useState<DateRange | undefined>();
	return (
		<div className="w-full max-w-64">
			<DateRangePicker
				value={range}
				onValueChange={setRange}
				aria-label="Report period"
				confirm={props.confirm === true}
				locale={(props.locale as string) || undefined}
				size={(props.size as DateRangePickerSize) ?? "md"}
			/>
		</div>
	);
}

export function TimePickerDemo({ props }: { props: Props }) {
	const [time, setTime] = useState<string | null>("09:30");
	const cycle = props.hourCycle === "24" ? 24 : props.hourCycle === "12" ? 12 : undefined;
	return (
		<div className="flex w-fit flex-col gap-2">
			<span className="font-medium text-sm">Meeting starts</span>
			<TimePicker
				value={time}
				onValueChange={setTime}
				aria-label="Meeting starts"
				hourCycle={cycle}
				step={Number(props.step ?? 15)}
				size={(props.size as TimePickerSize) ?? "md"}
			/>
			<p className="text-muted-foreground text-xs tabular-nums">
				Saved as {time ?? "no time"}
			</p>
		</div>
	);
}
