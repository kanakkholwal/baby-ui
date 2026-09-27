"use client";

import { Slider } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [hours, setHours] = useState(120);

	return (
		<Slider
			value={hours}
			onValueChange={(next) => setHours(typeof next === "number" ? next : (next[0] ?? 0))}
			variant="track"
			min={10}
			max={400}
			step={10}
			label="Build time"
			showValue
			formatValue={(v) => `${v} hours`}
		/>
	);
}
