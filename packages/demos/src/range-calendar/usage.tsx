"use client";

import { type DateRange, RangeCalendar } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [range, setRange] = useState<DateRange | undefined>();

	return <RangeCalendar selected={range} onSelect={setRange} numberOfMonths={2} />;
}
