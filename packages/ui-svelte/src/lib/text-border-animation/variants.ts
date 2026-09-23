import { tv, type VariantProps } from "tailwind-variants";

export const textBorderAnimation = tv({
	slots: {
		root: "relative inline-block overflow-hidden",
		label: "block font-medium",
		track: "relative mt-1 h-1 w-full",
		bar: "absolute inset-0 bg-primary transition-transform duration-[var(--tba-duration,300ms)]",
	},
	variants: {
		size: {
			sm: { label: "text-xl" },
			lg: { label: "text-xl xl:text-5xl" },
		},
	},
	defaultVariants: { size: "lg" },
});

export type TextBorderAnimationSize = NonNullable<
	VariantProps<typeof textBorderAnimation>["size"]
>;
