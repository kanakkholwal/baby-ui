"use client";

import { Field, FieldDescription, FieldLabel, TimePicker } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [time, setTime] = useState<string | null>("09:30");

	return (
		<Field className="w-fit">
			<FieldLabel>Start time</FieldLabel>
			<TimePicker
				value={time}
				onValueChange={setTime}
				step={15}
				min="08:00"
				max="18:00"
				clearable
				showNow
				aria-label="Start time"
				aria-describedby="start-time-hint"
			/>
			<FieldDescription id="start-time-hint">
				Type it, or use the arrow keys. Clear and Now sit at the end.
			</FieldDescription>
		</Field>
	);
}
