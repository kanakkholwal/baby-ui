"use client";

import {
	type TodoItem,
	TodoList,
	TodoListContent,
	TodoListTrigger,
	type TodoStatus,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const TASKS = [
	{ id: "audit", title: "Audit the checkout flow", detail: "4 files" },
	{ id: "repro", title: "Reproduce the 3DS failure" },
	{ id: "fix", title: "Handle requires_action in confirm" },
	{ id: "tests", title: "Add regression tests", detail: "2 specs" },
	{ id: "docs", title: "Note the fix in the changelog" },
];

// The demo plays a run: each task fills its ring, then the next starts; the list folds at the end.
export function TodoListDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof TodoList>>(props);
	const [tick, setTick] = useState(0);
	useEffect(() => {
		const id = setInterval(() => setTick((t) => (t >= 24 ? 0 : t + 1)), 400);
		return () => clearInterval(id);
	}, []);
	const stage = Math.floor(tick / 4);
	const items: TodoItem[] = TASKS.map((task, i) => {
		const status: TodoStatus =
			i < stage ? "completed" : i === stage ? "in-progress" : "pending";
		return {
			...task,
			status,
			progress: status === "in-progress" && i !== 1 ? ((tick % 4) + 1) * 25 : undefined,
		};
	});
	return (
		<div className="w-full max-w-sm">
			<TodoList
				items={items}
				variant={p.variant}
				collapseOnComplete={p.collapseOnComplete}
			>
				<TodoListTrigger title="Fix the checkout bug" />
				<TodoListContent />
			</TodoList>
		</div>
	);
}
