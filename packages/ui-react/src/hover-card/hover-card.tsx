"use client";

import type { ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { type AnchorPlacement, anchor } from "../lib/anchor";
import { cn } from "../lib/cn";

export interface HoverCardProps {
	trigger: ReactNode;
	children: ReactNode;
	placement?: AnchorPlacement;
	openDelay?: number;
	closeDelay?: number;
	className?: string;
}

export function HoverCard({
	trigger,
	children,
	placement = "bottom-start",
	openDelay = 300,
	closeDelay = 150,
	className,
}: HoverCardProps) {
	const id = useId();
	const [open, setOpen] = useState(false);
	const wrapper = useRef<HTMLSpanElement>(null);
	const floating = useRef<HTMLDivElement>(null);
	const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

	function schedule(next: boolean) {
		clearTimeout(timer.current);
		timer.current = setTimeout(() => setOpen(next), next ? openDelay : closeDelay);
	}

	useEffect(() => {
		if (!open || !wrapper.current || !floating.current) return;
		return anchor(wrapper.current, floating.current, { placement, gap: 8 });
	}, [open, placement]);

	return (
		<>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: the child carries the semantics; this only measures */}
			<span
				ref={wrapper}
				className="inline-flex"
				aria-describedby={open ? id : undefined}
				onPointerEnter={() => schedule(true)}
				onPointerLeave={() => schedule(false)}
				onFocus={() => schedule(true)}
				onBlur={() => schedule(false)}
			>
				{trigger}
			</span>

			{open ? (
				<div
					ref={floating}
					id={id}
					role="dialog"
					tabIndex={-1}
					onPointerEnter={() => schedule(true)}
					onPointerLeave={() => schedule(false)}
					className={cn(
						"anchored z-50 w-64 rounded-xl border border-border bg-popover p-3 text-sm shadow-2xl",
						className,
					)}
				>
					{children}
				</div>
			) : null}
		</>
	);
}
