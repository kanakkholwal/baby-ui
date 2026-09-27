import { tv, type VariantProps } from "tailwind-variants";

export const iridescentFold = tv({
	slots: {
		root: "inset-0 isolate overflow-hidden bg-background",
		fallback:
			"pointer-events-none absolute inset-0 transition-opacity duration-[var(--duration-overlay)] ease-[var(--ease-out)]",
		canvas:
			"pointer-events-none absolute inset-0 block size-full transition-opacity duration-[var(--duration-overlay)] ease-[var(--ease-out)]",
		content: "relative z-10 size-full",
	},
	variants: {
		tone: {
			spectrum: {
				fallback:
					"bg-[radial-gradient(ellipse_at_30%_40%,var(--chart-1),transparent_55%),radial-gradient(ellipse_at_72%_62%,var(--violet),transparent_50%)]_opacity-40",
			},
			cool: {
				fallback:
					"bg-[radial-gradient(ellipse_at_30%_40%,var(--info),transparent_55%),radial-gradient(ellipse_at_72%_62%,var(--violet),transparent_50%)]_opacity-40",
			},
			warm: {
				fallback:
					"bg-[radial-gradient(ellipse_at_30%_40%,var(--chart-4),transparent_55%),radial-gradient(ellipse_at_72%_62%,var(--chart-2),transparent_50%)]_opacity-40",
			},
			mono: {
				fallback:
					"bg-[radial-gradient(ellipse_at_30%_40%,color-mix(in_oklch,_var(--foreground)_35%,_var(--background)),transparent_55%),radial-gradient(ellipse_at_72%_62%,color-mix(in_oklch,_var(--foreground)_60%,_var(--background)),transparent_50%)]_opacity-40",
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
	defaultVariants: {
		tone: "spectrum",
		speed: "normal",
		position: "absolute",
		webgl: false,
	},
});

export type IridescentFoldTone = NonNullable<VariantProps<typeof iridescentFold>["tone"]>;
export type IridescentFoldSpeed = NonNullable<
	VariantProps<typeof iridescentFold>["speed"]
>;
export type IridescentFoldPosition = NonNullable<
	VariantProps<typeof iridescentFold>["position"]
>;

/** Shader colours per tone: base, then the three tone colours. */
export const IRIDESCENT_FOLD_COLORS: Record<IridescentFoldTone, readonly string[]> = {
	spectrum: ["var(--background)", "var(--chart-1)", "var(--violet)", "var(--chart-3)"],
	cool: ["var(--background)", "var(--info)", "var(--violet)", "var(--accent)"],
	warm: ["var(--background)", "var(--chart-4)", "var(--chart-2)", "var(--chart-5)"],
	mono: [
		"var(--background)",
		"color-mix(in oklch, var(--foreground) 35%, var(--background))",
		"color-mix(in oklch, var(--foreground) 60%, var(--background))",
		"var(--muted-foreground)",
	],
};

/** Time multiplier per speed. */
export const IRIDESCENT_FOLD_SPEED: Record<IridescentFoldSpeed, number> = {
	slow: 0.5,
	normal: 1,
	fast: 2,
};
