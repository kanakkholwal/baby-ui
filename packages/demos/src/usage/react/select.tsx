"use client";

import { useState } from "react";
import { Select } from "@baby-ui/react";

const options = [
	{ value: "node", label: "Node 22" },
	{ value: "bun", label: "Bun 1.2" },
	{ value: "deno", label: "Deno 2", disabled: true },
];

export function Example() {
	const [value, setValue] = useState("");

	return (
		<Select
			value={value}
			onValueChange={setValue}
			options={options}
			label="Runtime"
			placeholder="Pick a runtime"
		/>
	);
}
