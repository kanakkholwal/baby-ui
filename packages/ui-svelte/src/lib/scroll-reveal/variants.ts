import { tv, type VariantProps } from "tailwind-variants";

export const scrollReveal = tv({
	base: "relative h-96 w-full overflow-y-auto bg-foreground text-background",
	variants: {
		size: {
			sm: "text-xl",
			md: "text-2xl",
			lg: "text-4xl",
		},
	},
	defaultVariants: { size: "md" },
});

export type ScrollRevealSize = NonNullable<VariantProps<typeof scrollReveal>["size"]>;
