"use client";

import type { ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { type AnchorPlacement, anchor, dismissable } from "../lib/anchor";
import { cn } from "../lib/cn";

export interface PopoverProps {
	trigger: ReactNode;
	children: ReactNode;
	placement?: AnchorPlacement;
	gap?: number;
	className?: string;
}

export function Popover({
	trigger,
	children,
	placement = "bottom-start",
	gap = 6,
	className,
}: PopoverProps) {
	const id = useId();
	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const floating = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open || !triggerRef.current || !floating.current) return;
		const stopAnchor = anchor(triggerRef.current, floating.current, { placement, gap });
		const stopDismiss = dismissable([triggerRef.current, floating.current], () => {
			setOpen(false);
			triggerRef.current?.focus();
		});
		return () => {
			stopAnchor();
			stopDismiss();
		};
	}, [open, placement, gap]);

	return (
		<>
			<button
				ref={triggerRef}
				type="button"
				aria-expanded={open}
				aria-controls={open ? id : undefined}
				onClick={() => setOpen((v) => !v)}
				className="inline-flex rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
			>
				{trigger}
			</button>

			{open ? (
				<div
					ref={floating}
					id={id}
					role="dialog"
					className={cn(
						"anchored z-50 w-72 rounded-xl border border-border bg-popover p-3 text-sm shadow-2xl",
						className,
					)}
				>
					{children}
				</div>
			) : null}
		</>
	);
}
