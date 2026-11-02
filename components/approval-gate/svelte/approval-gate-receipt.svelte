<script lang="ts">
import { cn } from "../../lib/cn";
import Section from "./approval-gate-section.svelte";
import { approvalGateState } from "./context";

let { class: classProp }: { class?: string } = $props();

const ctx = approvalGateState("ApprovalGateReceipt");
</script>

<!-- The one-line outcome once decided: approved, denied or expired, with the tool and your note. -->
<Section open={ctx.resolved}>
	<p class={cn(ctx.styles.receipt(), classProp)}>
		<span aria-hidden="true" class={ctx.styles.receiptIcon()}>
			<svg viewBox="0 0 12 12" fill="none" aria-hidden="true" class="size-3">
				{#if ctx.status === "approved"}
					<path
						d="M2.5 6.2 4.8 8.5 9.5 3.6"
						stroke="currentColor"
						stroke-width="1.7"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				{:else if ctx.status === "denied"}
					<path
						d="M3.5 3.5 8.5 8.5M8.5 3.5 3.5 8.5"
						stroke="currentColor"
						stroke-width="1.7"
						stroke-linecap="round"
					/>
				{:else}
					<circle cx="6" cy="6" r="4.4" stroke="currentColor" stroke-width="1.4" />
					<path d="M6 3.8V6l1.4 1.2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
				{/if}
			</svg>
		</span>
		<span class={ctx.styles.receiptLabel()}>{ctx.labels[ctx.status]}</span>
		<span class={ctx.styles.tool()}>{ctx.request.tool}</span>
		{#if ctx.note}<span class={ctx.styles.note()}>{ctx.note}</span>{/if}
	</p>
</Section>
