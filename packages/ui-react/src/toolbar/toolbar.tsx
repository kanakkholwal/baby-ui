"use client";

import type { KeyboardEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";

export interface ToolbarProps {
	children: ReactNode;
	orientation?: "horizontal" | "vertical";
	label?: string;
	className?: string;
}

export function Toolbar({
	children,
	orientation = "horizontal",
	label = "Toolbar",
	className,
}: ToolbarProps) {
	const root = useRef<HTMLDivElement>(null);
	const [index, setIndex] = useState(0);

	function controls() {
		return [
			...(root.current?.querySelectorAll<HTMLElement>("[data-toolbar-item]") ?? []),
		];
	}

	// role=toolbar promises roving focus, so the whole bar is one tab stop.
	function onKeyDown(event: KeyboardEvent) {
		const items = controls();
		if (items.length === 0) return;
		const forward = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
		const back = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";

		let next: number | null = null;
		if (event.key === forward) next = (index + 1) % items.length;
		else if (event.key === back) next = (index - 1 + items.length) % items.length;
		else if (event.key === "Home") next = 0;
		else if (event.key === "End") next = items.length - 1;
		if (next === null) return;

		event.preventDefault();
		setIndex(next);
		items[next]?.focus();
	}

	useEffect(() => {
		for (const [i, el] of controls().entries()) {
			el.tabIndex = i === index ? 0 : -1;
		}
	});

	return (
		<div
			ref={root}
			role="toolbar"
			tabIndex={-1}
			aria-label={label}
			aria-orientation={orientation}
			onKeyDown={onKeyDown}
			className={cn(
				"inline-flex items-center gap-0.5 rounded-xl border border-border bg-card p-1",
				orientation === "vertical" && "flex-col",
				className,
			)}
		>
			{children}
		</div>
	);
}
