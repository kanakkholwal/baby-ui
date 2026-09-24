import { tv, type VariantProps } from "tailwind-variants";

export const textLoop = tv({
	slots: {
		root: "relative inline-grid align-baseline leading-none",
		sizer: "invisible col-start-1 row-start-1 whitespace-nowrap",
		viewport: "relative col-start-1 row-start-1 grid overflow-hidden",
		item: "col-start-1 row-start-1 block whitespace-nowrap",
	},
	variants: {
		direction: {
			up: { root: "[--text-loop-dir:1]" },
			down: { root: "[--text-loop-dir:-1]" },
		},
		size: {
			inherit: {},
			sm: { root: "text-lg" },
			md: { root: "text-xl" },
			lg: { root: "text-3xl" },
		},
	},
	defaultVariants: { direction: "up", size: "inherit" },
});

export type TextLoopDirection = NonNullable<VariantProps<typeof textLoop>["direction"]>;
export type TextLoopSize = NonNullable<VariantProps<typeof textLoop>["size"]>;
