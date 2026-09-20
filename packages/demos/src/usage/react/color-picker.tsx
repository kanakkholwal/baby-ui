"use client";

import { useState } from "react";
import { ColorPicker } from "@baby-ui/react";

export function Example() {
	const [value, setValue] = useState("#7dd3fc");

	return <ColorPicker value={value} onValueChange={setValue} label="Accent" />;
}
