import { tv, type VariantProps } from "tailwind-variants";

export const featureSection = tv({
	slots: {
		root: "@container/features w-full bg-background text-foreground",
		inner:
			"mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)] gap-12 px-6 py-20 @3xl/features:gap-16 @3xl/features:py-28",
		header: "grid max-w-2xl gap-4",
		eyebrow: "font-medium text-primary text-sm",
		title:
			"text-balance font-medium text-3xl tracking-tight @3xl/features:text-4xl @5xl/features:text-5xl",
		description: "text-pretty text-lg text-muted-foreground leading-relaxed",
		list: "grid",
		item: "group/feature relative grid min-w-0 content-start gap-3",
		icon: "relative shrink-0",
		iconTile: "relative grid shrink-0 place-items-center",
		itemTitle: "font-medium",
		itemDescription: "text-muted-foreground text-sm leading-relaxed",
		media:
			"relative min-w-0 overflow-hidden rounded-3xl border border-border bg-foreground/[0.03] p-2 [&>*]:rounded-2xl [&_img]:h-auto [&_img]:w-full [&_img]:align-top",
	},
	variants: {
		variant: {
			// A bordered card per item, its icon on a faded grid that widens on hover.
			cards: {
				header: "mx-auto justify-items-center text-center",
				list: "gap-4 @xl/features:grid-cols-2 @4xl/features:grid-cols-3",
				item: "justify-items-center rounded-2xl border border-border p-8 text-center transition-colors duration-(--duration-fast) hover:bg-foreground/[0.03]",
				icon: "grid size-28 place-items-center before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] before:bg-size-[20px_20px] before:[mask-image:radial-gradient(circle,black_30%,transparent_72%)] before:transition-transform before:duration-(--duration-slow) before:ease-(--ease-ui-out) group-hover/feature:before:scale-115 motion-reduce:before:transition-none",
				iconTile:
					"size-12 border-border border-t border-l bg-background text-primary [&_svg]:size-6",
				itemTitle: "mt-2",
			},
			// Hairline cells: the gap shows the border colour, so every row and column is ruled.
			divided: {
				header: "mx-auto justify-items-center text-center",
				list: "gap-px overflow-hidden rounded-2xl border border-border bg-border @xl/features:grid-cols-2 @4xl/features:grid-cols-3",
				item: "grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2.5 bg-background p-8 transition-colors duration-(--duration-fast) hover:bg-[color-mix(in_oklab,var(--foreground)_4%,var(--background))]",
				iconTile:
					"text-foreground transition-transform duration-(--duration-fast) group-hover/feature:scale-110 motion-reduce:transition-none [&_svg]:size-4",
				itemTitle: "text-sm",
				itemDescription: "col-span-2",
			},
			plain: {
				list: "gap-x-10 gap-y-12 @xl/features:grid-cols-2 @4xl/features:grid-cols-4",
				iconTile:
					"size-10 rounded-lg border border-border bg-background text-primary shadow-md shadow-primary/15 transition-transform duration-(--duration-fast) group-hover/feature:-translate-y-0.5 motion-reduce:transition-none [&_svg]:size-5",
				itemTitle: "mt-3",
			},
			// Header and a ruled list on the left, FeatureSectionMedia spanning both rows on the right.
			split: {
				inner:
					"@4xl/features:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] @4xl/features:gap-x-16 @4xl/features:gap-y-10",
				header: "@4xl/features:self-end",
				list: "divide-y divide-border border-border border-y @4xl/features:self-start",
				item: "grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-1 py-3.5",
				iconTile:
					"text-muted-foreground transition-[translate,color] duration-(--duration-fast) group-hover/feature:translate-x-0.5 group-hover/feature:text-foreground motion-reduce:transition-none [&_svg]:size-5",
				itemDescription: "col-start-2",
				media:
					"@4xl/features:col-start-2 @4xl/features:row-span-2 @4xl/features:row-start-1",
			},
		},
	},
	defaultVariants: { variant: "cards" },
});

export type FeatureSectionVariant = NonNullable<
	VariantProps<typeof featureSection>["variant"]
>;
