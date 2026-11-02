<script lang="ts">
import { Accordion as AccordionPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { APPROVAL_QUEUE_ICONS } from "../variants";
import { approvalQueueItem, approvalQueueState } from "./context";

let { class: classProp, children }: { class?: string; children?: Snippet } = $props();
const ctx = approvalQueueState("ApprovalQueueTrigger");
const ids = approvalQueueItem();
</script>

<!-- The one-line row: put ApprovalQueueKind, Label, Meta and a risk Badge in it. -->
<AccordionPrimitive.Header level={4}>
	<AccordionPrimitive.Trigger id={ids?.trigger} aria-controls={ids?.content} data-slot="approval-queue-trigger" class={cn(ctx.styles.trigger(), classProp)}>
		{@render children?.()}
		<svg viewBox="0 0 24 24" aria-hidden="true" class={ctx.styles.chevron()}><path d={APPROVAL_QUEUE_ICONS.chevron} /></svg>
	</AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
