import { tv, type VariantProps } from "tailwind-variants";
import type { OrbColors } from "./renderer";

export const voiceOrb = tv({
	slots: {
		root: "relative aspect-square shrink-0",
		canvas: "block size-full will-change-transform",
		fallback:
			"flex size-full items-center justify-center rounded-full border border-border bg-card p-4 text-center text-muted-foreground text-xs",
	},
	variants: {
		/** The palette; the colours themselves live in VOICE_ORB_PALETTES. */
		variant: { ember: {}, ocean: {}, mono: {} },
		size: {
			sm: { root: "w-16" },
			default: { root: "w-40" },
			lg: { root: "w-64" },
		},
	},
	defaultVariants: { variant: "ember", size: "default" },
});

export type VoiceOrbVariant = NonNullable<VariantProps<typeof voiceOrb>["variant"]>;
export type VoiceOrbSize = NonNullable<VariantProps<typeof voiceOrb>["size"]>;

/** Base pigment, highlight and shadow for each palette. */
export const VOICE_ORB_PALETTES: Record<VoiceOrbVariant, OrbColors> = {
	ember: ["#e8754d", "#ffe0ac", "#346b52"],
	ocean: ["#3b82c4", "#c8ecff", "#1d2f5c"],
	mono: ["#8a8a8f", "#f4f4f5", "#27272a"],
};
