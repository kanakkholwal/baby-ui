import { tv, type VariantProps } from "tailwind-variants";

export const switchTrack = tv({
	base: [
		"group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent bg-(--track) p-px",
		"transition-[background-color,box-shadow] duration-(--duration-slow) ease-[var(--ease-smooth)] motion-reduce:transition-none",
		"outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
		"aria-checked:bg-primary aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
		"not-aria-disabled:hover:bg-foreground/25 not-aria-disabled:aria-checked:hover:bg-primary-hover",
		"aria-invalid:border-destructive data-[invalid]:border-destructive",
	],
	variants: {
		/** `default`: a pill thumb; `round`: a circular thumb; `marked`: round, with on/off marks
		 * in the free half of the track, so state never rests on colour alone. */
		variant: {
			// A 4px expander keeps the small track at a 24px target; marked uses both pseudos for its marks.
			default: "before:absolute before:-inset-1 before:rounded-full",
			round: "before:absolute before:-inset-1 before:rounded-full",
			marked: [
				"before:pointer-events-none before:absolute before:top-1/2 before:left-1/4 before:h-[38%] before:w-0.5 before:-translate-1/2 before:rounded-full before:bg-primary-foreground",
				"after:pointer-events-none after:absolute after:top-1/2 after:right-1/4 after:aspect-square after:h-[38%] after:translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:border-[1.5px] after:border-muted-foreground",
				"before:opacity-0 after:opacity-100 aria-checked:before:opacity-100 aria-checked:after:opacity-0",
				"before:transition-opacity after:transition-opacity before:duration-(--duration-fast) after:duration-(--duration-fast) motion-reduce:before:transition-none motion-reduce:after:transition-none",
			],
		},
		// Heights sit beside the checkbox and radio boxes (14, 16, 20, 24) at 16, 18, 22, 26.
		size: {
			sm: "h-4 w-7",
			default: "h-[18px] w-8",
			lg: "h-[22px] w-10",
			xl: "h-[26px] w-12",
		},
	},
	defaultVariants: { variant: "default", size: "default" },
});

// The thumb stretches toward its travel while pressed, as iOS switches do, in every variant.
export const switchThumb = tv({
	base: [
		"switch-thumb relative z-1 rounded-full bg-background shadow-sm",
		"origin-left data-[checked]:origin-right group-active/switch:scale-x-[1.15] motion-reduce:group-active/switch:scale-x-100",
	],
	variants: {
		variant: { default: "", round: "", marked: "" },
		size: { sm: "", default: "", lg: "", xl: "" },
	},
	// Travel is the inner track width minus the thumb: 2px of border and 2px of padding go first.
	compoundVariants: [
		{
			variant: "default",
			size: "sm",
			class: "h-3 w-[17px] data-[checked]:translate-x-[7px]",
		},
		{
			variant: "default",
			size: "default",
			class: "h-[14px] w-[20px] data-[checked]:translate-x-[8px]",
		},
		{
			variant: "default",
			size: "lg",
			class: "h-[18px] w-[24px] data-[checked]:translate-x-[12px]",
		},
		{
			variant: "default",
			size: "xl",
			class: "h-[22px] w-[28px] data-[checked]:translate-x-[16px]",
		},
		{
			variant: ["round", "marked"],
			size: "sm",
			class: "size-3 data-[checked]:translate-x-[12px]",
		},
		{
			variant: ["round", "marked"],
			size: "default",
			class: "size-[14px] data-[checked]:translate-x-[14px]",
		},
		{
			variant: ["round", "marked"],
			size: "lg",
			class: "size-[18px] data-[checked]:translate-x-[18px]",
		},
		{
			variant: ["round", "marked"],
			size: "xl",
			class: "size-[22px] data-[checked]:translate-x-[22px]",
		},
	],
	defaultVariants: { variant: "default", size: "default" },
});

export type SwitchVariant = NonNullable<VariantProps<typeof switchTrack>["variant"]>;
export type SwitchSize = NonNullable<VariantProps<typeof switchTrack>["size"]>;
