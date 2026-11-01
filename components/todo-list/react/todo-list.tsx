"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import {
	type ComponentProps,
	createContext,
	type ReactNode,
	useContext,
	useId,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { cn } from "../../lib/cn";
import { RollingDigits } from "../../rolling-digits/react/rolling-digits";
import {
	arcOffset,
	TODO_ICONS,
	TODO_STATUS_TEXT,
	type TodoItem,
	type TodoListVariant,
	type TodoStatus,
	todoList,
} from "../variants";

export type { TodoItem, TodoListVariant, TodoStatus };

type Ctx = {
	items: TodoItem[];
	completed: number;
	panelId: string;
	styles: ReturnType<typeof todoList>;
};
const TodoListContext = createContext<Ctx | null>(null);

function useTodoList(part: string): Ctx {
	const ctx = useContext(TodoListContext);
	if (!ctx) throw new Error(`${part} must be used inside <TodoList>`);
	return ctx;
}

export interface TodoListProps extends Omit<ComponentProps<"div">, "children"> {
	/** The agent's tasks in order; update statuses as it works. */
	items: TodoItem[];
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	/** Fold the list once every task is completed, and open it again if one reopens. */
	collapseOnComplete?: boolean;
	variant?: TodoListVariant;
	/** TodoListTrigger, then TodoListContent. */
	children: ReactNode;
}

/** The root: an agent's to-do list with a running count, folding away once all are done. */
export function TodoList({
	items,
	open,
	defaultOpen = true,
	onOpenChange,
	collapseOnComplete = true,
	variant = "outline",
	className,
	children,
	...props
}: TodoListProps) {
	const [own, setOwn] = useState(defaultOpen);
	const current = open ?? own;
	const completed = items.filter((item) => item.status === "completed").length;
	const complete = items.length > 0 && completed === items.length;
	const setOpen = (next: boolean) => {
		if (open === undefined) setOwn(next);
		onOpenChange?.(next);
	};

	// Adjusted during render, so the fold starts on the same frame the last task completes.
	const [wasComplete, setWasComplete] = useState(complete);
	if (wasComplete !== complete) {
		setWasComplete(complete);
		if (complete && collapseOnComplete) setOpen(false);
		else if (!complete) setOpen(true);
	}

	const panelId = useId();
	const styles = todoList({ variant });
	return (
		<TodoListContext.Provider value={{ items, completed, panelId, styles }}>
			<CollapsiblePrimitive.Root
				open={current}
				onOpenChange={setOpen}
				render={<section />}
				data-slot="todo-list"
				data-variant={variant}
				data-complete={complete || undefined}
				aria-label="Agent task list"
				className={cn(styles.root(), className)}
				{...props}
			>
				{children}
			</CollapsiblePrimitive.Root>
		</TodoListContext.Provider>
	);
}

/** The header: an icon that turns into a tick when all are done, the title and "2/5". */
export function TodoListTrigger({
	title = "To-dos",
	className,
}: {
	title?: ReactNode;
	className?: string;
}) {
	const { items, completed, panelId, styles: s } = useTodoList("TodoListTrigger");
	return (
		<CollapsiblePrimitive.Trigger
			data-slot="todo-list-trigger"
			aria-controls={panelId}
			className={cn(s.trigger(), className)}
		>
			<span aria-hidden className={s.headerIcon()}>
				<svg viewBox="0 0 24 24" aria-hidden className={s.listIcon()}>
					<path d={TODO_ICONS.list} />
				</svg>
				<svg viewBox="0 0 24 24" aria-hidden className={s.doneIcon()}>
					<circle cx="12" cy="12" r="9" fill="currentColor" />
					<path
						d={TODO_ICONS.check}
						pathLength={1}
						fill="none"
						stroke="white"
						strokeWidth="2.25"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</span>
			<span className={s.title()}>{title}</span>
			<span className={s.count()}>
				<span className="sr-only">
					{completed} of {items.length} tasks completed
				</span>
				<span aria-hidden className="inline-flex">
					<RollingDigits value={completed} />/{items.length}
				</span>
			</span>
			<svg viewBox="0 0 24 24" aria-hidden className={s.chevron()}>
				<path d={TODO_ICONS.chevron} />
			</svg>
		</CollapsiblePrimitive.Trigger>
	);
}

function StatusIcon({
	status,
	progress,
	styles: s,
}: {
	status: TodoStatus;
	progress?: number;
	styles: Ctx["styles"];
}) {
	return (
		<svg aria-hidden viewBox="0 0 24 24" data-status={status} className={s.status()}>
			<circle cx="12" cy="12" r="9" data-status={status} className={s.ring()} />
			<circle
				cx="12"
				cy="12"
				r="9"
				pathLength={1}
				data-status={status}
				data-spin={(status === "in-progress" && progress === undefined) || undefined}
				style={{ strokeDashoffset: arcOffset(status, progress) }}
				className={s.arc()}
			/>
			<path
				d={TODO_ICONS.check}
				pathLength={1}
				data-on={status === "completed" || undefined}
				className={s.tick()}
			/>
			<path
				d={TODO_ICONS.cross}
				pathLength={1}
				data-on={status === "cancelled" || undefined}
				className={s.tick()}
			/>
		</svg>
	);
}

/** The list itself; it scrolls past `maxHeight` and follows newly added tasks. */
export function TodoListContent({
	maxHeight = 248,
	emptyText = "No tasks yet",
	className,
}: {
	maxHeight?: number;
	emptyText?: ReactNode;
	className?: string;
}) {
	const { items, panelId, styles: s } = useTodoList("TodoListContent");
	const viewportRef = useRef<HTMLDivElement>(null);
	const count = items.length;
	const seen = useRef(count);

	useLayoutEffect(() => {
		const viewport = viewportRef.current;
		if (!viewport || count <= seen.current) {
			seen.current = count;
			return;
		}
		seen.current = count;
		const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
		viewport.scrollTo({
			top: viewport.scrollHeight,
			behavior: reduce ? "auto" : "smooth",
		});
	}, [count]);

	return (
		// keepMounted still sets `hidden`; force it off so the rows transition has a frame.
		<CollapsiblePrimitive.Panel
			id={panelId}
			keepMounted
			hidden={false}
			data-slot="todo-list-content"
			className={s.panel()}
		>
			<div className={s.clip()}>
				<div
					ref={viewportRef}
					style={{ maxHeight }}
					className={cn(s.viewport(), className)}
				>
					{count ? (
						<ol aria-live="polite" className={s.list()}>
							{items.map((item) => {
								const status = item.status ?? "pending";
								return (
									<li
										key={item.id}
										data-slot="todo-list-item"
										data-status={status}
										className={s.item()}
									>
										<StatusIcon status={status} progress={item.progress} styles={s} />
										<span className="sr-only">{TODO_STATUS_TEXT[status]}: </span>
										<span data-status={status} className={s.label()}>
											<span className={s.strike()}>
												{item.title}
												<span
													aria-hidden
													data-on={status === "completed" || undefined}
													className={s.line()}
												/>
											</span>
										</span>
										{item.detail && <span className={s.detail()}>{item.detail}</span>}
									</li>
								);
							})}
						</ol>
					) : (
						<p className={s.empty()}>{emptyText}</p>
					)}
				</div>
			</div>
		</CollapsiblePrimitive.Panel>
	);
}
