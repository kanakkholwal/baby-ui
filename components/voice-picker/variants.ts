import { tv, type VariantProps } from "tailwind-variants";

export const voicePicker = tv({
	slots: {
		root: "flex min-w-0 flex-col gap-3",
		row: "flex items-center gap-2",
		swatch: "size-4 shrink-0 rounded-full shadow-[inset_0_0_0_1px_rgb(0_0_0/0.08)]",
		label: "flex min-w-0 items-center gap-2",
		name: "truncate",
		detail: "truncate text-muted-foreground",
		eq: "flex h-4 items-end gap-[2px]",
		eqBar: "w-[3px] origin-bottom rounded-full bg-current motion-safe:animate-pulse",
		speed: "flex items-center gap-3",
		// The slider is w-full, so it needs a flexible box of its own or its track collapses to the thumb.
		speedTrack: "min-w-0 flex-1",
		speedValue: "w-12 text-muted-foreground text-sm tabular-nums",
	},
	variants: {
		// `stack` gives each control its own line; `inline` fits voice, sample and speed in one bar, where speed becomes a button.
		variant: {
			stack: { root: "gap-3" },
			inline: { root: "flex-row flex-wrap items-center gap-2" },
		},
		// A sample takes a moment to make before it plays, so the button says which it is doing.
		sample: {
			idle: {},
			making: {},
			playing: {},
		},
	},
	defaultVariants: { variant: "stack", sample: "idle" },
});

export type VoicePickerVariant = NonNullable<VariantProps<typeof voicePicker>["variant"]>;
export type VoiceSampleState = NonNullable<VariantProps<typeof voicePicker>["sample"]>;
