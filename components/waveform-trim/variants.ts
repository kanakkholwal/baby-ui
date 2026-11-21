import { tv, type VariantProps } from "tailwind-variants";

export const waveformTrim = tv({
	slots: {
		root: "flex min-w-0 flex-col gap-2",
		track:
			"relative h-24 w-full touch-none select-none overflow-hidden rounded-xl bg-card",
		bars: "pointer-events-none absolute inset-x-2 inset-y-2 flex gap-px",
		bar: "min-w-px flex-1 rounded-full bg-primary transition-[opacity,background-color] duration-(--duration-base) ease-(--ease-ui-out) motion-reduce:transition-none",
		// Cut-away audio is hatched as well as dimmed, so it never reads as colour alone.
		cut: "pointer-events-none absolute inset-y-0 bg-background/70 [background-image:repeating-linear-gradient(135deg,transparent_0_5px,var(--border)_5px_6px)]",
		playhead:
			"pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 rounded-full bg-foreground",
		handle:
			"absolute inset-y-0 z-1 grid w-4 -translate-x-1/2 cursor-ew-resize place-items-center rounded-md bg-primary text-primary-foreground outline-none transition-[scale,box-shadow] duration-(--duration-press) ease-(--ease-ui-out) focus-visible:shadow-[0_0_0_3px_var(--ring)] active:scale-y-95 motion-reduce:transition-none",
		grip: "h-4 w-0.5 rounded-full bg-current opacity-80",
		times: "flex items-center justify-between text-muted-foreground text-xs tabular-nums",
	},
	variants: {
		// `bars` stand on a baseline; `mirror` is symmetric around the middle, like a voice memo.
		variant: {
			bars: { bars: "items-end" },
			mirror: { bars: "items-center" },
		},
		kept: {
			true: { bar: "opacity-100" },
			false: { bar: "bg-muted-foreground opacity-40" },
		},
	},
	defaultVariants: { variant: "bars", kept: true },
});

export type WaveformTrimVariant = NonNullable<
	VariantProps<typeof waveformTrim>["variant"]
>;
