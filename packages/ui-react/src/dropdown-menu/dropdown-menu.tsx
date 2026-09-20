"use client";

import type { KeyboardEvent, ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { type AnchorPlacement, anchor, dismissable, rove } from "../lib/anchor";
import { cn } from "../lib/cn";

export type MenuItem = {
	id: string;
	label: string;
	disabled?: boolean;
	destructive?: boolean;
};

export interface DropdownMenuProps {
	trigger: ReactNode;
	items: MenuItem[];
	placement?: AnchorPlacement;
	className?: string;
	onSelect?: (id: string) => void;
}

export function DropdownMenu({
	trigger,
	items,
	placement = "bottom-start",
	className,
	onSelect,
}: DropdownMenuProps) {
	const id = useId();
	const [open, setOpen] = useState(false);
	const [index, setIndex] = useState(0);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const floating = useRef<HTMLDivElement>(null);

	const enabled = items.filter((i) => !i.disabled);

	function close() {
		setOpen(false);
		triggerRef.current?.focus();
	}

	useEffect(() => {
		if (!open || !triggerRef.current || !floating.current) return;
		setIndex(0);
		const stopAnchor = anchor(triggerRef.current, floating.current, {
			placement,
			gap: 6,
		});
		const stopDismiss = dismissable([triggerRef.current, floating.current], () => {
			setOpen(false);
			triggerRef.current?.focus();
		});
		return () => {
			stopAnchor();
			stopDismiss();
		};
	}, [open, placement]);

	useEffect(() => {
		if (!open || !floating.current) return;
		const rows = [
			...floating.current.querySelectorAll<HTMLElement>(
				"[role='menuitem']:not([disabled])",
			),
		];
		rows[index]?.focus();
	}, [open, index]);

	function onKeyDown(event: KeyboardEvent) {
		const next = rove(enabled as unknown as HTMLElement[], index, event.key);
		if (next === null) return;
		event.preventDefault();
		setIndex(next);
	}

	return (
		<>
			<button
				ref={triggerRef}
				type="button"
				aria-haspopup="menu"
				aria-expanded={open}
				aria-controls={open ? id : undefined}
				onClick={() => setOpen((v) => !v)}
				className="inline-flex rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
			>
				{trigger}
			</button>

			{open ? (
				// biome-ignore lint/a11y/useSemanticElements: menu has no HTML element
				<div
					ref={floating}
					id={id}
					role="menu"
					tabIndex={-1}
					onKeyDown={onKeyDown}
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
							disabled={item.disabled}
							onClick={() => {
								onSelect?.(item.id);
								close();
							}}
							className={cn(
								"flex w-full items-center rounded-md px-2.5 py-1.5 text-left text-sm outline-none transition-colors",
								"hover:bg-foreground/[0.06] focus-visible:bg-foreground/[0.06]",
								"disabled:pointer-events-none disabled:opacity-50",
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
