"use client";

import { type CSSProperties, useEffect, useState } from "react";
import { cn } from "../lib/cn";
import { type TickerSize, ticker } from "./variants";

export type { TickerSize };

export interface TickerProps {
	/** The value to display. Each digit rolls to its new row when this changes. */
	value: string;
	/** How long each digit's roll takes, in ms. */
	durationMs?: number;
	size?: TickerSize;
	className?: string;
}

const ROWS = Array.from({ length: 10 }, (_, i) => i);
const DIGIT_RE = /^[0-9]$/;

export function Ticker({ value, durationMs = 500, size = "md", className }: TickerProps) {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		const frame = requestAnimationFrame(() => setMounted(true));
		return () => cancelAnimationFrame(frame);
	}, []);
	const parts = [...value];
	return (
		<span data-slot="ticker" className={cn(ticker({ size }), className)}>
			<span className="sr-only">{value}</span>
			{parts.map((part, index) => {
				// Keyed from the right so digits keep their place when the value grows.
				const key = parts.length - index;
				if (!DIGIT_RE.test(part)) {
					return (
						<span key={`${key}-${part}`} aria-hidden="true">
							{part}
						</span>
					);
				}
				return (
					<span key={`${key}-digit`} className="ticker-digit" aria-hidden="true">
						<span
							className="ticker-digit__track"
							style={
								{
									"--ticker-index": mounted ? part : 0,
									"--ticker-duration": `${durationMs}ms`,
								} as CSSProperties
							}
						>
							{ROWS.map((row) => (
								<span key={row} className="ticker-digit__row">
									{row}
								</span>
							))}
						</span>
					</span>
				);
			})}
		</span>
	);
}
