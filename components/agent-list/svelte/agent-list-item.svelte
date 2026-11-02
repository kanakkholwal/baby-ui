<script lang="ts">
import { Accordion as AccordionPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import type { AgentStatus } from "../variants";
import { agentListState, setAgentListItem } from "./context";

let {
	value,
	status,
	class: classProp,
	children,
}: { value: string; status: AgentStatus; class?: string; children?: Snippet } = $props();
const ctx = agentListState("AgentListItem");
const uid = $props.id();
setAgentListItem({
	get status() {
		return status;
	},
	trigger: `${uid}-trigger`,
	content: `${uid}-content`,
});
</script>

<!-- One agent; `status` drives its marker and the "needs you" tint. -->
<AccordionPrimitive.Item {value} data-slot="agent-list-item" data-status={status} class={cn(ctx.styles.item(), classProp)}>
	{@render children?.()}
</AccordionPrimitive.Item>
