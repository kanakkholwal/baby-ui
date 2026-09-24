import { tv, type VariantProps } from "tailwind-variants";

export const textInertia = tv({
	slots: {
		root: "flex flex-wrap items-center justify-center gap-x-[0.3em] gap-y-[0.12em] text-center leading-none",
		word: "inline-block cursor-default select-none",
		srOnly: "sr-only",
	},
	variants: {
		size: {
			inherit: {},
			sm: { root: "text-3xl" },
			md: { root: "text-5xl" },
			lg: { root: "text-7xl" },
		},
	},
	defaultVariants: { size: "inherit" },
});

export type TextInertiaSize = NonNullable<VariantProps<typeof textInertia>["size"]>;

export type InertiaKick = { x: number; y: number; r: number };

const MAX_TRANSLATE = 46;
const MAX_ROTATION = 18;
const clamp = (v: number, max: number) => Math.min(Math.max(v, -max), max);
const orFallback = (v: number, fallback: number) => (Math.abs(v) < 1 ? fallback : v);

/** Spring target for a word the pointer just entered: pointer velocity, or a nudge when still. */
export function inertiaKick(
	velocity: { x: number; y: number },
	index: number,
	intensity: number,
): InertiaKick {
	const direction = index % 2 === 0 ? 1 : -1;
	return {
		x: clamp(
			orFallback(velocity.x * intensity * 2.2, direction * intensity * 10),
			MAX_TRANSLATE,
		),
		y: clamp(orFallback(velocity.y * intensity * 2.2, -intensity * 7), MAX_TRANSLATE),
		r: clamp(
			orFallback((velocity.x - velocity.y) * intensity * 0.5, direction * intensity * 6),
			MAX_ROTATION,
		),
	};
}
