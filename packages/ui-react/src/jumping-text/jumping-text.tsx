import { type CSSProperties, Fragment } from "react";
import { cn } from "../lib/cn";
import { type JumpingTextMode, type JumpingTextSize, jumpingText } from "./variants";

export type { JumpingTextMode, JumpingTextSize };

export interface JumpingTextProps {
	text: string;
	/** Stagger per whole word, or per character. */
	mode?: JumpingTextMode;
	/** Delay step between units, in ms. Defaults to 50 for words, 10 for characters. */
	stepMs?: number;
	/** How long each unit's jump-in takes, in ms. */
	durationMs?: number;
	size?: JumpingTextSize;
	className?: string;
}

const SPLIT = {
	word: (text: string) => text.split(/(?:\b)/u),
	character: (text: string) => text.split(/(?:)/u),
};

export function JumpingText({
	text,
	mode = "word",
	stepMs,
	durationMs = 500,
	size = "md",
	className,
}: JumpingTextProps) {
	const nodes = SPLIT[mode](text);
	const step = stepMs ?? (mode === "word" ? 50 : 10);
	return (
		<div data-slot="jumping-text" className={cn(jumpingText({ size }), className)}>
			{nodes.map((node, index) =>
				node.trim() === "" ? (
					<Fragment key={`${text}-${index}`}>{node}</Fragment>
				) : (
					<span
						key={`${text}-${index}`}
						className="jump-in inline-block origin-center"
						style={
							{
								animationDelay: `${index * step}ms`,
								"--jump-duration": `${durationMs}ms`,
							} as CSSProperties
						}
					>
						{node}
					</span>
				),
			)}
			<span className="sr-only">{text}</span>
		</div>
	);
}
