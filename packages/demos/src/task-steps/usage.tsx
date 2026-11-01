"use client";

import {
	type TaskStatus,
	TaskStep,
	TaskStepDetail,
	TaskStepDetails,
	TaskSteps,
	TaskStepsHeader,
} from "@baby-ui/react";

export function Example({
	steps,
	retry,
}: {
	steps: { id: string; label: string; status: TaskStatus; files?: string[] }[];
	retry: (id: string) => void;
}) {
	return (
		<div>
			<TaskStepsHeader
				title="Plan"
				done={steps.filter((s) => s.status === "done").length}
				total={steps.length}
			/>
			<TaskSteps>
				{steps.map((step) => (
					<TaskStep
						key={step.id}
						label={step.label}
						status={step.status}
						onRetry={() => retry(step.id)}
					>
						{step.files && (
							<TaskStepDetails>
								{step.files.map((file) => (
									<TaskStepDetail key={file}>{file}</TaskStepDetail>
								))}
							</TaskStepDetails>
						)}
					</TaskStep>
				))}
			</TaskSteps>
		</div>
	);
}
