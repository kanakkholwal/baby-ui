import type { RecordStrength } from "./variants";

export type { RecordStrength };

export type RecordSortKey = "name" | "last" | "strength";
export type RecordsToolKind = "model" | "web" | "user";

export type RecordsColumnType =
	| "Text"
	| "File"
	| "Collection"
	| "Single select"
	| "Multi select"
	| "URL"
	| "Reference"
	| "JSON"
	| "File splitter"
	| "Date";

export type RecordsPrompt = { before: string; chip?: string; after?: string };

export type RecordsColumnMeta = {
	type: RecordsColumnType;
	tool: string;
	toolKind: RecordsToolKind;
	inputs?: string;
	prompt?: RecordsPrompt;
};

export type RecordRow = {
	id: string;
	name: string;
	tags: string[];
	last: string;
	strength: RecordStrength;
	website?: string;
	/** Real, caller-supplied resolved value for the AI column; shown once "Go calculate" finishes. */
	aiValue?: string;
};

export type RecordsTableLabels = {
	company: string;
	categories: string;
	last: string;
	strength: string;
	links: string;
	ai: string;
};
