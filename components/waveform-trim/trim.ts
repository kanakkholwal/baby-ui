export type TrimRange = [start: number, end: number];

export const MIN_GAP = 0.02;

/** Keeps both handles inside 0 to 1 and at least `gap` apart. */
export function clampRange(range: TrimRange, gap = MIN_GAP): TrimRange {
	const start = Math.min(Math.max(range[0], 0), 1 - gap);
	const end = Math.max(Math.min(range[1], 1), start + gap);
	return [start, Math.min(end, 1)];
}

/** Space each end of the track keeps free so a handle at 0 or 1 is not clipped. */
export const TRACK_PAD = 8;

/** Where along a track a pointer is, 0 to 1, measured between the padded ends. */
export function ratioFromPointer(clientX: number, left: number, width: number): number {
	const inner = width - TRACK_PAD * 2;
	if (inner <= 0) return 0;
	return Math.min(1, Math.max(0, (clientX - left - TRACK_PAD) / inner));
}

/** CSS position of a 0 to 1 value along the padded track. */
export function place(value: number): string {
	return `calc(${TRACK_PAD}px + (100% - ${TRACK_PAD * 2}px) * ${value})`;
}

/** Moves one handle to `ratio` without letting it cross the other. */
export function moveHandle(
	range: TrimRange,
	handle: "start" | "end",
	ratio: number,
	gap = MIN_GAP,
): TrimRange {
	return handle === "start"
		? clampRange([Math.min(ratio, range[1] - gap), range[1]], gap)
		: clampRange([range[0], Math.max(ratio, range[0] + gap)], gap);
}

/** Whether a bar at `index` of `count` sits inside the kept range. */
export function isKept(index: number, count: number, range: TrimRange): boolean {
	const centre = (index + 0.5) / count;
	return centre >= range[0] && centre <= range[1];
}

/** m:ss.s, for edit points where a tenth of a second matters. */
export function formatTime(seconds: number): string {
	const s = Math.max(0, seconds);
	const m = Math.floor(s / 60);
	return `${m}:${(s - m * 60).toFixed(1).padStart(4, "0")}`;
}
