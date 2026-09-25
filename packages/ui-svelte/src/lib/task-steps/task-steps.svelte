<script lang="ts">
import {
	type TaskStatus as Status,
	TASK_STEP_LABELS,
	type TaskStepsSize,
	taskSteps,
} from "./variants";

export type TaskStatus = Status;
type Step = { id: string; label: string; status: TaskStatus };

let {
	steps,
	showConnector = true,
	compact = false,
	size = "md",
	labels,
	class: classProp,
}: {
	steps: Step[];
	showConnector?: boolean;
	compact?: boolean;
	size?: TaskStepsSize;
	/** Overrides for the screen-reader status words. */
	labels?: Partial<Record<TaskStatus, string>>;
	class?: string;
} = $props();

const LABEL = $derived({ ...TASK_STEP_LABELS, ...labels });
</script>

<ol aria-live="polite" class={taskSteps({ size }).root({ class: classProp })}>
	{#each steps as step, i (step.id)}
		{@const styles = taskSteps({ size, compact, status: step.status })}
		<li class={styles.item()}>
			{#if showConnector && i < steps.length - 1}
				<span aria-hidden="true" class={styles.connector()}></span>
			{/if}

			<span aria-hidden="true" class={styles.marker()}>
				{#if step.status === "done"}
					<svg viewBox="0 0 12 12" fill="none" class={styles.icon({ class: "checkbox-check" })} data-on="true">
						<path d="M2.5 6.2 4.8 8.5 9.5 3.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				{:else if step.status === "failed"}
					<svg viewBox="0 0 12 12" fill="none" class={styles.icon()}>
						<path d="M3.5 3.5 8.5 8.5M8.5 3.5 3.5 8.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
					</svg>
				{:else if step.status === "active"}
					<svg viewBox="0 0 12 12" fill="none" class={styles.icon({ class: "step-spinner" })}>
						<circle cx="6" cy="6" r="4.4" stroke="currentColor" stroke-width="1.5" opacity="0.25" />
						<path d="M10.4 6A4.4 4.4 0 0 0 6 1.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
					</svg>
				{:else}
					<span class={styles.dot()}></span>
				{/if}
			</span>

			<span class={styles.text()}>
				<span class={styles.label()}>{step.label}</span>
				<span class="sr-only">{LABEL[step.status]}</span>
			</span>
		</li>
	{/each}
</ol>
