<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { approvalQueueState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
const ctx = approvalQueueState("ApprovalQueueList");
</script>

<div data-slot="approval-queue-list" class={cn(ctx.styles.list(), classProp)} {...rest}>
	{@render children?.()}
</div>
