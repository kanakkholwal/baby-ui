<script lang="ts">
import {
	Reasoning,
	ReasoningRows,
	ReasoningStep,
	ReasoningStepDetails,
	ReasoningStepSource,
	ReasoningStepSources,
	type ReasoningStepStatus,
	ReasoningSteps,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Reasoning>>(props));

const steps = [
	{
		label: "Read the brief",
		description: "Pulled the goals and constraints out of the request.",
	},
	{ label: "Search the docs" },
	{ label: "Compare two approaches" },
	{ label: "Draft the answer" },
];

const codingRows = [
	{ primary: "Read", secondary: "flavors.ts", mono: true },
	{ primary: "Edit", secondary: "ChurnSchedule.tsx", mono: true, add: 74, del: 41 },
	{ primary: "Run", secondary: "npm run freeze", mono: true },
];

const scripted = $derived(props.thinking !== false);
let progress = $state(0);

$effect(() => {
	if (!scripted) return;
	const id = setInterval(() => {
		progress = progress >= steps.length + 2 ? 0 : progress + 1;
	}, 1400);
	return () => clearInterval(id);
});

const step = $derived(scripted ? progress : steps.length);
const thinking = $derived(step < steps.length);

function stepStatus(index: number): ReasoningStepStatus {
	return index < step ? "done" : index === step ? "active" : "pending";
}
</script>

<div class="w-full max-w-96">
	<Reasoning
		{thinking}
		duration={thinking ? Math.round(step * 1.4) : Number(props.duration ?? 4)}
		defaultOpen={Boolean(props.defaultOpen)}
		variant={p.variant ?? "outline"}
		thinkingLabel={p.thinkingLabel || "Thinking"}
	>
		{#if p.variant === "inline"}
			<ReasoningRows kind="coding" rows={codingRows.slice(0, thinking ? step + 1 : 3)} />
		{:else}
		<ReasoningSteps>
			{#each steps as s, i (s.label)}
				<ReasoningStep label={s.label} description={s.description} status={stepStatus(i)}>
					{#if i === 1}
						<ReasoningStepSources>
							<ReasoningStepSource href="https://base-ui.com">base-ui.com</ReasoningStepSource>
							<ReasoningStepSource>svelte.dev</ReasoningStepSource>
						</ReasoningStepSources>
					{:else if i === 2}
						<ReasoningStepDetails summary="Why grid rows">
							<p>Animating grid-template-rows needs no height measuring.</p>
							<p>A height tween needs a ResizeObserver and still snaps.</p>
						</ReasoningStepDetails>
					{/if}
				</ReasoningStep>
			{/each}
		</ReasoningSteps>
		{/if}
	</Reasoning>
</div>
