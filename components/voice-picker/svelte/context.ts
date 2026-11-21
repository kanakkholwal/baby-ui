import { createContext } from "svelte";
import type { VoicePickerVariant, VoiceSampleState } from "../variants";

export type Voice = {
	id: string;
	name: string /** Accent, gender or style, shown dimmer. */;
	detail?: string;
};

export type VoicePickerContext = {
	readonly voices: Voice[];
	voice: string;
	speed: number;
	readonly sample: VoiceSampleState;
	readonly variant: VoicePickerVariant;
};

export const [getVoicePicker, setVoicePicker] = createContext<VoicePickerContext>();

/** The live picker state, for custom parts. */
export function useVoicePicker(): VoicePickerContext {
	return getVoicePicker();
}
