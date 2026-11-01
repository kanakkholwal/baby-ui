<script lang="ts">
import { cn } from "../../lib/cn";
import { type AgentActivityAction, actionIcon } from "../variants";
import { agentActivityState } from "./context";

let {
	action,
	target,
	additions,
	deletions,
	class: classProp,
}: {
	/** `read`, `edit` and `run` get their own icons; any other verb gets a wrench. */
	action: AgentActivityAction;
	/** What it acted on: a path, a command, a URL. */
	target: string;
	additions?: number;
	deletions?: number;
	class?: string;
} = $props();
const activity = agentActivityState("AgentActivityTool");
const s = $derived(activity.styles);
const verb = $derived(action.charAt(0).toUpperCase() + action.slice(1));
</script>

<li data-slot="agent-activity-tool" data-action={action} class={cn(s.row(), "items-center", classProp)}>
	<span aria-hidden="true" class={cn(s.icon(), "mt-0")}><svg viewBox="0 0 24 24"><path d={actionIcon(action)} /></svg></span>
	<span class={s.action()}>{verb}</span>
	<span class={s.target()}>{target}</span>
	{#if additions !== undefined || deletions !== undefined}
		<span class={s.diff()}>
			{#if additions !== undefined}<span class={s.added()}>+{additions}</span>{/if}
			{#if deletions !== undefined}<span class={s.removed()}>−{deletions}</span>{/if}
		</span>
	{/if}
</li>
