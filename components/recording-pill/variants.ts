import { tv, type VariantProps } from "tailwind-variants";

export const recordingPill = tv({
	slots: {
		root: "inline-flex h-10 min-w-0 items-center gap-3 rounded-full px-3.5 text-sm shadow-(--overlay-shadow) transition-colors duration-(--duration-base) ease-(--ease-ui-out) motion-reduce:transition-none",
		icon: "grid size-4 shrink-0 place-items-center transition-opacity duration-(--duration-base) [&_svg]:size-4",
		label: "min-w-0 truncate font-medium",
		meter: "relative h-1 w-16 shrink-0 overflow-hidden rounded-full bg-current/20",
		bar: "block h-full w-[3px] origin-center rounded-full bg-current transition-transform duration-(--duration-fast) ease-linear motion-reduce:transition-none",
		fill: "absolute inset-0 origin-left rounded-full bg-current transition-transform duration-(--duration-fast) ease-linear motion-reduce:transition-none",
		timer: "shrink-0 tabular-nums opacity-70",
		cancel:
			"grid size-6 shrink-0 place-items-center rounded-full opacity-70 outline-none transition-[opacity,background-color,scale] duration-(--duration-press) ease-(--ease-ui-out) hover:bg-current/15 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring active:scale-(--press-scale) motion-reduce:transition-none [&_svg]:size-3.5",
	},
	variants: {
		// `inverted` flips the page colours so the pill reads over any app; `default` is a plain card.
		variant: {
			inverted: { root: "bg-foreground text-background" },
			default: { root: "bg-card text-foreground" },
			// Frosted: lets the page show through, for a pill that floats over content.
			glass: { root: "bg-foreground/10 text-foreground backdrop-blur-xl" },
		},
		// `line` is a single level bar; `bars` is a small waveform that breathes with the voice.
		shape: {
			line: {},
			bars: {
				meter:
					"flex h-4 w-14 items-center justify-between overflow-visible rounded-none bg-transparent",
			},
		},
		state: {
			starting: { icon: "motion-safe:animate-pulse opacity-60", fill: "scale-x-[0.04]" },
			listening: {},
			working: { fill: "w-full motion-safe:animate-pulse" },
			notice: { meter: "hidden", icon: "text-warning" },
		},
	},
	defaultVariants: { variant: "inverted", state: "listening", shape: "line" },
});

export type RecordingPillVariant = NonNullable<
	VariantProps<typeof recordingPill>["variant"]
>;
export type RecordingPillState = NonNullable<VariantProps<typeof recordingPill>["state"]>;

export type RecordingPillShape = NonNullable<VariantProps<typeof recordingPill>["shape"]>;

/** How tall each waveform bar stands against the level, so the row reads as a voice and not a bar. */
export const BAR_WEIGHTS = [0.45, 0.8, 1, 0.7, 0.5];
