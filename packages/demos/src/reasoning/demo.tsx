"use client";

import {
	Reasoning,
	ReasoningRows,
	ReasoningStep,
	ReasoningStepDetails,
	ReasoningStepSource,
	ReasoningStepSources,
	type ReasoningStepStatus,
	ReasoningSteps,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const REASONING_STEPS = [
	{
		label: "Read the brief",
		description: "Pulled the goals and constraints out of the request.",
	},
	{ label: "Search the docs" },
	{ label: "Compare two approaches" },
	{ label: "Draft the answer" },
];

function stepStatus(index: number, progress: number): ReasoningStepStatus {
	return index < progress ? "done" : index === progress ? "active" : "pending";
}

const CODING_ROWS = [
	{ primary: "Read", secondary: "flavors.ts", mono: true },
	{ primary: "Edit", secondary: "ChurnSchedule.tsx", mono: true, add: 74, del: 41 },
	{ primary: "Run", secondary: "npm run freeze", mono: true },
];

export function ReasoningDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Reasoning>>(props);
	const scripted = props.thinking !== false;
	const [progress, setProgress] = useState(0);
	useEffect(() => {
		if (!scripted) return;
		const id = setInterval(
			() => setProgress((p) => (p >= REASONING_STEPS.length + 2 ? 0 : p + 1)),
			1400,
		);
		return () => clearInterval(id);
	}, [scripted]);
	const step = scripted ? progress : REASONING_STEPS.length;
	const thinking = step < REASONING_STEPS.length;
	return (
		<div className="w-full max-w-96">
			<Reasoning
				thinking={thinking}
				duration={thinking ? Math.round(step * 1.4) : (p.duration ?? 4)}
				defaultOpen={p.defaultOpen ?? false}
				variant={p.variant ?? "outline"}
				thinkingLabel={p.thinkingLabel || "Thinking"}
			>
				{p.variant === "inline" ? (
					<ReasoningRows
						kind="coding"
						rows={CODING_ROWS.slice(0, thinking ? step + 1 : 3)}
					/>
				) : (
					<ReasoningSteps>
						{REASONING_STEPS.map((s, i) => (
							<ReasoningStep
								key={s.label}
								label={s.label}
								description={s.description}
								status={stepStatus(i, step)}
							>
								{i === 1 ? (
									<ReasoningStepSources>
										<ReasoningStepSource href="https://base-ui.com">
											base-ui.com
										</ReasoningStepSource>
										<ReasoningStepSource>svelte.dev</ReasoningStepSource>
									</ReasoningStepSources>
								) : null}
								{i === 2 ? (
									<ReasoningStepDetails summary="Why grid rows">
										<p>Animating grid-template-rows needs no height measuring.</p>
										<p>A height tween needs a ResizeObserver and still snaps.</p>
									</ReasoningStepDetails>
								) : null}
							</ReasoningStep>
						))}
					</ReasoningSteps>
				)}
			</Reasoning>
		</div>
	);
}
