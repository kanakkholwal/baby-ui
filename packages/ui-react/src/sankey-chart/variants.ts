import { tv, type VariantProps } from "tailwind-variants";

export const sankeyChart = tv({
	slots: {
		link: "cursor-pointer fill-none outline-none",
		node: "cursor-pointer [transform-box:fill-box] [transform-origin:center]",
		name: "pointer-events-none fill-foreground font-medium text-[12px]",
		value: "pointer-events-none fill-muted-foreground text-[11px] tabular-nums",
	},
	variants: {
		orientation: {
			horizontal: {},
			vertical: { name: "text-[11px]" },
		},
		linkColor: {
			source: {},
			target: {},
			gradient: {},
		},
	},
	defaultVariants: { orientation: "horizontal", linkColor: "gradient" },
});

export type SankeyOrientation = NonNullable<
	VariantProps<typeof sankeyChart>["orientation"]
>;
export type SankeyLinkColor = NonNullable<VariantProps<typeof sankeyChart>["linkColor"]>;
