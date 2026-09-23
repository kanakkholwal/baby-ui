import type { CSSProperties } from "react";
import { cn } from "../lib/cn";
import { type UnderlineHoverTextTone, underlineHoverText } from "./variants";

export type { UnderlineHoverTextTone };

export interface UnderlineHoverTextProps {
	text: string;
	tone?: UnderlineHoverTextTone;
	/** How long the lift and stroke take, in ms. */
	durationMs?: number;
	className?: string;
}

export function UnderlineHoverText({
	text,
	tone = "default",
	durationMs = 500,
	className,
}: UnderlineHoverTextProps) {
	const { root, label, baseline, stroke } = underlineHoverText({ tone });
	return (
		<span
			data-slot="underline-hover-text"
			className={cn(root(), className)}
			style={{ "--uht-duration": `${durationMs}ms` } as CSSProperties}
		>
			<span className={label()}>{text}</span>
			<span aria-hidden className={baseline()} />
			<span aria-hidden className={stroke()} />
		</span>
	);
}
