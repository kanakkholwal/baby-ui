"use client";

import { Switch } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [checked, setChecked] = useState(true);

	return (
		<Switch checked={checked} onCheckedChange={setChecked} label="Automatic deploys" />
	);
}
