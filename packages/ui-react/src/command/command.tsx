"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { Command as CommandPrimitive, useCommandState } from "cmdk";
import type { ComponentProps, ReactNode } from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { DIALOG_BACKDROP } from "../dialog/dialog";
import { cn } from "../lib/cn";
import { commandFrame, type DialogVariant } from "./variants";

/** Same top-anchored drop as before, now on Base UI's own presence attributes
 * (data-open/data-closed) instead of the old native-<dialog> data-state values. */
const COMMAND_PANEL = [
	"transition-[opacity,scale,translate] duration-[var(--duration-overlay)] ease-[var(--ease-out)]",
	"data-[closed]:opacity-0 data-[closed]:scale-[var(--enter-scale)]",
	"data-[closed]:-translate-y-[var(--enter-lift)] data-[closed]:duration-[var(--duration-exit)]",
	"starting:data-[open]:opacity-0 starting:data-[open]:scale-[var(--enter-scale)]",
	"starting:data-[open]:-translate-y-[var(--enter-lift)]",
	"motion-reduce:transition-none",
].join(" ");

/** One marker glides between rows, so an arrow-key run reads as a single object moving. */
const COMMAND_MARKER = [
	"pointer-events-none absolute top-0 left-0 rounded-md bg-foreground/[0.06]",
	"transition-[translate,width,height] duration-[var(--duration-press)] ease-[var(--ease-out)]",
	"motion-reduce:transition-none",
].join(" ");

type CommandHeaderContent = { children?: ReactNode; className?: string } | null;

/** CommandHeader hoists here so CommandDialog can render it in the rim above the card. */
const CommandHeaderCtx = createContext<((header: CommandHeaderContent) => void) | null>(
	null,
);

/** `framed` outside any CommandDialog too, since a bare Command is still its own surface. */
const CommandVariantCtx = createContext<DialogVariant>("default");

export function Command({
	className,
	...props
}: ComponentProps<typeof CommandPrimitive>) {
	const variant = useContext(CommandVariantCtx);

	return (
		<CommandPrimitive
			data-slot="command"
			data-variant={variant}
			className={cn(
				"relative flex min-h-0 flex-col overflow-hidden text-foreground",
				commandFrame({ variant }).body(),
				className,
			)}
			{...props}
		/>
	);
}

export function CommandDialog({
	className,
	open,
	label = "Command palette",
	description = "Search for a command to run…",
	variant = "default",
	children,
	onOpenChange,
}: {
	className?: string;
	open: boolean;
	label?: string;
	description?: string;
	variant?: DialogVariant;
	children?: ReactNode;
	onOpenChange: (open: boolean) => void;
}) {
	const [header, setHeader] = useState<CommandHeaderContent>(null);

	return (
		<DialogPrimitive.Root open={open} onOpenChange={(next) => onOpenChange(next)}>
			<DialogPrimitive.Portal>
				<DialogPrimitive.Backdrop
					data-slot="command-dialog-backdrop"
					className={cn(DIALOG_BACKDROP, "backdrop-blur-md backdrop-saturate-150")}
				/>
				<DialogPrimitive.Popup
					data-slot="command-dialog"
					data-variant={variant}
					className={cn(
						"fixed top-[14vh] left-1/2 z-50 -translate-x-1/2 outline-none",
						COMMAND_PANEL,
						commandFrame({ variant }).panel(),
						"flex max-h-[min(30rem,70dvh)] w-[min(36rem,calc(100vw-2rem))] flex-col overflow-hidden",
						className,
					)}
				>
					{/* Matches shadcn's own CommandDialog: a real Title/Description carries the
					accessible name/description, sr-only since the search input is the visible label. */}
					<DialogPrimitive.Title className="sr-only">{label}</DialogPrimitive.Title>
					<DialogPrimitive.Description className="sr-only">
						{description}
					</DialogPrimitive.Description>
					{variant === "framed" && header ? (
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
					<CommandVariantCtx.Provider value={variant}>
						<CommandHeaderCtx.Provider value={setHeader}>
							{children}
						</CommandHeaderCtx.Provider>
					</CommandVariantCtx.Provider>
				</DialogPrimitive.Popup>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	);
}

export function CommandInput({
	className,
	placeholder = "Type a command or search…",
	...props
}: ComponentProps<typeof CommandPrimitive.Input>) {
	const resultCount = useCommandState((state) => state.filtered.count);
	const [spoken, setSpoken] = useState("");

	// Debounced so a live region does not narrate every keystroke, only where it settles.
	useEffect(() => {
		const timer = setTimeout(() => {
			setSpoken(
				resultCount === 0
					? "No commands match."
					: `${resultCount} ${resultCount === 1 ? "command" : "commands"} available.`,
			);
		}, 400);
		return () => clearTimeout(timer);
	}, [resultCount]);

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
			<CommandPrimitive.Input
				autoFocus
				data-slot="command-input"
				placeholder={placeholder}
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
				{resultCount}
			</span>
			<span role="status" aria-live="polite" className="sr-only">
				{spoken}
			</span>
		</div>
	);
}

export function CommandList({
	className,
	children,
	...props
}: ComponentProps<typeof CommandPrimitive.List>) {
	const activeValue = useCommandState((state) => state.value);
	const el = useRef<HTMLDivElement | null>(null);
	const [box, setBox] = useState<{ x: number; y: number; w: number; h: number } | null>(
		null,
	);

	useEffect(() => {
		const row = el.current?.querySelector<HTMLElement>('[data-selected="true"]');
		setBox(
			row
				? { x: row.offsetLeft, y: row.offsetTop, w: row.offsetWidth, h: row.offsetHeight }
				: null,
		);
	}, [activeValue, children]);

	return (
		<CommandPrimitive.List
			ref={el}
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
		</CommandPrimitive.List>
	);
}

export function CommandEmpty({
	className,
	...props
}: ComponentProps<typeof CommandPrimitive.Empty>) {
	return (
		<CommandPrimitive.Empty
			data-slot="command-empty"
			className={cn("px-4 py-10 text-center text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

export function CommandGroup({
	className,
	...props
}: ComponentProps<typeof CommandPrimitive.Group>) {
	return (
		<CommandPrimitive.Group
			data-slot="command-group"
			className={cn(
				"[&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:pb-1",
				"[&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider",
				"[&_[cmdk-group-items]]:px-1.5",
				className,
			)}
			{...props}
		/>
	);
}

export function CommandItem({
	className,
	value,
	keywords = "",
	onSelect,
	onClick,
	children,
	...props
}: Omit<
	ComponentProps<typeof CommandPrimitive.Item>,
	"onSelect" | "keywords" | "value"
> & {
	value: string;
	keywords?: string;
	/** Fires on click or Enter, like cmdk. `onClick` is an alias. */
	onSelect?: () => void;
	onClick?: () => void;
}) {
	return (
		<CommandPrimitive.Item
			value={value}
			keywords={keywords ? keywords.split(/\s+/) : undefined}
			onSelect={onSelect ?? onClick}
			data-slot="command-item"
			className={cn(
				"relative flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
				"text-muted-foreground data-[selected=true]:text-foreground",
				className,
			)}
			{...props}
		>
			{children}
		</CommandPrimitive.Item>
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

export function CommandSeparator({
	className,
	...props
}: ComponentProps<typeof CommandPrimitive.Separator>) {
	return (
		<CommandPrimitive.Separator
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
