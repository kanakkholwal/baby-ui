"use client";

import type { ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "../lib/cn";

export interface ShowMoreProps {
	children: ReactNode;
	collapsedHeight?: number;
	moreLabel?: string;
	lessLabel?: string;
	className?: string;
}

export function ShowMore({
	children,
	collapsedHeight = 120,
	moreLabel = "Show more",
	lessLabel = "Show less",
	className,
}: ShowMoreProps) {
	const id = useId();
	const [open, setOpen] = useState(false);
	const [overflows, setOverflows] = useState(false);
	const content = useRef<HTMLDivElement>(null);

	// Only offer the control when the content actually exceeds the collapsed height.
	useEffect(() => {
		const el = content.current;
		if (!el) return;
		const measure = () => setOverflows(el.scrollHeight > collapsedHeight + 8);
		measure();
		const observer = new ResizeObserver(measure);
		observer.observe(el);
		return () => observer.disconnect();
	}, [collapsedHeight]);

	return (
		<div className={cn("w-full", className)}>
			<div
				id={id}
				ref={content}
				style={{ maxHeight: open || !overflows ? "none" : collapsedHeight }}
				className={cn(
					"relative overflow-hidden text-muted-foreground text-sm",
					!open && overflows && "show-more-fade",
				)}
			>
				{children}
			</div>

			{overflows ? (
				<button
					type="button"
					aria-expanded={open}
					aria-controls={id}
					onClick={() => setOpen((v) => !v)}
					className="mt-2 font-medium text-foreground text-sm underline underline-offset-4 transition-colors hover:text-muted-foreground"
				>
					{open ? lessLabel : moreLabel}
				</button>
			) : null}
		</div>
	);
}
