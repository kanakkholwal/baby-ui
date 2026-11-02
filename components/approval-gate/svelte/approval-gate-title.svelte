<script lang="ts">
import { cn } from "../../lib/cn";
import { approvalGateState } from "./context";

let {
	headingLevel = 3,
	class: classProp,
}: { headingLevel?: 2 | 3 | 4 | 5 | 6; class?: string } = $props();

const ctx = approvalGateState("ApprovalGateTitle");
</script>

<!-- What the agent wants to do; `headingLevel` matches the page outline. -->
<svelte:element this={`h${headingLevel}`} id="{ctx.id}-title" class={cn(ctx.styles.title(), classProp)}>
	{ctx.request.title}
</svelte:element>
