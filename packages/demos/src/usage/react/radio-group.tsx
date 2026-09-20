"use client";

import { useState } from "react";
import { RadioGroup } from "@baby-ui/react";

const options = [
	{ value: "hobby", label: "Hobby", description: "For side projects." },
	{ value: "pro", label: "Pro", description: "For teams shipping daily." },
];

export function Example() {
	const [value, setValue] = useState("hobby");

	return (
		<RadioGroup value={value} onValueChange={setValue} options={options} variant="card" name="plan" />
	);
}
