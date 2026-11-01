"use client";

import {
	Question,
	type QuestionAnswers,
	QuestionContent,
	QuestionFooter,
	QuestionHeader,
	type QuestionItem,
	QuestionResult,
	type QuestionStatus,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useRef, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const QUESTIONS: QuestionItem[] = [
	{
		id: "runtime",
		title: "Which runtime should this target?",
		options: [
			{ value: "edge", label: "Edge", description: "Fast cold starts, no Node APIs" },
			{ value: "node", label: "Node", description: "Full runtime, slower to start" },
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

// Shows the picks in words once the card folds to its result.
const summary = (answers: QuestionAnswers) =>
	QUESTIONS.map((q) => {
		const a = answers[q.id];
		const picked = (a?.selected ?? []).map(
			(v) => q.options?.find((o) => o.value === v)?.label ?? v,
		);
		if (a?.custom) picked.push(a.custom);
		return picked.join(", ");
	})
		.filter(Boolean)
		.join(" · ");

export function QuestionDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Question>>(props);
	const [status, setStatus] = useState<QuestionStatus>("pending");
	const [answers, setAnswers] = useState<QuestionAnswers>({});
	const timer = useRef(0);
	useEffect(() => setStatus(p.status ?? "pending"), [p.status]);
	useEffect(() => () => clearTimeout(timer.current), []);

	return (
		<div className="w-full max-w-sm">
			<Question
				variant={p.variant}
				status={status}
				questions={QUESTIONS}
				answers={answers}
				onAnswersChange={setAnswers}
				onSubmit={() => {
					setStatus("submitting");
					timer.current = window.setTimeout(() => setStatus("answered"), 1200);
				}}
			>
				<QuestionHeader title="Got it" onDismiss={() => setStatus("answered")} />
				<QuestionContent />
				<QuestionFooter />
				<QuestionResult>{summary(answers) || "Skipped"}</QuestionResult>
			</Question>
		</div>
	);
}
