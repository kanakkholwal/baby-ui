import { Reasoning, ReasoningStep, ReasoningSteps } from "@baby-ui/react";

export function Example() {
	return (
		<Reasoning thinking duration={4}>
			<ReasoningSteps>
				<ReasoningStep label="Read the spec" status="done" />
				<ReasoningStep label="Compare both ports" status="active" />
				<ReasoningStep label="Write the answer" status="pending" />
			</ReasoningSteps>
		</Reasoning>
	);
}
