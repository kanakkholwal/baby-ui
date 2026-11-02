<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { APPROVAL_QUEUE_ICONS } from "../variants";
import { approvalQueueState } from "./context";

let { class: classProp, children, ...rest }: HTMLAttributes<HTMLSpanElement> = $props();
const ctx = approvalQueueState("ApprovalQueueIcon");
</script>

<!-- The header glyph; children replace the raised hand. -->
<span aria-hidden="true" data-slot="approval-queue-icon" class={cn(ctx.styles.icon(), classProp)} {...rest}>
	{#if children}{@render children()}{:else}
		<svg viewBox="0 0 24 24" class="fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]"><path d={APPROVAL_QUEUE_ICONS.hand} /></svg>
	{/if}
</span>
