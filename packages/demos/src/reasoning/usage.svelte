<script lang="ts">
import {
	Reasoning,
	ReasoningChevron,
	ReasoningContent,
	ReasoningDuration,
	ReasoningIcon,
	ReasoningPreview,
	ReasoningStep,
	ReasoningStepDetails,
	ReasoningStepSource,
	ReasoningStepSources,
	type ReasoningStepStatus,
	ReasoningSteps,
	ReasoningTitle,
	ReasoningTrigger,
	type ReasoningVariant,
} from "@baby-ui/svelte";

let { variant = "default", live = true }: { variant?: ReasoningVariant; live?: boolean } =
	$props();

const STEPS = [
	{
		label: "Read the brief",
		description: "Pulled the goals and constraints out of the request.",
	},
	{ label: "Search the docs" },
	{ label: "Compare two approaches" },
	{ label: "Draft the answer" },
];

// Stands in for your model's events: one step lands every 1.4 seconds, then it starts over.
let progress = $state(1);
$effect(() => {
	if (!live) return;
	const id = setInterval(() => {
		progress = progress >= STEPS.length + 2 ? 0 : progress + 1;
	}, 1400);
	return () => clearInterval(id);
});

const step = $derived(live ? progress : STEPS.length);
const thinking = $derived(step < STEPS.length);
const seconds = $derived(Math.round(step * 1.4 * 10) / 10);

function statusOf(index: number): ReasoningStepStatus {
	return index < step ? "done" : index === step ? "active" : "pending";
}
</script>

<div class="w-full max-w-sm">
	<Reasoning {thinking} duration={seconds} {variant}>
		<ReasoningTrigger>
			<ReasoningIcon />
			<ReasoningTitle>Thought for {seconds}s</ReasoningTitle>
			<ReasoningDuration />
			<ReasoningPreview />
			<ReasoningChevron />
		</ReasoningTrigger>
		<ReasoningContent>
			<ReasoningSteps>
				{#each STEPS as entry, index (entry.label)}
					<ReasoningStep label={entry.label} description={entry.description} status={statusOf(index)}>
						{#if index === 1}
							<ReasoningStepSources>
								<ReasoningStepSource href="https://base-ui.com">base-ui.com</ReasoningStepSource>
								<ReasoningStepSource>svelte.dev</ReasoningStepSource>
							</ReasoningStepSources>
						{:else if index === 2}
							<ReasoningStepDetails summary="Why grid rows">
								<p>Animating grid-template-rows needs no height measuring.</p>
								<p>A height tween needs a ResizeObserver and still snaps.</p>
							</ReasoningStepDetails>
						{/if}
					</ReasoningStep>
				{/each}
			</ReasoningSteps>
		</ReasoningContent>
	</Reasoning>
</div>
