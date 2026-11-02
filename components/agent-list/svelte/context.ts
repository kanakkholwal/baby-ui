import { getContext, hasContext, setContext } from "svelte";
import type { AgentStatus, agentList } from "../variants";

export interface AgentListState {
	readonly styles: ReturnType<typeof agentList>;
}

export interface AgentListItemState {
	readonly status: AgentStatus;
	/** bits-ui leaves the trigger and panel unlinked, so each item names both. */
	readonly trigger: string;
	readonly content: string;
}

const KEY = Symbol("agent-list");
const ITEM = Symbol("agent-list-item");

/** The root's styles behind a getter, so every part reads the current variant. */
export const setAgentList = (state: AgentListState) => setContext(KEY, state);
export function agentListState(part: string): AgentListState {
	if (!hasContext(KEY)) throw new Error(`${part} must be used inside <AgentList>`);
	return getContext<AgentListState>(KEY);
}

export const setAgentListItem = (state: AgentListItemState) => setContext(ITEM, state);
export function agentListItem(part: string): AgentListItemState {
	if (!hasContext(ITEM)) throw new Error(`${part} must be used inside <AgentListItem>`);
	return getContext<AgentListItemState>(ITEM);
}
