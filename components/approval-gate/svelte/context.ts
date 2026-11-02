import { getContext, hasContext, setContext } from "svelte";
import type { ApprovalRequest } from "../approval-core";
import type { ApprovalLabels, ApprovalStatus, approvalGate } from "../variants";

export type ApprovalStep = "idle" | "confirm" | "deny";

export type ApprovalGateState = {
	id: string;
	request: ApprovalRequest;
	status: ApprovalStatus;
	busy: boolean;
	note?: string;
	remaining: number | null;
	lapsed: boolean;
	resolved: boolean;
	step: ApprovalStep;
	setStep: (step: ApprovalStep) => void;
	argsOpen: boolean;
	toggleArgs: () => void;
	onEditingChange?: (editing: boolean) => void;
	labels: ApprovalLabels;
	styles: ReturnType<typeof approvalGate>;
};

const KEY = Symbol("approval-gate");

/** The root's state behind getters, so every part reads the latest value. */
export const setApprovalGate = (state: ApprovalGateState) => setContext(KEY, state);
export function approvalGateState(part: string): ApprovalGateState {
	if (!hasContext(KEY)) throw new Error(`${part} must be used inside <ApprovalGate>`);
	return getContext<ApprovalGateState>(KEY);
}
