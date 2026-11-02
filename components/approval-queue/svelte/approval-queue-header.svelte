<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { approvalQueueState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
const ctx = approvalQueueState("ApprovalQueueHeader");
</script>

<!-- The top row: lays out ApprovalQueueIcon, ApprovalQueueTitle and ApprovalQueueCount. -->
<div data-slot="approval-queue-header" class={cn(ctx.styles.header(), classProp)} {...rest}>
	{@render children?.()}
</div>
