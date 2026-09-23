import { tv, type VariantProps } from "tailwind-variants";

export const typingText = tv({
	base: "relative font-mono",
	variants: {
		size: {
			sm: "text-sm",
			md: "text-base",
			lg: "text-lg",
		},
	},
	defaultVariants: { size: "md" },
});

export type TypingTextSize = NonNullable<VariantProps<typeof typingText>["size"]>;
