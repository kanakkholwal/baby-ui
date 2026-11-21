import { createContext } from "svelte";
import type { RecordingPillState, RecordingPillVariant } from "../variants";

export type RecordingPillContext = {
	readonly state: RecordingPillState;
	readonly variant: RecordingPillVariant;
	readonly level: number;
};

export const [getRecordingPill, setRecordingPill] = createContext<RecordingPillContext>();
