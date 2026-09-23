import { tv, type VariantProps } from "tailwind-variants";

export const metisText = tv({
	slots: {
		root: "group/metis relative inline-block max-w-full cursor-pointer",
		underline:
			"pointer-events-none absolute inset-x-0 top-full h-px scale-x-0 bg-current opacity-0 transition-[transform,opacity] duration-[var(--mtx-duration,300ms)] group-hover/metis:scale-x-100 group-hover/metis:opacity-100 group-focus-visible/metis:scale-x-100 group-focus-visible/metis:opacity-100",
	},
	variants: {
		direction: {
			left: { underline: "origin-left" },
			center: { underline: "origin-center" },
		},
	},
	defaultVariants: { direction: "left" },
});

export type MetisTextDirection = NonNullable<VariantProps<typeof metisText>["direction"]>;
