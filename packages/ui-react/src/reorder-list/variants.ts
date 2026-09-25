import { tv, type VariantProps } from "tailwind-variants";

export const reorderList = tv({
	slots: {
		root: "w-full",
		list: "m-0 flex list-none flex-col p-0",
		row: [
			"relative flex w-full touch-pinch-zoom select-none items-center gap-3 border text-left text-foreground text-sm outline-none",
			"transition-[background-color,border-color,box-shadow] duration-[var(--duration-press)] ease-[var(--ease-out)] motion-reduce:transition-none",
			"focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
		],
		grip: "h-3.5 w-2.5 shrink-0 fill-current text-muted-foreground",
		label: "min-w-0 flex-1 truncate",
		index: "font-mono text-[11px] text-muted-foreground tabular-nums",
	},
	variants: {
		variant: {
			card: { list: "gap-1.5", row: "rounded-lg px-3 py-2.5" },
			plain: { list: "gap-0.5", row: "rounded-md px-2 py-2" },
		},
		lifted: {
			true: { row: "z-10 cursor-grabbing bg-card shadow-lg" },
			false: { row: "cursor-grab enabled:active:cursor-grabbing" },
		},
	},
	compoundVariants: [
		{
			variant: "card",
			lifted: false,
			class: { row: "border-border bg-card hover:border-border-strong" },
		},
		{ variant: "card", lifted: true, class: { row: "border-primary" } },
		{
			variant: "plain",
			lifted: false,
			class: { row: "border-transparent hover:bg-foreground/[0.06]" },
		},
		{ variant: "plain", lifted: true, class: { row: "border-border" } },
	],
	defaultVariants: { variant: "card", lifted: false },
});

export type ReorderListVariant = NonNullable<VariantProps<typeof reorderList>["variant"]>;
