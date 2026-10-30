import { tv, type VariantProps } from "tailwind-variants";

export const testimonialSection = tv({
	slots: {
		root: "@container/quotes w-full bg-background text-foreground",
		inner:
			"mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)] gap-12 px-6 py-20 @3xl/quotes:gap-16 @3xl/quotes:py-28",
		header: "mx-auto grid max-w-2xl justify-items-center gap-4 text-center",
		title:
			"text-balance font-medium text-3xl tracking-tight @3xl/quotes:text-4xl @5xl/quotes:text-5xl",
		description: "text-pretty text-lg text-muted-foreground leading-relaxed",
		list: "",
		// Each quote lifts a little under the pointer; the card inside keeps its own look.
		item: "min-w-0 transition-[translate] duration-(--duration-fast) ease-(--ease-ui-out) hover:-translate-y-0.5 motion-reduce:transition-none data-[featured=true]:[&_[data-slot=testimonial-quote]]:text-xl data-[featured=true]:[&_[data-slot=testimonial-quote]]:leading-relaxed",
	},
	variants: {
		variant: {
			// Columns that pack quotes of any length without gaps.
			masonry: {
				list: "columns-1 gap-4 @xl/quotes:columns-2 @4xl/quotes:columns-3",
				item: "mb-4 break-inside-avoid",
			},
			// A four-column grid; a featured quote takes a 2x2 block.
			bento: {
				list: "grid gap-4 @xl/quotes:auto-rows-fr @xl/quotes:grid-cols-2 @4xl/quotes:grid-cols-4",
				item: "[&>*]:h-full @xl/quotes:data-[featured=true]:col-span-2 @4xl/quotes:data-[featured=true]:row-span-2",
			},
		},
	},
	defaultVariants: { variant: "masonry" },
});

export type TestimonialSectionVariant = NonNullable<
	VariantProps<typeof testimonialSection>["variant"]
>;
