import { getContext, hasContext, setContext } from "svelte";
import type { ToolState, tool } from "../variants";

export interface ToolContext {
	readonly status: ToolState;
	readonly styles: ReturnType<typeof tool>;
}

const KEY = Symbol("tool");

/** The root's state behind getters, so every part reads the latest value. */
export const setToolContext = (state: ToolContext) => setContext(KEY, state);
export function toolContext(part: string): ToolContext {
	if (!hasContext(KEY)) throw new Error(`${part} must be used inside <Tool>`);
	return getContext<ToolContext>(KEY);
}
