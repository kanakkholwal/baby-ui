<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { AGENT_ACTIVITY_ICONS } from "../variants";
import { agentActivityState } from "./context";

let {
	query,
	more = 0,
	class: classProp,
	children,
}: {
	query: string;
	/** Results found but not listed, shown as "+N more". */
	more?: number;
	class?: string;
	/** AgentActivityResult rows, added as they arrive. */
	children?: Snippet;
} = $props();
const activity = agentActivityState("AgentActivitySearch");
const s = $derived(activity.styles);
</script>

<li data-slot="agent-activity-search" class={cn(s.search(), classProp)}>
	<div class={cn(s.row(), "text-muted-foreground")}>
		<span aria-hidden="true" class={s.icon()}><svg viewBox="0 0 24 24"><path d={AGENT_ACTIVITY_ICONS.search} /></svg></span>
		<span class="min-w-0 truncate">{query}</span>
	</div>
	{#if children}<div class={s.results()}>{@render children()}</div>{/if}
	{#if more > 0}<div class={s.more()}>+{more} more</div>{/if}
</li>
