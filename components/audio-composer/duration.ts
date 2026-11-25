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
