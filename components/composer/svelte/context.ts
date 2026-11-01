import { getContext, hasContext, setContext } from "svelte";
import type { ComposerSize, composer } from "../variants";

export interface ComposerState {
	value: string;
	readonly canSubmit: boolean;
	readonly disabled: boolean;
	readonly loading: boolean;
	readonly onStop: (() => void) | undefined;
	readonly size: ComposerSize;
	readonly styles: ReturnType<typeof composer>;
	submit(): void;
	registerInput(element: HTMLTextAreaElement | undefined): void;
}

const KEY = Symbol("composer");

/** The root's state behind getters, so every part reads the latest value. */
export const setComposer = (state: ComposerState) => setContext(KEY, state);
export function composerState(part: string): ComposerState {
	if (!hasContext(KEY)) throw new Error(`${part} must be used inside <Composer>`);
	return getContext<ComposerState>(KEY);
}
