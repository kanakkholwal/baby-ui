<script lang="ts">
import { cn } from "../../lib/cn";
import { agentListState } from "./context";

let {
	added,
	removed,
	class: classProp,
}: { added: number; removed: number; class?: string } = $props();
const ctx = agentListState("AgentListDiff");
</script>

<!-- Lines the agent added and removed. -->
<span class={cn(ctx.styles.diff(), classProp)}>
	<span class={ctx.styles.added()}><span aria-hidden="true">+</span><span class="sr-only">added </span>{added}</span>
	<span class={ctx.styles.removed()}><span aria-hidden="true">−</span><span class="sr-only">removed </span>{removed}</span>
</span>
