"use client";

import { ToggleGroup, ToggleGroupItem } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [value, setValue] = useState<string | string[]>("left");

	return (
		<ToggleGroup value={value} onValueChange={setValue} type="single" label="Alignment">
			<ToggleGroupItem value="left">Left</ToggleGroupItem>
			<ToggleGroupItem value="center">Center</ToggleGroupItem>
			<ToggleGroupItem value="right">Right</ToggleGroupItem>
		</ToggleGroup>
	);
}
