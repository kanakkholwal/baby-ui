<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLOlAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import {
	TASK_STEP_LABELS,
	type TaskStatus,
	type TaskStepsSize,
	type TaskStepsVariant,
	taskSteps,
} from "../variants";
import { setTaskSteps } from "./context";

let {
	variant = "timeline",
	size = "default",
	compact = false,
	showConnector = true,
	labels,
	class: classProp,
	children,
	...rest
}: Omit<HTMLOlAttributes, "children"> & {
	/** Timeline ticks down a connector; capsules and list are rows that expand onto their details. */
	variant?: TaskStepsVariant;
	size?: TaskStepsSize;
	compact?: boolean;
	/** Timeline: the line between markers. */
	showConnector?: boolean;
	/** Replaces the screen-reader status words, e.g. for another language. */
	labels?: Partial<Record<TaskStatus, string>>;
	/** TaskStep items. */
	children: Snippet;
} = $props();

const styles = $derived(taskSteps({ variant, size, compact }));
const merged = $derived({ ...TASK_STEP_LABELS, ...labels });
setTaskSteps({
	get variant() {
		return variant;
	},
	get size() {
		return size;
	},
	get showConnector() {
		return showConnector;
	},
	get labels() {
		return merged;
	},
	get styles() {
		return styles;
	},
});
</script>

<ol aria-live="polite" data-slot="task-steps" data-variant={variant} class={cn(styles.root(), classProp)} {...rest}>
	{@render children()}
</ol>
