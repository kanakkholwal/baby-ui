import { tv, type VariantProps } from "tailwind-variants";

export const jitterText = tv({
	base: "jitter-text inline-block",
	variants: {
		size: {
			sm: "text-sm",
			md: "text-base",
			lg: "text-lg",
		},
	},
	defaultVariants: { size: "md" },
});

export type JitterTextSize = NonNullable<VariantProps<typeof jitterText>["size"]>;
