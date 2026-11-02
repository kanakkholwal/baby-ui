<script lang="ts">
import { Accordion as AccordionPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { agentListItem, agentListState } from "./context";

let { class: classProp, children }: { class?: string; children?: Snippet } = $props();
const ctx = agentListState("AgentListContent");
const item = agentListItem("AgentListContent");
</script>

<!-- The open agent's detail: AgentListSteps and, when it needs you, AgentListDecision. -->
<AccordionPrimitive.Content forceMount>
	{#snippet child({ props, open })}
		<div {...props} id={item.content} role="region" aria-labelledby={item.trigger} inert={!open} data-slot="agent-list-content" class={ctx.styles.panel()}>
			<div class={ctx.styles.clip()}>
				<div class={cn(ctx.styles.body(), classProp)}>{@render children?.()}</div>
			</div>
		</div>
	{/snippet}
</AccordionPrimitive.Content>
