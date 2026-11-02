"use client";

import {
	PlanRunner,
	PlanRunnerBody,
	PlanRunnerFooter,
	PlanRunnerHeader,
	PlanRunnerOutput,
	PlanRunnerProgress,
	PlanRunnerStep,
	PlanRunnerStepHead,
	PlanRunnerSteps,
	PlanRunnerStepTitle,
	PlanRunnerStop,
	PlanRunnerSummary,
	PlanRunnerTimer,
	PlanRunnerTitle,
	PlanRunnerTool,
	type PlanStepStatus,
	type PlanToolKind,
} from "@baby-ui/react";

type Step = {
	id: string;
	label: string;
	tool: PlanToolKind;
	status: PlanStepStatus;
	seconds: number;
	log: string;
};

export function Example({ steps, stop }: { steps: Step[]; stop: () => void }) {
	const done = steps.filter((s) => s.status === "done").length;
	return (
		<PlanRunner>
			<PlanRunnerHeader>
				<PlanRunnerTitle>Fix tax rounding at checkout</PlanRunnerTitle>
			</PlanRunnerHeader>
			<PlanRunnerBody>
				<PlanRunnerProgress segments={steps} />
				<PlanRunnerSteps>
					{steps.map((s) => (
						<PlanRunnerStep key={s.id} status={s.status}>
							<PlanRunnerStepHead>
								<PlanRunnerTool kind={s.tool} />
								<PlanRunnerStepTitle>{s.label}</PlanRunnerStepTitle>
								<PlanRunnerTimer seconds={s.seconds} />
							</PlanRunnerStepHead>
							<PlanRunnerOutput open={s.status === "running"}>{s.log}</PlanRunnerOutput>
						</PlanRunnerStep>
					))}
				</PlanRunnerSteps>
			</PlanRunnerBody>
			<PlanRunnerFooter>
				<PlanRunnerSummary>
					{done} of {steps.length} steps
				</PlanRunnerSummary>
				<PlanRunnerStop onClick={stop} />
			</PlanRunnerFooter>
		</PlanRunner>
	);
}
