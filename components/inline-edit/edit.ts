export type InlineEditPhase = "idle" | "saving" | "saved" | "failed";

/** The character offset under a click inside `textNode`, the way a text field places its caret. */
export function caretAt(
	textNode: Node | null | undefined,
	x: number,
	y: number,
	length: number,
): number {
	if (!textNode) return length;
	const position =
		"caretPositionFromPoint" in document ? document.caretPositionFromPoint(x, y) : null;
	if (position)
		return position.offsetNode === textNode ? Math.min(position.offset, length) : length;
	const range =
		"caretRangeFromPoint" in document ? document.caretRangeFromPoint(x, y) : null;
	return range && range.startContainer === textNode
		? Math.min(range.startOffset, length)
		: length;
}

/** Single-line drafts collapse runs of whitespace; multiline ones only trim the ends. */
export const cleanDraft = (text: string, multiline: boolean) =>
	multiline ? text.trim() : text.replace(/\s+/g, " ").trim();

export type SubmitOutcome =
	| { kind: "save"; next: string }
	| { kind: "close" }
	| { kind: "invalid"; message: string }
	| { kind: "discard" };

/** What a submit does. A blur never strands an invalid field that holds nothing new. */
export function submitOutcome(
	draft: string,
	shown: string,
	multiline: boolean,
	source: "key" | "blur",
	validate?: (next: string) => string | null | undefined,
): SubmitOutcome {
	const next = cleanDraft(draft, multiline);
	const message = validate?.(next) || null;
	if (message) {
		return source === "blur" && (next === "" || next === shown)
			? { kind: "discard" }
			: { kind: "invalid", message };
	}
	return next === shown ? { kind: "close" } : { kind: "save", next };
}

/** Runs `onSave`, sync or async, and reports whether it succeeded. */
export async function runSave(
	onSave: (next: string) => unknown,
	next: string,
): Promise<boolean> {
	try {
		await onSave(next);
		return true;
	} catch {
		return false;
	}
}
