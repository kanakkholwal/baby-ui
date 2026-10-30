import { getContext, setContext } from "svelte";
import type { contentSection } from "../variants";

/** What ContentSection shares with its parts; getters so it stays reactive. */
export interface ContentSectionState {
	readonly titleId: string;
	readonly styles: ReturnType<typeof contentSection>;
}

const KEY = Symbol("content-section");

export const setContentSection = (state: ContentSectionState) => setContext(KEY, state);
export function contentSectionState(): ContentSectionState {
	const state = getContext<ContentSectionState | undefined>(KEY);
	if (!state)
		throw new Error("ContentSection parts must be rendered inside a ContentSection.");
	return state;
}
