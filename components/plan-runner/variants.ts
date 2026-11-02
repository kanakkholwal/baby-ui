import { tv, type VariantProps } from "tailwind-variants";

export const planRunner = tv({
	slots: {
		root: "group/plan w-full text-sm",
		header: "flex min-h-9 items-center gap-2",
		title: "m-0 min-w-0 flex-1 truncate font-medium text-foreground",
		meta: "shrink-0 text-muted-foreground text-xs tabular-nums",
		body: "flex flex-col",
		progress: "flex h-6 items-center gap-1",
		// A 24px hit row; the 6px bar is drawn by ::after in the step's colour.
		segment: [
			"relative h-full min-w-2 flex-1 cursor-default rounded-full border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-ring",
			"after:absolute after:inset-x-0 after:top-1/2 after:h-1.5 after:-translate-y-1/2 after:rounded-full after:bg-muted after:transition-colors after:duration-(--duration-slow) after:content-['']",
			"data-[status=done]:after:bg-success data-[status=failed]:after:bg-destructive data-[status=running]:after:bg-primary data-[status=running]:after:animate-pulse motion-reduce:data-[status=running]:after:animate-none",
			"transition-[opacity,scale,background-color] duration-(--duration-fast) ease-(--ease-ui-out) hover:bg-foreground/[0.05] active:scale-y-(--press-scale) group-data-[active]/plan:opacity-35 data-[active]:opacity-100 motion-reduce:transition-none",
		],
		tipTitle: "block font-medium",
		tipMeta: "block opacity-80",
		steps: "m-0 flex list-none flex-col p-0",
		step: "group/step relative grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-3 pb-4 last:pb-0 transition-[opacity,translate] duration-(--duration-base) ease-(--ease-ui-out) starting:translate-y-1 starting:opacity-0 motion-reduce:transition-none",
		connector:
			"absolute start-3 top-7 bottom-1 w-px -translate-x-1/2 bg-border transition-colors duration-(--duration-slow) group-last/step:hidden data-[status=done]:bg-success/60",
		marker: [
			"relative z-10 grid size-6 place-items-center rounded-full border bg-background [&_svg]:size-3.5 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round] [&_svg]:[stroke-width:2.2]",
			"transition-colors duration-(--duration-base) ease-(--ease-ui-out) motion-reduce:transition-none",
			"data-[status=pending]:border-border data-[status=pending]:text-muted-foreground",
			"data-[status=running]:border-primary data-[status=running]:text-primary",
			"data-[status=done]:border-success data-[status=done]:bg-success data-[status=done]:text-success-foreground",
			"data-[status=failed]:border-destructive data-[status=failed]:bg-destructive data-[status=failed]:text-white",
		],
		spinner: "animate-spin [animation-duration:1s] motion-reduce:animate-none",
		content: "flex min-w-0 flex-col gap-1.5 pt-0.5",
		stepHead: "flex min-w-0 items-center gap-2",
		stepTitle: [
			"m-0 min-w-0 flex-1 truncate text-sm",
			"group-data-[status=pending]/step:text-muted-foreground group-data-[status=running]/step:font-medium group-data-[status=running]/step:text-foreground group-data-[status=done]/step:text-foreground/80 group-data-[status=failed]/step:text-destructive-strong",
		],
		timer: "shrink-0 font-mono text-muted-foreground text-xs tabular-nums",
		fold: "grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-(--duration-collapse) ease-(--ease-ui-out) data-[open]:grid-rows-[1fr] data-[open]:opacity-100 motion-reduce:transition-none",
		clip: "min-h-0 overflow-hidden",
		output:
			"m-0 max-h-32 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-muted px-2.5 py-2 font-mono text-muted-foreground text-xs leading-5 [scrollbar-width:thin]",
		steer: "",
		footer: "flex min-h-11 items-center gap-3",
		summary: "m-0 min-w-0 flex-1 truncate text-muted-foreground text-xs tabular-nums",
	},
	variants: {
		/** `framed` holds the plan in a card rim under its header; `plain` drops the chrome. */
		variant: {
			framed: {
				root: "rounded-2xl border border-border bg-card p-1",
				header: "px-3 pt-1 pb-1.5",
				body: "gap-4 rounded-[11px] border border-border bg-background p-4",
				footer: "px-3",
			},
			plain: {
				body: "gap-4 py-2",
				footer: "border-border border-t",
			},
		},
	},
	defaultVariants: { variant: "framed" },
});

/** The tool a step uses, as a small coloured badge. */
export const planTool = tv({
	base: "inline-flex h-5 shrink-0 items-center gap-1 rounded-md px-1.5 font-medium text-xs [&_svg]:size-3 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round] [&_svg]:[stroke-width:2]",
	variants: {
		kind: {
			search: "bg-info/12 text-info-strong",
			read: "bg-muted text-muted-foreground",
			edit: "bg-warning/15 text-warning-strong",
			test: "bg-success/12 text-success-strong",
			ship: "bg-primary text-primary-foreground",
		},
	},
	defaultVariants: { kind: "read" },
});

/** One marker per step state. */
export const planStep = tv({
	variants: {
		status: { pending: "", running: "", done: "", failed: "" },
	},
});

export type PlanRunnerVariant = NonNullable<VariantProps<typeof planRunner>["variant"]>;
export type PlanToolKind = NonNullable<VariantProps<typeof planTool>["kind"]>;
export type PlanStepStatus = NonNullable<VariantProps<typeof planStep>["status"]>;

/** One segment of the progress bar per step. */
export type PlanSegment = { id: string; label: string; status: PlanStepStatus };

export const PLAN_STATUS_TEXT: Record<PlanStepStatus, string> = {
	pending: "Up next",
	running: "Running",
	done: "Done",
	failed: "Failed",
};

export const PLAN_TOOL_TEXT: Record<PlanToolKind, string> = {
	search: "Search",
	read: "Read",
	edit: "Edit",
	test: "Test",
	ship: "Ship",
};

/** Stroke paths on a 24px grid. */
export const PLAN_ICONS = {
	search: "m20 20-4.2-4.2M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z",
	read: "M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5v-13ZM13 4h5.5A1.5 1.5 0 0 1 20 5.5v13a1.5 1.5 0 0 1-1.5 1.5H13V4Z",
	edit: "M4 20h4L19 9l-4-4L4 16v4ZM13.5 6.5l4 4",
	test: "M9 3h6M10 3v6L4.5 18.5A1.5 1.5 0 0 0 5.8 21h12.4a1.5 1.5 0 0 0 1.3-2.5L14 9V3M7 15h10",
	ship: "M12 3c3 2 4.5 5 4.5 9l-2 3h-5l-2-3c0-4 1.5-7 4.5-9ZM9.5 15 7 19l3-1M14.5 15l2.5 4-3-1M12 9.5h.01",
	done: "m6 12.5 4 4L18 8",
	failed: "M7 7l10 10M17 7 7 17",
	running: "M12 4a8 8 0 0 1 8 8",
	stop: "M7 7h10v10H7z",
} as const;

/** 84 reads "1:24"; under a minute, "42s". */
export function formatStepTime(seconds: number) {
	const s = Math.max(0, Math.floor(seconds));
	return s < 60 ? `${s}s` : `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
