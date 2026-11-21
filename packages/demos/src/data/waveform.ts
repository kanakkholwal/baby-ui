/** A speech-like envelope: phrases of rising and falling loudness with short pauses between them. */
export function sampleWaveform(count = 96): number[] {
	return Array.from({ length: count }, (_, i) => {
		const phrase = Math.abs(Math.sin(i / 7.5));
		const grain = 0.55 + 0.45 * Math.abs(Math.sin(i * 12.9898));
		const pause = Math.sin(i / 3.1) > 0.86 ? 0.12 : 1;
		return Math.max(0.06, phrase * grain * pause);
	});
}

export const WAVEFORM_SAMPLE = sampleWaveform();
