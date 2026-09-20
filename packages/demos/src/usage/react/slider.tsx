"use client";

import { useState } from "react";
import { Slider } from "@baby-ui/react";

export function Example() {
	const [value, setValue] = useState(40);

	return <Slider value={value} onValueChange={setValue} min={0} max={100} step={5} label="Volume" />;
}
