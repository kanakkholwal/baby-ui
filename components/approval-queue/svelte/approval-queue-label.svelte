<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { approvalQueueState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLSpanElement> = $props();
const ctx = approvalQueueState("ApprovalQueueLabel");
</script>

<span class={cn(ctx.styles.label(), classProp)} {...rest}>{@render children?.()}</span>
