import { tv, type VariantProps } from "tailwind-variants";

export const hoverMarquee = tv({
	slots: {
		root: "block min-w-0 overflow-hidden whitespace-nowrap outline-none",
		inner:
			"inline-block translate-x-(--marquee-shift) transition-transform duration-(--marquee-duration) ease-linear will-change-transform motion-reduce:transition-none",
	},
	variants: {
		variant: {
			// Rest state ends in an ellipsis; sliding swaps it for a clipped edge.
			ellipsis: { root: "text-ellipsis data-[active]:text-clip" },
			// Rest state fades out at the right edge instead of an ellipsis.
			fade: {
				root: "[mask-image:linear-gradient(to_right,#000_calc(100%-1.5rem),transparent)] data-[active]:[mask-image:linear-gradient(to_right,transparent,#000_1rem,#000_calc(100%-1.5rem),transparent)]",
			},
		},
	},
	defaultVariants: { variant: "ellipsis" },
});

export type HoverMarqueeVariant = NonNullable<
	VariantProps<typeof hoverMarquee>["variant"]
>;
