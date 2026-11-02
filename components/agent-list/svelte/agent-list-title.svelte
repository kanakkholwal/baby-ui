<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { agentListState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLHeadingElement> = $props();
const ctx = agentListState("AgentListTitle");
</script>

<h3 data-slot="agent-list-title" class={cn(ctx.styles.title(), classProp)} {...rest}>
	{#if children}{@render children()}{:else}Agents{/if}
</h3>
