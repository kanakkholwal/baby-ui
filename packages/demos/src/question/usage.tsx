import {
	Question,
	QuestionContent,
	QuestionFooter,
	QuestionHeader,
	type QuestionItem,
	QuestionResult,
} from "@baby-ui/react";

const questions: QuestionItem[] = [
	{
		id: "port",
		title: "Which port do you want?",
		options: [
			{ value: "react", label: "React" },
			{ value: "svelte", label: "Svelte" },
			{ value: "both", label: "Both" },
		],
	},
];

export function Example() {
	return (
		<Question questions={questions} onSubmit={(answers) => console.log(answers)}>
			<QuestionHeader />
			<QuestionContent />
			<QuestionFooter />
			<QuestionResult />
		</Question>
	);
}
