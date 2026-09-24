"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import { flipStep, type TextFlipSize, textFlip } from "./variants";

export type { TextFlipSize };

export interface TextFlipProps {
	/** Fixed leading label, e.g. "Coding is". */
	label: string;
	/** Words that cycle after the label, looping back to the first. */
	words: string[];
	/** Controlled: which word is showing. Omit to let the component flip on its own. */
	index?: number;
	defaultIndex?: number;
	onIndexChange?: (index: number) => void;
	/** Time each word holds before flipping to the next. Only runs while uncontrolled. */
	intervalMs?: number;
	size?: TextFlipSize;
	className?: string;
}

type View = { index: number; step: number; snap: boolean };

export function TextFlip({
	label,
	words,
	index: indexProp,
	defaultIndex = 0,
	onIndexChange,
	intervalMs = 2000,
	size = "lg",
	className,
}: TextFlipProps) {
	const count = words.length;
	const [internalIndex, setInternalIndex] = useState(defaultIndex);
	const index = count > 0 ? (((indexProp ?? internalIndex) % count) + count) % count : 0;
	const indexRef = useRef(index);
	indexRef.current = index;
	const onChange = useRef(onIndexChange);
	onChange.current = onIndexChange;

	const [view, setView] = useState<View>({ index, step: index, snap: false });
	if (view.index !== index) {
		setView({ index, step: flipStep(view.index, index, count), snap: false });
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

	useEffect(() => {
		if (!view.snap) return;
		let frame = requestAnimationFrame(() => {
			frame = requestAnimationFrame(() => setView((v) => ({ ...v, snap: false })));
		});
		return () => cancelAnimationFrame(frame);
	}, [view.snap]);

	const styles = textFlip({ size });

	return (
		<div data-slot="text-flip" className={cn(styles.root(), className)}>
			<span className={styles.label()}>{label}</span>
			<span className={styles.window()} aria-hidden="true">
				<span
					className={styles.stack()}
					data-snap={view.snap ? "" : undefined}
					style={{ "--flip-step": view.step } as CSSProperties}
					onTransitionEnd={() => {
						if (view.step === count) setView((v) => ({ ...v, step: 0, snap: true }));
					}}
				>
					{[...words, words[0]].map((text, i) => (
						<span key={i} className={styles.word()}>
							{text}
						</span>
					))}
				</span>
			</span>
			<span className={styles.srOnly()}>{words[index]}</span>
		</div>
	);
}
