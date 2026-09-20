"use client";

import type { ReactNode } from "react";
import { useId, useState } from "react";
import { cn } from "../lib/cn";

export interface CollapsibleProps {
	children: ReactNode;
	label: string;
	defaultOpen?: boolean;
	className?: string;
}

export function Collapsible({
	children,
	label,
	defaultOpen = false,
	className,
}: CollapsibleProps) {
	const id = useId();
	const [open, setOpen] = useState(defaultOpen);

	return (
		<div className={cn("w-full", className)}>
			<button
				type="button"
				aria-expanded={open}
				aria-controls={id}
				onClick={() => setOpen((v) => !v)}
				className="flex w-full items-center gap-2 rounded-lg px-1 py-1.5 text-left font-medium text-foreground text-sm transition-colors hover:text-muted-foreground"
			>
				<svg
					viewBox="0 0 16 16"
					fill="none"
					aria-hidden
					style={{ transform: open ? "rotate(90deg)" : undefined }}
					className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ease-[var(--ease-out)] motion-reduce:transition-none"
				>
					<path
						d="m6 4 4 4-4 4"
						stroke="currentColor"
						strokeWidth="1.4"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				{label}
			</button>

			<div
				id={id}
				style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
				className="grid transition-[grid-template-rows] duration-200 ease-[var(--ease-out)] motion-reduce:transition-none"
			>
				<div className="overflow-hidden">
					<div className="px-1 pb-2 text-muted-foreground text-sm">{children}</div>
				</div>
			</div>
		</div>
	);
}
