<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { approvalQueueState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLHeadingElement> = $props();
const ctx = approvalQueueState("ApprovalQueueTitle");
</script>

<h3 data-slot="approval-queue-title" class={cn(ctx.styles.title(), classProp)} {...rest}>
	{#if children}{@render children()}{:else}Waiting for approval{/if}
</h3>
