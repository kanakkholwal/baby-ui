import { tv, type VariantProps } from "tailwind-variants";

export const cycleText = tv({
	slots: {
		root: "relative inline-block whitespace-nowrap align-bottom transition-[width] duration-(--duration-overlay) ease-(--ease-out) motion-reduce:transition-none",
		word: "inline-block",
		leaving: "pointer-events-none absolute top-0 left-0 inline-block",
	},
	variants: {
		size: {
			sm: { root: "text-lg" },
			md: { root: "text-xl" },
			lg: { root: "text-3xl" },
		},
	},
	defaultVariants: { size: "md" },
});

export type CycleTextSize = NonNullable<VariantProps<typeof cycleText>["size"]>;
