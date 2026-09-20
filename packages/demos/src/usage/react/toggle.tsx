"use client";

import { Toggle } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [pressed, setPressed] = useState(false);

	return (
		<Toggle pressed={pressed} onPressedChange={setPressed} label="Bold">
			B
		</Toggle>
	);
}
