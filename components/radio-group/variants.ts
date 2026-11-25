import { tv, type VariantProps } from "tailwind-variants";

export const radioGroup = tv({
	slots: {
		root: "flex gap-2",
		label: "inline-flex cursor-pointer items-start gap-2.5 text-foreground",
		// The ring is the primitive itself: Base UI marks it data-checked, bits-ui data-state.
		ring: [
			"relative mt-0.5 grid shrink-0 place-items-center rounded-full border-2 before:absolute before:-inset-1.5 before:rounded-full border-muted-foreground/75 bg-background outline-none",
			"transition-[background-color,border-color] duration-(--duration-fast) ease-(--ease-ui-out) hover:border-muted-foreground motion-reduce:transition-none",
			"aria-invalid:border-destructive data-checked:border-primary data-[state=checked]:border-primary",
			"focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
		],
		dot: "radio-dot rounded-full bg-primary",
		pill: "hidden",
	},
	variants: {
		variant: {
			default: {},
			// Checked, the ring fills and the dot turns to the label colour: reads at the smallest size.
			solid: {
				ring: "data-checked:bg-primary data-[state=checked]:bg-primary",
				dot: "bg-primary-foreground",
			},
			card: {
				label:
					"rounded-xl border border-transparent bg-card px-3.5 py-3 transition-[border-color,scale] duration-(--duration-press) ease-(--ease-ui-out) active:scale-(--press-scale-lg) motion-reduce:transition-none has-checked:border-primary",
			},
			// Menu-style rows: the checked row is tinted, for pickers inside a popover.
			// One highlight glides to the checked row instead of each row tinting itself.
			list: {
				root: "relative isolate gap-0.5",
				label: [
					"relative z-1 w-full items-center rounded-md px-2 py-1.5 transition-colors hover:bg-accent/60",
					"has-data-checked:font-medium has-data-[state=checked]:font-medium",
				],
				ring: "mt-0",
				pill: "pointer-events-none absolute top-0 left-0 block rounded-md bg-foreground/[0.06] data-[ready=true]:transition-[translate,width,height,opacity] data-[ready=true]:duration-(--duration-spring-snappy) data-[ready=true]:ease-(--ease-spring-snappy) motion-reduce:transition-none",
			},
			// A segmented control: one track, one pill gliding to the checked segment. The radio stays the
			// focusable, form-native element, laid over its segment; forced colours keep a filled segment.
			segmented: {
				root: "relative isolate inline-flex flex-row items-center gap-0 bg-muted",
				label: [
					"relative z-1 flex min-w-0 flex-1 cursor-pointer select-none items-center justify-center rounded-[inherit] font-medium text-muted-foreground transition-colors duration-(--duration-fast) hover:text-foreground has-data-checked:text-foreground has-data-[state=checked]:text-foreground",
					"has-focus-visible:outline-2 has-focus-visible:outline-ring has-focus-visible:outline-offset-2 has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50 motion-reduce:transition-none pointer-coarse:min-h-11",
					"forced-colors:has-data-checked:text-[HighlightText] forced-colors:has-data-[state=checked]:text-[HighlightText]",
				],
				ring: "absolute inset-0 mt-0 size-full rounded-[inherit] border-0 bg-transparent opacity-0 shadow-none before:hidden focus-visible:ring-0 focus-visible:ring-offset-0 data-checked:bg-transparent",
				dot: "hidden",
				pill: "pointer-events-none absolute top-0 left-0 block bg-background shadow-xs data-[ready=true]:transition-[translate,width,height,opacity] data-[ready=true]:duration-(--duration-spring-snappy) data-[ready=true]:ease-(--ease-spring-snappy) motion-reduce:transition-none forced-colors:bg-[Highlight]",
			},
		},
		size: {
			sm: { label: "text-xs", ring: "size-3.5", dot: "size-1.5" },
			default: { label: "text-sm", ring: "size-4", dot: "size-2" },
			lg: { label: "text-sm", ring: "size-5", dot: "size-2.5" },
			xl: { label: "text-base", ring: "size-6", dot: "size-3" },
		},
		orientation: {
			vertical: { root: "flex-col" },
			horizontal: { root: "flex-row flex-wrap items-start" },
			// Responsive columns for `card` items; a column never narrows below 12rem.
			grid: { root: "grid grid-cols-[repeat(auto-fill,minmax(min(12rem,100%),1fr))]" },
		},
	},
	// Segmented ignores orientation and takes the control ladder: items are the height minus the rim.
	compoundVariants: [
		{ variant: "segmented", class: { root: "flex-row" } },
		{
			variant: "segmented",
			size: "sm",
			class: {
				root: "h-8 rounded-md p-0.5",
				label: "h-6.5 rounded-[calc(var(--radius-md)-3px)] px-2 text-xs",
				pill: "rounded-[calc(var(--radius-md)-3px)]",
			},
		},
		{
			variant: "segmented",
			size: "default",
			class: {
				root: "h-9 rounded-lg p-0.5",
				label: "h-7.5 rounded-[calc(var(--radius-lg)-3px)] px-2.5 text-sm",
				pill: "rounded-[calc(var(--radius-lg)-3px)]",
			},
		},
		{
			variant: "segmented",
			size: "lg",
			class: {
				root: "h-10 rounded-lg p-0.5",
				label: "h-8.5 rounded-[calc(var(--radius-lg)-3px)] px-3 text-sm",
				pill: "rounded-[calc(var(--radius-lg)-3px)]",
			},
		},
		{
			variant: "segmented",
			size: "xl",
			class: {
				root: "h-12 rounded-xl p-1",
				label: "h-9.5 rounded-[calc(var(--radius-xl)-5px)] px-3.5 text-base",
				pill: "rounded-[calc(var(--radius-xl)-5px)]",
			},
		},
	],
	defaultVariants: { variant: "default", size: "default", orientation: "vertical" },
});

export type RadioVariant = NonNullable<VariantProps<typeof radioGroup>["variant"]>;
export type RadioSize = NonNullable<VariantProps<typeof radioGroup>["size"]>;
export type RadioOrientation = NonNullable<
	VariantProps<typeof radioGroup>["orientation"]
>;
