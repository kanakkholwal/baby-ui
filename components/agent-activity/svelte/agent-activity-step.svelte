<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { AGENT_ACTIVITY_ICONS, type AgentActivityStepStatus } from "../variants";
import { agentActivityState } from "./context";

let {
	status = "done",
	meta,
	class: classProp,
	children,
}: {
	status?: AgentActivityStepStatus;
	/** Trailing detail, such as how long the step took. */
	meta?: string;
	class?: string;
	children: Snippet;
} = $props();
const activity = agentActivityState("AgentActivityStep");
const s = $derived(activity.styles);
</script>

<li data-slot="agent-activity-step" data-status={status} class={cn(s.row(), classProp)}>
	<span aria-hidden="true" class={s.icon()}>
		{#if status === "active"}
			<span class={s.pulse()}></span>
		{:else}
			<svg viewBox="0 0 24 24"><path d={status === "done" ? AGENT_ACTIVITY_ICONS.check : AGENT_ACTIVITY_ICONS.circle} /></svg>
		{/if}
	</span>
	<span data-status={status} class={s.label()}>{@render children()}</span>
	{#if meta}<span class={s.meta()}>{meta}</span>{/if}
</li>
