"use client";

import { useEffect, useRef } from "react";
import { cn } from "../lib/cn";
import {
	matchesShortcut,
	parseShortcut,
	shortcutBlocked,
	shortcutOwner,
} from "../lib/shortcut";

const SIZE = {
	sm: "h-4 min-w-4 px-1 text-[10px]",
	md: "h-5 min-w-5 px-1.5 text-[11px]",
	lg: "h-6 min-w-6 px-2 text-xs",
	xl: "h-7 min-w-7 px-2.5 text-sm",
};

export interface ShortcutProps {
	/** Tokens joined by `+`, e.g. `"cmd+k"` or `"shift+enter"`. */
	shortcut: string;
	size?: "sm" | "md" | "lg" | "xl";
	/** Runs on the key combo. Without it, the enclosing button or link is clicked. */
	onTrigger?: (event: KeyboardEvent) => void;
	className?: string;
}

export function Shortcut({ shortcut, size = "md", onTrigger, className }: ShortcutProps) {
	const el = useRef<HTMLSpanElement>(null);
	const parsed = parseShortcut(shortcut);

	useEffect(() => {
		const combo = parseShortcut(shortcut);
		if (!combo) return;
		const onKey = (event: KeyboardEvent) => {
			if (event.repeat || !matchesShortcut(event, combo) || shortcutBlocked(event, combo))
				return;
			const owner = onTrigger ? undefined : el.current && shortcutOwner(el.current);
			if (!onTrigger && !owner) return;
			event.preventDefault();
			if (onTrigger) onTrigger(event);
			else owner?.click();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [shortcut, onTrigger]);

	return (
		<span
			ref={el}
			data-slot="shortcut"
			className={cn("inline-flex items-center gap-1", className)}
		>
			<span className="sr-only">{parsed?.spoken ?? shortcut}</span>
			{(parsed?.caps ?? [shortcut]).map((cap, i) => (
				<kbd
					key={`${cap}-${i}`}
					aria-hidden
					className={cn(
						"inline-flex items-center justify-center rounded border border-border bg-card font-medium font-sans text-muted-foreground",
						"[[data-variant=default]_&]:border-transparent [[data-variant=default]_&]:bg-primary-foreground/15 [[data-variant=default]_&]:text-primary-foreground",
						SIZE[size],
					)}
				>
					{cap}
				</kbd>
			))}
		</span>
	);
}
