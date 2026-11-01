<script lang="ts">
import type { Snippet } from "svelte";
import { tick, untrack } from "svelte";
import { cn } from "../../lib/cn";
import { type InlineEditPhase, runSave, submitOutcome } from "../edit";
import { type InlineEditSize, type InlineEditVariant, inlineEdit } from "../variants";
import { setInlineEdit } from "./context";

let {
	value,
	onSave,
	label,
	validate,
	placeholder = "",
	multiline = false,
	variant = "title",
	size = "default",
	class: classProp,
	children,
}: {
	/** The saved value; a new one from outside replaces the text while it is not being edited. */
	value: string;
	/** Persists the new value. Return a promise to show saving; reject it to roll back. */
	onSave: (next: string) => unknown;
	/** Accessible name, e.g. "Project name". */
	label: string;
	/** Returns a message when the draft cannot be saved. */
	validate?: (next: string) => string | null | undefined;
	/** Shown by the preview and the input while the text is empty. */
	placeholder?: string;
	/** Enter saves either way; here Shift+Enter adds a line and line breaks are kept. */
	multiline?: boolean;
	/** `title` for names and headings, `body` for descriptions. */
	variant?: InlineEditVariant;
	size?: InlineEditSize;
	class?: string;
	/** InlineEditArea (InlineEditPreview, InlineEditInput, InlineEditStatus), then InlineEditMessage. */
	children: Snippet;
} = $props();

const uid = $props.id();
let shown = $state(untrack(() => value));
let committed = $state(untrack(() => value));
let editing = $state(false);
let draft = $state("");
let phase = $state<InlineEditPhase>("idle");
let error = $state<string | null>(null);
let failed = $state<string | null>(null);
let preview: HTMLElement | undefined;
let input: HTMLTextAreaElement | undefined;
let run = 0;
let timer = 0;

// A new outside value replaces the text unless someone is typing or a save is in flight.
$effect(() => {
	const next = value;
	untrack(() => {
		committed = next;
		if (!editing && phase !== "saving") shown = next;
	});
});
$effect(() => () => clearTimeout(timer));

async function start(at: number | "all", text = shown) {
	if (editing || phase === "saving") return;
	draft = text;
	error = null;
	failed = null;
	phase = "idle";
	editing = true;
	await tick();
	input?.focus({ preventScroll: true });
	if (at === "all") input?.select();
	else input?.setSelectionRange(at, at);
}

async function save(next: string) {
	const previous = committed;
	const token = ++run;
	shown = next;
	phase = "saving";
	const ok = await runSave(onSave, next);
	if (token !== run) return;
	if (ok) {
		committed = next;
		phase = "saved";
		clearTimeout(timer);
		timer = window.setTimeout(() => {
			if (phase === "saved") phase = "idle";
		}, 1800);
		return;
	}
	shown = previous;
	failed = next;
	phase = "failed";
}

async function close(refocus: boolean) {
	editing = false;
	error = null;
	if (!refocus) return;
	await tick();
	preview?.focus({ preventScroll: true });
}

function submit(source: "key" | "blur") {
	if (!editing) return;
	const outcome = submitOutcome(draft, shown, multiline, source, validate);
	if (outcome.kind === "invalid") {
		error = outcome.message;
		if (source === "key") input?.focus();
		return;
	}
	void close(source === "key");
	if (outcome.kind === "save") void save(outcome.next);
}

setInlineEdit({
	get label() {
		return label;
	},
	get placeholder() {
		return placeholder;
	},
	get multiline() {
		return multiline;
	},
	get shown() {
		return shown;
	},
	get editing() {
		return editing;
	},
	get phase() {
		return phase;
	},
	get error() {
		return error;
	},
	get failed() {
		return failed;
	},
	get hasMessage() {
		return error !== null || phase === "failed";
	},
	get styles() {
		return styles;
	},
	get draft() {
		return draft;
	},
	set draft(next) {
		draft = next;
	},
	messageId: `${uid}-message`,
	start,
	submit,
	cancel: () => void close(true),
	clearError: () => {
		error = null;
	},
	registerPreview: (element) => {
		preview = element;
	},
	registerInput: (element) => {
		input = element;
	},
});

const styles = $derived(inlineEdit({ variant, size }));
</script>

<span data-slot="inline-edit" data-phase={phase} data-editing={editing || undefined} data-multiline={multiline || undefined} class={cn(styles.root(), classProp)}>
	{@render children()}
	<span class="sr-only" role="status">
		{phase === "saving" ? `Saving ${label.toLowerCase()}` : phase === "saved" ? `${label} saved` : ""}
	</span>
</span>
