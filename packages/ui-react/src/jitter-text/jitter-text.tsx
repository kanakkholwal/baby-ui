import type { CSSProperties } from "react";
import { cn } from "../lib/cn";
import { type JitterTextSize, jitterText } from "./variants";

export type { JitterTextSize };

export interface JitterTextProps {
	text: string;
	/** Wobble cycle length, in seconds. */
	durationSeconds?: number;
	size?: JitterTextSize;
	className?: string;
}

export function JitterText({
	text,
	durationSeconds = 0.6,
	size = "md",
	className,
}: JitterTextProps) {
	return (
		<span
			data-slot="jitter-text"
			className={cn(jitterText({ size }), className)}
			style={{ "--jt-duration": `${durationSeconds}s` } as CSSProperties}
		>
			{text}
		</span>
	);
}
