<script lang="ts">
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import { type Snippet, untrack } from "svelte";
import { cn } from "../../lib/cn";
import {
	type AgentActivityStatus,
	type AgentActivityVariant,
	agentActivity,
} from "../variants";
import { setAgentActivity } from "./context";

let {
	status = "working",
	open = $bindable(false),
	onOpenChange,
	collapseOnComplete = true,
	maxHeight = 208,
	variant = "plain",
	class: classProp,
	children,
}: {
	/** `working` keeps the log open and gliding; `complete` folds it behind the summary. */
	status?: AgentActivityStatus;
	/** Open after the run, when the log sits behind the summary; bindable. */
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	/** Fold the log away the moment the run completes. */
	collapseOnComplete?: boolean;
	/** In px: past it the live log glides up, and the finished one scrolls. */
	maxHeight?: number;
	variant?: AgentActivityVariant;
	class?: string;
	/** AgentActivityTrigger, then AgentActivityContent with the rows. */
	children: Snippet;
} = $props();

const working = $derived(status === "working");
let previous = untrack(() => status);
$effect.pre(() => {
	if (previous === "working" && status === "complete") open = !collapseOnComplete;
	previous = status;
});

const styles = $derived(agentActivity({ variant }));
setAgentActivity({
	get working() {
		return working;
	},
	get maxHeight() {
		return maxHeight;
	},
	get styles() {
		return styles;
	},
});
</script>

<CollapsiblePrimitive.Root
	data-slot="agent-activity"
	data-status={status}
	data-variant={variant}
	aria-busy={working}
	bind:open={
		() => working || open,
		(next) => {
			if (working) return;
			open = next;
			onOpenChange?.(next);
		}
	}
	class={cn(styles.root(), classProp)}
>
	{@render children()}
</CollapsiblePrimitive.Root>
