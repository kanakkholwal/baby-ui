<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { agentListState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
const ctx = agentListState("AgentListHeader");
</script>

<!-- The top row: lays out AgentListTitle and AgentListCount. -->
<div data-slot="agent-list-header" class={cn(ctx.styles.header(), classProp)} {...rest}>
	{@render children?.()}
</div>
