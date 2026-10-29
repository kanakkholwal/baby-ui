import { getContext, setContext } from "svelte";
import type { featureSection } from "../variants";

/** What FeatureSection shares with its parts; getters so it stays reactive. */
export interface FeatureSectionState {
	readonly titleId: string;
	readonly styles: ReturnType<typeof featureSection>;
}

const KEY = Symbol("feature-section");

export const setFeatureSection = (state: FeatureSectionState) => setContext(KEY, state);
export function featureSectionState(): FeatureSectionState {
	const state = getContext<FeatureSectionState | undefined>(KEY);
	if (!state)
		throw new Error("FeatureSection parts must be rendered inside a FeatureSection.");
	return state;
}
