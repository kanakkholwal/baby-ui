"use client";

import { type CSSProperties, useState } from "react";
import { cn } from "../lib/cn";
import {
	type SwapTextMotion,
	type SwapTextSize,
	swapChars,
	swapText,
	swapTextFlip,
} from "./variants";

export type { SwapTextMotion, SwapTextSize };

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
	/** How long the swap takes, in ms (per letter for `flip`). */
	durationMs?: number;
	/** Delay between neighbouring letters for `flip`, in ms. */
	staggerMs?: number;
	size?: SwapTextSize;
	motion?: SwapTextMotion;
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
	staggerMs = 44,
	size = "lg",
	motion = "slide",
	className,
}: SwapTextProps) {
	const [internalActive, setInternalActive] = useState(defaultActive);
	const active = activeProp ?? internalActive;

	function setActive(next: boolean) {
		if (activeProp === undefined) setInternalActive(next);
		onActiveChange?.(next);
	}

	const longer = finalText.length > initialText.length ? finalText : null;

	if (motion === "flip") {
		const flip = (layer: "first" | "second") =>
			swapTextFlip({ layer, active, hover: supportsHover });
		const letters = (text: string, layer: "first" | "second") => {
			const chars = swapChars(text);
			return (
				<span aria-hidden className={flip(layer).layer()}>
					{chars.map((c, i) => (
						<span
							// biome-ignore lint/suspicious/noArrayIndexKey: letters repeat, position is the identity
							key={i}
							className={flip(layer).char()}
							style={{ "--i": i, "--n": chars.length } as CSSProperties}
						>
							{c}
						</span>
					))}
				</span>
			);
		};
		return (
			<div data-slot="swap-text" className={cn("relative text-foreground", className)}>
				<button
					type="button"
					disabled={disableClick}
					aria-label={active ? finalText : initialText}
					aria-pressed={active}
					onClick={() => !disableClick && setActive(!active)}
					className={cn(swapText({ size, motion }), "group/swap")}
				>
					<span
						className={flip("first").stage()}
						style={
							{
								"--swap-duration": `${durationMs}ms`,
								"--swap-stagger": `${staggerMs}ms`,
								"--swap-lag": `${Math.round(durationMs * 0.62)}ms`,
							} as CSSProperties
						}
					>
						{letters(initialText, "first")}
						{letters(finalText, "second")}
					</span>
				</button>
			</div>
		);
	}

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
