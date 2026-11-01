"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useId,
	useRef,
	useState,
} from "react";
import { Button } from "../../button/react/button";
import { CopyButton } from "../../copy-button/react/copy-button";
import { cn } from "../../lib/cn";
import {
	TOOL_ICONS,
	TOOL_STATUS_TEXT,
	type ToolKind,
	type ToolState,
	type ToolVariant,
	tool,
} from "../variants";

export type { ToolKind, ToolState, ToolVariant };

type Ctx = { status: ToolState; panelId: string; styles: ReturnType<typeof tool> };
const ToolContext = createContext<Ctx | null>(null);

function useTool(part: string): Ctx {
	const ctx = useContext(ToolContext);
	if (!ctx) throw new Error(`${part} must be used inside <Tool>`);
	return ctx;
}

export interface ToolProps {
	/** Where the call is. Starting to run opens the panel, so its output can be followed. */
	status?: ToolState;
	/** Whether the input and output show. */
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	/** Fold the panel once the call finishes, leaving the one-line row. */
	collapseOnComplete?: boolean;
	variant?: ToolVariant;
	className?: string;
	/** ToolTrigger, then ToolContent with ToolInput, ToolOutput and ToolActions. */
	children: ReactNode;
}

/** The root: one tool call as a row that opens onto its input and output. */
export function Tool({
	status = "running",
	open,
	defaultOpen = false,
	onOpenChange,
	collapseOnComplete = false,
	variant = "card",
	className,
	children,
}: ToolProps) {
	const [own, setOwn] = useState(defaultOpen);
	const current = open ?? own;
	const setOpen = (next: boolean) => {
		if (open === undefined) setOwn(next);
		onOpenChange?.(next);
	};

	// Adjusted during render, so the panel moves on the same frame the status does.
	const [previous, setPrevious] = useState(status);
	if (previous !== status) {
		setPrevious(status);
		if (previous !== "running" && status === "running") setOpen(true);
		else if (previous === "running" && collapseOnComplete) setOpen(false);
	}

	const panelId = useId();
	const styles = tool({ variant });
	return (
		<ToolContext.Provider value={{ status, panelId, styles }}>
			<CollapsiblePrimitive.Root
				data-slot="tool"
				data-status={status}
				data-variant={variant}
				aria-busy={status === "running"}
				open={current}
				onOpenChange={setOpen}
				className={cn(styles.root(), className)}
			>
				{children}
			</CollapsiblePrimitive.Root>
		</ToolContext.Provider>
	);
}

export interface ToolTriggerProps {
	/** The tool's name as the model calls it, e.g. `search_docs`. */
	name: string;
	/** What the call is doing, in words, e.g. "Searching the docs". */
	title?: string;
	/** Picks the icon: a function, a terminal command, a web request or a search. */
	kind?: ToolKind;
	/** Replaces the status text, e.g. for another language. */
	labels?: Partial<Record<ToolState, string>>;
	className?: string;
}

export function ToolTrigger({
	name,
	title,
	kind = "function",
	labels,
	className,
}: ToolTriggerProps) {
	const { status, panelId, styles: s } = useTool("ToolTrigger");
	const text = labels?.[status] ?? TOOL_STATUS_TEXT[status];
	return (
		<CollapsiblePrimitive.Trigger
			data-slot="tool-trigger"
			aria-controls={panelId}
			className={cn(s.trigger(), className)}
		>
			<span aria-hidden className={s.kind()}>
				<svg viewBox="0 0 24 24" aria-hidden>
					<path d={TOOL_ICONS[kind]} />
				</svg>
			</span>
			<span className={s.heading()}>
				{title && <span className={s.title()}>{title}</span>}
				<span className={title ? s.name() : cn(s.name(), "text-foreground")}>{name}</span>
			</span>
			<span data-status={status} className={s.status()}>
				{status === "running" ? (
					<svg viewBox="0 0 12 12" fill="none" aria-hidden className="spinner size-3">
						<circle
							cx="6"
							cy="6"
							r="4.4"
							stroke="currentColor"
							strokeWidth="1.5"
							opacity="0.25"
						/>
						<path
							d="M10.4 6A4.4 4.4 0 0 0 6 1.6"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
						/>
					</svg>
				) : status === "done" || status === "error" ? (
					<svg viewBox="0 0 24 24" aria-hidden className={s.statusIcon()}>
						<path d={TOOL_ICONS[status]} />
					</svg>
				) : null}
				<span key={text} className={s.statusText()}>
					{text}
				</span>
			</span>
			<svg viewBox="0 0 24 24" aria-hidden className={s.chevron()}>
				<path d={TOOL_ICONS.chevron} />
			</svg>
		</CollapsiblePrimitive.Trigger>
	);
}

