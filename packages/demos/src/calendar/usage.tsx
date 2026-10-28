"use client";

import { Calendar } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [date, setDate] = useState<Date | undefined>(new Date());

	return (
		<Calendar mode="single" selected={date} onSelect={setDate} captionLayout="dropdown" />
	);
}
