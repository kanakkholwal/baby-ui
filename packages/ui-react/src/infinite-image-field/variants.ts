import { tv, type VariantProps } from "tailwind-variants";

export const infiniteImageField = tv({
	slots: {
		root: "relative isolate w-full overflow-hidden rounded-xl border border-border bg-background outline-none focus-visible:ring-2 focus-visible:ring-ring",
		canvas: "pointer-events-none absolute inset-0 block size-full",
	},
	variants: {
		shape: { square: {}, rounded: {} },
		layout: { grid: {}, staggered: {} },
		size: {
			sm: { root: "h-64" },
			md: { root: "h-96" },
			lg: { root: "h-[32rem]" },
		},
	},
	defaultVariants: { shape: "rounded", layout: "grid", size: "md" },
});

export type InfiniteImageFieldShape = NonNullable<
	VariantProps<typeof infiniteImageField>["shape"]
>;
export type InfiniteImageFieldLayout = NonNullable<
	VariantProps<typeof infiniteImageField>["layout"]
>;
export type InfiniteImageFieldSize = NonNullable<
	VariantProps<typeof infiniteImageField>["size"]
>;

/** Tile corner radius per shape, as a share of the tile's shorter side. */
export const SHAPE_RADIUS: Record<InfiniteImageFieldShape, number> = {
	square: 0,
	rounded: 0.08,
};
