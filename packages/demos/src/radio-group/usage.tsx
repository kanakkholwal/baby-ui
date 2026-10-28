"use client";

import { RadioGroup, RadioGroupItem } from "@baby-ui/react";
import { useState } from "react";

export function Example() {
	const [value, setValue] = useState("hobby");

	return (
		<RadioGroup value={value} onValueChange={setValue} variant="card" name="plan">
			<RadioGroupItem value="hobby" label="Hobby" description="For side projects." />
			<RadioGroupItem value="pro" label="Pro" description="For teams shipping daily." />
		</RadioGroup>
	);
}
