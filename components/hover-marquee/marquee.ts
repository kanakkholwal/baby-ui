export const DEFAULT_PIXELS_PER_SECOND = 45;

/** Seconds to slide `overflow` pixels into view at a steady speed, never jarring. */
export function marqueeSeconds(
	overflow: number,
	pixelsPerSecond = DEFAULT_PIXELS_PER_SECOND,
): number {
	if (overflow <= 0 || pixelsPerSecond <= 0) return 0;
	return Math.min(8, Math.max(0.6, overflow / pixelsPerSecond));
}

/** Hidden pixels of `inner` beyond `box`, or 0 when it already fits. */
export function overflowOf(box: HTMLElement, inner: HTMLElement): number {
	// Inline elements report scrollWidth 0, so measure the laid-out box instead.
	const overflow = Math.ceil(inner.getBoundingClientRect().width - box.clientWidth);
	return overflow > 1 ? overflow : 0;
}
