"use client";

import type { MouseEvent, ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { dismissable } from "../lib/anchor";
import { cn } from "../lib/cn";

export type ContextItem = { id: string; label: string; destructive?: boolean };

export interface ContextMenuProps {
	children: ReactNode;
	items: ContextItem[];
	className?: string;
	onSelect?: (id: string) => void;
}

export function ContextMenu({ children, items, className, onSelect }: ContextMenuProps) {
	const id = useId();
	const [open, setOpen] = useState(false);
	const [point, setPoint] = useState({ x: 0, y: 0 });
	const floating = useRef<HTMLDivElement>(null);

	function openAt(event: MouseEvent) {
		event.preventDefault();
		setPoint({ x: event.clientX, y: event.clientY });
		setOpen(true);
	}

	// Positioned from a point rather than an element, so it clamps rather than flips.
	useEffect(() => {
		if (!open || !floating.current) return;
		const rect = floating.current.getBoundingClientRect();
		const x = Math.min(point.x, window.innerWidth - rect.width - 8);
		const y = Math.min(point.y, window.innerHeight - rect.height - 8);
		floating.current.style.transform = `translate(${Math.max(8, x)}px, ${Math.max(8, y)}px)`;
		return dismissable([floating.current], () => setOpen(false));
	}, [open, point]);

	return (
		<>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: the wrapper only captures the gesture */}
			<div onContextMenu={openAt} className="contents">
				{children}
			</div>

			{open ? (
				// biome-ignore lint/a11y/useSemanticElements: menu has no HTML element
				<div
					ref={floating}
					id={id}
					role="menu"
					tabIndex={-1}
					style={{ position: "fixed", left: 0, top: 0, transformOrigin: "top left" }}
					className={cn(
						"anchored z-50 min-w-44 rounded-xl border border-border bg-popover p-1 shadow-2xl",
						className,
					)}
				>
					{items.map((item) => (
						<button
							key={item.id}
							type="button"
							role="menuitem"
							onClick={() => {
								onSelect?.(item.id);
								setOpen(false);
							}}
							className={cn(
								"flex w-full items-center rounded-md px-2.5 py-1.5 text-left text-sm outline-none transition-colors hover:bg-foreground/[0.06] focus-visible:bg-foreground/[0.06]",
								item.destructive ? "text-[var(--destructive)]" : "text-foreground",
							)}
						>
							{item.label}
						</button>
					))}
				</div>
			) : null}
		</>
	);
}
