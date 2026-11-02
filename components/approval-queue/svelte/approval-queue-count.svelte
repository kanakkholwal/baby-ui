<script lang="ts">
import { cn } from "../../lib/cn";
import RollingDigits from "../../rolling-digits/svelte/rolling-digits.svelte";
import { approvalQueueState } from "./context";

let {
	value,
	label = "waiting",
	class: classProp,
}: {
	value: number;
	/** Read after the number by screen readers. */
	label?: string;
	class?: string;
} = $props();
const ctx = approvalQueueState("ApprovalQueueCount");
</script>

<!-- How many requests wait, rolling as it changes. -->
<span data-slot="approval-queue-count" class={cn(ctx.styles.count(), classProp)}>
	<span class="sr-only">{value} {label}</span>
	<span aria-hidden="true"><RollingDigits {value} /></span>
</span>
