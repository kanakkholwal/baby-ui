<script lang="ts">
import { cn } from "../../lib/cn";
import RollingDigits from "../../rolling-digits/svelte/rolling-digits.svelte";
import { agentListState } from "./context";

let {
	value,
	label = "running",
	class: classProp,
}: { value: number; label?: string; class?: string } = $props();
const ctx = agentListState("AgentListCount");
</script>

<!-- "2 running": rolls as agents start and finish. -->
<span data-slot="agent-list-count" class={cn(ctx.styles.count(), classProp)}>
	<span class="sr-only">{value} {label}</span>
	<span aria-hidden="true"><RollingDigits {value} /> {label}</span>
</span>
