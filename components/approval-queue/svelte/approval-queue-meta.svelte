<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { approvalQueueState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLSpanElement> = $props();
const ctx = approvalQueueState("ApprovalQueueMeta");
</script>

<!-- The tool name, in monospace; hidden on narrow screens. -->
<span class={cn(ctx.styles.meta(), classProp)} {...rest}>{@render children?.()}</span>
