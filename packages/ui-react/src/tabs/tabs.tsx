"use client";

import type { KeyboardEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";

export type TabItem = { id: string; label: string };

export interface TabsProps {
	tabs: TabItem[];
	value?: string;
	variant?: "pill" | "underline";
	className?: string;
	onValueChange?: (id: string) => void;
	panel?: (id: string) => ReactNode;
}

export function Tabs({
	tabs,
	value,
	variant = "pill",
	className,
	onValueChange,
	panel,
}: TabsProps) {
	const active = value || tabs[0]?.id || "";
	const list = useRef<HTMLDivElement>(null);
	const [rects, setRects] = useState<Record<string, { left: number; width: number }>>({});

	useEffect(() => {
		const measure = () => {
			if (!list.current) return;
			const next: Record<string, { left: number; width: number }> = {};
			for (const el of list.current.querySelectorAll<HTMLElement>("[data-tab]")) {
				const id = el.dataset.tab;
				if (id) next[id] = { left: el.offsetLeft, width: el.offsetWidth };
			}
			setRects(next);
		};
		measure();
		if (!list.current) return;
		const observer = new ResizeObserver(measure);
		observer.observe(list.current);
		return () => observer.disconnect();
	}, []);

	const pill = rects[active] ?? { left: 0, width: 0 };

	function clipFor(id: string) {
		const r = rects[id];
		if (!r) return "inset(0 100% 0 0)";
		const l = Math.max(0, pill.left - r.left);
		const rr = Math.max(0, r.left + r.width - (pill.left + pill.width));
		return `inset(0 ${rr}px 0 ${l}px)`;
	}

	function move(delta: number) {
		const i = tabs.findIndex((t) => t.id === active);
		const next = tabs[(i + delta + tabs.length) % tabs.length];
		if (next) onValueChange?.(next.id);
	}

	function onKeyDown(event: KeyboardEvent) {
		if (event.key === "ArrowRight") {
			event.preventDefault();
			move(1);
		} else if (event.key === "ArrowLeft") {
			event.preventDefault();
			move(-1);
		} else if (event.key === "Home") {
			event.preventDefault();
			onValueChange?.(tabs[0]?.id ?? active);
		} else if (event.key === "End") {
			event.preventDefault();
			onValueChange?.(tabs[tabs.length - 1]?.id ?? active);
		}
	}

	return (
		<div className={className}>
			<div
				ref={list}
				role="tablist"
				className={cn(
					"relative inline-flex items-center",
					variant === "pill"
						? "gap-1 rounded-full bg-card p-1"
						: "gap-1 border-border border-b",
				)}
			>
				<span
					aria-hidden
					style={{ transform: `translateX(${pill.left}px)`, width: pill.width }}
					className={cn(
						"pointer-events-none absolute transition-[transform,width] duration-200 ease-[var(--ease-out)] motion-reduce:transition-none",
						variant === "pill"
							? "top-1 bottom-1 left-0 rounded-full bg-primary"
							: "-bottom-px left-0 h-0.5 bg-foreground",
					)}
				/>

				{tabs.map((tab) => (
					<button
						key={tab.id}
						type="button"
						role="tab"
						data-tab={tab.id}
						id={`tab-${tab.id}`}
						aria-selected={active === tab.id}
						aria-controls={`panel-${tab.id}`}
						tabIndex={active === tab.id ? 0 : -1}
						onClick={() => onValueChange?.(tab.id)}
						onKeyDown={onKeyDown}
						className={cn(
							"relative z-10 inline-flex shrink-0 items-center justify-center whitespace-nowrap px-3.5 py-1.5 font-medium text-muted-foreground text-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
							variant === "pill" ? "rounded-full" : "rounded-md",
						)}
					>
						{tab.label}
						<span
							aria-hidden
							style={{ clipPath: clipFor(tab.id) }}
							className={cn(
								"pointer-events-none absolute inset-0 inline-flex items-center justify-center transition-[clip-path] duration-200 ease-[var(--ease-out)] motion-reduce:transition-none",
								variant === "pill" ? "text-primary-foreground" : "text-foreground",
							)}
						>
							{tab.label}
						</span>
					</button>
				))}
			</div>

			{panel ? (
				<div
					id={`panel-${active}`}
					role="tabpanel"
					aria-labelledby={`tab-${active}`}
					className="mt-4"
				>
					{panel(active)}
				</div>
			) : null}
		</div>
	);
}
