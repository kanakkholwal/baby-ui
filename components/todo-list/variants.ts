import { tv, type VariantProps } from "tailwind-variants";

const DRAW =
	"transition-[stroke-dashoffset,opacity] duration-(--duration-slow) ease-(--ease-ui-out) motion-reduce:transition-none";

export const todoList = tv({
	slots: {
		root: "group/todo w-full overflow-hidden rounded-2xl",
		trigger:
			"group/trigger flex h-11 w-full items-center gap-2.5 rounded-2xl px-3.5 text-left outline-none transition-[background-color] duration-(--duration-fast) hover:bg-foreground/[0.02] focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
		headerIcon:
			"relative grid size-6 shrink-0 place-items-center *:col-start-1 *:row-start-1",
		listIcon:
			"size-4 fill-none stroke-current text-muted-foreground [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8] transition-[opacity,scale] duration-(--duration-base) ease-(--ease-spring-snappy) group-data-[complete]/todo:scale-75 group-data-[complete]/todo:opacity-0 motion-reduce:transition-none",
		doneIcon:
			"size-5.5 scale-75 text-success opacity-0 transition-[opacity,scale] duration-(--duration-base) ease-(--ease-spring-snappy) group-data-[complete]/todo:scale-100 group-data-[complete]/todo:opacity-100 motion-reduce:transition-none [&_path]:[stroke-dasharray:1] [&_path]:[stroke-dashoffset:1] group-data-[complete]/todo:[&_path]:[stroke-dashoffset:0] [&_path]:transition-[stroke-dashoffset] [&_path]:delay-100 [&_path]:duration-(--duration-slow)",
		title: "m-0 min-w-0 flex-1 truncate font-medium text-foreground/90 text-sm",
		count:
			"inline-flex shrink-0 font-medium text-muted-foreground text-xs tabular-nums transition-colors duration-(--duration-base) group-data-[complete]/todo:text-success-strong",
		chevron:
			"size-3.5 shrink-0 fill-none stroke-current text-muted-foreground/60 transition-[rotate,color] duration-(--duration-dropdown) ease-(--ease-ui-out) [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2] group-hover/trigger:text-muted-foreground group-data-[panel-open]/trigger:rotate-180 group-data-[state=open]/trigger:rotate-180 motion-reduce:transition-none",
		panel: [
			"invisible grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity,visibility] duration-(--duration-collapse) ease-(--ease-ui-out) motion-reduce:transition-none",
			"data-[open]:visible data-[open]:grid-rows-[1fr] data-[open]:opacity-100 data-[state=open]:visible data-[state=open]:grid-rows-[1fr] data-[state=open]:opacity-100",
		],
		clip: "min-h-0 overflow-hidden",
		viewport: "overflow-y-auto px-2 pb-2 [scrollbar-width:none]",
		list: "m-0 flex list-none flex-col p-0",
		item: "flex min-h-9 items-center gap-2.5 rounded-xl px-1.5 py-1 transition-[opacity,translate] duration-(--duration-base) ease-(--ease-ui-out) starting:translate-y-1.5 starting:opacity-0 motion-reduce:transition-none",
		status: [
			"mx-0.5 size-5 shrink-0 overflow-visible text-muted-foreground",
			"data-[status=in-progress]:text-foreground data-[status=cancelled]:text-destructive-strong",
		],
		ring: "fill-current stroke-current transition-[fill-opacity] duration-(--duration-fast) [fill-opacity:0] [stroke-width:1.5] data-[status=completed]:[fill-opacity:0.06] data-[status=in-progress]:opacity-20 data-[status=pending]:[stroke-dasharray:2_3]",
		arc: [
			"origin-center -rotate-90 fill-none stroke-current opacity-0 [transform-box:fill-box] [stroke-linecap:round] [stroke-width:2] [stroke-dasharray:1]",
			"transition-[stroke-dashoffset,opacity] duration-(--duration-slow) ease-(--ease-ui-out) data-[status=in-progress]:opacity-100 motion-reduce:transition-none",
			// No known progress: a fixed arc turns instead of filling.
			"data-[spin]:animate-spin data-[spin]:[animation-duration:1.1s] motion-reduce:data-[spin]:animate-none",
		],
		tick: [
			"fill-none stroke-current opacity-0 [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2] [stroke-dasharray:1] [stroke-dashoffset:1] data-[on]:opacity-100 data-[on]:[stroke-dashoffset:0]",
			DRAW,
		],
		label: [
			"min-w-0 flex-1 truncate text-sm leading-5",
			"data-[status=pending]:text-muted-foreground data-[status=in-progress]:text-foreground data-[status=completed]:text-muted-foreground data-[status=cancelled]:text-muted-foreground",
		],
		strike: "relative inline-block max-w-full",
		line: "absolute inset-x-0 top-1/2 h-px origin-left scale-x-0 bg-current opacity-0 transition-[scale,opacity] delay-60 duration-(--duration-slow) ease-(--ease-ui-out) data-[on]:scale-x-100 data-[on]:opacity-100 motion-reduce:transition-none",
		detail: "shrink-0 text-muted-foreground text-sm",
		empty: "m-0 px-1.5 py-2 text-muted-foreground text-sm",
	},
	variants: {
		/** `outline` frames the list with a hairline; `muted` fills it; `plain` sits in a turn. */
		variant: {
			outline: { root: "border border-border" },
			muted: { root: "bg-muted" },
			plain: { root: "rounded-none", trigger: "px-1.5" },
		},
	},
	defaultVariants: { variant: "outline" },
});

export type TodoListVariant = NonNullable<VariantProps<typeof todoList>["variant"]>;
export type TodoStatus = "pending" | "in-progress" | "completed" | "cancelled";

export type TodoItem = {
	id: string;
	title: string;
	status?: TodoStatus;
	/** In-progress items: 0 to 100. Leave it out and the ring turns instead. */
	progress?: number;
	/** A trailing figure, such as a file count. */
	detail?: string;
};

export const TODO_STATUS_TEXT: Record<TodoStatus, string> = {
	pending: "Pending",
	"in-progress": "In progress",
	completed: "Completed",
	cancelled: "Cancelled",
};

/** Stroke paths on a 24px grid. */
export const TODO_ICONS = {
	list: "M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01",
	check: "M7.5 12.25 10.5 15.25 16.75 8.75",
	cross: "M8.5 8.5 15.5 15.5M15.5 8.5 8.5 15.5",
	chevron: "m6 9 6 6 6-6",
} as const;

/** How much of the ring an in-progress item fills, as a dash offset on a unit path. */
export const arcOffset = (status: TodoStatus, progress?: number) =>
	status !== "in-progress"
		? 1
		: progress === undefined
			? 0.32
			: 1 - Math.min(100, Math.max(0, progress)) / 100;
