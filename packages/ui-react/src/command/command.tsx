"use client";

import type { KeyboardEvent } from "react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { cn } from "../lib/cn";

export type CommandItem = {
	id: string;
	label: string;
	description?: string;
	group?: string;
	shortcut?: string;
};

export interface CommandProps {
	items: CommandItem[];
	open: boolean;
	placeholder?: string;
	emptyLabel?: string;
	footer?: string;
	className?: string;
	onOpenChange: (open: boolean) => void;
	onSelect?: (id: string) => void;
}

export function Command({
	items,
	open,
	placeholder = "Type a command or search…",
	emptyLabel = "No results",
	footer,
	className,
	onOpenChange,
	onSelect,
}: CommandProps) {
	const uid = useId();
	const [query, setQuery] = useState("");
	const [index, setIndex] = useState(0);
	const input = useRef<HTMLInputElement>(null);
	const listEl = useRef<HTMLDivElement>(null);
	const dialog = useRef<HTMLDialogElement>(null);

	const matches = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return items;
		return items.filter(
			(i) => i.label.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q),
		);
	}, [items, query]);

	// Group order follows first appearance, so the list never reshuffles as you type.
	const groups = useMemo(() => {
		const out: { name: string; items: { item: CommandItem; i: number }[] }[] = [];
		matches.forEach((item, i) => {
			const name = item.group ?? "";
			let bucket = out.find((g) => g.name === name);
			if (!bucket) {
				bucket = { name, items: [] };
				out.push(bucket);
			}
			bucket.items.push({ item, i });
		});
		return out;
	}, [matches]);

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

	useEffect(() => {
		listEl.current
			?.querySelector(`#${CSS.escape(`${uid}-${index}`)}`)
			?.scrollIntoView({ block: "nearest" });
	}, [index, uid]);

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
		} else if (event.key === "Home") {
			event.preventDefault();
			setIndex(0);
		} else if (event.key === "End") {
			event.preventDefault();
			setIndex(Math.max(0, matches.length - 1));
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
					"flex max-h-[min(30rem,70dvh)] w-[min(34rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl",
					className,
				)}
			>
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
						ref={input}
						type="text"
						role="combobox"
						aria-expanded
						aria-controls={`${uid}-list`}
						aria-activedescendant={`${uid}-${index}`}
						placeholder={placeholder}
						value={query}
						onChange={(e) => setQuery(e.currentTarget.value)}
						onKeyDown={onKeyDown}
						className="h-12 w-full bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground"
					/>
				</div>

				{/* biome-ignore lint/a11y/useSemanticElements: a command list cannot be <select> */}
				<div
					ref={listEl}
					id={`${uid}-list`}
					role="listbox"
					className="scroll-area min-h-0 flex-1 overflow-y-auto overscroll-contain py-1.5"
				>
					{groups.length === 0 ? (
						<p className="px-4 py-10 text-center text-muted-foreground text-sm">
							{emptyLabel}
						</p>
					) : (
						groups.map((group) => (
							<div key={group.name}>
								{group.name ? (
									<p className="px-4 pt-2 pb-1 font-semibold text-[11px] text-muted-foreground uppercase tracking-wider">
										{group.name}
									</p>
								) : null}
								<div className="px-1.5">
									{group.items.map((entry) => (
										<button
											key={entry.item.id}
											type="button"
											role="option"
											id={`${uid}-${entry.i}`}
											aria-selected={entry.i === index}
											onPointerMove={() => setIndex(entry.i)}
											onClick={() => run(entry.item)}
											className={cn(
												"flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors",
												entry.i === index
													? "bg-foreground/[0.06] text-foreground"
													: "text-muted-foreground",
											)}
										>
											<span className="min-w-0">
												<span className="block truncate">{entry.item.label}</span>
												{entry.item.description ? (
													<span className="block truncate text-muted-foreground text-xs">
														{entry.item.description}
													</span>
												) : null}
											</span>
											{entry.item.shortcut ? (
												<kbd className="shrink-0 rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
													{entry.item.shortcut}
												</kbd>
											) : null}
										</button>
									))}
								</div>
							</div>
						))
					)}
				</div>

				{footer ? (
					<p className="shrink-0 border-border border-t px-4 py-2 text-[11px] text-muted-foreground">
						{footer}
					</p>
				) : null}
			</div>
		</dialog>
	);
}
