"use client";

import {
	type TodoItem,
	TodoList,
	TodoListContent,
	TodoListTrigger,
} from "@baby-ui/react";

export function Example({ items }: { items: TodoItem[] }) {
	return (
		<TodoList items={items}>
			<TodoListTrigger title="Plan" />
			<TodoListContent />
		</TodoList>
	);
}
