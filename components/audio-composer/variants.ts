import { tv, type VariantProps } from "tailwind-variants";

export const audioComposer = tv({
	slots: {
		root: "w-full",
		// 36px like the style select beside it: 2px rim plus the 32px icon buttons, radius 10 minus 2.
		stepper: "inline-flex h-9 items-center rounded-lg bg-foreground/[0.06] p-0.5",
		value: "min-w-14 text-center font-medium text-sm tabular-nums",
		tools: "ms-auto flex items-center gap-2",
		style: "min-w-0 max-w-44",
	},
	variants: {
		// `docked` is the card at the bottom of a page; `inline` has no surface of its own.
		variant: {
			docked: { root: "rounded-2xl bg-card p-2" },
			inline: {},
		},
	},
	defaultVariants: { variant: "docked" },
});

export type AudioComposerVariant = NonNullable<
	VariantProps<typeof audioComposer>["variant"]
>;
