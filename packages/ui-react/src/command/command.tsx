"use client";

import type { ComponentProps, KeyboardEvent, ReactNode } from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";
import { DIALOG_SURFACE } from "../dialog/dialog";
import { cn } from "../lib/cn";
import { commandFrame, type DialogVariant } from "./variants";

/** Same choreography as a dialog panel, but the palette drops from above its shortcut. */
const COMMAND_PANEL = [
	"transition-[opacity,scale,translate] duration-[var(--duration-overlay)] ease-[var(--ease-out)]",
	"data-[state=closed]:opacity-0 data-[state=closed]:scale-[var(--enter-scale)]",
	"data-[state=closed]:-translate-y-[var(--enter-lift)] data-[state=closed]:duration-[var(--duration-exit)]",
	"starting:data-[state=open]:opacity-0 starting:data-[state=open]:scale-[var(--enter-scale)]",
	"starting:data-[state=open]:-translate-y-[var(--enter-lift)]",
	"motion-reduce:transition-none",
].join(" ");

/** One marker glides between rows, so an arrow-key run reads as a single object moving. */
const COMMAND_MARKER = [
	"pointer-events-none absolute top-0 left-0 rounded-md bg-foreground/[0.06]",
	"transition-[translate,width,height] duration-[var(--duration-press)] ease-[var(--ease-out)]",
	"motion-reduce:transition-none",
].join(" ");

type Ctx = {
	query: string;
	listId: string;
	activeId: string;
	/** Visible rows after filtering, for the count next to the search input. */
	resultCount: number;
	setQuery: (query: string) => void;
	setActive: (id: string) => void;
	/** True when an item's value or keywords contain the current query. */
	matches: (haystack: string) => boolean;
	select: () => void;
	setList: (el: HTMLElement | null) => void;
	setResultCount: (count: number) => void;
	move: (delta: number) => void;
	first: () => void;
	last: () => void;
};

const CommandCtx = createContext<Ctx | null>(null);

function useCommand() {
	const ctx = useContext(CommandCtx);
	if (!ctx) throw new Error("Command parts must be used inside <Command>");
	return ctx;
}

/** Bridges CommandDialog's open state to Command, so a fresh open starts with an empty
 * search. `null` outside a CommandDialog, where Command just skips the reset. */
const CommandDialogCtx = createContext<boolean | null>(null);

type CommandHeaderContent = { children?: ReactNode; className?: string } | null;

/** CommandHeader hoists here so CommandDialog can render it in the rim above the card. */
const CommandHeaderCtx = createContext<((header: CommandHeaderContent) => void) | null>(
	null,
);

/** `framed` outside any CommandDialog too, since a bare Command is still its own surface. */
const CommandVariantCtx = createContext<DialogVariant>("framed");

