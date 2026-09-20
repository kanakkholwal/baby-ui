"use client";

import type { ReactNode } from "react";
import { useId, useState } from "react";
import { cn } from "../lib/cn";

export interface ReasoningProps {
	children?: ReactNode;
	thinking?: boolean;
	duration?: number;
	defaultOpen?: boolean;
	className?: string;
}

export function Reasoning({
	children,
	thinking = false,
	duration = 0,
	defaultOpen = false,
	className,
}: ReasoningProps) {
	const id = useId();
	const [touched, setTouched] = useState(false);
	const [manual, setManual] = useState(defaultOpen);

	// Auto-open while thinking, auto-close when it ends, unless the reader has chosen.
	const open = touched ? manual : thinking || defaultOpen;

	return (
		<div
			className={cn(
				"overflow-hidden rounded-xl border border-border bg-card/40",
				className,
			)}
		>
			<button
				type="button"
				aria-expanded={open}
				aria-controls={id}
				onClick={() => {
					setTouched(true);
					setManual(!open);
				}}
				className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-foreground/[0.03]"
			>
				<svg
					viewBox="0 0 16 16"
					fill="none"
					aria-hidden
					className="size-3.5 shrink-0 text-muted-foreground"
				>
					<path
						d="M8 1.8a4.2 4.2 0 0 0-2.4 7.6c.4.3.6.7.6 1.2v.3h3.6v-.3c0-.5.2-.9.6-1.2A4.2 4.2 0 0 0 8 1.8Z"
						stroke="currentColor"
						strokeWidth="1.2"
					/>
					<path
						d="M6.4 13.4h3.2"
						stroke="currentColor"
						strokeWidth="1.2"
						strokeLinecap="round"
					/>
				</svg>
				<span
					className={cn(
						"flex-1 font-medium",
						thinking ? "reasoning-shimmer" : "text-muted-foreground",
					)}
				>
					{thinking ? "Thinking" : `Thought for ${duration}s`}
				</span>
				<svg
					viewBox="0 0 16 16"
					fill="none"
					aria-hidden
					style={{ transform: open ? "rotate(180deg)" : undefined }}
					className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ease-[var(--ease-out)] motion-reduce:transition-none"
				>
					<path
						d="m4 6 4 4 4-4"
						stroke="currentColor"
						strokeWidth="1.4"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>

			<div
				id={id}
				style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
				className="grid transition-[grid-template-rows] duration-200 ease-[var(--ease-out)] motion-reduce:transition-none"
			>
				<div className="overflow-hidden">
					<div className="border-border/60 border-t px-3 py-2.5 text-muted-foreground text-xs leading-relaxed">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
