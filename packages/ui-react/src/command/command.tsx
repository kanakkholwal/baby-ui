"use client";

import type { KeyboardEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "../lib/cn";

export type CommandItem = {
	id: string;
	label: string;
	group?: string;
	shortcut?: string;
};

export interface CommandProps {
	items: CommandItem[];
	open: boolean;
	placeholder?: string;
	emptyLabel?: string;
	className?: string;
	onOpenChange: (open: boolean) => void;
	onSelect?: (id: string) => void;
}

export function Command({
	items,
	open,
	placeholder = "Type a command or search…",
	emptyLabel = "No results",
	className,
	onOpenChange,
	onSelect,
}: CommandProps) {
	const id = useId();
	const [query, setQuery] = useState("");
	const [index, setIndex] = useState(0);
	const input = useRef<HTMLInputElement>(null);
	const dialog = useRef<HTMLDialogElement>(null);

	const matches = items.filter((i) =>
		i.label.toLowerCase().includes(query.trim().toLowerCase()),
	);

	useEffect(() => {
		const el = dialog.current;
		if (!el) return;
		if (open && !el.open) {
			el.showModal();
			setQuery("");
			setIndex(0);
			input.current?.focus();
		}
		if (!open && el.open) el.close();
	}, [open]);

	function run(item: CommandItem) {
		onSelect?.(item.id);
		onOpenChange(false);
	}

	function onKeyDown(event: KeyboardEvent) {
		if (event.key === "ArrowDown") {
			event.preventDefault();
			setIndex((i) => (i + 1) % Math.max(1, matches.length));
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			setIndex((i) => (i - 1 + matches.length) % Math.max(1, matches.length));
		} else if (event.key === "Enter") {
			event.preventDefault();
			const match = matches[index];
			if (match) run(match);
		}
	}

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: Escape closes the dialog natively
		<dialog
			ref={dialog}
			aria-label="Command palette"
			onClose={() => onOpenChange(false)}
			onCancel={(e) => {
				e.preventDefault();
				onOpenChange(false);
			}}
			onClick={(e) => {
				if (e.target === dialog.current) onOpenChange(false);
			}}
			className="command-dialog mx-auto mt-[12vh] mb-auto bg-transparent p-0 text-foreground backdrop:bg-black/50"
		>
			<div
				className={cn(
					"w-[min(34rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl",
					className,
				)}
			>
				<div className="flex items-center gap-2 border-border border-b px-3">
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
						ref={input}
						type="text"
						role="combobox"
						aria-expanded
						aria-controls={id}
						aria-activedescendant={`${id}-${index}`}
						placeholder={placeholder}
						value={query}
						onChange={(e) => {
							setQuery(e.currentTarget.value);
							setIndex(0);
						}}
						onKeyDown={onKeyDown}
						className="h-12 w-full bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground"
					/>
				</div>

				{/* biome-ignore lint/a11y/useSemanticElements: a command list cannot be <select> */}
				<div id={id} role="listbox" className="max-h-80 overflow-y-auto p-1.5">
					{matches.length === 0 ? (
						<p className="px-2.5 py-6 text-center text-muted-foreground text-sm">
							{emptyLabel}
						</p>
					) : (
						matches.map((item, i) => (
							<button
								key={item.id}
								type="button"
								role="option"
								id={`${id}-${i}`}
								aria-selected={i === index}
								onClick={() => run(item)}
								className={cn(
									"flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
									i === index
										? "bg-foreground/[0.06] text-foreground"
										: "text-muted-foreground",
								)}
							>
								<span className="truncate">{item.label}</span>
								{item.shortcut ? (
									<kbd className="shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
										{item.shortcut}
									</kbd>
								) : null}
							</button>
						))
					)}
				</div>
			</div>
		</dialog>
	);
}
