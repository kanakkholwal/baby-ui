import { getContext, setContext } from "svelte";
import type { integrationSection } from "../variants";

/** What IntegrationSection shares with its parts; getters so it stays reactive. */
export interface IntegrationSectionState {
	readonly titleId: string;
	readonly styles: ReturnType<typeof integrationSection>;
}

const KEY = Symbol("integration-section");

export const setIntegrationSection = (state: IntegrationSectionState) =>
	setContext(KEY, state);
export function integrationSectionState(): IntegrationSectionState {
	const state = getContext<IntegrationSectionState | undefined>(KEY);
	if (!state)
		throw new Error(
			"IntegrationSection parts must be rendered inside an IntegrationSection.",
		);
	return state;
}
