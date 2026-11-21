export type VoiceSwatch = { from: string; to: string; angle: number };

function hash(text: string): number {
	let h = 2166136261;
	for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
	return h >>> 0;
}

/** A stable, unique gradient for a voice, built only from the chart tokens so it follows the theme. */
export function voiceSwatch(id: string): VoiceSwatch {
	const h = hash(id);
	const a = (h % 5) + 1;
	const b = ((h >>> 3) % 4) + 1;
	return {
		from: `var(--chart-${a})`,
		to: `var(--chart-${b === a ? (a % 5) + 1 : b})`,
		angle: h % 360,
	};
}

export function swatchBackground(id: string): string {
	const { from, to, angle } = voiceSwatch(id);
	return `conic-gradient(from ${angle}deg, ${from}, ${to}, ${from})`;
}

export function formatSpeed(rate: number): string {
	return `${Number(rate.toFixed(2))}×`;
}

export const EQ_BARS = [0.6, 1, 0.75, 0.9];

/** Speeds the inline button cycles through; an app may pass its own. */
export const VOICE_SPEEDS = [0.75, 1, 1.25, 1.5, 2];

/** The next speed above `rate`, wrapping to the first; works from a slider value that is not in the list. */
export function nextSpeed(rate: number, speeds: number[] = VOICE_SPEEDS): number {
	return speeds.find((s) => s > rate + 0.001) ?? speeds[0] ?? rate;
}
