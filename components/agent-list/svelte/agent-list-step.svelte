<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import type { AgentStepStatus } from "../variants";
import { agentListState } from "./context";

let {
	status = "done",
	class: classProp,
	children,
}: { status?: AgentStepStatus; class?: string; children?: Snippet } = $props();
const ctx = agentListState("AgentListStep");
</script>

<li data-status={status} class={cn(ctx.styles.step(), classProp)}>
	<span aria-hidden="true" data-status={status} class={ctx.styles.stepDot()}></span>
	<span class="min-w-0 truncate">{@render children?.()}</span>
</li>
