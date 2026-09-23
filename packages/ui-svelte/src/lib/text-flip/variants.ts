import { tv, type VariantProps } from "tailwind-variants";

export const textFlip = tv({
	slots: {
		root: "inline-flex items-baseline gap-2 font-semibold",
		label: "text-foreground",
		window: "h-[1.2em] overflow-hidden text-primary",
		word: "block h-[1.2em] leading-[1.2em]",
	},
	variants: {
		size: {
			sm: { root: "text-lg" },
			md: { root: "text-2xl" },
			lg: { root: "text-3xl" },
		},
	},
	defaultVariants: { size: "lg" },
});

export type TextFlipSize = NonNullable<VariantProps<typeof textFlip>["size"]>;
