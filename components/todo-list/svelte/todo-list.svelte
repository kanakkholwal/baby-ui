<script lang="ts">
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import { type Snippet, untrack } from "svelte";
import { cn } from "../../lib/cn";
import { type TodoItem, type TodoListVariant, todoList } from "../variants";
import { setTodoList } from "./context";

let {
	items,
	open = $bindable(true),
	onOpenChange,
	collapseOnComplete = true,
	variant = "outline",
	class: classProp,
	children,
}: {
	/** The agent's tasks in order; update statuses as it works. */
	items: TodoItem[];
	/** Whether the list shows; bindable. */
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	/** Fold the list once every task is completed, and open it again if one reopens. */
	collapseOnComplete?: boolean;
	variant?: TodoListVariant;
	class?: string;
	/** TodoListTrigger, then TodoListContent. */
	children: Snippet;
} = $props();

const completed = $derived(items.filter((item) => item.status === "completed").length);
const complete = $derived(items.length > 0 && completed === items.length);
const setOpen = (next: boolean) => {
	open = next;
	onOpenChange?.(next);
};
let wasComplete = untrack(() => complete);
$effect.pre(() => {
	const now = complete;
	untrack(() => {
		if (now === wasComplete) return;
		wasComplete = now;
		if (now && collapseOnComplete) setOpen(false);
		else if (!now) setOpen(true);
	});
});

const styles = $derived(todoList({ variant }));
setTodoList({
	get items() {
		return items;
	},
	get completed() {
		return completed;
	},
	get styles() {
		return styles;
	},
});
</script>

<!-- The root: an agent's to-do list with a running count, folding away once all are done. -->
<CollapsiblePrimitive.Root bind:open={() => open, setOpen}>
	{#snippet child({ props })}
		<section {...props} data-slot="todo-list" data-variant={variant} data-complete={complete || undefined} aria-label="Agent task list" class={cn(styles.root(), classProp)}>
			{@render children()}
		</section>
	{/snippet}
</CollapsiblePrimitive.Root>
