<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { approvalQueueState } from "./context";

let {
	open,
	class: classProp,
	children,
}: { open: boolean; class?: string; children?: Snippet } = $props();
const ctx = approvalQueueState("ApprovalQueueEmpty");
</script>

<!-- Unfolds when `open`, i.e. nothing is waiting. -->
<div data-slot="approval-queue-empty" data-open={open || undefined} aria-hidden={!open} class={ctx.styles.panel()}>
	<div class={ctx.styles.clip()}>
		<p class={cn(ctx.styles.empty(), classProp)}>
			{#if children}{@render children()}{:else}Nothing is waiting on you.{/if}
		</p>
	</div>
</div>
