"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import { type TextFlipSize, textFlip } from "./variants";

export type { TextFlipSize };

export interface TextFlipProps {
	/** Fixed leading label, e.g. "Coding is". */
	label: string;
	/** Words that cycle after the label, looping back to the first. */
	words: string[];
	/** Time each word holds before flipping to the next, in ms. */
	intervalMs?: number;
	size?: TextFlipSize;
	className?: string;
}

export function TextFlip({
	label,
	words,
	intervalMs = 2000,
	size = "lg",
	className,
}: TextFlipProps) {
	const [step, setStep] = useState(0);
	const stackRef = useRef<HTMLDivElement>(null);
	const extended = [...words, words[0]];
	const { root, label: labelClass, window: windowClass, word } = textFlip({ size });

	useEffect(() => {
		if (words.length <= 1) return;
		const id = setInterval(() => setStep((s) => s + 1), intervalMs);
		return () => clearInterval(id);
	}, [words.length, intervalMs]);

	useEffect(() => {
		const el = stackRef.current;
		if (!el || step !== words.length) return;
		function snapBack() {
			if (!el) return;
			el.style.transitionDuration = "0s";
			setStep(0);
			requestAnimationFrame(() => {
				el.style.transitionDuration = "";
			});
		}
		el.addEventListener("transitionend", snapBack, { once: true });
		return () => el.removeEventListener("transitionend", snapBack);
	}, [step, words.length]);

	return (
		<div data-slot="text-flip" className={cn(root(), className)}>
			<span className={labelClass()}>{label}</span>
			<span className={windowClass()}>
				<div
					ref={stackRef}
					className="text-flip-stack"
					style={{ "--flip-step": step } as React.CSSProperties}
				>
					{extended.map((text, index) => (
						<span key={index} className={word()}>
							{text}
						</span>
					))}
				</div>
			</span>
		</div>
	);
}
