"use client";

import { useState } from "react";
import { ToggleGroup } from "@baby-ui/react";

const options = [
	{ value: "left", label: "Left" },
	{ value: "center", label: "Center" },
	{ value: "right", label: "Right" },
];

export function Example() {
	const [value, setValue] = useState<string | string[]>("left");

	return <ToggleGroup value={value} onValueChange={setValue} options={options} label="Alignment" />;
}
