import { getContext, hasContext, setContext } from "svelte";
import type { TodoItem, todoList } from "../variants";

export interface TodoListState {
	readonly items: TodoItem[];
	readonly completed: number;
	readonly styles: ReturnType<typeof todoList>;
}

const KEY = Symbol("todo-list");

/** The root's state behind getters, so every part reads the latest value. */
export const setTodoList = (state: TodoListState) => setContext(KEY, state);
export function todoListState(part: string): TodoListState {
	if (!hasContext(KEY)) throw new Error(`${part} must be used inside <TodoList>`);
	return getContext<TodoListState>(KEY);
}
