import { tv, type VariantProps } from "tailwind-variants";

// Segments share edges: inner corners square off and the doubled border between them drops.
export const buttonGroup = tv({
	slots: {
		root: "group/button-group flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
		text: "flex items-center gap-2 rounded-full bg-muted px-4 font-medium text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
		// Zero-size sibling: it adds no gap, and its pseudo-element draws a short hairline on the seam.
		separator: [
			"pointer-events-none relative z-10 shrink-0 self-stretch bg-transparent before:absolute before:rounded-full before:bg-current before:opacity-15",
			"data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-0 data-[orientation=vertical]:before:inset-y-1/4 data-[orientation=vertical]:before:left-0 data-[orientation=vertical]:before:w-px",
			"data-[orientation=horizontal]:h-0 data-[orientation=horizontal]:w-auto data-[orientation=horizontal]:before:inset-x-1/4 data-[orientation=horizontal]:before:top-0 data-[orientation=horizontal]:before:h-px",
		],
	},
	variants: {
		orientation: {
			horizontal: {
				root: "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
			},
			vertical: {
				root: "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
			},
		},
	},
	defaultVariants: { orientation: "horizontal" },
});

export type ButtonGroupOrientation = NonNullable<
	VariantProps<typeof buttonGroup>["orientation"]
>;
