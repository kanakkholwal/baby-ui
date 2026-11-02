<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { agentListState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
const ctx = agentListState("AgentListFooter");
</script>

<!-- Below the rows, e.g. a Composer that queues the next agent. -->
<div data-slot="agent-list-footer" class={cn(ctx.styles.footer(), classProp)} {...rest}>
	{@render children?.()}
</div>
