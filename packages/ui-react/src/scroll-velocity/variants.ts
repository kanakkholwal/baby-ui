import { tv, type VariantProps } from "tailwind-variants";

export const scrollVelocity = tv({
	slots: {
		root: "relative flex w-full flex-col gap-2 overflow-hidden",
		row: "flex overflow-hidden whitespace-nowrap",
		track: "scroll-velocity-track flex w-max shrink-0",
		half: "flex shrink-0",
		item: "shrink-0 pr-[1em] font-semibold text-foreground tracking-tight",
		srOnly: "sr-only",
	},
	variants: {
		/** Two rows drift against each other; one row keeps a single band. */
		layout: {
			single: {},
			double: {},
		},
		/** Which way the first row drifts at rest; scrolling up reverses every row. */
		direction: {
			left: {},
			right: {},
		},
		size: {
			sm: { item: "text-2xl" },
			md: { item: "text-4xl" },
			lg: { item: "text-6xl" },
		},
	},
	defaultVariants: { layout: "double", direction: "left", size: "md" },
});

export type ScrollVelocityLayout = NonNullable<
	VariantProps<typeof scrollVelocity>["layout"]
>;
export type ScrollVelocityDirection = NonNullable<
	VariantProps<typeof scrollVelocity>["direction"]
>;
export type ScrollVelocitySize = NonNullable<VariantProps<typeof scrollVelocity>["size"]>;

/** Scroll speed (px/s) to a playback multiplier: 1 at rest, +5 per 1000 px/s, like the source. */
export function velocityRate(velocity: number, boost: number): number {
	return 1 + (Math.abs(velocity) / 1000) * boost;
}

/**
 * Drives the rows' CSS animations from window scroll: playbackRate follows scroll speed and
 * flips sign with scroll direction, then eases back. Returns a cleanup.
 */
export function followScroll(rows: HTMLElement[], boost: number): () => void {
	const animations = () =>
		rows.flatMap((row) => row.getAnimations()).filter((a) => a instanceof CSSAnimation);
	let lastY = window.scrollY;
	let lastT = performance.now();
	let sign = 1;
	let rate = 1;
	let target = 1;
	let frame = 0;

	const tick = () => {
		rate += (target - rate) * 0.12;
		target += (1 - target) * 0.08;
		for (const a of animations()) a.playbackRate = rate * sign;
		frame =
			Math.abs(rate - 1) > 0.01 || Math.abs(target - 1) > 0.01
				? requestAnimationFrame(tick)
				: 0;
	};

	const onScroll = () => {
		const now = performance.now();
		const dy = window.scrollY - lastY;
		const dt = Math.max(1, now - lastT) / 1000;
		lastY = window.scrollY;
		lastT = now;
		if (dy !== 0) sign = dy > 0 ? 1 : -1;
		target = Math.max(target, velocityRate(dy / dt, boost));
		if (!frame) frame = requestAnimationFrame(tick);
	};

	window.addEventListener("scroll", onScroll, { passive: true });
	return () => {
		window.removeEventListener("scroll", onScroll);
		cancelAnimationFrame(frame);
	};
}
