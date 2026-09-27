import { MultiSelect } from "@baby-ui/react";
import { useState } from "react";

const people = [
	{ value: "ana", label: "Ana Ruiz" },
	{ value: "ben", label: "Ben Okafor" },
	{ value: "dev", label: "Dev Patel" },
];

export function Example() {
	const [value, setValue] = useState<string[]>([]);
	return (
		<MultiSelect
			aria-label="Reviewers"
			options={people}
			value={value}
			onValueChange={setValue}
		/>
	);
}
