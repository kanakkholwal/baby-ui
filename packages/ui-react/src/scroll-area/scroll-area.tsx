"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";

export interface ScrollAreaProps {
	children: ReactNode;
	maxHeight?: string;
	className?: string;
}

export function ScrollArea({
	children,
	maxHeight = "16rem",
	className,
}: ScrollAreaProps) {
	const viewport = useRef<HTMLDivElement>(null);
	const [atTop, setAtTop] = useState(true);
	const [atBottom, setAtBottom] = useState(true);

	// Fades tell the reader there is more; a styled scrollbar alone does not on touch.
	const measure = useCallback(() => {
		const el = viewport.current;
		if (!el) return;
		setAtTop(el.scrollTop <= 1);
		setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 1);
	}, []);

	useEffect(() => {
		const el = viewport.current;
		if (!el) return;
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(el);
		return () => observer.disconnect();
	}, [measure]);

	return (
		<div className={cn("relative", className)}>
			<div
				ref={viewport}
				onScroll={measure}
				style={{ maxHeight }}
				className="scroll-area overflow-y-auto"
			>
				{children}
			</div>

			<span
				aria-hidden
				style={{ opacity: atTop ? 0 : 1 }}
				className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-background to-transparent transition-opacity duration-150"
			/>
			<span
				aria-hidden
				style={{ opacity: atBottom ? 0 : 1 }}
				className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-background to-transparent transition-opacity duration-150"
			/>
		</div>
	);
}
