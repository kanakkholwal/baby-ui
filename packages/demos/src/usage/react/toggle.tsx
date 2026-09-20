"use client";

import { useState } from "react";
import { Toggle } from "@baby-ui/react";

export function Example() {
	const [pressed, setPressed] = useState(false);

	return (
		<Toggle pressed={pressed} onPressedChange={setPressed} label="Bold">
			B
		</Toggle>
	);
}
