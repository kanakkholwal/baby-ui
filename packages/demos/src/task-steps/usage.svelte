<script lang="ts">
import { type TaskStatus, TaskStep, TaskSteps, TaskStepsHeader } from "@baby-ui/svelte";

let {
	steps,
	retry,
}: {
	steps: { id: string; label: string; status: TaskStatus }[];
	retry: (id: string) => void;
} = $props();
</script>

<TaskStepsHeader title="Plan" done={steps.filter((s) => s.status === "done").length} total={steps.length} />
<TaskSteps>
	{#each steps as step (step.id)}
		<TaskStep label={step.label} status={step.status} onRetry={() => retry(step.id)} />
	{/each}
</TaskSteps>
