"use client";

import {
	type ComponentProps,
	createContext,
	createElement,
	type ReactNode,
	type RefObject,
	useContext,
	useEffect,
	useId,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { cn } from "../../lib/cn";
import { Spinner } from "../../spinner/react/spinner";
import { caretAt, type InlineEditPhase, runSave, submitOutcome } from "../edit";
import { type InlineEditSize, type InlineEditVariant, inlineEdit } from "../variants";

export type { InlineEditSize, InlineEditVariant };

type Ctx = {
	label: string;
	placeholder: string;
	multiline: boolean;
	shown: string;
	editing: boolean;
	phase: InlineEditPhase;
	error: string | null;
	failed: string | null;
	draft: string;
	messageId: string;
	hasMessage: boolean;
	styles: ReturnType<typeof inlineEdit>;
	setDraft: (next: string) => void;
	start: (at: number | "all", text?: string) => void;
	submit: (source: "key" | "blur") => void;
	cancel: () => void;
	previewRef: RefObject<HTMLButtonElement | null>;
	inputRef: RefObject<HTMLTextAreaElement | null>;
};

const InlineEditContext = createContext<Ctx | null>(null);

function useInlineEdit(part: string): Ctx {
	const ctx = useContext(InlineEditContext);
	if (!ctx) throw new Error(`${part} must be used inside <InlineEdit>`);
	return ctx;
}

export interface InlineEditProps {
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
	className?: string;
	/** InlineEditArea (InlineEditPreview, InlineEditInput, InlineEditStatus), then InlineEditMessage. */
	children: ReactNode;
}

/** The root: text that edits in place, saves through `onSave` and rolls back when it rejects. */
export function InlineEdit({
	value,
	onSave,
	label,
	validate,
	placeholder = "",
	multiline = false,
	variant = "title",
	size = "default",
	className,
	children,
}: InlineEditProps) {
	const messageId = `${useId()}-message`;
	const [shown, setShown] = useState(value);
	const [committed, setCommitted] = useState(value);
	const [editing, setEditing] = useState(false);
	const [draft, setDraft] = useState(value);
	const [phase, setPhase] = useState<InlineEditPhase>("idle");
	const [error, setError] = useState<string | null>(null);
	const [failed, setFailed] = useState<string | null>(null);
	const previewRef = useRef<HTMLButtonElement>(null);
	const inputRef = useRef<HTMLTextAreaElement>(null);
	const selection = useRef<number | "all" | null>(null);
	const refocus = useRef(false);
	// Read by blur, which can fire from a closure rendered before Enter or Escape closed the field.
	const open = useRef(false);
	const run = useRef(0);
	const timer = useRef(0);

	// A new outside value replaces the text unless someone is typing or a save is in flight.
	const busy = useRef(false);
	busy.current = editing || phase === "saving";
	useEffect(() => {
		setCommitted(value);
		if (!busy.current) setShown(value);
	}, [value]);
	useEffect(() => () => clearTimeout(timer.current), []);

	// Focus follows the mode: into the field at the caret, or back to the text after Enter or Escape.
	useLayoutEffect(() => {
		const field = inputRef.current;
		if (editing && field && selection.current !== null) {
			const at = selection.current;
			selection.current = null;
			field.focus({ preventScroll: true });
			if (at === "all") field.select();
			else field.setSelectionRange(at, at);
		}
		if (!editing && refocus.current) {
			refocus.current = false;
			previewRef.current?.focus({ preventScroll: true });
		}
	});

	const close = (returnFocus: boolean) => {
		open.current = false;
		refocus.current = returnFocus;
		setEditing(false);
		setError(null);
	};
	const save = async (next: string) => {
		const previous = committed;
		const token = ++run.current;
		setShown(next);
		setPhase("saving");
		const ok = await runSave(onSave, next);
		if (token !== run.current) return;
		if (ok) {
			setCommitted(next);
			setPhase("saved");
			clearTimeout(timer.current);
			timer.current = window.setTimeout(
				() => setPhase((p) => (p === "saved" ? "idle" : p)),
				1800,
			);
			return;
		}
		setShown(previous);
		setFailed(next);
		setPhase("failed");
	};

	const ctx: Ctx = {
		label,
		placeholder,
		multiline,
		shown,
		editing,
		phase,
		error,
		failed,
		draft,
		messageId,
		hasMessage: error !== null || phase === "failed",
		styles: inlineEdit({ variant, size }),
		setDraft: (next) => {
			setDraft(next);
			if (error) setError(null);
		},
		start: (at, text = shown) => {
			if (open.current || phase === "saving") return;
			open.current = true;
			setDraft(text);
			setError(null);
			setFailed(null);
			setPhase("idle");
			selection.current = at;
			setEditing(true);
		},
		submit: (source) => {
			if (!open.current) return;
			const outcome = submitOutcome(draft, shown, multiline, source, validate);
			if (outcome.kind === "invalid") {
				setError(outcome.message);
				if (source === "key") inputRef.current?.focus();
				return;
			}
			close(source === "key");
			if (outcome.kind === "save") void save(outcome.next);
		},
		cancel: () => close(true),
		previewRef,
		inputRef,
	};

	return (
		<InlineEditContext.Provider value={ctx}>
			<span
				data-slot="inline-edit"
				data-phase={phase}
				data-editing={editing || undefined}
				data-multiline={multiline || undefined}
				className={cn(ctx.styles.root(), className)}
			>
				{children}
				<span className="sr-only" role="status">
					{phase === "saving"
						? `Saving ${label.toLowerCase()}`
						: phase === "saved"
							? `${label} saved`
							: ""}
				</span>
			</span>
		</InlineEditContext.Provider>
	);
}

/** The line the text sits on: the preview or the input, then the status beside it. */
export function InlineEditArea({ className, ...props }: ComponentProps<"span">) {
	const { styles } = useInlineEdit("InlineEditArea");
	return (
		<span
			data-slot="inline-edit-area"
			className={cn(styles.area(), className)}
			{...props}
		/>
	);
}

/** The text as a button: a click puts the caret where it landed, a key press selects all. */
export function InlineEditPreview({
	as = "span",
	className,
}: {
	/** The element that holds the text, so a title can stay a heading. */
	as?: "span" | "p" | "h1" | "h2" | "h3";
	className?: string;
}) {
	const edit = useInlineEdit("InlineEditPreview");
	const textRef = useRef<HTMLSpanElement>(null);
	if (edit.editing) return null;
	return createElement(
		as,
		{
			"data-slot": "inline-edit-preview",
			className: "my-0 -mx-1.5 min-w-0 font-[inherit] text-[length:inherit]",
		},
		<button
			ref={edit.previewRef}
			type="button"
			data-phase={edit.phase}
			aria-label={`${edit.label}: ${edit.shown || edit.placeholder}. Edit`}
			className={cn(edit.styles.preview(), className)}
			onClick={(event) => {
				if (edit.phase === "saving") return;
				edit.start(
					event.detail === 0
						? "all"
						: caretAt(
								textRef.current?.firstChild,
								event.clientX,
								event.clientY,
								edit.shown.length,
							),
				);
			}}
		>
			<span
				key={edit.shown}
				ref={textRef}
				className={cn(edit.styles.text(), !edit.shown && edit.styles.placeholder())}
			>
				{edit.shown || edit.placeholder}
			</span>
		</button>,
	);
}

/** The field while editing; a textarea even for one line, so a long value wraps like the preview. */
export function InlineEditInput({ className }: { className?: string }) {
	const edit = useInlineEdit("InlineEditInput");
	if (!edit.editing) return null;
	return (
		<span data-slot="inline-edit-input" className={cn(edit.styles.field(), className)}>
			<span aria-hidden className={edit.styles.sizer()}>
				{`${edit.draft || edit.placeholder} `}
			</span>
			<textarea
				ref={edit.inputRef}
				value={edit.draft}
				rows={1}
				cols={1}
				aria-label={edit.label}
				aria-invalid={edit.error !== null || undefined}
				aria-describedby={edit.hasMessage ? edit.messageId : undefined}
				placeholder={edit.placeholder}
				className={edit.styles.input()}
				onChange={(event) => edit.setDraft(event.target.value)}
				onBlur={() => edit.submit("blur")}
				onKeyDown={(event) => {
					if (event.key === "Escape") {
						event.preventDefault();
						edit.cancel();
					} else if (event.key === "Enter" && !(edit.multiline && event.shiftKey)) {
						event.preventDefault();
						edit.submit("key");
					}
				}}
			/>
		</span>
	);
}

/** A spinner while saving, then a tick that draws and fades; the root announces both. */
export function InlineEditStatus({ className }: { className?: string }) {
	const { phase, styles } = useInlineEdit("InlineEditStatus");
	return (
		<span
			aria-hidden
			data-slot="inline-edit-status"
			className={cn(styles.status(), className)}
		>
			{phase === "saving" && <Spinner size="sm" label="Saving" />}
			<svg
				viewBox="0 0 14 14"
				fill="none"
				aria-hidden
				data-on={phase === "saved"}
				className={styles.tick()}
			>
				<path
					d="M3 7.4 5.6 10 11 4.2"
					pathLength={1}
					stroke="currentColor"
					strokeWidth="1.6"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</span>
	);
}

/** The validation error, or the rollback notice with a retry that reopens the rejected draft. */
export function InlineEditMessage({
	failedText = "Couldn't save.",
	retryText = "Edit again",
	className,
}: {
	/** Shown when the save rejected and the text rolled back. */
	failedText?: string;
	retryText?: string;
	className?: string;
}) {
	const edit = useInlineEdit("InlineEditMessage");
	if (edit.error !== null) {
		return (
			<span
				id={edit.messageId}
				data-slot="inline-edit-message"
				role="alert"
				data-tone="error"
				className={cn(edit.styles.message(), className)}
			>
				{edit.error}
			</span>
		);
	}
	if (edit.phase !== "failed") return null;
	const draft = edit.failed;
	return (
		<span
			id={edit.messageId}
			data-slot="inline-edit-message"
			role="status"
			data-tone="failed"
			className={cn(edit.styles.message(), className)}
		>
			{failedText}
			{draft !== null && (
				<button
					type="button"
					className={edit.styles.retry()}
					onClick={() => edit.start(draft.length, draft)}
				>
					{retryText}
				</button>
			)}
		</span>
	);
}
