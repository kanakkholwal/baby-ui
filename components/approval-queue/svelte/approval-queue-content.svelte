<script lang="ts">
import { Accordion as AccordionPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { approvalQueueItem, approvalQueueState } from "./context";

let { class: classProp, children }: { class?: string; children?: Snippet } = $props();
const ctx = approvalQueueState("ApprovalQueueContent");
const ids = approvalQueueItem();
</script>

<!-- The open request's detail, usually an ApprovalGate. -->
<AccordionPrimitive.Content forceMount>
	{#snippet child({ props, open })}
		<div {...props} id={ids?.content} role="region" aria-labelledby={ids?.trigger} inert={!open} data-slot="approval-queue-content" class={ctx.styles.panel()}>
			<div class={ctx.styles.clip()}>
				<div class={cn(ctx.styles.body(), classProp)}>{@render children?.()}</div>
			</div>
		</div>
	{/snippet}
</AccordionPrimitive.Content>
