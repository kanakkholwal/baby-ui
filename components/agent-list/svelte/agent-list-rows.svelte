<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { agentListState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
const ctx = agentListState("AgentListRows");
</script>

<div data-slot="agent-list-rows" class={cn(ctx.styles.list(), classProp)} {...rest}>
	{@render children?.()}
</div>
