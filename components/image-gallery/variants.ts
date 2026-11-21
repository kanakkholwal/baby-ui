import { tv, type VariantProps } from "tailwind-variants";

export const imageGallery = tv({
	slots: {
		root: "w-full min-w-0",
		grid: "[--gallery-gap:0.75rem]",
		item: [
			"group/item relative block w-full overflow-hidden rounded-xl bg-muted outline-none",
			"transition-[scale,opacity] duration-(--duration-base) ease-(--ease-ui-out)",
			"focus-visible:ring-2 focus-visible:ring-ring active:scale-(--press-scale) motion-reduce:transition-none",
		],
		image:
			"size-full select-none object-cover transition-[scale,filter] duration-(--duration-overlay) ease-(--ease-ui-out) group-hover/item:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover/item:scale-100",
		// Text sits on a scrim so it stays readable on any picture.
		info: [
			"pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-0.5 bg-linear-to-t from-black/75 to-transparent p-3 pt-10 text-left text-white text-xs",
			"translate-y-1 opacity-0 transition-[opacity,translate] duration-(--duration-base) ease-(--ease-ui-out)",
			"group-hover/item:translate-y-0 group-hover/item:opacity-100 group-focus-visible/item:translate-y-0 group-focus-visible/item:opacity-100",
			"motion-reduce:transition-none",
		],
		check: [
			"absolute top-2 left-2 grid size-6 place-items-center rounded-full bg-black/40 text-transparent backdrop-blur-sm",
			"transition-[background-color,color,scale] duration-(--duration-base) ease-(--ease-ui-out) motion-reduce:transition-none",
			"[&_svg]:size-3.5",
		],
	},
	variants: {
		// `masonry` keeps each picture's own ratio in flowing columns; `grid` crops to even squares.
		variant: {
			masonry: {
				grid: "[column-gap:var(--gallery-gap)] [columns:var(--gallery-column-width,14rem)]",
				item: "mb-(--gallery-gap) break-inside-avoid",
			},
			// `bento` mixes sizes: every fifth picture takes a 2 by 2 tile and the rest fill in around it.
			bento: {
				grid: "grid auto-rows-[9rem] gap-(--gallery-gap) [grid-auto-flow:dense] [grid-template-columns:repeat(auto-fill,minmax(var(--gallery-column-width,10rem),1fr))]",
				item: "data-[feature]:col-span-2 data-[feature]:row-span-2",
			},
			grid: {
				grid: "grid gap-(--gallery-gap) [grid-template-columns:repeat(auto-fill,minmax(var(--gallery-column-width,14rem),1fr))]",
				item: "aspect-square",
			},
		},
		selected: {
			true: {
				item: "scale-[0.96]",
				check: "bg-primary text-primary-foreground",
			},
			false: {},
		},
	},
	defaultVariants: { variant: "masonry", selected: false },
});

export type ImageGalleryVariant = NonNullable<
	VariantProps<typeof imageGallery>["variant"]
>;
