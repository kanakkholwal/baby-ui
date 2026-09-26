import { tv, type VariantProps } from "tailwind-variants";

export const fisheyeInfiniteGrid = tv({
	slots: {
		root: "relative isolate w-full cursor-grab touch-none select-none overflow-hidden rounded-xl border border-border bg-background outline-none focus-visible:ring-2 focus-visible:ring-ring data-[dragging=true]:cursor-grabbing",
		canvas: "pointer-events-none absolute inset-0 block size-full",
		vignette:
			"pointer-events-none absolute inset-0 bg-radial from-transparent from-55% to-background/70",
	},
	variants: {
		variant: { card: {}, plain: {} },
		size: {
			sm: { root: "h-64" },
			md: { root: "h-96" },
			lg: { root: "h-[32rem]" },
		},
	},
	defaultVariants: { variant: "card", size: "md" },
});

export type FisheyeInfiniteGridVariant = NonNullable<
	VariantProps<typeof fisheyeInfiniteGrid>["variant"]
>;
export type FisheyeInfiniteGridSize = NonNullable<
	VariantProps<typeof fisheyeInfiniteGrid>["size"]
>;
