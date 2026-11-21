import { createContext } from "svelte";
import type { SpeechPlayerState, SpeechPlayerVariant } from "../variants";

export type SpeechPlayerContext = {
	readonly state: SpeechPlayerState;
	readonly variant: SpeechPlayerVariant;
	readonly at: number;
	readonly count: number;
	rate: number;
};

export const [getSpeechPlayer, setSpeechPlayer] = createContext<SpeechPlayerContext>();
