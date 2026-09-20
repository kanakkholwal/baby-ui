"use client";

import { useId, useState } from "react";
import { cn } from "../lib/cn";

export type QuestionOption = { id: string; label: string };

export interface QuestionProps {
	question: string;
	options: QuestionOption[];
	multiple?: boolean;
	className?: string;
	onAnswer?: (ids: string[]) => void;
}

export function Question({
	question,
	options,
	multiple = false,
	className,
	onAnswer,
}: QuestionProps) {
	const id = useId();
	const [picked, setPicked] = useState<string[]>([]);
	const [answered, setAnswered] = useState(false);

	function toggle(optionId: string) {
		if (answered) return;
		if (!multiple) {
			setPicked([optionId]);
			setAnswered(true);
			onAnswer?.([optionId]);
			return;
		}
		setPicked((prev) =>
			prev.includes(optionId) ? prev.filter((p) => p !== optionId) : [...prev, optionId],
		);
	}

	return (
		<div
			className={cn(
				"flex flex-col gap-3 rounded-xl border border-border bg-card p-4",
				className,
			)}
		>
			<p id={id} className="font-medium text-foreground text-sm">
				{question}
			</p>

			{/* biome-ignore lint/a11y/useSemanticElements: fieldset would add a border and a legend requirement */}
			<div role="group" aria-labelledby={id} className="flex flex-wrap gap-2">
				{options.map((option) => (
					<button
						key={option.id}
						type="button"
						aria-pressed={picked.includes(option.id)}
						disabled={answered && !picked.includes(option.id)}
						onClick={() => toggle(option.id)}
						className={cn(
							"inline-flex h-8 items-center rounded-lg border border-border px-3 text-sm transition-colors",
							"hover:bg-foreground/[0.06] disabled:pointer-events-none disabled:opacity-40",
							"aria-pressed:border-border-strong aria-pressed:bg-foreground/[0.08] aria-pressed:text-foreground",
						)}
					>
						{option.label}
					</button>
				))}
			</div>

			{multiple && !answered ? (
				<button
					type="button"
					disabled={picked.length === 0}
					onClick={() => {
						setAnswered(true);
						onAnswer?.(picked);
					}}
					className="self-start rounded-lg bg-primary px-3 py-1.5 font-medium text-primary-foreground text-xs disabled:opacity-40"
				>
					Submit
				</button>
			) : null}

			<span role="status" className="sr-only">
				{answered ? "Answer recorded" : ""}
			</span>
		</div>
	);
}
