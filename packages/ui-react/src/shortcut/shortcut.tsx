"use client";

import { useEffect, useRef } from "react";
import { cn } from "../lib/cn";
import {
	matchesShortcut,
	parseShortcut,
	shortcutBlocked,
	shortcutOwner,
} from "../lib/shortcut-keys";
import { type ShortcutSize, type ShortcutVariant, shortcutCap } from "./variants";

export type { ShortcutSize, ShortcutVariant };

export interface ShortcutProps {
	/** Tokens joined by `+`, e.g. `"cmd+k"` or `"shift+enter"`. */
	shortcut: string;
	size?: ShortcutSize;
	variant?: ShortcutVariant;
	/** One cap reading "⌘K" instead of a cap per key. */
	joined?: boolean;
	/** Runs on the key combo. Without it, the enclosing button or link is clicked. */
	onTrigger?: (event: KeyboardEvent) => void;
	className?: string;
}

export function Shortcut({
	shortcut,
	size = "md",
	variant = "default",
	joined = false,
	onTrigger,
	className,
}: ShortcutProps) {
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
			{(joined
				? [(parsed?.caps ?? [shortcut]).join("")]
				: (parsed?.caps ?? [shortcut])
			).map((cap, i) => (
				<kbd key={`${cap}-${i}`} aria-hidden className={shortcutCap({ variant, size })}>
					{cap}
				</kbd>
			))}
		</span>
	);
}
