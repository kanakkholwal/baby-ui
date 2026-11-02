import { tv, type VariantProps } from "tailwind-variants";

/** Status lives on `data-status`, so each part colours itself from it. */
export const tool = tv({
	slots: {
		root: "w-full text-sm",
		trigger: [
			"group/trigger flex w-full items-center gap-2 text-left outline-none",
			"transition-colors duration-(--duration-fast) ease-(--ease-ui-out) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset motion-reduce:transition-none",
		],
		kind: "grid size-4 shrink-0 place-items-center text-muted-foreground [&_svg]:size-4 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round] [&_svg]:[stroke-width:1.7]",
		heading: "flex min-w-0 flex-1 items-baseline gap-2",
		title: "min-w-0 truncate font-medium text-foreground/90",
		name: "min-w-0 truncate font-mono text-muted-foreground text-xs",
		status: [
			"inline-flex shrink-0 items-center gap-1 font-medium text-xs",
			"data-[status=pending]:text-muted-foreground data-[status=running]:text-primary data-[status=approval]:text-warning-strong data-[status=done]:text-success-strong data-[status=error]:text-destructive-strong",
		],
		statusIcon:
			"size-3 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]",
		statusText:
			"transition-[opacity,translate] duration-(--duration-fast) ease-(--ease-ui-out) starting:translate-y-1 starting:opacity-0 motion-reduce:transition-none",
		chevron:
			"size-3.5 shrink-0 fill-none stroke-current text-muted-foreground/60 transition-[rotate,color] duration-(--duration-dropdown) ease-(--ease-ui-out) [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2] group-hover/trigger:text-muted-foreground group-data-[panel-open]/trigger:rotate-180 group-data-[state=open]/trigger:rotate-180 motion-reduce:transition-none",
		panel: [
			"invisible grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity,visibility] duration-(--duration-collapse) ease-(--ease-ui-out) motion-reduce:transition-none",
			"data-[open]:visible data-[open]:grid-rows-[1fr] data-[open]:opacity-100 data-[state=open]:visible data-[state=open]:grid-rows-[1fr] data-[state=open]:opacity-100",
		],
		clip: "min-h-0 overflow-hidden",
		body: "flex flex-col gap-2",
		section: "flex min-w-0 flex-col gap-1",
		label: "m-0 font-medium text-muted-foreground text-xs",
		code: "m-0 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-background p-2.5 font-mono text-xs leading-5 [scrollbar-width:thin]",
		actions: "flex items-center gap-0.5",
		action:
			"size-7 border-0 bg-transparent text-muted-foreground shadow-none hover:bg-muted hover:text-foreground",
	},
	variants: {
		/** `card` is a bordered row with its own surface; `plain` sits inline in a chat turn. */
		variant: {
			card: {
				root: "overflow-hidden rounded-xl border border-border bg-card",
				trigger: "min-h-10 px-3 hover:bg-foreground/[0.03]",
				body: "border-border border-t p-3",
			},
			plain: {
				trigger: "-mx-1.5 min-h-8 w-[calc(100%+0.75rem)] rounded-md px-1.5",
				body: "ps-6 pt-1.5",
				code: "bg-muted",
			},
		},
	},
	defaultVariants: { variant: "card" },
});

export type ToolVariant = NonNullable<VariantProps<typeof tool>["variant"]>;
/** `approval` waits on a person; put an ApprovalGate in ToolContent. */
export type ToolState = "pending" | "running" | "approval" | "done" | "error";
export type ToolKind = "function" | "terminal" | "request" | "search";

export const TOOL_STATUS_TEXT: Record<ToolState, string> = {
	pending: "Queued",
	running: "Running",
	approval: "Needs approval",
	done: "Completed",
	error: "Failed",
};

/** Stroke paths on a 24px grid. */
export const TOOL_ICONS = {
	function:
		"M8 20c-2 0-2.5-1.5-2.5-3.5V14c0-1-1-2-2-2 1 0 2-1 2-2V7.5C5.5 5.5 6 4 8 4M16 4c2 0 2.5 1.5 2.5 3.5V10c0 1 1 2 2 2-1 0-2 1-2 2v2.5c0 2-.5 3.5-2.5 3.5",
	terminal:
		"M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v11a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 17.5v-11ZM8 9.5l2.5 2.5L8 14.5M12.5 15h3.5",
	request:
		"M12 21a9 9 0 1 0 0-18m0 18a9 9 0 1 1 0-18m0 18c2.2-2.4 3.4-5.6 3.4-9S14.2 5.4 12 3m0 18c-2.2-2.4-3.4-5.6-3.4-9S9.8 5.4 12 3M3.5 12h17",
	search: "m20 20-4.2-4.2M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z",
	chevron: "m6 9 6 6 6-6",
	done: "m5 12.5 4.5 4.5L19 7.5",
	error: "M7 7l10 10M17 7 7 17",
	retry: "M3.5 12a8.5 8.5 0 1 0 2.5-6M3.5 4v4.5H8",
	approval:
		"M12 3.5 5 6.2v5.3c0 4.2 3 7.6 7 9 4-1.4 7-4.8 7-9V6.2l-7-2.7ZM12 8.5v4M12 15.5h.01",
} as const;
