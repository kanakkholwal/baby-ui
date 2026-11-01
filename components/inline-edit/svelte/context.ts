import { getContext, hasContext, setContext } from "svelte";
import type { InlineEditPhase } from "../edit";
import type { inlineEdit } from "../variants";

export interface InlineEditState {
	readonly label: string;
	readonly placeholder: string;
	readonly multiline: boolean;
	/** The text on screen: the saved value, or the pending one while a save runs. */
	readonly shown: string;
	readonly editing: boolean;
	readonly phase: InlineEditPhase;
	readonly error: string | null;
	/** The draft a failed save rejected, offered back by the message's retry. */
	readonly failed: string | null;
	readonly messageId: string;
	readonly hasMessage: boolean;
	readonly styles: ReturnType<typeof inlineEdit>;
	draft: string;
	start(at: number | "all", text?: string): void;
	submit(source: "key" | "blur"): void;
	cancel(): void;
	clearError(): void;
	registerPreview(element: HTMLElement | undefined): void;
	registerInput(element: HTMLTextAreaElement | undefined): void;
}

const KEY = Symbol("inline-edit");

/** The root's state behind getters, so every part reads the latest value. */
export const setInlineEdit = (state: InlineEditState) => setContext(KEY, state);
export function inlineEditState(part: string): InlineEditState {
	if (!hasContext(KEY)) throw new Error(`${part} must be used inside <InlineEdit>`);
	return getContext<InlineEditState>(KEY);
}
