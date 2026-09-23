import { tv, type VariantProps } from "tailwind-variants";

export const toolbar = tv({
	slots: {
		root: "inline-flex items-center gap-0.5 rounded-xl border border-border bg-card p-1",
		button:
			"grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
	},
	variants: {
		orientation: {
			horizontal: {},
			vertical: { root: "flex-col" },
		},
	},
	defaultVariants: { orientation: "horizontal" },
});

export type ToolbarOrientation = NonNullable<VariantProps<typeof toolbar>["orientation"]>;
