"use client";

import { type DateRange, DateRangePicker } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [range, setRange] = useState<DateRange | undefined>();

	return (
		<DateRangePicker value={range} onValueChange={setRange} aria-label="Report period" />
	);
}
