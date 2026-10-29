import { tv, type VariantProps } from "tailwind-variants";

export const heroSection = tv({
	slots: {
		root: "@container/hero relative isolate w-full overflow-hidden bg-background text-foreground",
		inner:
			"mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)] gap-12 px-6 py-24 @3xl/hero:gap-16 @3xl/hero:py-32",
		// A nowrap announcement would widen an auto track past the column; minmax(0,1fr) caps it.
		content: "grid w-full min-w-0 grid-cols-[minmax(0,1fr)] gap-6",
		announcement: [
			"group/hero-pill card-fade-up inline-flex w-fit max-w-full items-center gap-3 rounded-full border border-border bg-background py-1 pr-1 pl-4 text-sm",
			"outline-none transition-[background-color,scale] duration-(--duration-fast) hover:bg-foreground/[0.06] focus-visible:ring-2 focus-visible:ring-ring active:scale-[var(--press-scale)]",
		],
		announcementLabel: "shrink-0 font-medium",
		announcementText: "truncate text-muted-foreground",
		announcementRule: "h-4 w-px shrink-0 bg-border",
		announcementArrow:
			"size-6 shrink-0 overflow-hidden rounded-full bg-foreground/[0.06]",
		// Two arrows on a track: hover slides the waiting one in as the first leaves.
		announcementTrack:
			"flex w-12 -translate-x-1/2 transition-transform duration-(--duration-slow) ease-(--ease-ui-out) group-hover/hero-pill:translate-x-0 motion-reduce:transition-none",
		announcementCell: "grid size-6 place-items-center [&_svg]:size-3",
		title:
			"card-fade-up text-balance font-medium text-5xl tracking-tight [animation-delay:calc(var(--stagger-step)*1)] @3xl/hero:text-6xl @5xl/hero:text-7xl",
		description:
			"card-fade-up max-w-2xl text-pretty text-lg text-muted-foreground leading-relaxed [animation-delay:calc(var(--stagger-step)*2)]",
		actions:
			"card-fade-up mt-2 flex w-full flex-col gap-3 [animation-delay:calc(var(--stagger-step)*3)] @xl/hero:w-auto @xl/hero:flex-row",
		action: "w-full @xl/hero:w-auto",
		logos: "card-fade-up mt-6 grid gap-4 [animation-delay:calc(var(--stagger-step)*4)]",
		logosLabel: "text-muted-foreground text-sm",
		logosList: [
			"flex flex-wrap items-center gap-x-10 gap-y-6 text-foreground/80",
			"[&_img]:h-6 [&_img]:w-auto [&_svg]:h-6 [&_svg]:w-auto [&>*]:transition-opacity [&>*]:duration-(--duration-fast) hover:[&>*:not(:hover)]:opacity-40",
		],
	},
	variants: {
		variant: {
			centered: {
				inner: "justify-items-center text-center",
				content: "justify-items-center",
				actions: "@xl/hero:justify-center",
				logosList: "justify-center",
			},
			split: {
				inner:
					"@4xl/hero:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] @4xl/hero:items-center",
				content: "justify-items-start",
				title: "@5xl/hero:text-6xl",
			},
		},
	},
	defaultVariants: { variant: "centered" },
});

export type HeroSectionVariant = NonNullable<VariantProps<typeof heroSection>["variant"]>;

export const heroSectionMedia = tv({
	slots: {
		root: "group/hero-media card-fade-up relative w-full min-w-0 [animation-delay:calc(var(--stagger-step)*4)]",
		plate: "hidden",
		// align-top, not block: a `hidden dark:block` light/dark pair must keep its own display.
		frame: "relative overflow-hidden [&_img]:h-auto [&_img]:w-full [&_img]:align-top",
	},
	variants: {
		variant: {
			plain: { frame: "rounded-2xl" },
			framed: {
				frame:
					"rounded-2xl border border-border bg-foreground/[0.03] p-2 shadow-foreground/5 shadow-xl [&>*]:rounded-xl [&>*]:border [&>*]:border-border/60",
			},
			tilted: {
				root: "py-6 perspective-[1600px] @4xl/hero:py-10",
				plate:
					"absolute inset-x-0 inset-y-0 block -skew-x-6 rounded-3xl border border-foreground/5 bg-foreground/[0.04] transition-transform duration-(--duration-slow) ease-(--ease-ui-out) group-hover/hero-media:-skew-x-3 motion-reduce:transition-none",
				frame:
					"translate-x-3 -translate-y-6 -skew-x-6 rounded-2xl border border-border bg-background shadow-foreground/10 shadow-xl transition-transform duration-(--duration-slow) ease-(--ease-ui-out) group-hover/hero-media:-translate-y-4 group-hover/hero-media:-skew-x-3 motion-reduce:transition-none",
			},
		},
		// Follows the HeroSection variant through context, never set by callers.
		layout: {
			centered: { root: "mx-auto max-w-5xl" },
			split: {},
		},
	},
	compoundVariants: [
		// Under centred copy a framed shot fades out at the bottom and runs into the page.
		{
			variant: "framed",
			layout: "centered",
			class: { root: "max-w-6xl mask-b-from-60%" },
		},
		{ variant: "tilted", layout: "centered", class: { root: "max-w-4xl" } },
	],
	defaultVariants: { variant: "framed", layout: "centered" },
});

export type HeroSectionMediaVariant = NonNullable<
	VariantProps<typeof heroSectionMedia>["variant"]
>;
