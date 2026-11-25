import { tv, type VariantProps } from "tailwind-variants";

// The root is the size container and a one-column grid: content, arrows and play share row 1,
// dots and thumbs stack below. `--ctl` sizes every control from one value.
export const carousel = tv({
	slots: {
		root: "group/carousel @container grid w-full min-w-0 grid-cols-[minmax(0,1fr)] [--carousel-gap:1rem]",
		// Only the x axis clips, so focus rings inside the active slide are never cut at top or bottom.
		content:
			"relative col-start-1 row-start-1 min-w-0 cursor-grab touch-pan-y overflow-x-clip overflow-y-visible rounded-xl outline-none [-webkit-tap-highlight-color:transparent] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background data-dragging:cursor-grabbing",
		// Before hydration the start slide is placed with CSS, so nothing moves on first paint.
		track:
			"flex select-none gap-(--carousel-gap) px-[calc((100cqw-var(--carousel-slide))/2)] [&:not([data-measured])]:translate-x-[calc(var(--carousel-start)*-1*(var(--carousel-slide)+var(--carousel-gap)))]",
		slide:
			"w-(--carousel-slide) min-w-0 flex-[0_0_var(--carousel-slide)] origin-center will-change-[transform,opacity] [&_img]:[-webkit-user-drag:none]",
		// A row for controls that belong together; parts inside drop their overlay placement.
		controls:
			"col-start-1 mt-3 flex min-w-0 items-center justify-center gap-2 px-[calc((100cqw-var(--carousel-slide))/2)]",
		// Arrows float over the slide's edges, centred on row 1.
		control: [
			"z-10 size-(--ctl) shrink-0 rounded-full bg-background/90 p-0 text-foreground shadow-sm backdrop-blur-sm hover:bg-background",
			"transition-[opacity,background-color,scale] duration-(--duration-fast) ease-[var(--ease-ui-out)] motion-reduce:transition-none",
			"aria-disabled:pointer-events-none aria-disabled:opacity-40 [&_svg]:size-4",
			"in-data-[slot=carousel-controls]:static in-data-[slot=carousel-controls]:m-0 in-data-[slot=carousel-controls]:bg-muted in-data-[slot=carousel-controls]:shadow-none",
		],
		previous:
			"col-start-1 row-start-1 ms-[calc((100cqw-var(--carousel-slide))/2+0.75rem)] self-center justify-self-start in-data-[slot=carousel-controls]:order-first",
		next: "col-start-1 row-start-1 me-[calc((100cqw-var(--carousel-slide))/2+0.75rem)] self-center justify-self-end in-data-[slot=carousel-controls]:order-last",
		tabs: "col-start-1 row-start-2 mt-3 flex min-h-6 min-w-0 items-center justify-center justify-self-center",
		// 24px minimum hit area around a 6px dot (WCAG 2.5.8); the active dot stretches to a pill.
		tab: "group/dot grid h-6 min-w-6 flex-none cursor-pointer place-items-center rounded-full p-0 px-1 outline-none [-webkit-tap-highlight-color:transparent] focus-visible:ring-2 focus-visible:ring-ring",
		dot: "relative block h-1.5 w-[calc(6px+10px*var(--emphasis,0))] overflow-hidden rounded-full bg-border-strong transition-colors duration-(--duration-fast) group-hover/dot:bg-muted-foreground motion-reduce:transition-none",
		dotFill: "absolute inset-0 bg-foreground opacity-[var(--emphasis,0)]",
		// While rotating, the active dot drains from the right to show the time left on the slide.
		dotDrain: "absolute inset-0 origin-right scale-x-[var(--drain,0)] bg-border-strong",
		// Thumbnails scroll sideways; the padding leaves room for the selected ring.
		thumbs:
			"relative col-start-1 mt-3 flex min-w-0 gap-2 overflow-x-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
		thumb: [
			"relative aspect-[4/3] w-(--thumb) shrink-0 cursor-pointer overflow-hidden rounded-lg bg-muted opacity-60 outline-none",
			"transition-[opacity,box-shadow,scale] duration-(--duration-fast) ease-[var(--ease-ui-out)] hover:opacity-100 active:scale-[var(--press-scale-sm)]",
			"aria-[current=true]:opacity-100 aria-[current=true]:ring-2 aria-[current=true]:ring-primary aria-[current=true]:ring-offset-2 aria-[current=true]:ring-offset-background",
			"focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none motion-reduce:active:scale-100 [&>img]:size-full [&>img]:object-cover",
		],
	},
	variants: {
		projection: {
			linear: {},
			concave: {
				content:
					"h-[min(42cqw,22rem)] rounded-2xl bg-muted/20 [clip-path:inset(0_round_1rem)]",
				track: "relative h-full px-0",
			},
			convex: {
				content:
					"h-[min(42cqw,22rem)] rounded-2xl bg-muted/20 [clip-path:inset(0_round_1rem)]",
				track: "relative h-full px-0",
			},
		},
		variant: {
			// One full-width slide, arrows over its edges, dots below.
			default: {},
			// The slide is narrower than the frame so neighbours scale and dim at its sides.
			peek: {},
			// Peek with neighbours at full size.
			flat: {},
			// Dots float over the bottom of the slide.
			inset: {
				tabs: "relative z-10 col-start-1 row-start-1 mt-0 mb-3 self-end rounded-full bg-background/75 px-1 shadow-sm backdrop-blur-md",
			},
			// Large editorial media; grouped pill controls sit in a `CarouselControls` row.
			showcase: {
				root: "[--carousel-gap:1.25rem]",
				content:
					"rounded-[2rem] [clip-path:inset(0_round_2rem)] @max-[640px]:rounded-2xl @max-[640px]:[clip-path:inset(0_round_1rem)]",
				slide: "overflow-hidden rounded-[2rem] @max-[640px]:rounded-2xl",
				controls: "mt-5 gap-3 px-0",
				tabs: "mt-5 h-(--ctl) rounded-full bg-muted px-3 in-data-[slot=carousel-controls]:mt-0",
				tab: "px-2 @max-[640px]:px-1.5",
				dot: "h-2 bg-muted-foreground/45 group-aria-selected/dot:w-12",
			},
		},
		size: {
			sm: {
				root: "[--carousel-slide:min(70cqw,260px)] [--ctl:--spacing(8)] [--thumb:--spacing(14)]",
			},
			default: {
				root: "[--carousel-slide:min(80cqw,340px)] [--ctl:--spacing(9)] [--thumb:--spacing(20)]",
			},
			lg: {
				root: "[--carousel-slide:min(86cqw,480px)] [--ctl:--spacing(10)] [--thumb:--spacing(24)]",
			},
		},
	},
	compoundVariants: [
		// The plain variants fill the frame; size then scales controls and thumbnails.
		{ variant: ["default", "inset"], class: { root: "[--carousel-slide:100cqw]" } },
		// Arrows sit at the frame edges here, clear of the arc.
		{
			projection: ["concave", "convex"],
			class: { previous: "ms-3", next: "me-3" },
		},
		// Declared after `size`, which also sets the control size.
		{
			variant: "showcase",
			class: { root: "[--ctl:--spacing(14)] @max-[640px]:[--ctl:--spacing(11)]" },
		},
		{
			projection: ["concave", "convex"],
			variant: "inset",
			class: { tabs: "mb-3" },
		},
		{
			projection: ["concave", "convex"],
			variant: "showcase",
			class: {
				content: "rounded-2xl [clip-path:inset(0_round_1rem)]",
				slide: "rounded-2xl",
			},
		},
		// Projected slides sit on an arc inside a fixed-height viewport, so each size is narrower there.
		{
			projection: ["concave", "convex"],
			size: "sm",
			class: { root: "[--carousel-slide:min(26cqw,11rem)]" },
		},
		{
			projection: ["concave", "convex"],
			size: "default",
			class: { root: "[--carousel-slide:min(32cqw,14.375rem)]" },
		},
		{
			projection: ["concave", "convex"],
			size: "lg",
			class: { root: "[--carousel-slide:min(40cqw,17rem)]" },
		},
		{
			projection: "linear",
			variant: "showcase",
			size: "sm",
			class: { root: "[--carousel-slide:min(72cqw,40rem)]" },
		},
		{
			projection: "linear",
			variant: "showcase",
			size: "default",
			class: { root: "[--carousel-slide:min(87.5cqw,72rem)]" },
		},
		{
			projection: "linear",
			variant: "showcase",
			size: "lg",
			class: { root: "[--carousel-slide:min(94cqw,80rem)]" },
		},
	],
	defaultVariants: { projection: "linear", variant: "default", size: "default" },
});

export type CarouselProjection = NonNullable<VariantProps<typeof carousel>["projection"]>;
export type CarouselVariant = NonNullable<VariantProps<typeof carousel>["variant"]>;
export type CarouselSize = NonNullable<VariantProps<typeof carousel>["size"]>;

/** Every string the carousel announces or labels; override any of them. */
export type CarouselLabels = {
	slides: string;
	chooseSlide: string;
	thumbnails: string;
	previous: string;
	next: string;
};

export const CAROUSEL_LABELS: CarouselLabels = {
	slides: "Slides",
	chooseSlide: "Choose a slide",
	thumbnails: "Slide thumbnails",
	previous: "Previous slide",
	next: "Next slide",
};
