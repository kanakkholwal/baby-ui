"use client";

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import {
	readEdges,
	SCROLL_EDGE,
	type ScrollAreaFade,
	type ScrollAreaGutter,
	type ScrollAreaOrientation,
	type ScrollAreaScrollbar,
	scrollArea,
} from "../variants";

export type {
	ScrollAreaFade,
	ScrollAreaGutter,
	ScrollAreaOrientation,
	ScrollAreaScrollbar,
};

export interface ScrollAreaProps extends ComponentProps<typeof ScrollAreaPrimitive.Root> {
	children: ReactNode;
	maxHeight?: string;
	/** `auto` always shows the bar, `hover` and `scroll` reveal it when needed, `hidden` removes it. */
	scrollbar?: ScrollAreaScrollbar;
	/** `reserve` pads the content so the bar never overlaps it. */
	gutter?: ScrollAreaGutter;
	orientation?: ScrollAreaOrientation;
	/** How the clipped ends read: `mask` fades the content, `blur` softens it, `none` cuts it. */
	fade?: ScrollAreaFade;
	/** Exposes the actual scrollable element, for callers that need to drive its scroll
	 * position themselves (e.g. Conversation's auto-follow). */
	viewportRef?: (el: HTMLDivElement | null) => void;
	/** Escape hatch for props that must land on the real scrollable element, not the
	 * outer root (role, aria-*, tabIndex, extra scroll/pointer listeners). */
	viewportProps?: Omit<
		ComponentProps<typeof ScrollAreaPrimitive.Viewport>,
		"children" | "ref"
	>;
}

export function ScrollArea({
	children,
	maxHeight = "16rem",
	scrollbar = "auto",
	gutter = "overlay",
	orientation = "vertical",
	fade = "mask",
	className,
	viewportRef,
	viewportProps,
	...props
}: ScrollAreaProps) {
	const styles = scrollArea({ scrollbar, gutter, orientation, fade });
	const viewport = useRef<HTMLDivElement>(null);
	const idle = useRef<number | undefined>(undefined);
	const [edges, setEdges] = useState({ start: false, end: false });
	const [scrolling, setScrolling] = useState(false);

	// Fades tell the reader there is more; a styled scrollbar alone does not on touch.
	const measure = useCallback(() => {
		const el = viewport.current;
		if (el) setEdges(readEdges(el, orientation));
	}, [orientation]);

	useEffect(() => {
		const el = viewport.current;
		if (!el) return;
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(el);
		return () => observer.disconnect();
	}, [measure]);

	useEffect(() => () => window.clearTimeout(idle.current), []);

	const fadeStyle: CSSProperties & Record<`--${string}`, string> = {
		"--sa-start": edges.start ? SCROLL_EDGE : "0px",
		"--sa-end": edges.end ? SCROLL_EDGE : "0px",
	};
	const showVertical = orientation !== "horizontal";
	const showHorizontal = orientation !== "vertical";
	const bar = (direction: "vertical" | "horizontal") => (
		<ScrollAreaPrimitive.Scrollbar
			orientation={direction}
			data-slot="scroll-area-scrollbar"
			className={styles.scrollbar()}
		>
			<ScrollAreaPrimitive.Thumb
				data-slot="scroll-area-thumb"
				className={styles.thumb()}
			/>
		</ScrollAreaPrimitive.Scrollbar>
	);

	return (
		<ScrollAreaPrimitive.Root
			data-slot="scroll-area"
			data-scrollbar={scrollbar}
			data-scrolling={scrolling}
			className={cn(styles.root(), className)}
			{...props}
		>
			<ScrollAreaPrimitive.Viewport
				{...viewportProps}
				ref={(el) => {
					viewport.current = el;
					viewportRef?.(el);
				}}
				onScroll={(event) => {
					measure();
					setScrolling(true);
					window.clearTimeout(idle.current);
					idle.current = window.setTimeout(() => setScrolling(false), 900);
					viewportProps?.onScroll?.(event);
				}}
				data-slot="scroll-area-viewport"
				style={{ maxHeight, ...fadeStyle, ...viewportProps?.style }}
				className={cn(styles.viewport(), viewportProps?.className)}
			>
				{children}
			</ScrollAreaPrimitive.Viewport>
			{scrollbar === "hidden" ? null : (
				<>
					{showVertical ? bar("vertical") : null}
					{showHorizontal ? bar("horizontal") : null}
					{orientation === "both" ? <ScrollAreaPrimitive.Corner /> : null}
				</>
			)}
			{fade === "blur" ? (
				<>
					<span
						aria-hidden
						style={{ opacity: edges.start ? 1 : 0 }}
						className={styles.fadeStart()}
					/>
					<span
						aria-hidden
						style={{ opacity: edges.end ? 1 : 0 }}
						className={styles.fadeEnd()}
					/>
				</>
			) : null}
		</ScrollAreaPrimitive.Root>
	);
}
