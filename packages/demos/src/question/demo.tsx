"use client";

import { Question, type QuestionAnswers, type QuestionItem } from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const QUESTIONS: QuestionItem[] = [
	{
		id: "runtime",
		title: "Which runtime should this target?",
		options: [
			{ value: "edge", label: "Edge" },
			{ value: "node", label: "Node" },
			{ value: "both", label: "Both" },
		],
	},
	{
		id: "features",
		title: "Which features does it need?",
		description: "Pick any that apply, or add your own.",
		multiple: true,
		allowCustom: true,
		customPlaceholder: "Add another requirement…",
		options: [
			{ value: "streaming", label: "Streaming responses" },
			{ value: "auth", label: "Auth middleware" },
			{ value: "caching", label: "Response caching" },
		],
	},
	{
		id: "priority",
		title: "How urgent is this?",
		options: [
			{ value: "now", label: "Ship this week" },
			{ value: "soon", label: "Next sprint" },
			{ value: "later", label: "No rush" },
		],
	},
];

export function QuestionDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Question>>(props);
	const [submitted, setSubmitted] = useState<QuestionAnswers | null>(null);
	return (
		<div className="w-full max-w-sm">
			<Question
				key={String(props.layout)}
				layout={p.layout ?? "card"}
				questions={QUESTIONS}
				onSubmit={setSubmitted}
			/>
			{submitted ? (
				<p className="mt-2 text-muted-foreground text-xs">
					Submitted: {JSON.stringify(submitted)}
				</p>
			) : null}
		</div>
	);
}
