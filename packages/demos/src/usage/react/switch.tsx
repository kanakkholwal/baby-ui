"use client";

import { useState } from "react";
import { Switch } from "@baby-ui/react";

export function Example() {
	const [checked, setChecked] = useState(true);

	return <Switch checked={checked} onCheckedChange={setChecked} label="Automatic deploys" />;
}
