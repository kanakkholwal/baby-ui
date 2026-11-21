/** Whole seconds as m:ss, or h:mm:ss from an hour. */
export function formatTimer(seconds: number): string {
	const s = Math.max(0, Math.floor(seconds));
	const mm = Math.floor((s % 3600) / 60);
	const ss = String(s % 60).padStart(2, "0");
	return s >= 3600
		? `${Math.floor(s / 3600)}:${String(mm).padStart(2, "0")}:${ss}`
		: `${mm}:${ss}`;
}

/** Eases a raw 0 to 1 level so quiet speech still moves the meter. */
export function meterLevel(level: number): number {
	const clamped = Math.min(1, Math.max(0, level));
	return Math.max(0.04, Math.min(1, clamped ** 0.6 * 1.8));
}

export const RECORDING_PILL_ICONS = {
	mic: "M12 4a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V7a3 3 0 0 0-3-3ZM6 11.5a6 6 0 0 0 12 0M12 17.5V21",
	notice: "M12 8v5M12 16.5v.01M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z",
	cancel: "m6 6 12 12M18 6 6 18",
} as const;
