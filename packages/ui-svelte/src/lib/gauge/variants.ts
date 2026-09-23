import { tv, type VariantProps } from "tailwind-variants";

export const gaugeIndicator = tv({
	base: "transition-[stroke-dashoffset] duration-[var(--duration-overlay)] ease-[var(--ease-out)] motion-reduce:transition-none",
	variants: {
		tone: {
			default: "text-primary",
			success: "text-success",
			warning: "text-warning",
			danger: "text-destructive",
		},
	},
	defaultVariants: { tone: "default" },
});

export type GaugeTone = NonNullable<VariantProps<typeof gaugeIndicator>["tone"]>;
