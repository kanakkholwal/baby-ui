"use client";

import { type CSSProperties, useEffect, useState } from "react";
import { cn } from "../lib/cn";
import { type TextBorderAnimationSize, textBorderAnimation } from "./variants";

export type { TextBorderAnimationSize };

export interface TextBorderAnimationProps {
	text: string;
	size?: TextBorderAnimationSize;
	/** How long the bar takes to sweep in and out, in ms. */
	durationMs?: number;
	className?: string;
}

export function TextBorderAnimation({
	text,
	size = "lg",
	durationMs = 300,
	className,
}: TextBorderAnimationProps) {
	const [hoveredIn, setHoveredIn] = useState(false);
	const [hoveredOut, setHoveredOut] = useState(false);
	const { root, label, track, bar } = textBorderAnimation({ size });

	useEffect(() => {
		if (!hoveredOut) return;
		const timer = setTimeout(() => setHoveredOut(false), durationMs);
		return () => clearTimeout(timer);
	}, [hoveredOut, durationMs]);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: decorative hover-only bar, no action to make it a real control for
		<div
			data-slot="text-border-animation"
			role="presentation"
			onMouseEnter={() => setHoveredIn(true)}
			onMouseLeave={() => {
				setHoveredIn(false);
				setHoveredOut(true);
			}}
			className={cn(root(), className)}
			style={{ "--tba-duration": `${durationMs}ms` } as CSSProperties}
		>
			<span className={label()}>{text}</span>
			<div className={track()}>
				<div
					className={cn(bar(), hoveredIn ? "translate-x-0" : "-translate-x-full")}
					style={{ opacity: hoveredIn ? 1 : 0 }}
				/>
				<div
					className={cn(bar(), hoveredOut ? "translate-x-full" : "translate-x-0")}
					style={{ opacity: hoveredOut ? 1 : 0 }}
				/>
			</div>
		</div>
	);
}
