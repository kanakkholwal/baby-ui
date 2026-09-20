"use client";

import type { KeyboardEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { type AnchorPlacement, anchor, dismissable, rove } from "../lib/anchor";
import { cn } from "../lib/cn";

export type SelectOption = { value: string; label: string; disabled?: boolean };

export interface SelectProps {
	options: SelectOption[];
	value?: string;
	placeholder?: string;
	disabled?: boolean;
	placement?: AnchorPlacement;
	label?: string;
	className?: string;
	onValueChange?: (value: string) => void;
}

export function Select({
	options,
	value = "",
	placeholder = "Select an option",
	disabled = false,
	placement = "bottom-start",
	label,
	className,
	onValueChange,
}: SelectProps) {
	const id = useId();
	const [open, setOpen] = useState(false);
	const [index, setIndex] = useState(0);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const floating = useRef<HTMLDivElement>(null);

	const selected = options.find((o) => o.value === value);

	function close() {
		setOpen(false);
		triggerRef.current?.focus();
	}

	useEffect(() => {
		if (!open || !triggerRef.current || !floating.current) return;
		setIndex(
			Math.max(
				0,
				options.findIndex((o) => o.value === value),
			),
		);
		const stopAnchor = anchor(triggerRef.current, floating.current, {
			placement,
			gap: 6,
			matchWidth: true,
		});
		const stopDismiss = dismissable([triggerRef.current, floating.current], () => {
			setOpen(false);
			triggerRef.current?.focus();
		});
		return () => {
			stopAnchor();
			stopDismiss();
		};
	}, [open, placement, options, value]);

	useEffect(() => {
		if (!open || !floating.current) return;
		floating.current.querySelectorAll<HTMLElement>("[role='option']")[index]?.focus();
	}, [open, index]);

	function onKeyDown(event: KeyboardEvent) {
		if (
			!open &&
			(event.key === "ArrowDown" || event.key === "Enter" || event.key === " ")
		) {
			event.preventDefault();
			setOpen(true);
			return;
		}
		const next = rove(options as unknown as HTMLElement[], index, event.key);
		if (next === null) return;
		event.preventDefault();
		setIndex(next);
	}

	return (
		<>
			<button
				ref={triggerRef}
				type="button"
				role="combobox"
				aria-expanded={open}
				aria-controls={open ? id : undefined}
				aria-haspopup="listbox"
				aria-label={label}
				disabled={disabled}
				onClick={() => setOpen((v) => !v)}
				onKeyDown={onKeyDown}
				className={cn(
					"inline-flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors",
					"focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40",
					"disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
			>
				<span className={selected ? "text-foreground" : "text-muted-foreground"}>
					{selected?.label ?? placeholder}
				</span>
				<svg
					viewBox="0 0 16 16"
					fill="none"
					aria-hidden
					style={{ transform: open ? "rotate(180deg)" : undefined }}
					className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ease-[var(--ease-out)]"
				>
					<path
						d="m4 6 4 4 4-4"
						stroke="currentColor"
						strokeWidth="1.4"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>

			{open ? (
				// biome-ignore lint/a11y/useSemanticElements: a styled listbox cannot be <select>
				<div
					ref={floating}
					id={id}
					role="listbox"
					tabIndex={-1}
					onKeyDown={onKeyDown}
					style={{ maxHeight: "min(16rem, var(--anchor-available-height, 16rem))" }}
					className="anchored z-50 overflow-y-auto rounded-xl border border-border bg-popover p-1 shadow-2xl"
				>
					{options.map((option) => (
						<button
							key={option.value}
							type="button"
							role="option"
							aria-selected={value === option.value}
							disabled={option.disabled}
							onClick={() => {
								onValueChange?.(option.value);
								close();
							}}
							className="flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-left text-foreground text-sm outline-none transition-colors hover:bg-foreground/[0.06] focus-visible:bg-foreground/[0.06] disabled:pointer-events-none disabled:opacity-50"
						>
							{option.label}
							{value === option.value ? (
								<svg viewBox="0 0 14 14" fill="none" aria-hidden className="size-3.5">
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
					))}
				</div>
			) : null}
		</>
	);
}
