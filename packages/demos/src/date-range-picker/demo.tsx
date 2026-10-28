"use client";

import { type DateRange, DateRangePicker } from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

// A report filter: empty until the reader picks a range or a preset.
export function DateRangePickerDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof DateRangePicker>>(props);
	const [range, setRange] = useState<DateRange | undefined>();
	return (
		<DateRangePicker
			value={range}
			onValueChange={setRange}
			aria-label="Report period"
			confirm={p.confirm ?? false}
			locale={p.locale || undefined}
			invalid={p.invalid ?? false}
			size={p.size ?? "default"}
		/>
	);
}
