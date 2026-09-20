"use client";

import { Slider } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [value, setValue] = useState(40);

	return (
		<Slider
			value={value}
			onValueChange={setValue}
			min={0}
			max={100}
			step={5}
			label="Volume"
		/>
	);
}
