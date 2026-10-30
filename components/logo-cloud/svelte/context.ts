import { getContext, setContext } from "svelte";
import type { logoCloud } from "../variants";

/** What LogoCloud shares with its parts; a getter so it stays reactive. */
export interface LogoCloudState {
	readonly styles: ReturnType<typeof logoCloud>;
}

const KEY = Symbol("logo-cloud");

export const setLogoCloud = (state: LogoCloudState) => setContext(KEY, state);
export function logoCloudState(): LogoCloudState {
	const state = getContext<LogoCloudState | undefined>(KEY);
	if (!state) throw new Error("LogoCloud parts must be rendered inside a LogoCloud.");
	return state;
}
