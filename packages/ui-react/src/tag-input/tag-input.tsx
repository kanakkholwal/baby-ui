"use client";

import type { KeyboardEvent } from "react";
import { useState } from "react";
import { cn } from "../lib/cn";

export interface TagInputProps {
	tags: string[];
	placeholder?: string;
	max?: number;
	disabled?: boolean;
	label?: string;
	className?: string;
	onTagsChange: (tags: string[]) => void;
}

export function TagInput({
	tags,
	placeholder = "Add a tag…",
	max,
	disabled = false,
	label,
	className,
	onTagsChange,
}: TagInputProps) {
	const [draft, setDraft] = useState("");
	const full = max !== undefined && tags.length >= max;

	function add() {
		const value = draft.trim();
		if (!value || full || tags.includes(value)) {
			setDraft("");
			return;
		}
		onTagsChange([...tags, value]);
		setDraft("");
	}

	function onKeyDown(event: KeyboardEvent) {
		if (event.key === "Enter" || event.key === ",") {
			event.preventDefault();
			add();
			return;
		}
		// Backspace on an empty field removes the last tag, which is the expected shortcut.
		if (event.key === "Backspace" && draft === "" && tags.length > 0) {
			onTagsChange(tags.slice(0, -1));
		}
	}

	return (
		<div
			className={cn(
				"flex w-full flex-wrap items-center gap-1.5 rounded-lg border border-input bg-background p-1.5",
				"focus-within:border-ring focus-within:ring-2 focus-within:ring-ring",
				disabled && "pointer-events-none opacity-50",
				className,
			)}
		>
			{tags.map((tag) => (
				<span
					key={tag}
					className="inline-flex h-6 items-center gap-1 rounded-md bg-card px-2 text-foreground text-xs"
				>
					{tag}
					<button
						type="button"
						aria-label={`Remove ${tag}`}
						onClick={() => onTagsChange(tags.filter((t) => t !== tag))}
						className="text-muted-foreground transition-colors hover:text-foreground"
					>
						<svg viewBox="0 0 12 12" fill="none" aria-hidden className="size-3">
							<path
								d="m3 3 6 6M9 3l-6 6"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
						</svg>
					</button>
				</span>
			))}

			<input
				type="text"
				aria-label={label}
				placeholder={full ? "" : placeholder}
				disabled={disabled}
				value={draft}
				onChange={(e) => setDraft(e.currentTarget.value)}
				onKeyDown={onKeyDown}
				onBlur={add}
				className="h-6 min-w-24 flex-1 bg-transparent px-1 text-foreground text-sm outline-none placeholder:text-muted-foreground"
			/>

			<span role="status" className="sr-only">
				{tags.length} tags
			</span>
		</div>
	);
}
