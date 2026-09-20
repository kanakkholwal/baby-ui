"use client";

import { useState } from "react";
import { Checkbox } from "@baby-ui/react";

export function Example() {
	const [checked, setChecked] = useState(true);

	return (
		<Checkbox
			checked={checked}
			onCheckedChange={setChecked}
			label="Deploy on push"
			description="Every commit to main triggers a build."
		/>
	);
}
