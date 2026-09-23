"use client";

import {
	type CSSProperties,
	createElement,
	type ElementType,
	useEffect,
	useRef,
	useState,
} from "react";
import { cn } from "../lib/cn";
import { type CycleTextSize, cycleText } from "./variants";

export type { CycleTextSize };

export interface CycleTextProps {
	/** The words to cycle through. */
	words: string[];
	/** Controlled: which word is showing. Omit to let the component own it. */
	index?: number;
	defaultIndex?: number;
	onIndexChange?: (index: number) => void;
	/** Auto-advance period. Only runs while uncontrolled. */
	intervalMs?: number;
	/** How long each word's enter animation takes, in ms. */
	durationMs?: number;
	size?: CycleTextSize;
	as?: ElementType;
	className?: string;
}

export function CycleText({
	words,
	index: indexProp,
	defaultIndex = 0,
	onIndexChange,
	intervalMs = 1300,
	durationMs = 260,
	size = "md",
	as = "span",
	className,
}: CycleTextProps) {
	const [internalIndex, setInternalIndex] = useState(defaultIndex);
	const index = indexProp ?? internalIndex;
	const indexRef = useRef(index);
	indexRef.current = index;

	function setIndex(next: number) {
		if (indexProp === undefined) setInternalIndex(next);
		onIndexChange?.(next);
	}

	useEffect(() => {
		if (indexProp !== undefined || words.length <= 1) return;
		const id = setInterval(() => {
			setIndex((indexRef.current + 1) % words.length);
		}, intervalMs);
		return () => clearInterval(id);
	}, [indexProp, words.length, intervalMs]);

	const safeIndex = ((index % words.length) + words.length) % words.length;
	const word = words[safeIndex] ?? "";

	return createElement(
		as,
		{ "data-slot": "cycle-text", className: cn(cycleText({ size }), className) },
		<span
			key={safeIndex}
			className="text-transition-unit inline-block"
			style={
				{
					"--tt-duration": `${durationMs}ms`,
					"--tt-from-opacity": 0,
					"--tt-from-y": "10px",
				} as CSSProperties
			}
		>
			{word}
		</span>,
	);
}
