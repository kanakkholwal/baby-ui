import { getContext, hasContext, setContext } from "svelte";
import type { ContextSegment, contextMeter } from "../variants";

export interface ContextMeterState {
	readonly segments: ContextSegment[];
	readonly limit: number;
	readonly used: number;
	readonly compactAt: number;
	readonly onAction: ((id: string) => void) | undefined;
	/** The source being pointed at or focused, in the bar or the rows. */
	active: string | null;
	readonly styles: ReturnType<typeof contextMeter>;
}

const KEY = Symbol("context-meter");

/** The root's state behind getters, so every part reads the latest value. */
export const setContextMeter = (state: ContextMeterState) => setContext(KEY, state);
export function contextMeterState(part: string): ContextMeterState {
	if (!hasContext(KEY)) throw new Error(`${part} must be used inside <ContextMeter>`);
	return getContext<ContextMeterState>(KEY);
}
