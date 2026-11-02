import type { ApprovalRisk, ApprovalStatus } from "./variants";

/** A JSON value as it round-trips through the arguments editor. */
export type JsonValue =
	| string
	| number
	| boolean
	| null
	| JsonValue[]
	| { [key: string]: JsonValue };

export type ApprovalArgs = { [key: string]: JsonValue };

/** Same shape as the public file-diff lines, so a diff can be passed straight through. */
export type ApprovalDiffLine = { kind: "add" | "remove" | "context"; text: string };

export interface ApprovalRequest {
	/** Tool the agent wants to call, shown in monospace. */
	tool: string;
	title: string;
	/** What will happen, in words a reviewer can check. */
	summary: string;
	args: ApprovalArgs;
	risk: ApprovalRisk;
	/** A file change to preview before deciding. */
	diff?: { filename: string; lines: ApprovalDiffLine[] };
	/** ISO time the request lapses; the countdown is derived from the `now` prop. */
	expiresAt?: string;
}

/** Under a minute left, the countdown turns urgent. */
export const URGENT_MS = 60_000;

export function isResolved(status: ApprovalStatus): boolean {
	return status === "approved" || status === "denied" || status === "expired";
}

/** Milliseconds left, clamped at 0; null when the request never lapses or the date is bad. */
export function remainingMs(expiresAt: string | undefined, now: number): number | null {
	if (!expiresAt) return null;
	const at = Date.parse(expiresAt);
	return Number.isNaN(at) ? null : Math.max(0, at - now);
}

/** `4:05` under an hour, `1h 02m` above. */
export function formatRemaining(ms: number): string {
	const total = Math.ceil(ms / 1000);
	const hours = Math.floor(total / 3600);
	const minutes = Math.floor((total % 3600) / 60);
	const seconds = total % 60;
	if (hours > 0) return `${hours}h ${String(minutes).padStart(2, "0")}m`;
	return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function formatArgs(args: ApprovalArgs): string {
	return JSON.stringify(args, null, 2);
}

export type ArgsResult =
	| { ok: true; args: ApprovalArgs }
	| { ok: false; line: number | null };

/** Parses the editor text; only a plain JSON object counts as arguments. */
export function parseArgs(text: string): ArgsResult {
	let value: unknown;
	try {
		value = JSON.parse(text);
	} catch (error) {
		const message = error instanceof Error ? error.message : "";
		const line = /line (\d+)/.exec(message)?.[1];
		const position = /position (\d+)/.exec(message)?.[1];
		if (line) return { ok: false, line: Number(line) };
		if (position) {
			return { ok: false, line: text.slice(0, Number(position)).split("\n").length };
		}
		return { ok: false, line: null };
	}
	if (value === null || typeof value !== "object" || Array.isArray(value)) {
		return { ok: false, line: 1 };
	}
	return { ok: true, args: value as ApprovalArgs };
}

/** Top-level keys whose values differ, e.g. to tell a reviewer what was edited. */
export function changedKeys(before: ApprovalArgs, after: ApprovalArgs): string[] {
	const keys = new Set([...Object.keys(before), ...Object.keys(after)]);
	return [...keys].filter(
		(key) => JSON.stringify(before[key]) !== JSON.stringify(after[key]),
	);
}
