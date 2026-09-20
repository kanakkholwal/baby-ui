"use client";

import { RadioGroup } from "@baby-ui/react";
import { useState } from "react";

const options = [
	{ value: "hobby", label: "Hobby", description: "For side projects." },
	{ value: "pro", label: "Pro", description: "For teams shipping daily." },
];

export function Example() {
	const [value, setValue] = useState("hobby");

	return (
		<RadioGroup
			value={value}
			onValueChange={setValue}
			options={options}
			variant="card"
			name="plan"
		/>
	);
}
