<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { AGENT_ACTIVITY_ICONS } from "../variants";
import { agentActivityState } from "./context";

let {
	href,
	domain,
	icon,
	class: classProp,
	children,
}: {
	/** Makes the result a link to the source. */
	href?: string;
	domain?: string;
	/** A favicon or mark; a globe by default. */
	icon?: Snippet;
	class?: string;
	children: Snippet;
} = $props();
const activity = agentActivityState("AgentActivityResult");
const s = $derived(activity.styles);
</script>

{#snippet body()}
	<span aria-hidden="true" class={s.resultIcon()}>
		{#if icon}{@render icon()}{:else}<svg viewBox="0 0 24 24"><path d={AGENT_ACTIVITY_ICONS.globe} /></svg>{/if}
	</span>
	<span class={s.resultTitle()}>{@render children()}</span>
	{#if domain}<span class={s.resultDomain()}>{domain}</span>{/if}
{/snippet}

{#if href}
	<a data-slot="agent-activity-result" data-link {href} target="_blank" rel="noreferrer noopener" class={cn(s.result(), classProp)}>{@render body()}</a>
{:else}
	<div data-slot="agent-activity-result" class={cn(s.result(), classProp)}>{@render body()}</div>
{/if}
