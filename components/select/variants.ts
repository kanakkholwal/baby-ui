import { tv, type VariantProps } from "tailwind-variants";
import { controlSize, fieldFrame } from "../lib/control";

// Open state is `data-popup-open` from Base UI and `data-state=open` from bits-ui.
export const selectTrigger = tv({
	// Content sits at the start and the chevron takes the slack, so an icon and label never drift apart.
	base: "inline-flex items-center justify-start",
	variants: {
		variant: {
			default: [fieldFrame({ kind: "trigger" }), "w-full"],
			// Text and a chevron: a compact switch beside a heading, not a form field.
			ghost: [
				"w-auto font-medium text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring",
				"transition-[color,background-color,scale] duration-(--duration-fast) ease-(--ease-ui-out) motion-reduce:transition-none",
				"hover:bg-foreground/[0.06] hover:text-foreground",
				"data-[popup-open]:bg-foreground/[0.08] data-[popup-open]:text-foreground data-[state=open]:bg-foreground/[0.08] data-[state=open]:text-foreground",
				"disabled:cursor-not-allowed disabled:opacity-50",
			],
			// A raised row for settings and tweak panels: label at the start, value and chevrons at the end.
			celled: [
				"w-full bg-card font-medium text-foreground shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring",
				"transition-[box-shadow] duration-(--duration-fast) ease-(--ease-ui-out) motion-reduce:transition-none",
				"hover:shadow-sm data-[popup-open]:shadow-sm data-[state=open]:shadow-sm disabled:cursor-not-allowed disabled:opacity-50",
				"[&>[data-slot=select-value]]:ms-auto [&>[data-slot=select-value]]:font-normal [&>[data-slot=select-value]]:text-muted-foreground [&_[data-slot=select-icon]]:ms-0",
			],
		},
		// The chevron stays a step under the ladder's icon at lg and xl.
		size: {
			xs: [controlSize({ size: "xs" }), "gap-1 px-2"],
			sm: [controlSize({ size: "sm" }), "gap-1.5 px-2.5"],
			default: [controlSize({ size: "default" }), "gap-2 px-3"],
			lg: [controlSize({ size: "lg" }), "gap-2 px-3.5 [&_svg]:size-4"],
			xl: [controlSize({ size: "xl" }), "gap-2.5 px-4 [&_svg]:size-4.5"],
		},
	},
	// Celled rows are panel rows: taller than the ladder, one radius.
	compoundVariants: [
		{ variant: "celled", size: "xs", class: "h-9 rounded-xl px-3" },
		{ variant: "celled", size: "sm", class: "h-10 rounded-2xl px-3.5" },
		{ variant: "celled", size: "default", class: "h-11 rounded-2xl px-4" },
		{ variant: "celled", size: "lg", class: "h-12 rounded-2xl px-4" },
		{ variant: "celled", size: "xl", class: "h-14 rounded-2xl px-5" },
	],
	defaultVariants: { variant: "default", size: "default" },
});

export type SelectTriggerVariant = NonNullable<
	VariantProps<typeof selectTrigger>["variant"]
>;
export type SelectTriggerSize = NonNullable<VariantProps<typeof selectTrigger>["size"]>;
export type SelectContentSize = SelectTriggerSize;
