/**
 * Counts a number from `from` to `to` after `delay`, calling `onUpdate` with a whole number on every
 * frame, so the shares tick through integers and never show a fraction. Returns a stop function.
 */
export function tweenCount(
	from: number,
	to: number,
	options: { delay: number; duration: number; onUpdate: (value: number) => void },
): () => void {
	const { delay, duration, onUpdate } = options;
	if (duration <= 0 || from === to) {
		onUpdate(Math.round(to));
		return () => {};
	}
	let frame = 0;
	const start = performance.now() + delay;
	const tick = (now: number) => {
		const t = Math.min(1, Math.max(0, (now - start) / duration));
		// Ease-out quart: quick off the mark, settling onto the number.
		const eased = 1 - (1 - t) ** 4;
		onUpdate(Math.round(from + (to - from) * eased));
		if (t < 1) frame = requestAnimationFrame(tick);
	};
	frame = requestAnimationFrame(tick);
	return () => cancelAnimationFrame(frame);
}

/** The count's length, read from the motion tokens: the snappy spring's settle time. */
export function countDuration(el: Element): number {
	if (matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
	return (
		Number.parseFloat(
			getComputedStyle(el).getPropertyValue("--duration-spring-snappy"),
		) || 400
	);
}
