"use client";

import { type CSSProperties, useMemo, useState } from "react";
import { cn } from "../lib/cn";
import {
	type TextExplodeIMessageMode,
	type TextExplodeIMessageSize,
	textExplodeIMessage,
} from "./variants";

export type { TextExplodeIMessageMode, TextExplodeIMessageSize };

export interface TextExplodeIMessageProps {
	text: string;
	/** Plays continuously, or once per hover/tap. */
	mode?: TextExplodeIMessageMode;
	/** Full shrink-jitter-explode-reset cycle length, in ms. */
	durationMs?: number;
	size?: TextExplodeIMessageSize;
	className?: string;
}

// Seeded, not Math.random(): per-character values must match between SSR and hydration.
function seededRandom(seed: number): number {
	const x = Math.sin(seed) * 10000;
	return x - Math.floor(x);
}

function explosionVars(index: number, total: number): CSSProperties {
	const seed = index * 137.51;
	const direction = seededRandom(seed) > 0.5 ? -1 : 1;
	const x = seededRandom(seed + 1) * 10 * total * direction;
	const radius = total * 4;
	const angle = total > 1 ? (index / (total - 1)) * Math.PI : 0;
	const y = radius * -Math.sin(angle) * seededRandom(seed + 2);
	const rotation = seededRandom(seed + 3) * 360 * direction;
	return {
		"--te-x": `${x}px`,
		"--te-y": `${y}px`,
		"--te-rot": `${rotation}deg`,
		"--te-jitter-x": `${-3 + seededRandom(seed + 4) * 6}px`,
		"--te-jitter-y": `${-2 + seededRandom(seed + 5) * 4}px`,
		"--te-scale-extra": (seededRandom(seed + 6) * 2).toFixed(2),
	} as CSSProperties;
}

export function TextExplodeIMessage({
	text,
	mode = "loop",
	durationMs = 4000,
	size = "lg",
	className,
}: TextExplodeIMessageProps) {
	const characters = useMemo(() => [...text], [text]);
	const vars = useMemo(
		() => characters.map((_, index) => explosionVars(index, characters.length)),
		[characters],
	);
	const [playing, setPlaying] = useState(false);

	function trigger() {
		if (mode === "hover" && !playing) setPlaying(true);
	}

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: decorative hover/tap replay, no click semantics or keyboard action to offer
		<div
			data-slot="text-explode-imessage"
			data-mode={mode}
			onMouseEnter={trigger}
			onPointerDown={trigger}
			className={cn(textExplodeIMessage({ size }), className)}
		>
			{characters.map((char, index) => (
				<span
					key={`${text}-${index}`}
					className={cn(
						"text-explode-char inline-block",
						mode === "hover" && playing && "text-explode-char--playing",
					)}
					style={{ ...vars[index], "--te-duration": `${durationMs}ms` } as CSSProperties}
					onAnimationEnd={() => {
						if (mode === "hover") setPlaying(false);
					}}
				>
					{char === " " ? "\u00a0" : char}
				</span>
			))}
			<span className="sr-only">{text}</span>
		</div>
	);
}
