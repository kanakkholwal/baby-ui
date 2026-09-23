import { tv, type VariantProps } from "tailwind-variants";

export const swapText = tv({
	base: "block w-full cursor-pointer select-none border-0 bg-transparent p-0 text-left font-bold text-inherit",
	variants: {
		size: {
			sm: "text-xl",
			md: "text-2xl",
			lg: "text-3xl",
		},
	},
	defaultVariants: { size: "lg" },
});

export type SwapTextSize = NonNullable<VariantProps<typeof swapText>["size"]>;
