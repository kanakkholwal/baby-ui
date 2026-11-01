import { getContext, hasContext, setContext } from "svelte";
import type { TaskStatus, TaskStepsSize, TaskStepsVariant, taskSteps } from "../variants";

export interface TaskStepsState {
	readonly variant: TaskStepsVariant;
	readonly size: TaskStepsSize;
	readonly showConnector: boolean;
	readonly labels: Record<TaskStatus, string>;
	readonly styles: ReturnType<typeof taskSteps>;
}

const KEY = Symbol("task-steps");

/** The root's state behind getters, so every part reads the latest value. */
export const setTaskSteps = (state: TaskStepsState) => setContext(KEY, state);
export function taskStepsState(part: string): TaskStepsState {
	if (!hasContext(KEY)) throw new Error(`${part} must be used inside <TaskSteps>`);
	return getContext<TaskStepsState>(KEY);
}
