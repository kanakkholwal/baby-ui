import { tv, type VariantProps } from "tailwind-variants";

export const switchTrack = tv({
	base: [
		"relative inline-flex shrink-0 items-center rounded-full border border-transparent bg-input p-0.5 transition-colors duration-[var(--duration-press)] ease-[var(--ease-out)]",
		"outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
		"aria-checked:bg-primary aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
	],
	variants: {
		size: {
			sm: "h-4 w-7",
			md: "h-5 w-9",
			lg: "h-6 w-11",
			xl: "h-7 w-[3.25rem]",
		},
	},
	defaultVariants: { size: "md" },
});

export const switchThumb = tv({
	base: "switch-thumb rounded-full bg-background shadow-sm",
	variants: {
		size: {
			sm: "size-3",
			md: "size-4",
			lg: "size-5",
			xl: "size-6",
		},
	},
	defaultVariants: { size: "md" },
});

export type SwitchSize = NonNullable<VariantProps<typeof switchTrack>["size"]>;

/** How far the thumb travels to the checked position; a CSS value, not a class. */
export const SWITCH_TRAVEL: Record<SwitchSize, string> = {
	sm: "0.75rem",
	md: "1rem",
	lg: "1.25rem",
	xl: "1.5rem",
};
