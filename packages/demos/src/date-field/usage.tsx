"use client";

import { DateField } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [date, setDate] = useState<Date | null>(null);

	return <DateField value={date} onValueChange={setDate} aria-label="Date of birth" />;
}
