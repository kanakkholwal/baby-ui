/** Speeds a listener can pick; an app may pass its own. */
export const SPEECH_RATES = [0.75, 1, 1.25, 1.5, 2];

export function formatRate(rate: number): string {
	return `${Number(rate.toFixed(2))}×`;
}

/** Share of the text already read, counting the chunk being read as done. */
export function chunkRatio(at: number, count: number): number {
	if (count <= 0) return 0;
	return Math.min(100, Math.max(0, (at / count) * 100));
}

/** Whether a skip of `delta` chunks stays inside 1 to `count`. */
export function canSkip(at: number, count: number, delta: number): boolean {
	const next = at + delta;
	return count > 0 && next >= 1 && next <= count;
}

export const SPEECH_PLAYER_ICONS = {
	play: "M8 5.5v13l10-6.5-10-6.5Z",
	pause: "M8 5.5v13M16 5.5v13",
	previous: "M7 6v12M18 6l-8 6 8 6V6Z",
	next: "M17 6v12M6 6l8 6-8 6V6Z",
	stop: "M7 7h10v10H7Z",
} as const;

export type SpeechPlayerIcon = keyof typeof SPEECH_PLAYER_ICONS;

/** Cycles to the next speed, wrapping from the last back to the first. */
export function nextRate(rate: number, rates: number[]): number {
	const i = rates.indexOf(rate);
	return rates[(i + 1) % rates.length] ?? rate;
}
