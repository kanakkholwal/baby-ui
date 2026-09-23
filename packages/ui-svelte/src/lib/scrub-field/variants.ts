import { tv, type VariantProps } from "tailwind-variants";

export const scrubField = tv({
	slots: {
		root: "flex min-w-0 items-center gap-1 rounded-lg py-1 pr-1 pl-0.5 transition-[background-color,box-shadow] duration-200 data-disabled:pointer-events-none data-disabled:opacity-50",
		label:
			"flex h-full shrink-0 cursor-ew-resize touch-none select-none items-center rounded-[4px] px-0.5 text-muted-foreground outline-none hover:text-foreground focus-visible:text-primary",
		input: "min-w-0 flex-1 bg-transparent text-foreground tabular-nums outline-none",
		suffix: "shrink-0 pr-0.5 text-muted-foreground",
	},
	variants: {
		size: {
			sm: {
				root: "h-6 text-[11px]",
				label: "text-[11px]",
				input: "text-[11px]",
				suffix: "text-[10.5px]",
			},
			md: {
				root: "h-6.5 text-[12px]",
				label: "text-[12px]",
				input: "text-[12px]",
				suffix: "text-[11.5px]",
			},
			lg: {
				root: "h-8 text-[13px]",
				label: "text-[13px]",
				input: "text-[13px]",
				suffix: "text-[12px]",
			},
		},
		tone: {
			default: { root: "bg-input" },
			edited: { root: "bg-primary/10 ring-1 ring-primary" },
		},
	},
	defaultVariants: { size: "md", tone: "default" },
});

export type ScrubFieldSize = NonNullable<VariantProps<typeof scrubField>["size"]>;
export type ScrubFieldTone = NonNullable<VariantProps<typeof scrubField>["tone"]>;
