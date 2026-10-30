import { getContext, setContext } from "svelte";
import type { testimonialSection } from "../variants";

/** What TestimonialSection shares with its parts; getters so it stays reactive. */
export interface TestimonialSectionState {
	readonly titleId: string;
	readonly styles: ReturnType<typeof testimonialSection>;
}

const KEY = Symbol("testimonial-section");

export const setTestimonialSection = (state: TestimonialSectionState) =>
	setContext(KEY, state);
export function testimonialSectionState(): TestimonialSectionState {
	const state = getContext<TestimonialSectionState | undefined>(KEY);
	if (!state)
		throw new Error(
			"TestimonialSection parts must be rendered inside a TestimonialSection.",
		);
	return state;
}
