import { tv, type VariantProps } from "tailwind-variants";

export const approvalQueue = tv({
	slots: {
		root: "group/queue w-full text-sm",
		header: "flex min-h-9 items-center gap-2",
		icon: "grid size-4 shrink-0 place-items-center text-warning-strong [&_svg]:size-4",
		title: "m-0 min-w-0 flex-1 truncate font-medium text-foreground",
		count:
			"inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-warning/15 px-1.5 font-medium text-warning-strong text-xs tabular-nums",
		list: "flex flex-col",
		// Kept mounted when dismissed, so a decided request folds away instead of vanishing.
		item: [
			"group/item grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-(--duration-collapse) ease-(--ease-ui-out) motion-reduce:transition-none",
			"data-[dismissed]:grid-rows-[0fr] data-[dismissed]:opacity-0",
		],
		clip: "min-h-0 overflow-hidden",
		row: "border-border border-t group-first/item:border-t-0",
		trigger: [
			"group/trigger flex min-h-11 w-full items-center gap-3 border-0 bg-transparent text-left outline-none",
			"transition-colors duration-(--duration-fast) ease-(--ease-ui-out) hover:bg-foreground/[0.03] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset motion-reduce:transition-none",
		],
		kind: "grid size-7 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground [&_svg]:size-3.5 [&_svg]:fill-none [&_svg]:stroke-current [&_svg]:[stroke-linecap:round] [&_svg]:[stroke-linejoin:round] [&_svg]:[stroke-width:1.8]",
		label: "min-w-0 flex-1 truncate text-foreground",
		meta: "hidden min-w-0 max-w-40 shrink truncate font-mono text-muted-foreground text-xs sm:block",
		chevron:
			"size-3.5 shrink-0 fill-none stroke-current text-muted-foreground/70 transition-[rotate] duration-(--duration-dropdown) ease-(--ease-ui-out) [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2] group-data-[panel-open]/trigger:rotate-180 group-data-[state=open]/trigger:rotate-180 motion-reduce:transition-none",
		panel: [
			"grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-(--duration-collapse) ease-(--ease-ui-out) motion-reduce:transition-none",
			"data-[open]:grid-rows-[1fr] data-[open]:opacity-100 data-[state=open]:grid-rows-[1fr] data-[state=open]:opacity-100",
		],
		body: "pb-3",
		empty: "m-0 px-3 py-6 text-center text-muted-foreground text-xs",
	},
	variants: {
		/** `framed` holds the rows in a card rim under the header; `plain` drops the chrome. */
		variant: {
			framed: {
				root: "rounded-2xl border border-border bg-card p-1",
				header: "px-3 pt-1 pb-1.5",
				list: "overflow-hidden rounded-[11px] border border-border bg-background",
				trigger: "px-3",
				body: "px-3",
			},
			plain: {
				header: "pb-1",
				list: "border-border border-y",
			},
		},
	},
	defaultVariants: { variant: "framed" },
});

export type ApprovalQueueVariant = NonNullable<
	VariantProps<typeof approvalQueue>["variant"]
>;

export const APPROVAL_QUEUE_ICONS = {
	hand: "M8 12.5V6a1.5 1.5 0 0 1 3 0v5.5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v6.5c0 4.1-2.6 7-6.5 7-2.4 0-3.9-1.1-5.2-3L3.6 13.8a1.5 1.5 0 0 1 2.4-1.8L8 14.5",
	chevron: "m6 9 6 6 6-6",
} as const;
