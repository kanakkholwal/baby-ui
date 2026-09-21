import { tv, type VariantProps } from "tailwind-variants";

export const progressTrack = tv({
	base: "w-full overflow-hidden rounded-full bg-input",
	variants: {
		size: {
			sm: "h-1",
			md: "h-2",
			lg: "h-3",
			xl: "h-4",
		},
	},
	defaultVariants: { size: "md" },
});

export type ProgressSize = NonNullable<VariantProps<typeof progressTrack>["size"]>;
