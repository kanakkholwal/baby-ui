import { tv, type VariantProps } from "tailwind-variants";

export const audioComposer = tv({
	slots: {
		root: "w-full",
		stepper: "inline-flex items-center rounded-lg bg-muted/60",
		value: "min-w-12 text-center text-sm tabular-nums",
		// A small knob you turn: the arc is the chosen length out of the allowed range.
		dialGroup: "inline-flex items-center gap-2",
		dial: "relative size-10 shrink-0 cursor-grab touch-none select-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring active:cursor-grabbing data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
		dialTrack: "fill-none stroke-muted-foreground/25",
		dialArc: "fill-none stroke-primary",
		dialKnob: "fill-foreground",
		dialValue: "min-w-10 text-sm tabular-nums",
		tools: "ms-auto flex items-center gap-2",
		style: "min-w-0 max-w-44",
	},
	variants: {
		// A minus and plus stepper, or a knob you turn.
		shape: {
			stepper: {},
			dial: {},
		},
		// `docked` is the card at the bottom of a page; `inline` has no surface of its own.
		variant: {
			docked: { root: "rounded-2xl bg-card p-2" },
			inline: {},
		},
	},
	defaultVariants: { variant: "docked", shape: "stepper" },
});

export type AudioComposerVariant = NonNullable<
	VariantProps<typeof audioComposer>["variant"]
>;

export type AudioDurationShape = NonNullable<VariantProps<typeof audioComposer>["shape"]>;
