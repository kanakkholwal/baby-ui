<script lang="ts">
import {
	type TodoItem,
	TodoList,
	TodoListContent,
	TodoListTrigger,
} from "@baby-ui/svelte";

let { items }: { items: TodoItem[] } = $props();
</script>

<TodoList {items}>
	<TodoListTrigger title="Plan" />
	<TodoListContent />
</TodoList>
