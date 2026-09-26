import { tv, type VariantProps } from "tailwind-variants";

export const auroraFlow = tv({
	slots: {
		root: "inset-0 isolate overflow-hidden bg-background",
		fallback:
			"pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-[var(--duration-overlay)] ease-[var(--ease-out)]",
		canvas:
			"pointer-events-none absolute inset-0 block size-full transition-opacity duration-[var(--duration-overlay)] ease-[var(--ease-out)]",
		content: "relative z-10 size-full",
	},
	variants: {
		tone: {
			chart: {
				fallback:
					"bg-[image:radial-gradient(ellipse_at_18%_28%,var(--chart-1),transparent_52%),radial-gradient(ellipse_at_78%_40%,var(--chart-3),transparent_48%)]",
			},
			accent: {
				fallback:
					"bg-[image:radial-gradient(ellipse_at_18%_28%,var(--accent),transparent_52%),radial-gradient(ellipse_at_78%_40%,var(--violet),transparent_48%)]",
			},
			ember: {
				fallback:
					"bg-[image:radial-gradient(ellipse_at_18%_28%,var(--chart-2),transparent_52%),radial-gradient(ellipse_at_78%_40%,var(--chart-4),transparent_48%)]",
			},
			mono: {
				fallback:
					"bg-[image:radial-gradient(ellipse_at_18%_28%,var(--muted-foreground),transparent_52%),radial-gradient(ellipse_at_78%_40%,var(--border-strong),transparent_48%)]",
			},
		},
		speed: { slow: {}, normal: {}, fast: {} },
		position: {
			absolute: { root: "absolute" },
			fixed: { root: "fixed" },
		},
		webgl: {
			true: { fallback: "opacity-0" },
			false: { canvas: "opacity-0" },
		},
	},
	defaultVariants: { tone: "chart", speed: "normal", position: "absolute", webgl: false },
});

export type AuroraFlowTone = NonNullable<VariantProps<typeof auroraFlow>["tone"]>;
export type AuroraFlowSpeed = NonNullable<VariantProps<typeof auroraFlow>["speed"]>;
export type AuroraFlowPosition = NonNullable<VariantProps<typeof auroraFlow>["position"]>;

/** Shader colours per tone, deepest first. */
export const AURORA_FLOW_COLORS: Record<AuroraFlowTone, readonly string[]> = {
	chart: [
		"var(--background)",
		"color-mix(in oklch, var(--chart-1) 35%, var(--background))",
		"var(--chart-1)",
		"var(--chart-3)",
		"var(--foreground)",
	],
	accent: [
		"var(--background)",
		"color-mix(in oklch, var(--accent) 30%, var(--background))",
		"var(--accent)",
		"var(--violet)",
		"var(--foreground)",
	],
	ember: [
		"var(--background)",
		"color-mix(in oklch, var(--chart-2) 35%, var(--background))",
		"var(--chart-2)",
		"var(--chart-4)",
		"var(--foreground)",
	],
	mono: [
		"var(--background)",
		"color-mix(in oklch, var(--foreground) 12%, var(--background))",
		"color-mix(in oklch, var(--foreground) 40%, var(--background))",
		"var(--muted-foreground)",
		"var(--foreground)",
	],
};

/** Time multiplier per speed. */
export const AURORA_FLOW_SPEED: Record<AuroraFlowSpeed, number> = {
	slow: 0.5,
	normal: 1,
	fast: 2,
};
