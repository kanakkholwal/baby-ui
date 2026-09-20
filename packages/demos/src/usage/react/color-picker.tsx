"use client";

import { ColorPicker } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [value, setValue] = useState("#7dd3fc");

	return (
		<ColorPicker value={value} onValueChange={setValue} format="hsl" label="Accent" />
	);
}
