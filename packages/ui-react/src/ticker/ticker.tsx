import type { CSSProperties } from "react";
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
	const parts = [...value];
	return (
		<span data-slot="ticker" className={cn(ticker({ size }), className)}>
			{parts.map((part, index) => {
				if (!DIGIT_RE.test(part)) {
					return <span key={`${index}-${part}`}>{part}</span>;
				}
				return (
					<span key={`${index}-digit`} className="ticker-digit">
						<span
							className="ticker-digit__track"
							style={
								{
									"--ticker-index": part,
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
