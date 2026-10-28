"use client";

import { WeekCalendar } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [selected, setSelected] = useState<Date | null>(new Date());
	return <WeekCalendar selected={selected} onSelect={setSelected} />;
}
