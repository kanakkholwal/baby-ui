"use client";

import { DatePicker } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [date, setDate] = useState<Date | null>(null);

	return <DatePicker value={date} onValueChange={setDate} aria-label="Due date" />;
}
