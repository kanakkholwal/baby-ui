import { tv, type VariantProps } from "tailwind-variants";

export const speechPlayer = tv({
	slots: {
		root: "flex min-w-0 flex-col gap-3",
		controls: "flex items-center gap-1",
		position:
			"min-w-16 text-center text-muted-foreground text-sm tabular-nums transition-colors duration-(--duration-base) motion-reduce:transition-none",
		rate: "ms-auto tabular-nums",
	},
	variants: {
		variant: {
			card: { root: "rounded-2xl bg-card p-3" },
			inline: {},
		},
		// A plain bar, or a scrubber with a tick per passage that doubles as a way to jump.
		progress: {
			bar: {},
			scrub: {},
		},
		// Reading is the one state worth a visual cue; the rest differ by their controls.
		state: {
			idle: {},
			preparing: {},
			playing: { position: "text-foreground" },
			paused: {},
		},
	},
	defaultVariants: { variant: "card", state: "idle" },
});

export type SpeechPlayerVariant = NonNullable<
	VariantProps<typeof speechPlayer>["variant"]
>;
export type SpeechPlayerState = NonNullable<VariantProps<typeof speechPlayer>["state"]>;

export const MAX_TICKS = 24;
export type SpeechProgressShape = NonNullable<
	VariantProps<typeof speechPlayer>["progress"]
>;
