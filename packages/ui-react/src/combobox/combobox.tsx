"use client";

import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ANCHORED, anchor, dismissable, rove } from "../lib/anchor";
import { cn } from "../lib/cn";

export type ComboOption = { value: string; label: string };

export interface ComboboxProps {
	options: ComboOption[];
	value?: string;
	placeholder?: string;
	emptyLabel?: string;
	label?: string;
	className?: string;
	onValueChange?: (value: string) => void;
}

export function Combobox({
	options,
	value = "",
	placeholder = "Search…",
	emptyLabel = "No matches",
	label,
	className,
	onValueChange,
}: ComboboxProps) {
	const id = useId();
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [index, setIndex] = useState(0);
	// Kept mounted after the first open so the list can animate out as well as in.
	const [mounted, setMounted] = useState(false);
	const input = useRef<HTMLInputElement>(null);
	const floating = useRef<HTMLDivElement>(null);

	const selected = options.find((o) => o.value === value);
	const matches = options.filter((o) =>
		o.label.toLowerCase().includes(query.trim().toLowerCase()),
	);

	// Closed, the field reads as the current selection; open, it is the search box.
	const display = open ? query : (selected?.label ?? "");

	const close = useCallback(() => {
		setOpen(false);
		setQuery("");
	}, []);

	useEffect(() => {
		if (!open || !input.current || !floating.current) return;
		setMounted(true);
		const stopAnchor = anchor(input.current, floating.current, {
			gap: 6,
			matchWidth: true,
		});
		const stopDismiss = dismissable([input.current, floating.current], close);
		return () => {
			stopAnchor();
			stopDismiss();
		};
	}, [open, close]);

	function show() {
		if (open) return;
		setQuery("");
		setIndex(
			Math.max(
				0,
				options.findIndex((o) => o.value === value),
			),
		);
		setOpen(true);
	}

	function commit(option: ComboOption) {
		onValueChange?.(option.value);
		close();
		input.current?.focus();
	}

	function onKeyDown(event: KeyboardEvent) {
		if (event.key === "Escape") {
			if (open) {
				event.preventDefault();
				close();
			}
			return;
		}
		if (event.key === "Tab") {
			close();
			return;
		}
		if (!open) show();
		if (event.key === "Enter") {
			event.preventDefault();
			const match = matches[index];
			if (match) commit(match);
			return;
		}
		if (matches.length === 0) return;
		const next = rove(matches as unknown as HTMLElement[], index, event.key);
		if (next === null) return;
		event.preventDefault();
		setIndex(next);
	}

	return (
		<>
			<div className={cn("relative w-64", className)}>
				<input
					ref={input}
					type="text"
					role="combobox"
					aria-expanded={open}
					aria-controls={open ? id : undefined}
					aria-autocomplete="list"
					aria-activedescendant={open ? `${id}-${index}` : undefined}
					aria-label={label}
					value={display}
					placeholder={placeholder}
					onPointerDown={show}
					onChange={(e) => {
						show();
						setQuery(e.currentTarget.value);
						setIndex(0);
					}}
					onKeyDown={onKeyDown}
					className="h-9 w-full rounded-lg border border-input bg-background px-3 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
				/>
			</div>

			{mounted ? (
				<div
					ref={floating}
					id={id}
					role="listbox"
					data-state={open ? "open" : "closed"}
					inert={!open}
					style={{ maxHeight: "min(14rem, var(--anchor-available-height, 14rem))" }}
					className={cn(
						ANCHORED,
						"scroll-area overflow-y-auto rounded-xl border border-border bg-popover p-1 shadow-2xl",
					)}
				>
					{matches.length === 0 ? (
						<p className="px-2.5 py-2 text-muted-foreground text-sm">{emptyLabel}</p>
					) : (
						matches.map((option, i) => (
							<button
								key={option.value}
								type="button"
								role="option"
								id={`${id}-${i}`}
								aria-selected={i === index}
								onPointerMove={() => setIndex(i)}
								onClick={() => commit(option)}
								className={cn(
									"flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-left text-foreground text-sm transition-colors",
									i === index && "bg-foreground/[0.06]",
								)}
							>
								{option.label}
								{option.value === value ? (
									<svg
										viewBox="0 0 14 14"
										fill="none"
										aria-hidden
										className="size-3.5 shrink-0"
									>
										<path
											d="M3 7.4 5.6 10 11 4.2"
											stroke="currentColor"
											strokeWidth="1.6"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								) : null}
							</button>
						))
					)}
				</div>
			) : null}
		</>
	);
}
