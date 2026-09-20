"use client";

import type { ReactNode } from "react";
import { useEffect, useId, useRef } from "react";
import { cn } from "../lib/cn";

const SIDE = {
	left: "inset-y-0 left-0 h-full w-[min(22rem,100vw)] border-r",
	right: "inset-y-0 right-0 h-full w-[min(22rem,100vw)] border-l",
	top: "inset-x-0 top-0 w-full max-h-[80vh] border-b",
	bottom: "inset-x-0 bottom-0 w-full max-h-[80vh] rounded-t-2xl border-t",
};

export interface SheetProps {
	children?: ReactNode;
	open: boolean;
	side?: "left" | "right" | "top" | "bottom";
	title: string;
	className?: string;
	onOpenChange: (open: boolean) => void;
}

export function Sheet({
	children,
	open,
	side = "right",
	title,
	className,
	onOpenChange,
}: SheetProps) {
	const id = useId();
	const panel = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		panel.current?.querySelector<HTMLElement>("button, a, input, [tabindex]")?.focus();
		const onKey = (e: globalThis.KeyboardEvent) => {
			if (e.key === "Escape") onOpenChange(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onOpenChange]);

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50">
			<button
				type="button"
				aria-label="Close"
				onClick={() => onOpenChange(false)}
				className="absolute inset-0 bg-black/50"
			/>

			<div
				ref={panel}
				role="dialog"
				aria-modal="true"
				aria-labelledby={id}
				data-side={side}
				className={cn(
					"sheet-panel absolute flex flex-col gap-4 overflow-y-auto border-border bg-background p-6",
					SIDE[side],
					className,
				)}
			>
				<div className="flex items-center justify-between gap-4">
					<h2 id={id} className="font-semibold text-foreground text-sm">
						{title}
					</h2>
					<button
						type="button"
						aria-label="Close"
						onClick={() => onOpenChange(false)}
						className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
					>
						<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
							<path
								d="m4 4 8 8M12 4l-8 8"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
						</svg>
					</button>
				</div>
				{children}
			</div>
		</div>
	);
}