export function Command({ className, children, ...props }: ComponentProps<"div">) {
	const listId = useId();
	const [query, setQueryState] = useState("");
	const [activeId, setActive] = useState("");
	const [resultCount, setResultCount] = useState(0);
	const listEl = useRef<HTMLElement | null>(null);
	const dialogOpen = useContext(CommandDialogCtx);
	const variant = useContext(CommandVariantCtx);

	const options = useCallback(
		() => [...(listEl.current?.querySelectorAll<HTMLElement>("[role='option']") ?? [])],
		[],
	);

	const setList = useCallback((el: HTMLElement | null) => {
		listEl.current = el;
	}, []);

	const setQuery = useCallback((next: string) => {
		setQueryState(next);
		setActive("");
	}, []);

	const matches = useCallback(
		(haystack: string) => {
			const q = query.trim().toLowerCase();
			return !q || haystack.toLowerCase().includes(q);
		},
		[query],
	);

	const select = useCallback(() => {
		const rows = options();
		const row = rows.find((r) => r.id === activeId) ?? rows[0];
		row?.click();
	}, [options, activeId]);

	const move = useCallback(
		(delta: number) => {
			const rows = options();
			if (!rows.length) return;
			const i = rows.findIndex((r) => r.id === activeId);
			const next = rows[(i + delta + rows.length) % rows.length];
			if (next) {
				setActive(next.id);
				next.scrollIntoView({ block: "nearest" });
			}
		},
		[options, activeId],
	);

	const first = useCallback(() => {
		const row = options()[0];
		if (row) setActive(row.id);
	}, [options]);

	const last = useCallback(() => {
		const rows = options();
		const row = rows[rows.length - 1];
		if (row) setActive(row.id);
	}, [options]);

	// The first visible row is highlighted, so Enter always has a target.
	useEffect(() => {
		if (activeId) return;
		const row = listEl.current?.querySelector<HTMLElement>("[role='option']");
		if (row) setActive(row.id);
	}, [activeId]);

	// The native <dialog> stays mounted through a close for the exit transition, so a stale
	// search would otherwise survive into the next open; clear it the moment one starts.
	useEffect(() => {
		if (dialogOpen) {
			setQueryState("");
			setActive("");
		}
	}, [dialogOpen]);

	const ctx = useMemo(
		() => ({
			query,
			listId,
			activeId,
			resultCount,
			setQuery,
			setActive,
			matches,
			select,
			setList,
			setResultCount,
			move,
			first,
			last,
		}),
		[
			query,
			listId,
			activeId,
			resultCount,
			setQuery,
			matches,
			select,
			setList,
			move,
			first,
			last,
		],
	);

	return (
		<CommandCtx.Provider value={ctx}>
			<div
				data-slot="command"
				data-variant={variant}
				className={cn(
					"relative flex min-h-0 flex-col overflow-hidden text-foreground",
					commandFrame({ variant }).body(),
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</CommandCtx.Provider>
	);
}

export function CommandDialog({
	className,
	open,
	label = "Command palette",
	variant = "framed",
	children,
	onOpenChange,
}: {
	className?: string;
	open: boolean;
	label?: string;
	variant?: DialogVariant;
	children?: ReactNode;
	onOpenChange: (open: boolean) => void;
}) {
	const el = useRef<HTMLDialogElement>(null);
	const [header, setHeader] = useState<CommandHeaderContent>(null);

	useEffect(() => {
		const node = el.current;
		if (!node) return;
		if (open && !node.open) node.showModal();
		if (!open && node.open) node.close();
	}, [open]);

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: Escape closes the dialog natively
		<dialog
			ref={el}
			aria-label={label}
			onClose={() => onOpenChange(false)}
			onCancel={(event) => {
				event.preventDefault();
				onOpenChange(false);
			}}
			onClick={(event) => {
				if (event.target === el.current) onOpenChange(false);
			}}
			className={cn(
				DIALOG_SURFACE,
				"mx-auto mt-[14vh] mb-auto",
				"backdrop:bg-background/10 backdrop:backdrop-blur-md backdrop:backdrop-saturate-150",
			)}
		>
			<div
				data-slot="command-dialog"
				data-state={open ? "open" : "closed"}
				data-variant={variant}
				className={cn(
					COMMAND_PANEL,
					commandFrame({ variant }).panel(),
					"flex max-h-[min(30rem,70dvh)] w-[min(36rem,calc(100vw-2rem))] flex-col overflow-hidden",
					className,
				)}
			>
				{/* Inset frame: header sits in the rim, the card below it holds input and results. */}
				{header ? (
					<div
						data-slot="command-header"
						className={cn(commandFrame({ variant }).header(), header.className)}
					>
						<p className="font-medium text-foreground text-sm">{header.children}</p>
						<span className="flex shrink-0 items-center gap-1.5 text-muted-foreground text-xs">
							<kbd className="inline-flex h-4 min-w-4 items-center justify-center rounded border border-border bg-card px-1 font-medium font-sans text-[10px]">
								esc
							</kbd>
							close
						</span>
					</div>
				) : null}
				<CommandDialogCtx.Provider value={open}>
					<CommandVariantCtx.Provider value={variant}>
						<CommandHeaderCtx.Provider value={setHeader}>
							{children}
						</CommandHeaderCtx.Provider>
					</CommandVariantCtx.Provider>
				</CommandDialogCtx.Provider>
			</div>
		</dialog>
	);
}

export function CommandInput({
	className,
	placeholder = "Type a command or search…",
	...props
}: ComponentProps<"input">) {
	const command = useCommand();
	const el = useRef<HTMLInputElement>(null);
	const [spoken, setSpoken] = useState("");

	useEffect(() => {
		el.current?.focus();
	}, []);

	// Debounced so a live region does not narrate every keystroke, only where it settles.
	useEffect(() => {
		const count = command.resultCount;
		const timer = setTimeout(() => {
			setSpoken(
				count === 0
					? "No commands match."
					: `${count} ${count === 1 ? "command" : "commands"} available.`,
			);
		}, 400);
		return () => clearTimeout(timer);
	}, [command.resultCount]);

	function onKeyDown(event: KeyboardEvent) {
		if (event.key === "ArrowDown") {
			event.preventDefault();
			command.move(1);
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			command.move(-1);
		} else if (event.key === "Home") {
			event.preventDefault();
			command.first();
		} else if (event.key === "End") {
			event.preventDefault();
			command.last();
		} else if (event.key === "Enter") {
			event.preventDefault();
			command.select();
		}
	}

	return (
		<div className="flex shrink-0 items-center gap-2 border-border border-b px-3">
			<svg
				viewBox="0 0 16 16"
				fill="none"
				aria-hidden
				className="size-4 shrink-0 text-muted-foreground"
			>
				<circle cx="7.2" cy="7.2" r="4.2" stroke="currentColor" strokeWidth="1.4" />
				<path
					d="m10.4 10.4 3 3"
					stroke="currentColor"
					strokeWidth="1.4"
					strokeLinecap="round"
				/>
			</svg>
			<input
				ref={el}
				type="text"
				role="combobox"
				data-slot="command-input"
				aria-expanded
				aria-controls={command.listId}
				aria-activedescendant={command.activeId || undefined}
				placeholder={placeholder}
				value={command.query}
				onChange={(event) => command.setQuery(event.currentTarget.value)}
				onKeyDown={onKeyDown}
				className={cn(
					"h-12 w-full bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground",
					className,
				)}
				{...props}
			/>
			<span
				className="min-w-[2ch] shrink-0 text-right font-mono text-[11px] text-muted-foreground tabular-nums"
				aria-hidden
			>
				{command.resultCount}
			</span>
			<span role="status" aria-live="polite" className="sr-only">
				{spoken}
			</span>
		</div>
	);
}

export function CommandList({ className, children, ...props }: ComponentProps<"div">) {
	const command = useCommand();
	const el = useRef<HTMLDivElement | null>(null);
	const [box, setBox] = useState<{ x: number; y: number; w: number; h: number } | null>(
		null,
	);

	const setList = useCallback(
		(node: HTMLDivElement | null) => {
			el.current = node;
			command.setList(node);
		},
		[command.setList],
	);

	useEffect(() => {
		const row = command.activeId
			? el.current?.querySelector<HTMLElement>(`#${CSS.escape(command.activeId)}`)
			: null;
		setBox(
			row
				? { x: row.offsetLeft, y: row.offsetTop, w: row.offsetWidth, h: row.offsetHeight }
				: null,
		);
	}, [command.activeId, children]);

	// Query changes hide and show items synchronously, so the DOM is settled by the time
	// this effect's own dependency (query) has flushed.
	useEffect(() => {
		command.setResultCount(el.current?.querySelectorAll("[role='option']").length ?? 0);
	}, [command.query, command.setResultCount, children]);

	return (
		<div
			ref={setList}
			id={command.listId}
			role="listbox"
			data-slot="command-list"
			className={cn(
				"scroll-area relative min-h-0 flex-1 overflow-y-auto overscroll-contain py-1.5",
				className,
			)}
			{...props}
		>
			{box ? (
				<span
					aria-hidden
					className={COMMAND_MARKER}
					style={{
						translate: `${box.x}px ${box.y}px`,
						width: box.w,
						height: box.h,
					}}
				/>
			) : null}
			{children}
		</div>
	);
}

export function CommandEmpty({ className, ...props }: ComponentProps<"p">) {
	// :has() hides this whenever the list still has a visible item, so no counting.
	return (
		<p
			data-slot="command-empty"
			className={cn(
				"px-4 py-10 text-center text-muted-foreground text-sm",
				"[[data-slot=command-list]:has([data-slot=command-item])_&]:hidden",
				className,
			)}
			{...props}
		/>
	);
}

export function CommandGroup({
	className,
	heading,
	children,
	...props
}: ComponentProps<"div"> & { heading?: string }) {
	// A group with no surviving item hides itself, heading included.
	return (
		<div
			data-slot="command-group"
			className={cn("not-has-[[data-slot=command-item]]:hidden", className)}
			{...props}
		>
			{heading ? (
				<p className="px-4 pt-2 pb-1 font-semibold text-[11px] text-muted-foreground uppercase tracking-wider">
					{heading}
				</p>
			) : null}
			<div className="px-1.5">{children}</div>
		</div>
	);
}

export function CommandItem({
	className,
	value,
	keywords = "",
	children,
	...props
}: ComponentProps<"button"> & { value: string; keywords?: string }) {
	const command = useCommand();
	const uid = useId();
	const visible = command.matches(`${value} ${keywords}`);
	const active = command.activeId === uid;

	if (!visible) return null;

	return (
		<button
			type="button"
			role="option"
			id={uid}
			data-slot="command-item"
			data-value={value}
			aria-selected={active}
			onPointerMove={() => command.setActive(uid)}
			className={cn(
				"relative flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
				active ? "text-foreground" : "text-muted-foreground",
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
}

export function CommandShortcut({ className, ...props }: ComponentProps<"kbd">) {
	return (
		<kbd
			data-slot="command-shortcut"
			className={cn(
				"shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground",
				className,
			)}
			{...props}
		/>
	);
}

export function CommandSeparator({ className, ...props }: ComponentProps<"hr">) {
	return (
		<hr
			data-slot="command-separator"
			className={cn("my-1 border-border", className)}
			{...props}
		/>
	);
}

export function CommandHeader({ className, children, ...props }: ComponentProps<"div">) {
	const setHeader = useContext(CommandHeaderCtx);

	// Rendered by CommandDialog in the rim above the card, so nothing is emitted here.
	useEffect(() => {
		if (!setHeader) return;
		setHeader({ children, className });
		return () => setHeader(null);
	}, [setHeader, children, className]);

	if (setHeader) return null;

	return (
		<div
			data-slot="command-header"
			className={cn(
				"flex items-center justify-between gap-3 px-3.5 pt-2.5 pb-1.5",
				className,
			)}
			{...props}
		>
			<p className="font-medium text-foreground text-sm">{children}</p>
		</div>
	);
}
