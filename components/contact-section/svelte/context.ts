import { getContext, setContext } from "svelte";
import type { contactSection } from "../variants";

/** What ContactSection shares with its parts; getters so it stays reactive. */
export interface ContactSectionState {
	readonly titleId: string;
	readonly formTitleId: string;
	readonly styles: ReturnType<typeof contactSection>;
}

const KEY = Symbol("contact-section");

export const setContactSection = (state: ContactSectionState) => setContext(KEY, state);
export function contactSectionState(): ContactSectionState {
	const state = getContext<ContactSectionState | undefined>(KEY);
	if (!state)
		throw new Error("ContactSection parts must be rendered inside a ContactSection.");
	return state;
}
