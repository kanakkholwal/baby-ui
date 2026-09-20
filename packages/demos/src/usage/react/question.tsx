import { Question } from "@baby-ui/react";

const options = [
	{ id: "react", label: "React" },
	{ id: "svelte", label: "Svelte" },
	{ id: "both", label: "Both" },
];

export function Example() {
	return (
		<Question
			question="Which port do you want?"
			options={options}
			onAnswer={(ids) => console.log(ids)}
		/>
	);
}
