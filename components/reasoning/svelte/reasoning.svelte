<script lang="ts">
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import { type Snippet, untrack } from "svelte";
import { cn } from "../../lib/cn";
import { type ReasoningVariant, reasoning } from "../variants";
import { type ActiveStep, setReasoningContext } from "./context";

let {
	children,
	thinking = false,
	duration = 0,
	open = $bindable(),
	defaultOpen = false,
	onOpenChange,
	variant = "default",
	class: classProp,
}: {
	children?: Snippet;
	/** Model is still reasoning: the title shimmers, the icon pulses and the panel auto-opens. */
	thinking?: boolean;
	/** Seconds spent reasoning, passed in by the caller. */
	duration?: number;
	/** Controlled open state. Omit to open while thinking and close when done. */
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	variant?: ReasoningVariant;
	class?: string;
} = $props();

let touched = $state(false);
let manual = $state(untrack(() => defaultOpen));
let active = $state<ActiveStep | null>(null);
// Auto-open while thinking, auto-close when it ends, unless the reader has chosen.
const isOpen = $derived(open ?? (touched ? manual : thinking || defaultOpen));
const styles = $derived(reasoning({ variant }));

setReasoningContext({
	get thinking() {
		return thinking;
	},
	get duration() {
		return duration;
	},
	get open() {
		return isOpen;
	},
	get active() {
		return active;
	},
	get styles() {
		return styles;
	},
	setActive(step, id) {
		active = step ? step : active?.id === id ? null : active;
	},
});

function setOpen(next: boolean) {
	touched = true;
	manual = next;
	if (open !== undefined) open = next;
	onOpenChange?.(next);
}
</script>

<!-- The state of one reasoning block. Compose ReasoningTrigger and ReasoningContent inside it. -->
<CollapsiblePrimitive.Root
	data-slot="reasoning"
	data-variant={variant}
	bind:open={() => isOpen, setOpen}
	class={cn(styles.root(), classProp)}
>
	{@render children?.()}
</CollapsiblePrimitive.Root>
