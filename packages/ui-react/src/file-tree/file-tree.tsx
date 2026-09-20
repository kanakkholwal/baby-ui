"use client";

import type { KeyboardEvent } from "react";
import { useMemo, useRef, useState } from "react";
import { cn } from "../lib/cn";
import { type FileTreeNode, flatten } from "./types";

export interface FileTreeProps {
	tree: FileTreeNode[];
	className?: string;
	indent?: number;
	showGuides?: boolean;
	defaultExpanded?: boolean;
	onSelect?: (id: string) => void;
}

export function FileTree({
	tree,
	className,
	indent = 14,
	showGuides = true,
	defaultExpanded = true,
	onSelect,
}: FileTreeProps) {
	const [open, setOpen] = useState<Record<string, boolean>>({});
	const [selected, setSelected] = useState<string | null>(null);
	const [focused, setFocused] = useState<string | null>(null);
	const root = useRef<HTMLDivElement>(null);

	const rows = useMemo(
		() => flatten(tree, open, defaultExpanded),
		[tree, open, defaultExpanded],
	);
	const activeId = focused ?? rows[0]?.id ?? null;

	function focusRow(id: string) {
		setFocused(id);
		root.current?.querySelector<HTMLElement>(`[data-row="${CSS.escape(id)}"]`)?.focus();
	}

	function move(from: string, delta: number) {
		const next = rows[rows.findIndex((r) => r.id === from) + delta];
		if (next) focusRow(next.id);
	}

	function select(id: string, isFolder: boolean, expanded: boolean) {
		if (isFolder) setOpen((prev) => ({ ...prev, [id]: !expanded }));
		setSelected(id);
		onSelect?.(id);
	}

	function onKeyDown(event: KeyboardEvent, id: string) {
		const row = rows.find((r) => r.id === id);
		if (!row) return;

		switch (event.key) {
			case "ArrowDown":
				event.preventDefault();
				move(id, 1);
				break;
			case "ArrowUp":
				event.preventDefault();
				move(id, -1);
				break;
			case "ArrowRight":
				event.preventDefault();
				if (row.isFolder && !row.expanded) setOpen((p) => ({ ...p, [id]: true }));
				else if (row.isFolder) move(id, 1);
				break;
			case "ArrowLeft": {
				event.preventDefault();
				if (row.isFolder && row.expanded) {
					setOpen((p) => ({ ...p, [id]: false }));
					break;
				}
				const parent = id.split("/").slice(0, -1).join("/");
				if (parent) focusRow(parent);
				break;
			}
			case "Enter":
			case " ":
				event.preventDefault();
				select(row.id, row.isFolder, row.expanded);
				break;
		}
	}

	return (
		<div
			ref={root}
			role="tree"
			aria-label="Files"
			className={cn("select-none font-mono text-[13px]", className)}
		>
			{rows.map((row) => (
				// biome-ignore lint/a11y/useSemanticElements: treeitem has no HTML element
				<div
					key={row.id}
					role="treeitem"
					aria-level={row.depth + 1}
					aria-selected={selected === row.id}
					aria-expanded={row.isFolder ? row.expanded : undefined}
					data-row={row.id}
					tabIndex={activeId === row.id ? 0 : -1}
					onKeyDown={(e) => onKeyDown(e, row.id)}
					onClick={() => select(row.id, row.isFolder, row.expanded)}
					onFocus={() => setFocused(row.id)}
					style={{ paddingLeft: row.depth * indent + 8 }}
					className={cn(
						"tree-row flex cursor-pointer items-center gap-1.5 rounded-md py-1 pr-2 outline-none transition-colors",
						"hover:bg-foreground/[0.06] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
						selected === row.id
							? "bg-foreground/[0.06] text-foreground"
							: "text-muted-foreground",
						showGuides && row.depth > 0 && "border-border/60 border-l",
					)}
				>
					{row.isFolder ? (
						<svg
							viewBox="0 0 16 16"
							fill="none"
							aria-hidden
							className="size-3.5 shrink-0 transition-transform duration-200 ease-[var(--ease-out)] motion-reduce:transition-none"
							style={{ transform: row.expanded ? "rotate(90deg)" : undefined }}
						>
							<path
								d="m6 4 4 4-4 4"
								stroke="currentColor"
								strokeWidth="1.4"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					) : (
						<span className="size-3.5 shrink-0" />
					)}
					<span className="truncate">{row.node.name}</span>
				</div>
			))}
		</div>
	);
}
