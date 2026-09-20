"use client";

import { useState } from "react";
import { Combobox } from "@baby-ui/react";

const options = [
	{ value: "iad1", label: "Washington, D.C." },
	{ value: "fra1", label: "Frankfurt" },
	{ value: "bom1", label: "Mumbai" },
];

export function Example() {
	const [value, setValue] = useState("");

	return (
		<Combobox
			value={value}
			onValueChange={setValue}
			options={options}
			label="Region"
			placeholder="Search regions…"
		/>
	);
}
