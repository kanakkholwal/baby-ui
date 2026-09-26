import { tv, type VariantProps } from "tailwind-variants";

export const silkAurora = tv({
	slots: {
		root: "inset-0 isolate overflow-hidden bg-background",
		fallback:
			"pointer-events-none absolute inset-0 opacity-50 transition-opacity duration-[var(--duration-overlay)] ease-[var(--ease-out)]",
		canvas:
			"pointer-events-none absolute inset-0 block size-full transition-opacity duration-[var(--duration-overlay)] ease-[var(--ease-out)]",
		content: "relative z-10 size-full",
	},
	variants: {
		tone: {
			pearl: {
				fallback:
					"bg-[image:radial-gradient(ellipse_at_28%_46%,var(--accent),transparent_45%),radial-gradient(ellipse_at_70%_36%,var(--chart-4),transparent_40%)]",
			},
			chart: {
				fallback:
					"bg-[image:radial-gradient(ellipse_at_28%_46%,var(--chart-3),transparent_45%),radial-gradient(ellipse_at_70%_36%,var(--chart-1),transparent_40%)]",
			},
			violet: {
				fallback:
					"bg-[image:radial-gradient(ellipse_at_28%_46%,var(--chart-5),transparent_45%),radial-gradient(ellipse_at_70%_36%,var(--violet),transparent_40%)]",
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
	defaultVariants: { tone: "pearl", speed: "normal", position: "absolute", webgl: false },
});

export type SilkAuroraTone = NonNullable<VariantProps<typeof silkAurora>["tone"]>;
export type SilkAuroraSpeed = NonNullable<VariantProps<typeof silkAurora>["speed"]>;
export type SilkAuroraPosition = NonNullable<VariantProps<typeof silkAurora>["position"]>;

/** Base, mid, sheen and accent colours per tone. */
export const SILK_AURORA_COLORS: Record<SilkAuroraTone, readonly string[]> = {
	pearl: [
		"var(--background)",
		"color-mix(in oklch, var(--foreground) 6%, var(--background))",
		"color-mix(in oklch, var(--chart-4) 25%, var(--foreground))",
		"var(--accent)",
	],
	chart: [
		"var(--background)",
		"color-mix(in oklch, var(--foreground) 6%, var(--background))",
		"color-mix(in oklch, var(--chart-1) 40%, var(--foreground))",
		"var(--chart-3)",
	],
	violet: [
		"var(--background)",
		"color-mix(in oklch, var(--foreground) 6%, var(--background))",
		"color-mix(in oklch, var(--violet) 35%, var(--foreground))",
		"var(--chart-5)",
	],
};

/** Time multiplier per speed. */
export const SILK_AURORA_SPEED: Record<SilkAuroraSpeed, number> = {
	slow: 0.5,
	normal: 1,
	fast: 2,
};
