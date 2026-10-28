"use client";

import { Field, FieldDescription, FieldLabel, TimePicker } from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function TimePickerDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof TimePicker>>(props);
	const [time, setTime] = useState<string | null>("09:30");
	const cycle = props.hourCycle === "24" ? 24 : props.hourCycle === "12" ? 12 : undefined;
	return (
		<Field className="w-fit">
			<FieldLabel>Meeting starts</FieldLabel>
			<TimePicker
				value={time}
				onValueChange={setTime}
				aria-label="Meeting starts"
				hourCycle={cycle}
				step={p.step ?? 15}
				min="08:00"
				max="18:00"
				clearable={p.clearable ?? false}
				showNow={p.showNow ?? false}
				invalid={p.invalid ?? false}
				size={p.size ?? "default"}
			/>
			<FieldDescription>
				Type it, or use the arrow keys. Clear and Now sit at the end.
			</FieldDescription>
			<p className="text-muted-foreground text-xs tabular-nums">
				Saved as {time ?? "no time"}
			</p>
		</Field>
	);
}
