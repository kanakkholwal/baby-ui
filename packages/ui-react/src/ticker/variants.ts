import { tv, type VariantProps } from "tailwind-variants";

export const ticker = tv({
	base: "inline-flex tabular-nums text-foreground",
	variants: {
		size: {
			sm: "text-2xl",
			md: "text-4xl",
			lg: "text-6xl",
		},
	},
	defaultVariants: { size: "md" },
});

export type TickerSize = NonNullable<VariantProps<typeof ticker>["size"]>;
