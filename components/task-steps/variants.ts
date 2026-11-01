import { tv, type VariantProps } from "tailwind-variants";

export const taskSteps = tv({
	slots: {
		root: "m-0 flex w-full list-none flex-col p-0",
		header: "mb-2 flex flex-col gap-1.5",
		headerRow: "flex items-baseline justify-between gap-3",
		title: "m-0 font-medium text-foreground text-sm",
		count: "shrink-0 text-muted-foreground text-xs tabular-nums",
		item: "group/step relative flex flex-col",
		row: "flex min-w-0 items-start",
		connector:
			"absolute bottom-0 w-px origin-top bg-border transition-[background-color] duration-(--duration-slow) group-last/step:hidden data-[status=done]:bg-(--success)",
		marker: [
			"relative z-10 grid shrink-0 place-items-center rounded-full border bg-background",
			"data-[status=pending]:border-border data-[status=pending]:text-muted-foreground",
			"data-[status=active]:border-primary data-[status=active]:text-primary",
			"data-[status=done]:border-(--success) data-[status=done]:text-success-strong",
			"data-[status=failed]:border-(--destructive) data-[status=failed]:text-destructive-strong",
		],
		icon: "",
		dot: "rounded-full bg-current",
		text: "flex min-w-0 flex-1 flex-col gap-1",
		labelRow: "flex min-w-0 items-baseline gap-2",
		label: [
			"min-w-0 flex-1 text-foreground",
			"data-[status=pending]:text-muted-foreground data-[status=done]:line-through data-[status=done]:decoration-muted-foreground/40",
		],
		meta: "shrink-0 text-muted-foreground text-xs tabular-nums",
		progress: "w-full max-w-48",
		retry: "size-5.5 shrink-0 rounded-full text-muted-foreground",
		details: "m-0 flex list-none flex-col gap-1 p-0",
		detail: "flex items-center justify-between gap-3 text-muted-foreground text-xs",
		detailMeta: "font-mono tabular-nums",
		trigger:
			"flex h-11 min-w-0 flex-1 items-center gap-2.5 px-2.5 text-left outline-none transition-[background-color,scale] duration-(--duration-fast) ease-(--ease-ui-out) focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset motion-reduce:transition-none [button&]:hover:bg-accent [button&]:active:scale-(--press-scale)",
		badge: "flex size-6 shrink-0 items-center justify-center",
		chevron:
			"size-3.5 shrink-0 fill-none stroke-current text-muted-foreground transition-transform duration-(--duration-slow) ease-(--ease-ui-out) [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.2] group-data-[panel-open]/trigger:rotate-180 group-data-[state=open]/trigger:rotate-180 motion-reduce:transition-none",
		statusDot: [
			"pop-in flex size-5.5 shrink-0 items-center justify-center rounded-full text-white [&_svg]:size-3",
			"data-[status=done]:bg-success data-[status=done]:text-success-foreground data-[status=failed]:bg-destructive",
		],
		panel: [
			"invisible grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity,visibility] duration-(--duration-slow) ease-(--ease-ui-out) motion-reduce:transition-none",
			"data-[open]:visible data-[open]:grid-rows-[1fr] data-[open]:opacity-100 data-[state=open]:visible data-[state=open]:grid-rows-[1fr] data-[state=open]:opacity-100",
		],
		clip: "min-h-0 overflow-hidden",
		panelBody: "mb-2.5 grid grid-cols-[24px_1fr] gap-2.5 px-2.5",
		rail: "mx-auto h-full w-px bg-border",
		glyph:
			"fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:3.5]",
	},
	variants: {
		/** Timeline ticks down a connector; capsules and list are rows that expand onto their details. */
		variant: {
			timeline: {},
			capsules: {
				root: "max-w-[27.5rem] gap-2",
				item: "card-fade-up overflow-hidden rounded-[22px] border border-border bg-background transition-[border-radius,background-color] duration-(--duration-slow) has-[[data-panel-open]]:rounded-[14px] has-[[data-state=open]]:rounded-[14px]",
				row: "items-center pe-1",
				label: "truncate font-medium text-sm",
				progress: "mx-2.5 mb-2 w-auto max-w-none",
			},
			list: {
				root: "max-w-[27.5rem] gap-0 self-start overflow-hidden rounded-2xl border border-border bg-background",
				item: "card-fade-up border-border border-b transition-colors duration-(--duration-slow) last:border-0",
				row: "items-center pe-1",
				label: "truncate font-medium text-sm",
				progress: "mx-2.5 mb-2 w-auto max-w-none",
			},
		},
		size: {
			sm: {
				row: "gap-2",
				connector: "top-5 left-[0.5625rem]",
				marker: "size-4.5",
				icon: "size-2.5",
				dot: "size-1",
				text: "text-xs leading-[1.125rem]",
			},
			default: {
				row: "gap-3",
				connector: "top-6 left-[0.6875rem]",
				marker: "size-5.5",
				icon: "size-3",
				dot: "size-1.5",
				text: "text-sm",
			},
		},
		compact: {
			true: { item: "py-1" },
			false: { item: "py-1.5" },
		},
	},
	compoundVariants: [
		// Rows own their padding; the timeline spacing does not apply to them.
		{ variant: ["capsules", "list"], compact: [true, false], class: { item: "py-0" } },
		{
			variant: ["capsules", "list"],
			size: ["sm", "default"],
			class: { row: "gap-0", text: "text-sm" },
		},
	],
	defaultVariants: { variant: "timeline", size: "default", compact: false },
});

export type TaskStepsVariant = NonNullable<VariantProps<typeof taskSteps>["variant"]>;
export type TaskStepsSize = NonNullable<VariantProps<typeof taskSteps>["size"]>;
export type TaskStatus = "pending" | "active" | "done" | "failed";

/** Screen-reader status words; override per language with `labels`. */
export const TASK_STEP_LABELS: Record<TaskStatus, string> = {
	pending: "Pending",
	active: "In progress",
	done: "Done",
	failed: "Failed",
};

/** Stroke paths on a 24px grid. */
export const TASK_STEP_ICONS = {
	check: "M20 6L9 17l-5-5",
	cross: "M18 6L6 18M6 6l12 12",
	retry: "M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6",
	chevron: "M6 9l6 6 6-6",
} as const;

export const clampProgress = (value: number) =>
	Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;
