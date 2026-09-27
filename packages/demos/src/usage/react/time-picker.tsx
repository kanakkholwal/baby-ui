"use client";

import { TimePicker } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [time, setTime] = useState<string | null>("09:30");

	return (
		<TimePicker value={time} onValueChange={setTime} step={15} aria-label="Start time" />
	);
}
