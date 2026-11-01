<script lang="ts">
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import { cn } from "../../lib/cn";
import ShimmerText from "../../shimmer-text/svelte/shimmer-text.svelte";
import { AGENT_ACTIVITY_ICONS } from "../variants";
import { agentActivityState } from "./context";

let {
	label = "Working…",
	summary,
	class: classProp,
}: {
	/** Shown, shimmering, while the run works. */
	label?: string;
	/** What the finished run did, e.g. "Worked for 12s, searched 3 sites". */
	summary: string;
	class?: string;
} = $props();
const activity = agentActivityState("AgentActivityTrigger");
</script>

{#if activity.working}
	<div data-slot="agent-activity-trigger" role="status" class={cn(activity.styles.status(), classProp)}>
		<ShimmerText as="span" text={label} />
	</div>
{:else}
	<CollapsiblePrimitive.Trigger data-slot="agent-activity-trigger" class={cn(activity.styles.trigger(), classProp)}>
		<span class={activity.styles.summary()}>{summary}</span>
		<svg viewBox="0 0 24 24" aria-hidden="true" class={activity.styles.chevron()}><path d={AGENT_ACTIVITY_ICONS.chevron} /></svg>
	</CollapsiblePrimitive.Trigger>
{/if}
