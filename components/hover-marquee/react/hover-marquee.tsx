"use client";

import { type ComponentProps, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { DEFAULT_PIXELS_PER_SECOND, marqueeSeconds, overflowOf } from "../marquee";
import { type HoverMarqueeVariant, hoverMarquee } from "../variants";

export type { HoverMarqueeVariant };

export type HoverMarqueeProps = Omit<ComponentProps<"span">, "children"> & {
	text: string;
	variant?: HoverMarqueeVariant;
	pixelsPerSecond?: number;
};

export function HoverMarquee({
	text,
	variant = "ellipsis",
	pixelsPerSecond = DEFAULT_PIXELS_PER_SECOND,
	className,
	onPointerEnter,
	onPointerLeave,
	onFocus,
	onBlur,
	...props
}: HoverMarqueeProps) {
	const box = useRef<HTMLSpanElement>(null);
	const inner = useRef<HTMLSpanElement>(null);
	const [shift, setShift] = useState(0);
	const [seconds, setSeconds] = useState(0.25);
	const [active, setActive] = useState(false);
	const [reduced, setReduced] = useState(false);
	const { root, inner: innerClass } = hoverMarquee({ variant });

	function start() {
		if (!box.current || !inner.current) return;
		const noMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
		setReduced(noMotion);
		if (noMotion) return;
		const overflow = overflowOf(box.current, inner.current);
		if (!overflow) return;
		setSeconds(marqueeSeconds(overflow, pixelsPerSecond));
		setActive(true);
		// Next frame lets the inline-block settle so the slide has a start to move from.
		requestAnimationFrame(() => setShift(-overflow));
	}

	function stop() {
		setSeconds(0.25);
		setShift(0);
		setActive(false);
	}

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: hover and focus only reveal text, no action.
		<span
			ref={box}
			data-slot="hover-marquee"
			data-active={active ? "" : undefined}
			// biome-ignore lint/a11y/noNoninteractiveTabindex: keyboard users need the same reveal.
			tabIndex={0}
			// Reduced motion keeps the ellipsis and falls back to the native tooltip.
			title={reduced ? text : undefined}
			className={cn(root(), className)}
			onPointerEnter={(event) => {
				onPointerEnter?.(event);
				start();
			}}
			onPointerLeave={(event) => {
				onPointerLeave?.(event);
				stop();
			}}
			onFocus={(event) => {
				onFocus?.(event);
				start();
			}}
			onBlur={(event) => {
				onBlur?.(event);
				stop();
			}}
			{...props}
		>
			<span
				ref={inner}
				className={active ? innerClass() : undefined}
				style={
					active
						? ({
								"--marquee-shift": `${shift}px`,
								"--marquee-duration": `${seconds}s`,
							} as React.CSSProperties)
						: undefined
				}
			>
				{text}
			</span>
		</span>
	);
}
