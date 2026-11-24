import { tv, type VariantProps } from "tailwind-variants";

export const badge = tv({
	base: "inline-flex shrink-0 items-center gap-1.5 border font-medium tabular-nums whitespace-nowrap transition-colors duration-(--duration-fast) ease-(--ease-ui-out) motion-reduce:transition-none",
	variants: {
		variant: {
			// --primary on its own 15% tint is 4.01:1 in light; --primary-hover clears 4.5:1.
			default:
				"border-transparent bg-[color-mix(in_oklch,var(--primary)_15%,transparent)] text-primary-hover",
			secondary: "border-transparent bg-muted text-foreground",
			outline: "border-border bg-transparent text-foreground",
			success:
				"border-transparent bg-[color-mix(in_oklch,var(--success)_15%,transparent)] text-success-strong",
			warning:
				"border-transparent bg-[color-mix(in_oklch,var(--warning)_15%,transparent)] text-warning-strong",
			destructive:
				"border-transparent bg-[color-mix(in_oklch,var(--destructive)_15%,transparent)] text-destructive-strong",
			info: "border-transparent bg-[color-mix(in_oklch,var(--info)_15%,transparent)] text-info-strong",
			// Premium marker: a warm gold tint with a sweeping shine (motion.css `badge-shine`).
			gold: "badge-shine border-transparent bg-[color-mix(in_oklch,var(--warning)_22%,transparent)] text-warning-strong",
		},
		size: {
			// Radius holds near 30% of the height, like the control ladder.
			sm: "h-5 gap-1 rounded-sm px-1.5 text-xs [&>[data-slot=badge-dot]]:size-1 [&_svg]:size-3",
			default:
				"h-6 rounded-md px-2 text-xs [&>[data-slot=badge-dot]]:size-1.5 [&_svg]:size-3",
			lg: "h-7 rounded-md px-2.5 text-sm [&>[data-slot=badge-dot]]:size-1.5 [&_svg]:size-3.5",
			xl: "h-8 rounded-md px-3 text-sm [&>[data-slot=badge-dot]]:size-2 [&_svg]:size-4",
		},
		/** How the colour is applied: `soft` tints, `solid` fills, `ghost` keeps only the coloured text. */
		fill: { soft: "", solid: "", ghost: "" },
		/** Pins the badge to a corner of a `BadgeAnchor`; `none` leaves it inline. */
		placement: {
			none: "",
			"top-right": "absolute top-0 right-0 translate-x-1/4 -translate-y-1/4",
			"top-left": "absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4",
			"bottom-right": "absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4",
			"bottom-left": "absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4",
		},
	},
	compoundVariants: [
		// Solid fills: the saturated token with its own foreground.
		{ fill: "solid", variant: "default", class: "bg-primary text-primary-foreground" },
		{ fill: "solid", variant: "secondary", class: "bg-muted-foreground text-background" },
		{
			fill: "solid",
			variant: "outline",
			class: "border-transparent bg-foreground text-background",
		},
		{ fill: "solid", variant: "success", class: "bg-success text-success-foreground" },
		{ fill: "solid", variant: "warning", class: "bg-warning text-warning-foreground" },
		{
			fill: "solid",
			variant: "destructive",
			class: "bg-destructive text-destructive-foreground",
		},
		{ fill: "solid", variant: "info", class: "bg-info text-info-foreground" },
		{ fill: "solid", variant: "gold", class: "bg-warning text-warning-foreground" },
		// Ghost: no surface, the variant's text colour stays.
		{ fill: "ghost", variant: "default", class: "bg-transparent" },
		{
			fill: "ghost",
			variant: "secondary",
			class: "bg-transparent text-muted-foreground",
		},
		{ fill: "ghost", variant: "outline", class: "border-transparent" },
		{
			fill: "ghost",
			variant: ["success", "warning", "destructive", "info", "gold"],
			class: "bg-transparent",
		},
		// Anchored: a round indicator that grows with its content, cut out of the host by a background ring.
		{
			placement: ["top-right", "top-left", "bottom-right", "bottom-left"],
			class: "justify-center rounded-full shadow-[0_0_0_2px_var(--background)]",
		},
		{
			placement: ["top-right", "top-left", "bottom-right", "bottom-left"],
			size: "sm",
			class: "min-w-5 px-1",
		},
		{
			placement: ["top-right", "top-left", "bottom-right", "bottom-left"],
			size: "default",
			class: "min-w-6",
		},
		{
			placement: ["top-right", "top-left", "bottom-right", "bottom-left"],
			size: "lg",
			class: "min-w-7",
		},
		{
			placement: ["top-right", "top-left", "bottom-right", "bottom-left"],
			size: "xl",
			class: "min-w-8",
		},
	],
	defaultVariants: {
		variant: "default",
		size: "default",
		fill: "soft",
		placement: "none",
	},
});

export const badgeAnchor = tv({ base: "relative inline-flex shrink-0" });

export type BadgeVariant = NonNullable<VariantProps<typeof badge>["variant"]>;
export type BadgeSize = NonNullable<VariantProps<typeof badge>["size"]>;
export type BadgeFill = NonNullable<VariantProps<typeof badge>["fill"]>;
export type BadgePlacement = NonNullable<VariantProps<typeof badge>["placement"]>;
