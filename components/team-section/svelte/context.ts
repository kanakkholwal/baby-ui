import { getContext, setContext } from "svelte";
import type { TeamSectionVariant, teamSection } from "../variants";

/** What TeamSection shares with its parts; getters so it stays reactive. */
export interface TeamSectionState {
	readonly variant: TeamSectionVariant;
	readonly titleId: string;
	readonly styles: ReturnType<typeof teamSection>;
}

const KEY = Symbol("team-section");

export const setTeamSection = (state: TeamSectionState) => setContext(KEY, state);
export function teamSectionState(): TeamSectionState {
	const state = getContext<TeamSectionState | undefined>(KEY);
	if (!state) throw new Error("TeamSection parts must be rendered inside a TeamSection.");
	return state;
}
