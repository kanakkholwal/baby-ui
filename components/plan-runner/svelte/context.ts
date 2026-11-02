import { getContext, hasContext, setContext } from "svelte";
import type { PlanStepStatus, planRunner } from "../variants";

export interface PlanRunnerState {
	readonly styles: ReturnType<typeof planRunner>;
	/** The step pointed at in the progress bar. */
	active: string | null;
}

const KEY = Symbol("plan-runner");
const STEP = Symbol("plan-runner-step");

/** The root's state behind getters, so every part reads the latest value. */
export const setPlanRunner = (state: PlanRunnerState) => setContext(KEY, state);
export function planRunnerState(part: string): PlanRunnerState {
	if (!hasContext(KEY)) throw new Error(`${part} must be used inside <PlanRunner>`);
	return getContext<PlanRunnerState>(KEY);
}

export const setPlanStep = (state: { readonly status: PlanStepStatus }) =>
	setContext(STEP, state);
export const planStepState = (): { readonly status: PlanStepStatus } | undefined =>
	getContext(STEP);
