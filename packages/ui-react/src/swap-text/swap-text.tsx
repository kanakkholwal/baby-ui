"use client";

import { useState } from "react";
import { cn } from "../lib/cn";
import { type SwapTextSize, swapText } from "./variants";

export type { SwapTextSize };

export interface SwapTextProps {
	initialText: string;
	finalText: string;
	/** Controlled: which text is showing. Omit to let the component own it. */
	active?: boolean;
	defaultActive?: boolean;
	onActiveChange?: (active: boolean) => void;
	/** Toggle on hover as well as click. */
	supportsHover?: boolean;
	disableClick?: boolean;
	/** How long the swap slide takes, in ms. */
	durationMs?: number;
	size?: SwapTextSize;
	className?: string;
}

const LAYER = "block transition-transform ease-[var(--ease-out)]";

export function SwapText({
	initialText,
	finalText,
	active: activeProp,
	defaultActive = false,
	onActiveChange,
	supportsHover = true,
	disableClick = false,
	durationMs = 1000,
	size = "lg",
	className,
}: SwapTextProps) {
	const [internalActive, setInternalActive] = useState(defaultActive);
	const active = activeProp ?? internalActive;

	function setActive(next: boolean) {
		if (activeProp === undefined) setInternalActive(next);
		onActiveChange?.(next);
	}

	const longer = finalText.length > initialText.length ? finalText : null;

	return (
		<div
			data-slot="swap-text"
			className={cn("relative overflow-hidden text-foreground", className)}
		>
			<button
				type="button"
				disabled={disableClick}
				onClick={() => !disableClick && setActive(!active)}
				className={cn(swapText({ size }), "group/swap")}
			>
				<span
					className={cn(LAYER, "flex flex-col", {
						"-translate-y-full": active,
						"group-hover/swap:-translate-y-full": supportsHover,
					})}
					style={{ transitionDuration: `${durationMs}ms` }}
				>
					{initialText}
					{longer ? <span className="invisible h-0">{longer}</span> : null}
				</span>
				<span
					className={cn(LAYER, "absolute top-full", {
						"-translate-y-full": active,
						"group-hover/swap:-translate-y-full": supportsHover,
					})}
					style={{ transitionDuration: `${durationMs}ms` }}
				>
					{finalText}
				</span>
			</button>
		</div>
	);
}