export function ToolContent({
	className,
	children,
}: {
	className?: string;
	children: ReactNode;
}) {
	const { panelId, styles } = useTool("ToolContent");
	return (
		// keepMounted still sets `hidden`; force it off so the rows transition has a frame.
		<CollapsiblePrimitive.Panel
			keepMounted
			hidden={false}
			id={panelId}
			data-slot="tool-content"
			className={styles.panel()}
		>
			<div className={styles.clip()}>
				<div className={cn(styles.body(), className)}>{children}</div>
			</div>
		</CollapsiblePrimitive.Panel>
	);
}

export function ToolInput({
	label = "Input",
	className,
	children,
}: {
	label?: string;
	className?: string;
	/** The arguments, usually JSON. */
	children: ReactNode;
}) {
	const { styles } = useTool("ToolInput");
	return (
		<div data-slot="tool-input" className={cn(styles.section(), className)}>
			<p className={styles.label()}>{label}</p>
			<pre className={cn(styles.code(), "text-muted-foreground")}>
				<code>{children}</code>
			</pre>
		</div>
	);
}

export function ToolOutput({
	label = "Output",
	maxHeight = 220,
	className,
	children,
}: {
	label?: string;
	/** In px; longer output scrolls. */
	maxHeight?: number;
	className?: string;
	/** The result or the streaming log. */
	children: ReactNode;
}) {
	const { status, styles } = useTool("ToolOutput");
	const logRef = useRef<HTMLPreElement>(null);
	const statusRef = useRef(status);
	statusRef.current = status;

	// While the call runs, new output keeps the end in view.
	useEffect(() => {
		const node = logRef.current;
		if (!node) return;
		const observer = new MutationObserver(() => {
			if (statusRef.current === "running") node.scrollTop = node.scrollHeight;
		});
		observer.observe(node, { childList: true, subtree: true, characterData: true });
		return () => observer.disconnect();
	}, []);

	return (
		<div
			data-slot="tool-output"
			data-status={status}
			className={cn(styles.section(), className)}
		>
			<p className={styles.label()}>{label}</p>
			<pre
				ref={logRef}
				role="log"
				aria-live="polite"
				data-status={status}
				style={{ maxHeight }}
				className={cn(
					styles.code(),
					"text-foreground data-[status=error]:text-destructive-strong",
				)}
			>
				<code>{children}</code>
			</pre>
		</div>
	);
}

/** The row under the output: ToolCopy and ToolRetry. */
export function ToolActions({
	className,
	children,
}: {
	className?: string;
	children: ReactNode;
}) {
	const { styles } = useTool("ToolActions");
	return (
		<div data-slot="tool-actions" className={cn(styles.actions(), className)}>
			{children}
		</div>
	);
}

export function ToolCopy({
	text,
	label = "Copy output",
	className,
}: {
	text: string;
	label?: string;
	className?: string;
}) {
	const { styles } = useTool("ToolCopy");
	return (
		<CopyButton
			data-slot="tool-copy"
			text={text}
			label={label}
			iconOnly
			className={cn(styles.action(), className)}
		/>
	);
}

export function ToolRetry({
	onClick,
	label = "Run again",
	className,
}: {
	/** Runs the call again; the button shows only once it has finished or failed. */
	onClick: () => void;
	label?: string;
	className?: string;
}) {
	const { status, styles } = useTool("ToolRetry");
	if (status !== "done" && status !== "error") return null;
	return (
		<Button
			data-slot="tool-retry"
			variant="ghost"
			size="icon-xs"
			aria-label={label}
			className={cn(styles.action(), className)}
			onClick={onClick}
		>
			<svg viewBox="0 0 24 24" aria-hidden className={styles.statusIcon()}>
				<path d={TOOL_ICONS.retry} />
			</svg>
		</Button>
	);
}
