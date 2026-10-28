"use client";

import { DatePicker, Field, FieldDescription, FieldLabel } from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

// A booking form: nothing earlier than today can be picked or typed.
export function DatePickerDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof DatePicker>>(props);
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
				locale={p.locale || undefined}
				captionLayout={p.captionLayout ?? "dropdown"}
				invalid={p.invalid ?? false}
				size={p.size ?? "default"}
				aria-describedby="demo-check-in-hint"
			/>
			<FieldDescription id="demo-check-in-hint">
				Type a date or pick one. Up to six months ahead.
			</FieldDescription>
		</Field>
	);
}
