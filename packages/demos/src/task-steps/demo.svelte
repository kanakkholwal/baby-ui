<script lang="ts">
import {
	type TaskStatus,
	TaskStep,
	TaskStepDetail,
	TaskStepDetails,
	TaskSteps,
	TaskStepsHeader,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof TaskSteps>>(props));

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
];

let tick = $state(0);
let failed = $state(true);
$effect(() => {
	const id = setInterval(() => {
		if (tick < 16) tick += 1;
	}, 500);
	return () => clearInterval(id);
});

// Each step takes four ticks; the third fails once, until Retry runs it again.
const stage = $derived(Math.floor(tick / 4));
const statusOf = (i: number): TaskStatus => {
	if (failed && stage >= 2) return i < 2 ? "done" : i === 2 ? "failed" : "pending";
	return i < stage ? "done" : i === stage ? "active" : "pending";
};
const done = $derived(PLAN.filter((_, i) => statusOf(i) === "done").length);
</script>

<div class="flex w-full max-w-[27.5rem] flex-col">
	<TaskStepsHeader title="Restock plan" {done} total={PLAN.length} />
	<TaskSteps variant={p.variant} size={p.size} compact={p.compact} showConnector={p.showConnector}>
		{#each PLAN as step, i (step.id)}
			{#if step.details.length}
				<TaskStep label={step.label} meta={step.meta} step={i + 1} status={statusOf(i)} progress={(tick % 4) / 4} onRetry={() => { failed = false; tick = 8; }}>
					<TaskStepDetails>
						{#each step.details as [label, meta] (label)}
							<TaskStepDetail {meta}>{label}</TaskStepDetail>
						{/each}
					</TaskStepDetails>
				</TaskStep>
			{:else}
				<TaskStep label={step.label} meta={step.meta} step={i + 1} status={statusOf(i)} progress={(tick % 4) / 4} />
			{/if}
		{/each}
	</TaskSteps>
</div>
