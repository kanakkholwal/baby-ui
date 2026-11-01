import { getContext, hasContext, setContext } from "svelte";
import type { StreamingSource, StreamingTextSize, streamingText } from "../variants";

export interface StreamingTextState {
	done: boolean;
	text: string;
	readonly sources: StreamingSource[];
	readonly size: StreamingTextSize;
	readonly styles: ReturnType<typeof streamingText>;
}

const KEY = Symbol("streaming-text");

/** The root's state behind getters, so every part reads the latest value. */
export const setStreamingText = (state: StreamingTextState) => setContext(KEY, state);
export function streamingTextState(part: string): StreamingTextState {
	if (!hasContext(KEY)) throw new Error(`${part} must be used inside <StreamingText>`);
	return getContext<StreamingTextState>(KEY);
}
