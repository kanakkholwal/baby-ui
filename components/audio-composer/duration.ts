/** Moves a length by `delta` steps and keeps it inside `min` to `max`. */
export function stepDuration(
	seconds: number,
	delta: number,
	step: number,
	min: number,
	max: number,
): number {
	return Math.min(max, Math.max(min, Math.round((seconds + delta * step) / step) * step));
}

/** 8 s, 1:30: how long a generated clip will be. */
export function formatLength(seconds: number): string {
	if (seconds < 60) return `${Number(seconds.toFixed(1))} s`;
	const m = Math.floor(seconds / 60);
	const s = Math.round(seconds - m * 60);
	return s === 0 ? `${m} min` : `${m}:${String(s).padStart(2, "0")}`;
}

export const AUDIO_COMPOSER_ICONS = {
	minus: "M5 12h14",
	plus: "M12 5v14M5 12h14",
} as const;

/** Where a length sits along the allowed range from `min` to `max`, 0 to 1. */
export function durationToRatio(seconds: number, min: number, max: number): number {
	return max > min ? Math.min(1, Math.max(0, (seconds - min) / (max - min))) : 0;
}

/** The length under a pointer at `ratio`, snapped to `step`. */
export function ratioToDuration(
	ratio: number,
	step: number,
	min: number,
	max: number,
): number {
	const raw = min + Math.min(1, Math.max(0, ratio)) * (max - min);
	return Math.min(max, Math.max(min, Math.round(raw / step) * step));
}

/** The dial sweeps 270 degrees clockwise from the bottom left (135 degrees) to the bottom right (45 degrees). */
const DIAL_START = 135;
const DIAL_SWEEP = 270;

/** Where a pointer is on the dial, 0 to 1, from its offset from the dial centre; the gap at the bottom snaps to the nearer end. */
export function dialRatio(dx: number, dy: number): number {
	const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
	const rel = (angle - DIAL_START + 360) % 360;
	if (rel <= DIAL_SWEEP) return rel / DIAL_SWEEP;
	return rel - DIAL_SWEEP > (360 - DIAL_SWEEP) / 2 ? 0 : 1;
}

/** SVG arc along the dial from the start to `ratio`, on a circle of radius `r` around (c, c). */
export function dialArc(ratio: number, r: number, c: number): string {
	const point = (t: number) => {
		const a = ((DIAL_START + DIAL_SWEEP * t) * Math.PI) / 180;
		return [c + r * Math.cos(a), c + r * Math.sin(a)] as const;
	};
	const [x0, y0] = point(0);
	const [x1, y1] = point(Math.max(0.0001, ratio));
	const large = DIAL_SWEEP * ratio > 180 ? 1 : 0;
	return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}

/** Where the knob dot sits for `ratio`. */
export function dialPoint(ratio: number, r: number, c: number): [number, number] {
	const a = ((DIAL_START + DIAL_SWEEP * ratio) * Math.PI) / 180;
	return [c + r * Math.cos(a), c + r * Math.sin(a)];
}
