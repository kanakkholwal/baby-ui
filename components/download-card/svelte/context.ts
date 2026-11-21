import { createContext } from "svelte";
import type { DownloadCardPhase, DownloadCardVariant } from "../variants";

export type DownloadCardContext = {
	readonly variant: DownloadCardVariant;
	readonly phase: DownloadCardPhase;
	readonly downloaded: number;
	readonly total: number;
	readonly bytesPerSecond: number;
	readonly percent: number;
};

export const [getDownloadCard, setDownloadCard] = createContext<DownloadCardContext>();
