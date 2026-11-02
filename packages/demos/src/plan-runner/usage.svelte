<script lang="ts">
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
} from "@baby-ui/svelte";

type Step = {
	id: string;
	label: string;
	tool: PlanToolKind;
	status: PlanStepStatus;
	seconds: number;
	log: string;
};

let { steps, stop }: { steps: Step[]; stop: () => void } = $props();
const done = $derived(steps.filter((s) => s.status === "done").length);
</script>

<PlanRunner>
	<PlanRunnerHeader>
		<PlanRunnerTitle>Fix tax rounding at checkout</PlanRunnerTitle>
	</PlanRunnerHeader>
	<PlanRunnerBody>
		<PlanRunnerProgress segments={steps} />
		<PlanRunnerSteps>
			{#each steps as s (s.id)}
				<PlanRunnerStep status={s.status}>
					<PlanRunnerStepHead>
						<PlanRunnerTool kind={s.tool} />
						<PlanRunnerStepTitle>{s.label}</PlanRunnerStepTitle>
						<PlanRunnerTimer seconds={s.seconds} />
					</PlanRunnerStepHead>
					<PlanRunnerOutput open={s.status === "running"}>{s.log}</PlanRunnerOutput>
				</PlanRunnerStep>
			{/each}
		</PlanRunnerSteps>
	</PlanRunnerBody>
	<PlanRunnerFooter>
		<PlanRunnerSummary>{done} of {steps.length} steps</PlanRunnerSummary>
		<PlanRunnerStop onclick={stop} />
	</PlanRunnerFooter>
</PlanRunner>
