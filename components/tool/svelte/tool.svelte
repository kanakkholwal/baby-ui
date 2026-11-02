<script lang="ts">
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import { type Snippet, untrack } from "svelte";
import { cn } from "../../lib/cn";
import { type ToolState, type ToolVariant, tool } from "../variants";
import { setToolContext } from "./context";

let {
	status = "running",
	open = $bindable(false),
	onOpenChange,
	collapseOnComplete = false,
	variant = "card",
	class: classProp,
	children,
}: {
	/** Where the call is. Starting to run opens the panel, so its output can be followed. */
	status?: ToolState;
	/** Whether the input and output show; bindable. */
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	/** Fold the panel once the call finishes, leaving the one-line row. */
	collapseOnComplete?: boolean;
	variant?: ToolVariant;
	class?: string;
	/** ToolTrigger, then ToolContent with ToolInput, ToolOutput and ToolActions. */
	children: Snippet;
} = $props();

const setOpen = (next: boolean) => {
	open = next;
	onOpenChange?.(next);
};
let previous = untrack(() => status);
$effect.pre(() => {
	const next = status;
	untrack(() => {
		// A tool waiting on approval opens too, so its gate is in view.
		if (next !== previous && (next === "running" || next === "approval")) setOpen(true);
		else if (previous === "running" && next !== "running" && collapseOnComplete)
			setOpen(false);
		previous = next;
	});
});

const styles = $derived(tool({ variant }));
setToolContext({
	get status() {
		return status;
	},
	get styles() {
		return styles;
	},
});
</script>

<CollapsiblePrimitive.Root
	data-slot="tool"
	data-status={status}
	data-variant={variant}
	aria-busy={status === "running"}
	bind:open={() => open, setOpen}
	class={cn(styles.root(), classProp)}
>
	{@render children()}
</CollapsiblePrimitive.Root>
