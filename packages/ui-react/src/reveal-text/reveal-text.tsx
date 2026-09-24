"use client";

import {
	type CSSProperties,
	createElement,
	type ElementType,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { cn } from "../lib/cn";
import {
	type RevealTextSize,
	type RevealTextSplit,
	type RevealTextTrigger,
	revealText,
	revealUnits,
} from "./variants";

export type { RevealTextSize, RevealTextSplit, RevealTextTrigger };

export interface RevealTextProps {
	/** One string, or one per line. */
	text: string | string[];
	split?: RevealTextSplit;
	/** Reveal on mount, or when scrolled into view. */
	trigger?: RevealTextTrigger;
	/** With `trigger="view"`: reveal only the first time instead of every entry. */
	once?: boolean;
	/** Controlled: whether the text shows. Omit to follow `trigger`. */
	revealed?: boolean;
	onRevealedChange?: (revealed: boolean) => void;
	/** Gap between units, in ms. */
	staggerMs?: number;
	delayMs?: number;
	/** Starting blur in px; skipped on touch screens and reduced motion. */
	blur?: number;
	size?: RevealTextSize;
	as?: ElementType;
	className?: string;
}

export function RevealText({
	text,
	split = "word",
	trigger = "mount",
	once = true,
	revealed: revealedProp,
	onRevealedChange,
	staggerMs = 90,
	delayMs = 0,
	blur = 12,
	size = "inherit",
	as = "span",
	className,
}: RevealTextProps) {
	const ref = useRef<HTMLElement>(null);
	const [internal, setInternal] = useState(false);
	const revealed = revealedProp ?? internal;
	const onChange = useRef(onRevealedChange);
	onChange.current = onRevealedChange;
	const lines = useMemo(
		() => (Array.isArray(text) ? text : [text]).filter(Boolean),
		[text],
	);
	const units = useMemo(
		() => revealUnits(lines, split, delayMs, staggerMs),
		[lines, split, delayMs, staggerMs],
	);
	const styles = revealText({ split, trigger, size });

	useEffect(() => {
		const set = (next: boolean) => {
			setInternal(next);
			onChange.current?.(next);
		};
		if (trigger === "mount") {
			const frame = requestAnimationFrame(() => set(true));
			return () => cancelAnimationFrame(frame);
		}
		const node = ref.current;
		if (!node) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					set(true);
					if (once) observer.disconnect();
				} else if (!once) set(false);
			},
			{ rootMargin: "0px 0px -4% 0px" },
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, [trigger, once]);

	return createElement(
		as,
		{
			ref,
			"data-slot": "reveal-text",
			"data-revealed": revealed ? "true" : "false",
			className: cn(styles.root(), className),
			style: { "--reveal-blur-amount": `${blur}px` } as CSSProperties,
		},
		<span className={styles.srOnly()}>{lines.join(" ")}</span>,
		<span aria-hidden="true">
			{units.map((line, l) => (
				<span key={l} className={styles.line()}>
					{line.map((unit) => (
						<span
							key={unit.key}
							className={styles.unit()}
							style={{ "--reveal-delay": `${unit.delay}ms` } as CSSProperties}
						>
							{unit.text}
						</span>
					))}
				</span>
			))}
		</span>,
	);
}
