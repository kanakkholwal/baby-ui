"use client";

import {
	type CSSProperties,
	createElement,
	type ElementType,
	useEffect,
	useLayoutEffect,
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

type Shown = { index: number; key: number };

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
	const count = words.length;
	const [internalIndex, setInternalIndex] = useState(defaultIndex);
	const index = count > 0 ? (((indexProp ?? internalIndex) % count) + count) % count : 0;
	const indexRef = useRef(index);
	indexRef.current = index;
	const onChange = useRef(onIndexChange);
	onChange.current = onIndexChange;
	const wordRef = useRef<HTMLSpanElement>(null);
	const [width, setWidth] = useState<number>();

	const [shown, setShown] = useState<Shown>({ index, key: 0 });
	const [leaving, setLeaving] = useState<Shown[]>([]);
	if (shown.index !== index) {
		setLeaving((current) => [...current, shown]);
		setShown({ index, key: shown.key + 1 });
	}

	useEffect(() => {
		if (indexProp !== undefined || count <= 1) return;
		const id = setInterval(() => {
			const next = (indexRef.current + 1) % count;
			setInternalIndex(next);
			onChange.current?.(next);
		}, intervalMs);
		return () => clearInterval(id);
	}, [indexProp, count, intervalMs]);

	useLayoutEffect(() => {
		const node = wordRef.current;
		if (!node) return;
		const measure = () => setWidth(node.offsetWidth);
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(node);
		return () => observer.disconnect();
	}, [shown.key]);

	const styles = cycleText({ size });

	return createElement(
		as,
		{
			"data-slot": "cycle-text",
			className: cn(styles.root(), className),
			style: { width },
		},
		leaving.map((item) => (
			<span
				key={item.key}
				aria-hidden="true"
				className={cn(styles.leaving(), "cycle-text-exit")}
				onAnimationEnd={() =>
					setLeaving((current) => current.filter((l) => l.key !== item.key))
				}
			>
				{words[item.index]}
			</span>
		)),
		<span
			key={shown.key}
			ref={wordRef}
			className={cn(styles.word(), shown.key > 0 && "text-transition-unit")}
			style={
				{
					"--tt-duration": `${durationMs}ms`,
					"--tt-from-opacity": 0,
					"--tt-from-y": "10px",
				} as CSSProperties
			}
		>
			{words[index]}
		</span>,
	);
}
