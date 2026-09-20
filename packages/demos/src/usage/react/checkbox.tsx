"use client";

import { Checkbox } from "@baby-ui/react";
import { useState } from "react";

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
