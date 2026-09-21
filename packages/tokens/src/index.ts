/** Easing curves, mirrored from motion.css for JS-driven animation. */
export const easing = {
	out: [0.16, 1, 0.3, 1],
	inOut: [0.77, 0, 0.175, 1],
	drawer: [0.32, 0.72, 0, 1],
} as const satisfies Record<string, readonly [number, number, number, number]>;

/** Milliseconds, mirrored from motion.css. */
export const duration = {
	press: 140,
	tooltip: 150,
	dropdown: 200,
	overlay: 280,
	drawer: 500,
} as const;

export const staggerStep = 45;
export const pressScale = 0.97;
export const enterScale = 0.95;

/**
 * Named springs in both dialects. Motion takes seconds + bounce; svelte/motion's
 * Spring clamps stiffness/damping to 0..1, so the pairs are tuned, not converted.
 */
export const spring = {
	snappy: {
		motion: { duration: 0.3, bounce: 0 },
		svelte: { stiffness: 0.3, damping: 0.95 },
	},
	gentle: {
		motion: { duration: 0.5, bounce: 0.1 },
		svelte: { stiffness: 0.15, damping: 0.85 },
	},
	bouncy: {
		motion: { duration: 0.6, bounce: 0.3 },
		svelte: { stiffness: 0.2, damping: 0.55 },
	},
} as const;

export type SpringName = keyof typeof spring;

/** Spread into a Motion transition: `transition={motionSpring("snappy")}`. */
export function motionSpring(name: SpringName) {
	return { type: "spring" as const, ...spring[name].motion };
}

/** Pass to `new Spring(value, svelteSpring("snappy"))`. */
export function svelteSpring(name: SpringName) {
	return { ...spring[name].svelte };
}
