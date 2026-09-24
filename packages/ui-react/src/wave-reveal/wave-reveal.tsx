import { Fragment } from "react";
import { cn } from "../lib/cn";
import {
	type WaveRevealDirection,
	type WaveRevealMode,
	waveAnimationClass,
	waveReveal,
} from "./variants";

export type { WaveRevealDirection, WaveRevealMode };

export interface WaveRevealProps {
	text: string;
	direction?: WaveRevealDirection;
	/** Stagger per letter, or per whole word. */
	mode?: WaveRevealMode;
	/** Adds a blur-to-sharp resolve alongside the fade/drift. */
	blur?: boolean;
	/** Delay step between units, in ms. */
	staggerMs?: number;
	className?: string;
}

export function WaveReveal({
	text,
	direction = "down",
	mode = "letter",
	blur = true,
	staggerMs = 50,
	className,
}: WaveRevealProps) {
	const { root, word: wordClass, unit } = waveReveal({ direction });
	const words = text.trim().split(/\s+/);
	const animClass = waveAnimationClass(direction, blur);
	let unitIndex = 0;

	return (
		<div data-slot="wave-reveal" className={cn(root(), className)}>
			<span className="sr-only">{text}</span>
			<span aria-hidden className="contents">
				{words.map((word, wordIndex) => (
					<Fragment key={`${wordIndex}-${word}`}>
						{wordIndex > 0 ? " " : null}
						<span className={wordClass()}>
							{mode === "word" ? (
								<span
									className={cn(unit(), animClass)}
									style={{ animationDelay: `${unitIndex++ * staggerMs}ms` }}
								>
									{word}
								</span>
							) : (
								word.split("").map((letter, letterIndex) => (
									<span
										key={`${wordIndex}-${letterIndex}`}
										className={cn(unit(), animClass)}
										style={{ animationDelay: `${unitIndex++ * staggerMs}ms` }}
									>
										{letter}
									</span>
								))
							)}
						</span>
					</Fragment>
				))}
			</span>
		</div>
	);
}
