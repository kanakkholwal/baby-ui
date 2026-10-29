import { tv, type VariantProps } from "tailwind-variants";

export const integrationSection = tv({
	slots: {
		root: "@container/integrations w-full bg-background text-foreground",
		inner:
			"mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)] gap-12 px-6 py-20 @3xl/integrations:py-28",
		header: "mx-auto grid max-w-2xl justify-items-center gap-4 text-center",
		title:
			"text-balance font-medium text-3xl tracking-tight @3xl/integrations:text-4xl @5xl/integrations:text-5xl",
		description: "text-pretty text-lg text-muted-foreground leading-relaxed",
		list: "",
		item: "group/integration relative min-w-0",
		logo: "grid shrink-0 place-items-center [&_img]:object-contain",
		name: "font-medium",
		itemDescription: "line-clamp-2 text-muted-foreground text-sm leading-relaxed",
		link: "",
		linkArrow:
			"size-3.5 opacity-60 transition-transform duration-(--duration-fast) group-hover/integration-link:translate-x-0.5 motion-reduce:transition-none",
	},
	variants: {
		variant: {
			// A card per tool: logo, name, two lines of copy, then a dashed rule over the link.
			grid: {
				list: "grid gap-3 @xl/integrations:grid-cols-2 @4xl/integrations:grid-cols-3",
				item: "grid content-start gap-2 rounded-2xl border border-border p-6 transition-colors duration-(--duration-fast) hover:bg-foreground/[0.03] data-[featured=true]:border-primary/40 data-[featured=true]:bg-primary/[0.04]",
				logo: "mb-4 size-10 [&_img]:size-8 [&_svg]:size-8",
				link: "group/integration-link mt-4 w-fit border-border border-t border-dashed pt-4 font-medium text-sm outline-none focus-visible:underline [&>span]:inline-flex [&>span]:items-center [&>span]:gap-1",
			},
			// Logo tiles in a cloud that fades out at its edges; the header sits underneath.
			cluster: {
				list: [
					"relative isolate order-first mx-auto flex max-w-64 flex-wrap items-center justify-center gap-2 py-6",
					"[mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_78%)]",
					"before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(var(--border)_1px,transparent_1px)] before:bg-size-[16px_16px]",
				],
				item: "grid size-16 place-items-center rounded-2xl border border-border bg-background shadow-foreground/5 shadow-sm transition-[translate,box-shadow] duration-(--duration-fast) hover:-translate-y-0.5 hover:shadow-md has-focus-visible:ring-2 has-focus-visible:ring-ring motion-reduce:transition-none data-[featured=true]:size-20 data-[featured=true]:border-foreground/20 data-[featured=true]:shadow-xl",
				logo: "[&_img]:size-7 [&_svg]:size-7 group-data-[featured=true]/integration:[&_img]:size-9 group-data-[featured=true]/integration:[&_svg]:size-9",
				name: "sr-only",
				itemDescription: "hidden",
				// The whole tile is the link; its label stays for screen readers only.
				link: "absolute inset-0 rounded-[inherit] text-[0px] outline-none",
				linkArrow: "hidden",
			},
		},
	},
	defaultVariants: { variant: "grid" },
});

export type IntegrationSectionVariant = NonNullable<
	VariantProps<typeof integrationSection>["variant"]
>;
