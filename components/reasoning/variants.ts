import { tv, type VariantProps } from "tailwind-variants";

export const reasoning = tv({
	slots: {
		root: "w-full",
		// 32px tall, so it sits on the control ladder; the tint on hover is the only chrome.
		trigger:
			"group/trigger -mx-1.5 inline-flex h-8 max-w-full items-center gap-2 rounded-lg px-1.5 text-left text-muted-foreground text-sm outline-none transition-[background-color,color,scale] duration-(--duration-fast) ease-(--ease-ui-out) hover:bg-foreground/[0.06] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring active:scale-(--press-scale) motion-reduce:transition-none",
		// A 3 x 3 grid of 4px cells with 2px gaps is exactly 16px.
		icon: "grid size-4 shrink-0 grid-cols-3 grid-rows-3 gap-0.5",
		pixel: "reasoning-pixel size-1 rounded-[1px] bg-current",
		title: "font-medium",
		titleThinking: "reasoning-shimmer font-medium",
		duration: "font-mono text-xs tabular-nums",
		preview: "block min-w-0 truncate text-xs",
		chevron:
			"size-4 shrink-0 transition-transform duration-(--duration-dropdown) ease-(--ease-ui-out) group-data-[panel-open]/trigger:rotate-180 group-data-[state=open]/trigger:rotate-180 motion-reduce:transition-none",
		panel:
			"grid grid-rows-[0fr] transition-[grid-template-rows] duration-(--duration-dropdown) ease-(--ease-ui-out) data-[open]:grid-rows-[1fr] data-[state=open]:grid-rows-[1fr] motion-reduce:transition-none",
		clip: "overflow-hidden",
		// 24px in lines the text up under the title: a 16px icon and an 8px gap.
		content: "ps-6 pt-1 pb-2 text-muted-foreground text-sm leading-6",
	},
	variants: {
		variant: {
			default: {},
			// A card surface for a transcript that has none; rounded-2xl less the 4px padding is rounded-xl.
			framed: {
				root: "rounded-2xl bg-card p-1 shadow-xs",
				trigger: "mx-0 w-full rounded-xl px-2.5",
				content: "ps-9 pe-2.5",
			},
		},
	},
	defaultVariants: { variant: "default" },
});

export type ReasoningVariant = NonNullable<VariantProps<typeof reasoning>["variant"]>;

export const reasoningStep = tv({
	slots: {
		list: "flex flex-col [&>li:last-child_[data-slot=reasoning-step-connector]]:hidden",
		item: "reasoning-step-in grid grid-rows-[1fr]",
		clip: "overflow-hidden",
		row: "flex gap-3 pb-3",
		rail: "flex flex-col items-center",
		glyphBox: "flex h-5 items-center justify-center",
		glyph: "pop-in flex size-3 items-center justify-center",
		connector:
			"my-1 w-px flex-1 rounded-full transition-colors duration-(--duration-slow)",
		body: "min-w-0 flex-1",
		label: "text-sm leading-5 transition-colors duration-(--duration-slow)",
		description: "mt-0.5 text-muted-foreground text-xs leading-5",
	},
	variants: {
		status: {
			pending: { item: "hidden" },
			active: {
				glyph: "after:size-1.5 after:rounded-full after:bg-foreground",
				connector: "bg-foreground/10",
				label: "font-medium text-foreground",
			},
			done: { connector: "bg-foreground/25", label: "text-foreground/80" },
		},
	},
	defaultVariants: { status: "done" },
});

/** Pending steps render nothing until they turn active or done. */
export type ReasoningStepStatus = NonNullable<
	VariantProps<typeof reasoningStep>["status"]
>;

export const reasoningExtras = tv({
	slots: {
		detailsTrigger: "mt-1 w-auto px-0 py-0.5 font-normal text-muted-foreground text-xs",
		detailsContent:
			"flex flex-col gap-1 px-0 pb-0.5 text-muted-foreground text-xs leading-5",
		sources: "mt-2 flex flex-wrap gap-1.5",
		sourceLink:
			"rounded-full transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
		source: "pop-in rounded-full text-foreground/70",
		figure: "pop-in mt-2",
		image: "w-full max-w-[220px] rounded-lg object-cover",
		caption: "mt-1 text-xs text-muted-foreground",
	},
});

export const reasoningRows = tv({
	slots: {
		list: "flex flex-col gap-1",
		query: "flex h-6 items-center gap-2 px-1.5 text-muted-foreground text-xs",
		row: "card-fade-up flex min-h-7 w-full items-center gap-2 rounded-md px-1.5 py-0.5 text-left",
		label: "min-w-0 truncate font-medium text-foreground text-xs",
		secondary: "shrink-0 text-muted-foreground text-xs",
		diff: "shrink-0 font-mono text-xs tabular-nums",
		glyph: "size-3.5 shrink-0 text-muted-foreground",
		spinner:
			"spinner size-3 shrink-0 rounded-full border-[1.5px] border-border border-t-muted-foreground",
		source: "flex size-3.5 shrink-0 items-center justify-center rounded-full text-white",
	},
	variants: {
		/** Steps tick off or spin; search rows link out to sources; coding rows select a file. */
		kind: {
			steps: {},
			search: {
				row: "transition-colors duration-(--duration-fast) hover:bg-accent",
			},
			coding: {
				row: "transition-colors duration-(--duration-fast) hover:bg-accent aria-pressed:bg-muted",
			},
		},
	},
	defaultVariants: { kind: "steps" },
});

export type ReasoningRowsKind = NonNullable<VariantProps<typeof reasoningRows>["kind"]>;

export type ReasoningRow = {
	primary: string;
	secondary?: string;
	/** Sets `secondary` in the mono face, e.g. a path. */
	mono?: boolean;
	/** Coding rows: lines added and removed. */
	add?: number;
	del?: number;
	/** Search rows: the source URL. */
	href?: string;
	/** Steps rows: spins instead of ticking. */
	status?: "active";
};

/** Search source dot colours, cycled per row. */
export const SOURCE_TONES = ["bg-info", "bg-warning", "bg-success"] as const;
