import type { ProgressTone } from "../progress/variants";
import type { LoadedModelState } from "./variants";

export type LoadedModelMeasurement = {
	/** Fill of the bar, 0 to 100. */
	value: number;
	tone: ProgressTone;
	/** The measured result, e.g. "42 tokens per second". */
	label: string;
	/** A short verdict shown as a badge, e.g. "Fast". */
	badge?: string;
};

export type LoadedModel = {
	id: string;
	name: string;
	/** What it is for, e.g. "Chat". */
	kind: string;
	state: LoadedModelState;
	/** Memory it holds while loaded, in bytes; feeds the memory bar. */
	size?: number;
	/** Replaces the default "Kind · State" line. */
	status?: string;
	measurement?: LoadedModelMeasurement;
};

export function isLoaded(model: LoadedModel): boolean {
	return model.state !== "idle";
}

/** The state the trigger dot shows: any loading wins, then any ready, else idle. */
export function overallState(models: LoadedModel[]): LoadedModelState {
	if (models.some((m) => m.state === "loading")) return "loading";
	return models.some((m) => m.state === "ready") ? "ready" : "idle";
}

export const STATE_LABEL: Record<LoadedModelState, string> = {
	loading: "Loading",
	ready: "Ready",
	idle: "Not loaded",
};

export type MemorySegment = { id: string; name: string; size: number; percent: number };

/** What each loaded model holds, as a share of `total`; sizes that do not fit are clipped at 100. */
export function memorySegments(models: LoadedModel[], total: number): MemorySegment[] {
	if (total <= 0) return [];
	let used = 0;
	const out: MemorySegment[] = [];
	for (const m of models) {
		if (!isLoaded(m) || !m.size || m.size <= 0) continue;
		const percent = Math.min(100 - used, (m.size / total) * 100);
		if (percent <= 0) break;
		out.push({ id: m.id, name: m.name, size: m.size, percent });
		used += percent;
	}
	return out;
}

/** 6.2 GB, 480 MB: what a person reads when they ask how much memory is left. */
export function formatMemory(bytes: number): string {
	const gb = bytes / 1024 ** 3;
	if (gb >= 1) return `${gb.toFixed(1)} GB`;
	return `${Math.max(0, Math.round(bytes / 1024 ** 2))} MB`;
}
