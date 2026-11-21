import { createContext } from "svelte";
import type { TrimRange } from "../trim";
import type { WaveformTrimVariant } from "../variants";

export type WaveformTrimContext = {
	readonly peaks: number[];
	range: TrimRange;
	readonly position: number | undefined;
	readonly onseek: ((position: number) => void) | undefined;
	readonly duration: number | undefined;
	readonly variant: WaveformTrimVariant;
};

export const [getWaveformTrim, setWaveformTrim] = createContext<WaveformTrimContext>();
