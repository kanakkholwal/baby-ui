<script lang="ts">
import { Accordion as AccordionPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { approvalQueueState, setApprovalQueueItem } from "./context";

let {
	value,
	dismissed = false,
	class: classProp,
	children,
}: { value: string; dismissed?: boolean; class?: string; children?: Snippet } = $props();
const ctx = approvalQueueState("ApprovalQueueItem");
const uid = $props.id();
setApprovalQueueItem({ trigger: `${uid}-trigger`, content: `${uid}-content` });
</script>

<!-- One request. `dismissed` folds it away once decided; keep it in the list until then. -->
<div data-slot="approval-queue-item" data-dismissed={dismissed || undefined} inert={dismissed} class={cn(ctx.styles.item(), classProp)}>
	<div class={ctx.styles.clip()}>
		<AccordionPrimitive.Item {value} class={ctx.styles.row()}>
			{@render children?.()}
		</AccordionPrimitive.Item>
	</div>
</div>
