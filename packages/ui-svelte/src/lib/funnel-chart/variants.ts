import { tv, type VariantProps } from "tailwind-variants";

export const funnelChart = tv({
	slots: {
		cell: "cursor-pointer transition-opacity duration-150 ease-[cubic-bezier(0,0,0.58,1)]",
		ring: "[transform-box:fill-box] [transform-origin:center]",
		band: "fill-foreground/[0.03]",
		rule: "stroke-border",
		labels: "pointer-events-none absolute flex items-center",
		value: "whitespace-nowrap font-semibold text-foreground text-sm tabular-nums",
		percent:
			"rounded-full bg-foreground px-2.5 py-0.5 font-bold text-[11px] text-background tabular-nums shadow-sm",
		name: "whitespace-nowrap font-medium text-muted-foreground text-xs",
	},
	variants: {
		orientation: {
			horizontal: { labels: "flex-col justify-between py-[8%]" },
			vertical: { labels: "flex-row justify-between px-[8%]" },
		},
		labelLayout: {
			spread: {},
			grouped: { labels: "justify-center gap-1.5" },
		},
	},
	defaultVariants: { orientation: "horizontal", labelLayout: "spread" },
});

export type FunnelOrientation = NonNullable<
	VariantProps<typeof funnelChart>["orientation"]
>;
export type FunnelLabelLayout = NonNullable<
	VariantProps<typeof funnelChart>["labelLayout"]
>;

export const funnelEdges = tv({
	base: "",
	variants: {
		edges: { curved: "[stroke-linejoin:round]", straight: "[stroke-linejoin:miter]" },
	},
	defaultVariants: { edges: "curved" },
});

export type FunnelEdges = NonNullable<VariantProps<typeof funnelEdges>["edges"]>;
