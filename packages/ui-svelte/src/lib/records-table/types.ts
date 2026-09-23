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

export type Glyph =
	| { kind: "path"; d: string }
	| { kind: "circle"; cx: number; cy: number; r: number }
	| { kind: "ellipse"; cx: number; cy: number; rx: number; ry: number }
	| { kind: "rect"; x: number; y: number; width: number; height: number; rx?: number };

const path = (d: string): Glyph => ({ kind: "path", d });

export const TYPE_GLYPHS: Record<RecordsColumnType, Glyph[]> = {
	Text: [path("M4 6h16M4 12h10M4 18h7")],
	File: [
		path("M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"),
		path("M14 2v6h6"),
	],
	Collection: [
		{ kind: "ellipse", cx: 12, cy: 5, rx: 8, ry: 3 },
		path("M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"),
	],
	"Single select": [
		{ kind: "circle", cx: 12, cy: 12, r: 9 },
		path("m8.5 12 2.4 2.4 4.6-4.9"),
	],
	"Multi select": [
		path("M11 6h9M11 12h9M11 18h9"),
		path("M4 6l1.5 1.5L8 5M4 12l1.5 1.5L8 11M4 18l1.5 1.5L8 17"),
	],
	URL: [
		path("M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"),
		path("M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"),
	],
	Reference: [path("M7 17 17 7M9 7h8v8")],
	JSON: [
		path("M8 4c-2 0-2 2-2 3s.5 3-2 3c2.5 0 2 2 2 3s0 3 2 3"),
		path("M16 4c2 0 2 2 2 3s-.5 3 2 3c-2.5 0-2 2-2 3s0 3-2 3"),
	],
	"File splitter": [
		{ kind: "rect", x: 8, y: 8, width: 12, height: 12, rx: 2 },
		path("M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"),
	],
	Date: [
		{ kind: "rect", x: 3, y: 5, width: 18, height: 16, rx: 2.5 },
		path("M8 3v4M16 3v4M3 10h18"),
	],
};

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

export type ColumnKey = "company" | "categories" | "last" | "strength" | "links" | "ai";
