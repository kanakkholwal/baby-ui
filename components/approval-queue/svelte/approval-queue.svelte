<script lang="ts">
import { Accordion as AccordionPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { type ApprovalQueueVariant, approvalQueue } from "../variants";
import { setApprovalQueue } from "./context";

let {
	value,
	onValueChange,
	variant = "framed",
	class: classProp,
	children,
}: {
	/** The request under review, by item value; null folds every row. */
	value: string | null;
	/** A row was opened or closed; move `value` to it. */
	onValueChange?: (value: string | null) => void;
	variant?: ApprovalQueueVariant;
	class?: string;
	children?: Snippet;
} = $props();

const styles = $derived(approvalQueue({ variant }));
setApprovalQueue({
	get styles() {
		return styles;
	},
});
</script>

<!-- The root: requests waiting on a person, one open for review and the rest as rows. -->
<AccordionPrimitive.Root
	type="single"
	bind:value={() => value ?? "", (next) => onValueChange?.(next || null)}
>
	{#snippet child({ props })}
		<section {...props} data-slot="approval-queue" data-variant={variant} class={cn(styles.root(), classProp)}>
			{@render children?.()}
		</section>
	{/snippet}
</AccordionPrimitive.Root>
