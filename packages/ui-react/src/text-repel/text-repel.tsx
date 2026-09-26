"use client";

import { type PointerEvent, useEffect, useRef } from "react";
import { cn } from "../lib/cn";
import {
	letterOrigins,
	repelAll,
	type TextRepelMode,
	type TextRepelSize,
	textRepel,
} from "./variants";

export type { TextRepelMode, TextRepelSize };

export interface TextRepelProps {
	text: string;
	/** Pointer influence radius, in px. */
	radius?: number;
	/** Largest displacement, in px, for a letter right under the pointer. */
	strength?: number;
	mode?: TextRepelMode;
	size?: TextRepelSize;
	className?: string;
}

/** Letters shy away from (or lean toward) the pointer and spring back when it leaves. */
export function TextRepel({
	text,
	radius = 120,
	strength = 45,
	mode = "repel",
	size,
	className,
}: TextRepelProps) {
	const root = useRef<HTMLSpanElement>(null);
	const letters = useRef<HTMLSpanElement[]>([]);
	const origins = useRef<{ x: number; y: number }[]>([]);
	const reduced = useRef(false);
	const s = textRepel({ mode, size });
	const chars = Array.from(text);

	useEffect(() => {
		reduced.current = matchMedia("(prefers-reduced-motion: reduce)").matches;
		const node = root.current;
		if (!node) return;
		const measure = () => {
			origins.current = letterOrigins(letters.current.filter(Boolean));
		};
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	function onMove(event: PointerEvent<HTMLSpanElement>) {
		const node = root.current;
		if (!node || reduced.current) return;
		const box = node.getBoundingClientRect();
		const pointer = { x: event.clientX - box.left, y: event.clientY - box.top };
		repelAll(
			letters.current.filter(Boolean),
			origins.current,
			pointer,
			radius,
			strength,
			mode,
		);
	}

	function onLeave() {
		repelAll(
			letters.current.filter(Boolean),
			origins.current,
			null,
			radius,
			strength,
			mode,
		);
	}

	return (
		<span
			ref={root}
			data-slot="text-repel"
			className={cn(s.root(), className)}
			onPointerMove={onMove}
			onPointerLeave={onLeave}
		>
			<span className={s.srOnly()}>{text}</span>
			{chars.map((c, i) => (
				<span
					key={i}
					ref={(el) => {
						if (el) letters.current[i] = el;
					}}
					aria-hidden
					className={s.letter()}
				>
					{c}
				</span>
			))}
		</span>
	);
}
