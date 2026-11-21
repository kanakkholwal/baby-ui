import { createContext } from "svelte";
import type { TranscriptRowStatus, TranscriptRowVariant } from "../variants";

export type TranscriptRowContext = {
	readonly status: TranscriptRowStatus | undefined;
	readonly variant: TranscriptRowVariant;
	readonly clamp: boolean;
};

export const [getTranscriptRow, setTranscriptRow] = createContext<TranscriptRowContext>();
