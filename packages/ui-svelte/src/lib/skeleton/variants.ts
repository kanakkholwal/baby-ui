import { tv, type VariantProps } from "tailwind-variants";

export const skeleton = tv({
	base: "skeleton-shimmer bg-card",
	variants: {
		shape: {
			line: "rounded-md",
			circle: "rounded-full",
			block: "rounded-xl",
		},
	},
	defaultVariants: { shape: "line" },
});

export type SkeletonShape = NonNullable<VariantProps<typeof skeleton>["shape"]>;
