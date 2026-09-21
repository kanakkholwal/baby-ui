"use client";

import type { KeyboardEvent, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { cn } from "../lib/cn";

export interface ComposerProps {
	value: string;
	placeholder?: string;
	disabled?: boolean;
	busy?: boolean;
	maxRows?: number;
	toolbar?: ReactNode;
	className?: string;
	onValueChange: (value: string) => void;
	onSubmit?: (value: string) => void;
}

export function Composer({
	value,
	placeholder = "Send a message…",
	disabled = false,
	busy = false,
	maxRows = 8,
	toolbar,
	className,
	onValueChange,
	onSubmit,
}: ComposerProps) {
	const field = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		const el = field.current;
		if (!el) return;
		const line = Number.parseFloat(getComputedStyle(el).lineHeight) || 20;
		el.style.height = "auto";
		el.style.height = `${Math.min(el.scrollHeight, line * maxRows)}px`;
	}, [maxRows]);

	function submit() {
		const text = value.trim();
		if (!text || busy) return;
		onSubmit?.(text);
		onValueChange("");
	}

	// Enter sends, Shift+Enter breaks the line. The reverse strands anyone writing prose.
	function onKeyDown(event: KeyboardEvent) {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			submit();
		}
	}

	return (
		<div
			className={cn(
				"flex w-full flex-col gap-2 rounded-2xl border border-input bg-background p-2",
				"focus-within:border-ring focus-within:ring-2 focus-within:ring-ring",
				disabled && "pointer-events-none opacity-50",
				className,
			)}
		>
			<textarea
				ref={field}
				rows={1}
				value={value}
				placeholder={placeholder}
				disabled={disabled}
				onChange={(e) => onValueChange(e.currentTarget.value)}
				onKeyDown={onKeyDown}
				className="max-h-48 w-full resize-none bg-transparent px-2 py-1.5 text-foreground text-sm outline-none placeholder:text-muted-foreground"
			/>

			<div className="flex items-center justify-between gap-2">
				<div className="flex items-center gap-1">{toolbar}</div>
				<button
					type="button"
					onClick={submit}
					disabled={busy || value.trim() === ""}
					aria-label={busy ? "Sending" : "Send message"}
					className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition-[transform,scale,translate] duration-[var(--duration-press)] ease-[var(--ease-out)] active:scale-[var(--press-scale)] disabled:pointer-events-none disabled:opacity-40"
				>
					{busy ? (
						<svg viewBox="0 0 16 16" fill="none" aria-hidden className="spinner size-3.5">
							<circle
								cx="8"
								cy="8"
								r="6.2"
								stroke="currentColor"
								strokeWidth="1.8"
								opacity="0.3"
							/>
							<path
								d="M14.2 8A6.2 6.2 0 0 0 8 1.8"
								stroke="currentColor"
								strokeWidth="1.8"
								strokeLinecap="round"
							/>
						</svg>
					) : (
						<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-3.5">
							<path
								d="M8 13V3.5M4 7l4-4 4 4"
								stroke="currentColor"
								strokeWidth="1.6"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					)}
				</button>
			</div>
		</div>
	);
}
