"use client";

import type { KeyboardEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { anchor, dismissable, rove } from "../lib/anchor";
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
	const input = useRef<HTMLInputElement>(null);
	const floating = useRef<HTMLDivElement>(null);

	const matches = options.filter((o) =>
		o.label.toLowerCase().includes(query.trim().toLowerCase()),
	);
	const selected = options.find((o) => o.value === value);

	useEffect(() => {
		if (!open || !input.current || !floating.current) return;
		const stopAnchor = anchor(input.current, floating.current, {
			gap: 6,
			matchWidth: true,
		});
		const stopDismiss = dismissable([input.current, floating.current], () =>
			setOpen(false),
		);
		return () => {
			stopAnchor();
			stopDismiss();
		};
	}, [open]);

	useEffect(() => setIndex(0), []);

	function commit(option: ComboOption) {
		onValueChange?.(option.value);
		setQuery("");
		setOpen(false);
		input.current?.focus();
	}

	function onKeyDown(event: KeyboardEvent) {
		if (!open && event.key !== "Escape") setOpen(true);
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
					value={query}
					placeholder={selected ? selected.label : placeholder}
					onChange={(e) => {
						setQuery(e.currentTarget.value);
						setIndex(0);
					}}
					onFocus={() => setOpen(true)}
					onKeyDown={onKeyDown}
					className="h-9 w-full rounded-lg border border-input bg-background px-3 text-foreground text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
				/>
			</div>

			{open ? (
				// biome-ignore lint/a11y/useSemanticElements: a filtered listbox cannot be <select>
				<div
					ref={floating}
					id={id}
					role="listbox"
					style={{ maxHeight: "min(14rem, var(--anchor-available-height, 14rem))" }}
					className="anchored z-50 overflow-y-auto rounded-xl border border-border bg-popover p-1 shadow-2xl"
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
								onClick={() => commit(option)}
								className={cn(
									"flex w-full items-center rounded-md px-2.5 py-1.5 text-left text-foreground text-sm transition-colors",
									i === index && "bg-foreground/[0.06]",
								)}
							>
								{option.label}
							</button>
						))
					)}
				</div>
			) : null}
		</>
	);
}
