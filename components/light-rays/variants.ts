import { tv, type VariantProps } from "tailwind-variants";
import type { RayField } from "./rays";

export const lightRays = tv({
	slots: {
		root: "inset-0 isolate overflow-hidden",
		canvas:
			"pointer-events-none absolute inset-0 block size-full transition-opacity duration-[var(--duration-overlay)] ease-[var(--ease-ui-out)]",
		content: "relative z-10 size-full",
	},
	variants: {
		/** `soft` is a few wide, hazy shafts; `crisp` is many fine hairlines. */
		variant: { soft: {}, crisp: {} },
		tone: { primary: {}, spectrum: {}, ember: {}, mono: {} },
		speed: { slow: {}, normal: {}, fast: {} },
		position: {
			absolute: { root: "absolute" },
			fixed: { root: "fixed" },
		},
		// Transparent until the first frame is drawn, then it fades in; nothing tints the page before that.
		webgl: {
			true: {},
			false: { canvas: "opacity-0" },
		},
	},
	defaultVariants: {
		variant: "soft",
		tone: "primary",
		speed: "normal",
		position: "absolute",
		webgl: false,
	},
});

export type LightRaysVariant = NonNullable<VariantProps<typeof lightRays>["variant"]>;
export type LightRaysTone = NonNullable<VariantProps<typeof lightRays>["tone"]>;
export type LightRaysSpeed = NonNullable<VariantProps<typeof lightRays>["speed"]>;
export type LightRaysPosition = NonNullable<VariantProps<typeof lightRays>["position"]>;

/** The three ramp colours of a tone, from theme tokens. */
export const LIGHT_RAYS_COLORS: Record<LightRaysTone, readonly [string, string, string]> =
	{
		primary: [
			"var(--primary)",
			"color-mix(in oklch, var(--primary) 55%, var(--violet))",
			"var(--violet)",
		],
		spectrum: ["var(--primary)", "var(--violet)", "var(--chart-5)"],
		ember: ["var(--chart-2)", "var(--chart-4)", "var(--chart-5)"],
		mono: [
			"var(--foreground)",
			"var(--muted-foreground)",
			"color-mix(in oklch, var(--foreground) 40%, var(--background))",
		],
	};

/** Time multiplier per speed. */
export const LIGHT_RAYS_SPEED: Record<LightRaysSpeed, number> = {
	slow: 0.6,
	normal: 1.8,
	fast: 3.4,
};

/** Beam shape per variant. */
export const LIGHT_RAYS_FIELD: Record<LightRaysVariant, RayField> = {
	soft: {
		spread: 0.68,
		center: 0.5,
		width: 0.0095,
		widthVariance: 0.33,
		softness: 0.91,
		glow: 0.26,
		top: -0.49,
		length: 0.92,
		lengthVariance: 0.56,
		featherTop: 0.34,
		featherBottom: 0.55,
		shape: 1.52,
		taper: 1.9,
		edgeFade: 0.07,
		cycle: 5.9,
		duty: 0.62,
		fade: 0.315,
		stagger: 1,
		sway: 0.006,
		swaySpeed: 0.35,
		shimmer: 0.77,
		shimmerSpeed: 0.42,
	},
	crisp: {
		spread: 1.1,
		center: 0.5,
		width: 0.0035,
		widthVariance: 0.5,
		softness: 1.6,
		glow: 0.06,
		top: -0.15,
		length: 0.85,
		lengthVariance: 0.55,
		featherTop: 0.1,
		featherBottom: 0.65,
		shape: 1.3,
		taper: 1.2,
		edgeFade: 0.06,
		cycle: 9,
		duty: 0.5,
		fade: 0.3,
		stagger: 1,
		sway: 0.004,
		swaySpeed: 0.3,
		shimmer: 0.2,
		shimmerSpeed: 0.4,
	},
};

/** Beam count when `count` is unset: hairlines need more of them to read as a field. */
export const LIGHT_RAYS_COUNT: Record<LightRaysVariant, number> = {
	soft: 17,
	crisp: 36,
};
