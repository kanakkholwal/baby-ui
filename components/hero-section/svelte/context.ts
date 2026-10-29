import { getContext, setContext } from "svelte";
import type { HeroSectionVariant, heroSection } from "../variants";

/** What HeroSection shares with its parts; getters so it stays reactive. */
export interface HeroSectionState {
	readonly variant: HeroSectionVariant;
	readonly titleId: string;
	readonly styles: ReturnType<typeof heroSection>;
}

const KEY = Symbol("hero-section");

export const setHeroSection = (state: HeroSectionState) => setContext(KEY, state);
export function heroSectionState(): HeroSectionState {
	const state = getContext<HeroSectionState | undefined>(KEY);
	if (!state) throw new Error("HeroSection parts must be rendered inside a HeroSection.");
	return state;
}
