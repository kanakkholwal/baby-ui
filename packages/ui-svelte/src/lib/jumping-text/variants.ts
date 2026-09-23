import { tv, type VariantProps } from "tailwind-variants";

export const jumpingText = tv({
	base: "inline-block",
	variants: {
		size: {
			sm: "text-lg",
			md: "text-2xl",
			lg: "text-4xl",
		},
	},
	defaultVariants: { size: "md" },
});

export type JumpingTextSize = NonNullable<VariantProps<typeof jumpingText>["size"]>;

const MODES = ["word", "character"] as const;
/** Not a styling variant: how the text is split for the jump-in stagger. */
export type JumpingTextMode = (typeof MODES)[number];
