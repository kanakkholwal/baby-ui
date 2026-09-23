import type { CSSProperties } from "react";
import { cn } from "../lib/cn";
import { type StaggeredLetterDirection, staggeredLetter } from "./variants";

export type { StaggeredLetterDirection };

export interface StaggeredLetterProps {
	text: string;
	/** Shows a faint static copy of the text behind, so layout doesn't shift as letters land. */
	applyMask?: boolean;
	/** Delay step between letters, in ms. */
	delayMs?: number;
	/** How long each letter's entrance takes, in ms. */
	durationMs?: number;
	direction?: StaggeredLetterDirection;
	className?: string;
}

export function StaggeredLetter({
	text,
	applyMask = true,
	delayMs = 90,
	durationMs = 500,
	direction = "drop",
	className,
}: StaggeredLetterProps) {
	const { root, mask, row } = staggeredLetter({ direction });
	const travel = direction === "up" ? "150px" : "-150px";

	return (
		<div data-slot="staggered-letter" className={cn(root(), className)}>
			{applyMask ? <div className={mask()}>{text}</div> : null}
			<div className={row()}>
				{text.split("").map((letter, index) => (
					<div
						key={`${text}-${index}`}
						className="text-transition-unit"
						style={
							{
								"--tt-duration": `${durationMs}ms`,
								"--tt-delay": `${index * delayMs}ms`,
								"--tt-from-opacity": 0,
								"--tt-from-y": travel,
							} as CSSProperties
						}
					>
						{letter === " " ? <span>&nbsp;</span> : letter}
					</div>
				))}
			</div>
		</div>
	);
}
