"use client";

import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../lib/cn";
import { type TypingTextSize, typingText } from "./variants";

export type { TypingTextSize };

export interface TypingTextProps {
	text: string;
	/** Delay between typing each character (or word, in `smooth` mode), in ms. */
	delay?: number;
	/** Erase after typing, then type again. */
	repeat?: boolean;
	/** Time to hold before the next cycle. Only applies when `repeat` is true. */
	waitMs?: number;
	/** Fades whole words in instead of typing character by character. */
	smooth?: boolean;
	/** How long each word's fade-in takes, in ms. Only applies when `smooth` is true. */
	fadeDurationMs?: number;
	/** Grow the container to fit the text as it types, instead of reserving full width up front. */
	grow?: boolean;
	/** Hide the blinking cursor once typing completes. */
	hideCursorOnComplete?: boolean;
	onComplete?: () => void;
	size?: TypingTextSize;
	className?: string;
}

function useBlink(intervalMs: number) {
	const [on, setOn] = useState(true);
	useEffect(() => {
		const id = setInterval(() => setOn((v) => !v), intervalMs);
		return () => clearInterval(id);
	}, [intervalMs]);
	return on;
}

export function TypingText({
	text,
	delay = 32,
	repeat = true,
	waitMs = 1000,
	smooth = false,
	fadeDurationMs = 300,
	grow = false,
	hideCursorOnComplete = false,
	onComplete,
	size = "md",
	className,
}: TypingTextProps) {
	const words = useMemo(() => text.split(/\s+/), [text]);
	const total = smooth ? words.length : text.length;
	const [index, setIndex] = useState(0);
	const [direction, setDirection] = useState<1 | -1>(1);
	const onCompleteRef = useRef(onComplete);
	const completedRef = useRef(false);
	onCompleteRef.current = onComplete;
	const blinkOn = useBlink(500);

	useEffect(() => {
		setIndex(0);
		setDirection(1);
		completedRef.current = false;
	}, [text]);

	const atEnd = index >= total;
	const atStart = index <= 0;
	const paused = (atEnd && direction === 1) || (atStart && direction === -1);

	useEffect(() => {
		if (paused) return;
		const step = Math.max(1, delay);
		const id = setInterval(() => {
			setIndex((current) => {
				const next = current + direction;
				return direction === 1 ? Math.min(next, total) : Math.max(next, 0);
			});
		}, step);
		return () => clearInterval(id);
	}, [paused, direction, delay, total]);

	useEffect(() => {
		if (atEnd && direction === 1) {
			if (!repeat) {
				if (!completedRef.current) {
					completedRef.current = true;
					onCompleteRef.current?.();
				}
				return;
			}
			const id = setTimeout(() => setDirection(-1), waitMs);
			return () => clearTimeout(id);
		}
		if (atStart && direction === -1 && repeat) {
			const id = setTimeout(() => setDirection(1), waitMs);
			return () => clearTimeout(id);
		}
	}, [atEnd, atStart, direction, repeat, waitMs]);

	const isComplete = index === total && !repeat;
	const showCursor = !smooth && (!hideCursorOnComplete || !isComplete);

	return (
		<div
			data-slot="typing-text"
			className={cn(typingText({ size }), className)}
			style={{ "--tt-fade-duration": `${fadeDurationMs}ms` } as CSSProperties}
		>
			{!grow && <div className="invisible">{text}</div>}
			<div className={cn(!grow && "absolute inset-0")}>
				{smooth ? (
					<span className="flex flex-wrap whitespace-pre">
						{words.map((word, i) => (
							<span
								key={i}
								className={cn(
									"transition-opacity duration-[var(--tt-fade-duration,300ms)] ease-[var(--ease-in-out)]",
									i < index ? "opacity-100" : "opacity-0",
								)}
							>
								{word}
								{i < words.length - 1 ? <span>&nbsp;</span> : null}
							</span>
						))}
					</span>
				) : (
					text.slice(0, index)
				)}
				{showCursor ? (
					<span className={blinkOn || atEnd || atStart ? "" : "opacity-0"}>|</span>
				) : null}
			</div>
		</div>
	);
}
