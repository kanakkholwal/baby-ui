"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import { flapRows, flapSteps, prefersReducedMotion, SPLIT_FLAP_CHARACTERS } from "./flap";
import {
	type SplitFlapIndicator,
	type SplitFlapSize,
	type SplitFlapVariant,
	splitFlap,
} from "./variants";

export type { SplitFlapIndicator, SplitFlapSize, SplitFlapVariant };

export interface SplitFlapDisplayProps {
	/** Board text; `\n` starts a new row. Uppercased. */
	value: string;
	/** Cells per row; shorter rows pad with blanks, longer ones are cut. */
	columns?: number;
	variant?: SplitFlapVariant;
	size?: SplitFlapSize;
	/** Colour of the side strips; `none` hides them. */
	indicator?: SplitFlapIndicator;
	/** Time for one flap to fall, per character step. */
	stepMs?: number;
	/** Delay between neighbouring cells starting, for a wave. */
	staggerMs?: number;
	/** Drum order each cell flips through. */
	characters?: string;
	className?: string;
}

type Face = { current: string; prev: string; step: number };

function FlapCell({
	char,
	delayMs,
	stepMs,
	characters,
	styles,
}: {
	char: string;
	delayMs: number;
	stepMs: number;
	characters: string;
	styles: ReturnType<typeof splitFlap>;
}) {
	const [face, setFace] = useState<Face>({ current: " ", prev: " ", step: 0 });
	const shown = useRef(" ");

	useEffect(() => {
		const steps = flapSteps(shown.current, char, characters);
		if (steps.length === 0) return;
		if (prefersReducedMotion()) {
			shown.current = char;
			setFace({ current: char, prev: char, step: 0 });
			return;
		}
		let i = 0;
		const tick = () => {
			const next = steps[i++] ?? char;
			shown.current = next;
			setFace((f) => ({ current: next, prev: f.current, step: f.step + 1 }));
			if (i < steps.length) timer = setTimeout(tick, stepMs);
		};
		let timer = setTimeout(tick, delayMs);
		return () => clearTimeout(timer);
	}, [char, delayMs, stepMs, characters]);

	return (
		<span className={styles.cell()}>
			<span className={styles.top()}>
				<span className={cn(styles.glyph(), "top-0")}>{face.current}</span>
			</span>
			<span className={styles.bottom()}>
				<span className={cn(styles.glyph(), "bottom-0")}>{face.prev}</span>
			</span>
			{face.step > 0 && (
				<span key={face.step} className="contents">
					<span
						className={cn(styles.top(), styles.flap(), "origin-bottom split-flap-top")}
					>
						<span className={cn(styles.glyph(), "top-0")}>{face.prev}</span>
					</span>
					<span
						className={cn(styles.bottom(), styles.flap(), "origin-top split-flap-bottom")}
					>
						<span className={cn(styles.glyph(), "bottom-0")}>{face.current}</span>
					</span>
				</span>
			)}
			<span className={styles.divider()} />
		</span>
	);
}

export function SplitFlapDisplay({
	value,
	columns = 14,
	variant = "solid",
	size = "md",
	indicator = "success",
	stepMs = 60,
	staggerMs = 30,
	characters = SPLIT_FLAP_CHARACTERS,
	className,
}: SplitFlapDisplayProps) {
	const styles = splitFlap({ variant, size, indicator });
	const rows = flapRows(value, columns);

	return (
		<div
			data-slot="split-flap-display"
			className={cn(styles.root(), className)}
			style={{ "--split-flap-ms": `${stepMs}ms` } as CSSProperties}
		>
			<span className="sr-only">{value}</span>
			{rows.map((row, r) => (
				<div key={r} aria-hidden="true" className={styles.row()}>
					{indicator !== "none" && <span className={styles.indicator()} />}
					<div className={styles.cells()}>
						{row.map((char, c) => (
							<FlapCell
								key={c}
								char={char}
								delayMs={c * staggerMs}
								stepMs={stepMs}
								characters={characters}
								styles={styles}
							/>
						))}
					</div>
					{indicator !== "none" && <span className={styles.indicator()} />}
				</div>
			))}
		</div>
	);
}
