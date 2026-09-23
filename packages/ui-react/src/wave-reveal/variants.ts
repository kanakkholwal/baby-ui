import { tv, type VariantProps } from "tailwind-variants";

export const waveReveal = tv({
	slots: {
		root: "relative flex flex-wrap whitespace-pre-wrap",
		unit: "inline-block",
	},
	variants: {
		direction: {
			up: {},
			down: {},
		},
	},
	defaultVariants: { direction: "down" },
});

export type WaveRevealDirection = NonNullable<
	VariantProps<typeof waveReveal>["direction"]
>;
/** Not a styling variant: whether the wave staggers per letter or per word. */
export type WaveRevealMode = "letter" | "word";

/** motion.css ships one combined class per direction+blur pair (see the file for why). */
export function waveAnimationClass(
	direction: WaveRevealDirection,
	blur: boolean,
): string {
	if (direction === "up") return blur ? "wave-reveal-up-blur" : "wave-reveal-up";
	return blur ? "wave-reveal-down-blur" : "wave-reveal-down";
}
