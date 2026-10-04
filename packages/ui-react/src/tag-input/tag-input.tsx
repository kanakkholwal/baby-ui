"use client";

import type { KeyboardEvent } from "react";
import { useState } from "react";
import { Badge } from "../badge/badge";
import { cn } from "../lib/cn";
import { type TagInputSize, tagInput } from "./variants";

export type { TagInputSize };

export interface TagInputProps {
	tags: string[];
	placeholder?: string;
	max?: number;
	disabled?: boolean;
	/** Marks the field invalid from outside, e.g. a form error. */
	invalid?: boolean;
	size?: TagInputSize;
	label?: string;
	className?: string;
	onTagsChange: (tags: string[]) => void;
}

export function TagInput({
	tags,
	placeholder = "Add a tag…",
	max,
	disabled = false,
	invalid = false,
	size = "md",
	label,
	className,
	onTagsChange,
}: TagInputProps) {
	const s = tagInput({ size });
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
			data-slot="tag-input"
			data-disabled={disabled || undefined}
			aria-invalid={invalid || undefined}
			className={cn(s.root(), className)}
		>
			{tags.map((tag) => (
				<Badge
					key={tag}
					variant="secondary"
					size={size === "sm" ? "sm" : "md"}
					className={s.chip()}
				>
					<span className={s.chipLabel()}>{tag}</span>
					<button
						type="button"
						aria-label={`Remove ${tag}`}
						disabled={disabled}
						onClick={() => onTagsChange(tags.filter((t) => t !== tag))}
						className={s.chipRemove()}
					>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2.2"
							strokeLinecap="round"
							aria-hidden
						>
							<path d="M18 6 6 18M6 6l12 12" />
						</svg>
					</button>
				</Badge>
			))}

			<input
				type="text"
				aria-label={label}
				aria-invalid={invalid || undefined}
				placeholder={full ? "" : placeholder}
				disabled={disabled}
				value={draft}
				onChange={(e) => setDraft(e.currentTarget.value)}
				onKeyDown={onKeyDown}
				onBlur={add}
				className={s.input()}
			/>

			<span role="status" className="sr-only">
				{tags.length} tags
			</span>
		</div>
	);
}
