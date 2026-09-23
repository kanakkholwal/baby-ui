import { tv, type VariantProps } from "tailwind-variants";

export const counter = tv({
	base: "inline-block font-bold tabular-nums text-foreground",
	variants: {
		size: {
			sm: "text-2xl",
			md: "text-4xl",
			lg: "text-6xl",
		},
	},
	defaultVariants: { size: "md" },
});

export type CounterSize = NonNullable<VariantProps<typeof counter>["size"]>;

const DIRECTIONS = ["up", "down"] as const;
/** Not a styling variant: which way the count runs on its first play. */
export type CounterDirection = (typeof DIRECTIONS)[number];
