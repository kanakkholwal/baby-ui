"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";

export interface ConversationProps {
	children?: ReactNode;
	empty?: ReactNode;
	maxHeight?: string;
	className?: string;
}

export function Conversation({
	children,
	empty,
	maxHeight = "24rem",
	className,
}: ConversationProps) {
	const viewport = useRef<HTMLDivElement>(null);
	const [pinned, setPinned] = useState(true);

	const measure = useCallback(() => {
		const el = viewport.current;
		if (!el) return;
		setPinned(el.scrollTop + el.clientHeight >= el.scrollHeight - 24);
	}, []);

	// Follow new turns only while the reader is already at the bottom. Yanking someone
	// back down mid-scroll is the most common bug in a chat transcript.
	useEffect(() => {
		const el = viewport.current;
		if (!el) return;
		const observer = new MutationObserver(() => {
			if (pinned) el.scrollTop = el.scrollHeight;
		});
		observer.observe(el, { childList: true, subtree: true });
		return () => observer.disconnect();
	}, [pinned]);

	return (
		<div className={cn("relative", className)}>
			<div
				ref={viewport}
				onScroll={measure}
				style={{ maxHeight }}
				className="scroll-area flex flex-col gap-4 overflow-y-auto p-1"
			>
				{children ?? empty}
			</div>

			{!pinned ? (
				<button
					type="button"
					aria-label="Scroll to latest"
					onClick={() =>
						viewport.current?.scrollTo({
							top: viewport.current.scrollHeight,
							behavior: "smooth",
						})
					}
					className="absolute inset-x-0 bottom-3 mx-auto grid size-8 place-items-center rounded-full border border-border bg-popover text-muted-foreground shadow-lg transition-colors hover:text-foreground duration-[var(--duration-dropdown)] ease-[var(--ease-out)] starting:scale-[var(--enter-scale)] starting:opacity-0"
				>
					<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-3.5">
						<path
							d="M8 3.5V13M4 9l4 4 4-4"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			) : null}
		</div>
	);
}
