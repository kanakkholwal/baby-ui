"use client";

import type { KeyboardEvent } from "react";
import { useState } from "react";
import { cn } from "../lib/cn";

export type ReorderItem = { id: string; label: string };

export interface ReorderListProps {
	items: ReorderItem[];
	label?: string;
	className?: string;
	onItemsChange: (items: ReorderItem[]) => void;
}

export function ReorderList({
	items,
	label = "Reorderable list",
	className,
	onItemsChange,
}: ReorderListProps) {
	const [dragging, setDragging] = useState<string | null>(null);

	function move(from: number, to: number) {
		if (to < 0 || to >= items.length) return;
		const next = [...items];
		const [moved] = next.splice(from, 1);
		if (moved) next.splice(to, 0, moved);
		onItemsChange(next);
	}

	// Keyboard reordering is the accessible path; drag is the accelerator, not the API.
	function onKeyDown(event: KeyboardEvent, index: number) {
		if (!event.altKey) return;
		if (event.key === "ArrowUp") {
			event.preventDefault();
			move(index, index - 1);
		} else if (event.key === "ArrowDown") {
			event.preventDefault();
			move(index, index + 1);
		}
	}

	return (
		<ul aria-label={label} className={cn("flex flex-col gap-1.5", className)}>
			{items.map((item, i) => (
				<li
					key={item.id}
					draggable
					onDragStart={() => setDragging(item.id)}
					onDragEnd={() => setDragging(null)}
					onDragOver={(e) => e.preventDefault()}
					onDrop={() => {
						const from = items.findIndex((x) => x.id === dragging);
						if (from >= 0) move(from, i);
						setDragging(null);
					}}
					className={cn(
						"flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-foreground text-sm transition-opacity",
						dragging === item.id && "opacity-50",
					)}
				>
					<button
						type="button"
						aria-label={`Reorder ${item.label}. Hold Alt and press the arrow keys.`}
						onKeyDown={(e) => onKeyDown(e, i)}
						className="cursor-grab text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
					>
						<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
							<path
								d="M6 4h.01M10 4h.01M6 8h.01M10 8h.01M6 12h.01M10 12h.01"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
					</button>
					<span className="flex-1">{item.label}</span>
					<span className="font-mono text-[11px] text-muted-foreground tabular-nums">
						{i + 1}
					</span>
				</li>
			))}
		</ul>
	);
}
