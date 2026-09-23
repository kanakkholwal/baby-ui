import { tv, type VariantProps } from "tailwind-variants";

export const rollText = tv({
	base: "roll-text relative inline-block cursor-default",
	variants: {
		size: {
			sm: "text-sm",
			md: "text-base",
			lg: "text-lg",
		},
	},
	defaultVariants: { size: "md" },
});

export type RollTextSize = NonNullable<VariantProps<typeof rollText>["size"]>;

const STAGGERS = ["none", "word", "character"] as const;
/** Not a styling variant: how the label is split for the roll animation. */
export type RollStagger = (typeof STAGGERS)[number];
