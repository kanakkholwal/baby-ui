"use client";

import type { ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { type AnchorPlacement, anchor } from "../lib/anchor";
import { cn } from "../lib/cn";

export interface TooltipProps {
	children: ReactNode;
	label: string;
	placement?: AnchorPlacement;
	delay?: number;
	className?: string;
}

export function Tooltip({
	children,
	label,
	placement = "top",
	delay = 400,
	className,
}: TooltipProps) {
	const id = useId();
	const [open, setOpen] = useState(false);
	const wrapper = useRef<HTMLSpanElement>(null);
	const floating = useRef<HTMLDivElement>(null);
	const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

	function show(immediate = false) {
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setOpen(true), immediate ? 0 : delay);
	}

	function hide() {
		clearTimeout(timer.current);
		setOpen(false);
	}

	useEffect(() => {
		if (!open || !wrapper.current || !floating.current) return;
		return anchor(wrapper.current, floating.current, { placement, gap: 6 });
	}, [open, placement]);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: globalThis.KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);

	return (
		<>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: the child carries the semantics; this only measures */}
			<span
				ref={wrapper}
				className="inline-flex"
				aria-describedby={open ? id : undefined}
				onPointerEnter={() => show()}
				onPointerLeave={hide}
				onFocus={() => show(true)}
				onBlur={hide}
			>
				{children}
			</span>

			{open ? (
				<div
					ref={floating}
					id={id}
					role="tooltip"
					className={cn(
						"anchored pointer-events-none z-50 rounded-md border border-border bg-popover px-2 py-1 text-foreground text-xs shadow-lg",
						className,
					)}
				>
					{label}
				</div>
			) : null}
		</>
	);
}
