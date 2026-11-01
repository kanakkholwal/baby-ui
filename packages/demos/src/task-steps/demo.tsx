"use client";

import {
	type TaskStatus,
	TaskStep,
	TaskStepDetail,
	TaskStepDetails,
	TaskSteps,
	TaskStepsHeader,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

// A plan that plays forward: the active step fills its bar, then the next one starts.
const PLAN = [
	{
		id: "verify",
		label: "Verify vendor records",
		meta: "12 suppliers",
		details: [
			["Matched tax and contact IDs", "12/12"],
			["Flagged stale records", "0"],
		],
	},
	{
		id: "reorder",
		label: "Build the reorder list",
		meta: "7 SKUs",
		details: [
			["Reading the POS export", "3 files"],
			["Scoring stockout risk", "68%"],
		],
	},
	{
		id: "email",
		label: "Draft supplier emails",
		meta: "2 messages",
		details: [
			["Cone supplier follow-up", "draft"],
			["Pistachio reorder note", "draft"],
		],
	},
	{ id: "send", label: "Send for approval", meta: "1 reviewer", details: [] },
] as const;

export function TaskStepsDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof TaskSteps>>(props);
	const [tick, setTick] = useState(0);
	const [failed, setFailed] = useState(true);
	useEffect(() => {
		const id = setInterval(() => setTick((t) => (t >= 16 ? t : t + 1)), 500);
		return () => clearInterval(id);
	}, []);

	// Each step takes four ticks; the third fails once, until Retry runs it again.
	const stage = Math.floor(tick / 4);
	const statusOf = (i: number): TaskStatus => {
		if (failed && stage >= 2) return i < 2 ? "done" : i === 2 ? "failed" : "pending";
		return i < stage ? "done" : i === stage ? "active" : "pending";
	};
	const done = PLAN.filter((_, i) => statusOf(i) === "done").length;

	return (
		<div className="flex w-full max-w-[27.5rem] flex-col">
			<TaskStepsHeader title="Restock plan" done={done} total={PLAN.length} />
			<TaskSteps
				variant={p.variant}
				size={p.size}
				compact={p.compact}
				showConnector={p.showConnector}
			>
				{PLAN.map((step, i) => (
					<TaskStep
						key={step.id}
						label={step.label}
						meta={step.meta}
						step={i + 1}
						status={statusOf(i)}
						progress={(tick % 4) / 4}
						onRetry={() => {
							setFailed(false);
							setTick(8);
						}}
					>
						{step.details.length > 0 && (
							<TaskStepDetails>
								{step.details.map(([label, meta]) => (
									<TaskStepDetail key={label} meta={meta}>
										{label}
									</TaskStepDetail>
								))}
							</TaskStepDetails>
						)}
					</TaskStep>
				))}
			</TaskSteps>
		</div>
	);
}
