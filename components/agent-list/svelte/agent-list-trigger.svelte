<script lang="ts">
import { Accordion as AccordionPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { AGENT_LIST_CHEVRON } from "../variants";
import { agentListItem, agentListState } from "./context";

let { class: classProp, children }: { class?: string; children?: Snippet } = $props();
const ctx = agentListState("AgentListTrigger");
const item = agentListItem("AgentListTrigger");
</script>

<!-- The row: put AgentListStatus, AgentListHeading and AgentListDiff in it. -->
<AccordionPrimitive.Header level={4}>
	<AccordionPrimitive.Trigger id={item.trigger} aria-controls={item.content} data-slot="agent-list-trigger" class={cn(ctx.styles.trigger(), classProp)}>
		{@render children?.()}
		<svg viewBox="0 0 24 24" aria-hidden="true" class={ctx.styles.chevron()}><path d={AGENT_LIST_CHEVRON} /></svg>
	</AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
