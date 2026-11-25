"use client";

import {
	Reasoning,
	ReasoningChevron,
	ReasoningContent,
	ReasoningDuration,
	ReasoningIcon,
	ReasoningPreview,
	ReasoningStep,
	ReasoningStepDetails,
	ReasoningStepSource,
	ReasoningStepSources,
	type ReasoningStepStatus,
	ReasoningSteps,
	ReasoningTitle,
	ReasoningTrigger,
	type ReasoningVariant,
} from "@baby-ui/react";
import { useEffect, useState } from "react";

const STEPS = [
	{
		label: "Read the brief",
		description: "Pulled the goals and constraints out of the request.",
	},
	{ label: "Search the docs" },
	{ label: "Compare two approaches" },
	{ label: "Draft the answer" },
];

function statusOf(index: number, progress: number): ReasoningStepStatus {
	return index < progress ? "done" : index === progress ? "active" : "pending";
}

export function Example({
	variant = "default",
	live = true,
}: {
	variant?: ReasoningVariant;
	live?: boolean;
}) {
	// Stands in for your model's events: one step lands every 1.4 seconds, then it starts over.
	const [progress, setProgress] = useState(1);
	useEffect(() => {
		if (!live) return;
		const id = setInterval(
			() => setProgress((n) => (n >= STEPS.length + 2 ? 0 : n + 1)),
			1400,
		);
		return () => clearInterval(id);
	}, [live]);
	const step = live ? progress : STEPS.length;
	const thinking = step < STEPS.length;
	const seconds = Math.round(step * 1.4 * 10) / 10;

	return (
		<div className="w-full max-w-sm">
			<Reasoning thinking={thinking} duration={seconds} variant={variant}>
				<ReasoningTrigger>
					<ReasoningIcon />
					<ReasoningTitle>Thought for {seconds}s</ReasoningTitle>
					<ReasoningDuration />
					<ReasoningPreview />
					<ReasoningChevron />
				</ReasoningTrigger>
				<ReasoningContent>
					<ReasoningSteps>
						{STEPS.map((entry, index) => (
							<ReasoningStep
								key={entry.label}
								label={entry.label}
								description={entry.description}
								status={statusOf(index, step)}
							>
								{index === 1 ? (
									<ReasoningStepSources>
										<ReasoningStepSource href="https://base-ui.com">
											base-ui.com
										</ReasoningStepSource>
										<ReasoningStepSource>svelte.dev</ReasoningStepSource>
									</ReasoningStepSources>
								) : null}
								{index === 2 ? (
									<ReasoningStepDetails summary="Why grid rows">
										<p>Animating grid-template-rows needs no height measuring.</p>
										<p>A height tween needs a ResizeObserver and still snaps.</p>
									</ReasoningStepDetails>
								) : null}
							</ReasoningStep>
						))}
					</ReasoningSteps>
				</ReasoningContent>
			</Reasoning>
		</div>
	);
}
