import { createContext } from "svelte";

export type AudioComposerContext = {
	duration: number;
	preset: string;
	readonly presets: string[];
	readonly min: number;
	readonly max: number;
	readonly step: number;
	readonly loading: boolean;
};

export const [getAudioComposer, setAudioComposer] = createContext<AudioComposerContext>();

/** The chosen length and style, for apps that build the request themselves. */
export function useAudioComposer(): AudioComposerContext {
	return getAudioComposer();
}
