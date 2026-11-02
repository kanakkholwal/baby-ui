import { tv, type VariantProps } from "tailwind-variants";

export const agentList = tv({
	slots: {
		root: "group/agents w-full text-sm",
		header: "flex min-h-9 items-center gap-2",
		title: "m-0 min-w-0 flex-1 truncate font-medium text-foreground",
		count: "shrink-0 font-medium text-muted-foreground text-xs tabular-nums",
		list: "flex flex-col",
		item: [
			"border-border border-t first:border-t-0",
			"transition-colors duration-(--duration-base) ease-(--ease-ui-out) data-[status=needs-input]:bg-warning/[0.06] motion-reduce:transition-none",
		],
		trigger: [
			"group/trigger flex min-h-12 w-full items-center gap-3 border-0 bg-transparent text-left outline-none",
			"transition-colors duration-(--duration-fast) ease-(--ease-ui-out) hover:bg-foreground/[0.03] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset motion-reduce:transition-none",
		],
		heading: "flex min-w-0 flex-1 flex-col",
		name: "min-w-0 truncate font-medium text-foreground",
		meta: "min-w-0 truncate text-muted-foreground text-xs",
		diff: "flex shrink-0 items-center gap-1.5 font-mono text-xs tabular-nums",
		added: "text-success-strong",
		removed: "text-destructive-strong",
		chevron:
			"size-3.5 shrink-0 fill-none stroke-current text-muted-foreground/70 transition-[rotate] duration-(--duration-dropdown) ease-(--ease-ui-out) [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2] group-data-[panel-open]/trigger:rotate-180 group-data-[state=open]/trigger:rotate-180 motion-reduce:transition-none",
		panel: [
			"grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-(--duration-collapse) ease-(--ease-ui-out) motion-reduce:transition-none",
			"data-[open]:grid-rows-[1fr] data-[open]:opacity-100 data-[state=open]:grid-rows-[1fr] data-[state=open]:opacity-100",
		],
		clip: "min-h-0 overflow-hidden",
		body: "flex flex-col gap-3 pb-3 ps-9",
		steps: "m-0 flex list-none flex-col gap-1.5 p-0",
		step: "flex min-w-0 items-center gap-2 text-xs transition-[opacity,translate,color] duration-(--duration-base) ease-(--ease-ui-out) starting:translate-y-1 starting:opacity-0 motion-reduce:transition-none data-[status=done]:text-muted-foreground data-[status=pending]:text-muted-foreground data-[status=running]:text-foreground",
		stepDot:
			"size-1.5 shrink-0 rounded-full bg-current data-[status=running]:animate-pulse data-[status=running]:bg-primary motion-reduce:animate-none",
		fold: "-mb-3 grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity,margin] duration-(--duration-collapse) ease-(--ease-ui-out) data-[open]:mb-0 data-[open]:grid-rows-[1fr] data-[open]:opacity-100 motion-reduce:transition-none",
		decision:
			"flex flex-col gap-2.5 rounded-xl border border-warning/30 bg-background p-3",
		prompt: "m-0 text-foreground text-sm leading-relaxed",
		actions: "flex flex-wrap items-center gap-2",
		footer: "pt-1",
	},
	variants: {
		/** `framed` holds the rows in a card rim; `plain` drops the chrome. */
		variant: {
			framed: {
				root: "rounded-2xl border border-border bg-card p-1",
				header: "px-3 pt-1 pb-1.5",
				list: "overflow-hidden rounded-[11px] border border-border bg-background",
				trigger: "px-3",
				body: "pe-3 ps-12",
				footer: "px-0 pt-1",
			},
			plain: {
				header: "pb-1",
				list: "border-border border-y",
			},
		},
	},
	defaultVariants: { variant: "framed" },
});

/** The row marker; one per agent status. */
export const agentStatus = tv({
	base: "relative grid size-6 shrink-0 place-items-center [&_svg]:size-5 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round] [&_svg]:[stroke-width:1.8]",
	variants: {
		status: {
			queued: "text-muted-foreground [&_circle]:[stroke-dasharray:2_3]",
			running:
				"text-primary [&_svg]:animate-spin [&_svg]:[animation-duration:1.1s] motion-reduce:[&_svg]:animate-none",
			"needs-input": "text-warning-strong",
			done: "text-success-strong",
			failed: "text-destructive-strong",
		},
	},
	defaultVariants: { status: "queued" },
});

export type AgentListVariant = NonNullable<VariantProps<typeof agentList>["variant"]>;
export type AgentStatus = NonNullable<VariantProps<typeof agentStatus>["status"]>;
export type AgentStepStatus = "pending" | "running" | "done";

export const AGENT_STATUS_TEXT: Record<AgentStatus, string> = {
	queued: "Queued",
	running: "Running",
	"needs-input": "Needs you",
	done: "Done",
	failed: "Failed",
};

/** Stroke paths on a 24px grid, one per status. */
export const AGENT_STATUS_ICONS: Record<AgentStatus, string> = {
	queued: "",
	running: "M12 3a9 9 0 0 1 9 9",
	"needs-input": "M12 7.5v5M12 16h.01",
	done: "m8 12.5 2.8 2.8L16.5 9.5",
	failed: "M9 9l6 6M15 9l-6 6",
};

export const AGENT_LIST_CHEVRON = "m6 9 6 6 6-6";
