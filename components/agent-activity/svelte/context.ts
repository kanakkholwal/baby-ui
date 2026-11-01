import { getContext, hasContext, setContext } from "svelte";
import type { agentActivity } from "../variants";

export interface AgentActivityState {
	readonly working: boolean;
	readonly maxHeight: number;
	readonly styles: ReturnType<typeof agentActivity>;
}

const KEY = Symbol("agent-activity");

/** The root's state behind getters, so every part reads the latest value. */
export const setAgentActivity = (state: AgentActivityState) => setContext(KEY, state);
export function agentActivityState(part: string): AgentActivityState {
	if (!hasContext(KEY)) throw new Error(`${part} must be used inside <AgentActivity>`);
	return getContext<AgentActivityState>(KEY);
}
