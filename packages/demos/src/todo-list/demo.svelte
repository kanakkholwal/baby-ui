<script lang="ts">
import {
	type TodoItem,
	TodoList,
	TodoListContent,
	TodoListTrigger,
	type TodoStatus,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof TodoList>>(props));

const TASKS = [
	{ id: "audit", title: "Audit the checkout flow", detail: "4 files" },
	{ id: "repro", title: "Reproduce the 3DS failure" },
	{ id: "fix", title: "Handle requires_action in confirm" },
	{ id: "tests", title: "Add regression tests", detail: "2 specs" },
	{ id: "docs", title: "Note the fix in the changelog" },
];

// The demo plays a run: each task fills its ring, then the next starts; the list folds at the end.
let tick = $state(0);
$effect(() => {
	const id = setInterval(() => (tick = tick >= 24 ? 0 : tick + 1), 400);
	return () => clearInterval(id);
});
const stage = $derived(Math.floor(tick / 4));
const items = $derived<TodoItem[]>(
	TASKS.map((task, i) => {
		const status: TodoStatus =
			i < stage ? "completed" : i === stage ? "in-progress" : "pending";
		return {
			...task,
			status,
			progress: status === "in-progress" && i !== 1 ? ((tick % 4) + 1) * 25 : undefined,
		};
	}),
);
</script>

<div class="w-full max-w-sm">
	<TodoList {items} variant={p.variant} collapseOnComplete={p.collapseOnComplete}>
		<TodoListTrigger title="Fix the checkout bug" />
		<TodoListContent />
	</TodoList>
</div>
