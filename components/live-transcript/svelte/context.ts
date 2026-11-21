import { createContext } from "svelte";
import type { LiveTranscriptVariant } from "../variants";

export type LiveTranscriptContext = {
	readonly committed: string;
	readonly tentative: string;
	readonly session: string | number | undefined;
	readonly variant: LiveTranscriptVariant;
};

export const [getLiveTranscript, setLiveTranscript] =
	createContext<LiveTranscriptContext>();
