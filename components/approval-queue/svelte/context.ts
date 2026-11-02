import { getContext, hasContext, setContext } from "svelte";
import type { approvalQueue } from "../variants";

export interface ApprovalQueueState {
	readonly styles: ReturnType<typeof approvalQueue>;
}

const KEY = Symbol("approval-queue");
const ITEM = Symbol("approval-queue-item");

/** bits-ui leaves the trigger and panel unlinked, so each item names both. */
export type ApprovalQueueItemIds = { trigger: string; content: string };
export const setApprovalQueueItem = (ids: ApprovalQueueItemIds) => setContext(ITEM, ids);
export const approvalQueueItem = (): ApprovalQueueItemIds | undefined => getContext(ITEM);

/** The root's styles behind a getter, so every part reads the current variant. */
export const setApprovalQueue = (state: ApprovalQueueState) => setContext(KEY, state);
export function approvalQueueState(part: string): ApprovalQueueState {
	if (!hasContext(KEY)) throw new Error(`${part} must be used inside <ApprovalQueue>`);
	return getContext<ApprovalQueueState>(KEY);
}
