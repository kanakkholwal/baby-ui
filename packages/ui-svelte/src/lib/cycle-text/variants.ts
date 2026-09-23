import { tv, type VariantProps } from "tailwind-variants";

export const cycleText = tv({
	base: "inline-block",
	variants: {
		size: {
			sm: "text-lg",
			md: "text-xl",
			lg: "text-3xl",
		},
	},
	defaultVariants: { size: "md" },
});

export type CycleTextSize = NonNullable<VariantProps<typeof cycleText>["size"]>;
