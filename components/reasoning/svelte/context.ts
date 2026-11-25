import { getContext, setContext } from "svelte";
import type { reasoning } from "../variants";

export type ActiveStep = { id: string; label: string };

export type ReasoningContext = {
	readonly thinking: boolean;
	readonly duration: number;
	readonly open: boolean;
	readonly active: ActiveStep | null;
	readonly styles: ReturnType<typeof reasoning>;
	setActive: (step: ActiveStep | null, id: string) => void;
};

const KEY = Symbol("reasoning");

export function setReasoningContext(value: ReasoningContext) {
	setContext(KEY, value);
}

/** What the parts of a Reasoning share: whether it is thinking, for how long, and whether it is open. */
export function useReasoning(): ReasoningContext | undefined {
	return getContext<ReasoningContext | undefined>(KEY);
}

export function reasoningState(part: string): ReasoningContext {
	const ctx = useReasoning();
	if (!ctx) throw new Error(`${part} must be used inside <Reasoning>`);
	return ctx;
}
