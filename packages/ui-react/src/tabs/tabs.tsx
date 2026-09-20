"use client";

import type { KeyboardEvent, ReactNode } from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";

export type TabItem = { id: string; label: string };
export type TabsVariant = "pill" | "underline" | "segment";
export type TabsSize = "sm" | "md" | "lg" | "xl";

export interface TabsProps {
	tabs: TabItem[];
	value?: string;
	variant?: TabsVariant;
	size?: TabsSize;
	className?: string;
	onValueChange?: (id: string) => void;
	panel?: (id: string) => ReactNode;
}

const LIST: Record<TabsVariant, string> = {
	pill: "gap-1 rounded-full bg-card p-1",
	segment: "gap-0.5 rounded-lg bg-card p-0.5",
	underline: "gap-1 border-border border-b",
};

const TRIGGER: Record<TabsSize, string> = {
	sm: "h-7 px-2.5 text-xs",
	md: "h-8 px-3.5 text-sm",
	lg: "h-10 px-4 text-sm",
	xl: "h-12 px-5 text-base",
};

const RADIUS: Record<TabsVariant, string> = {
	pill: "rounded-full",
	segment: "rounded-md",
	underline: "rounded-md",
};

const ARROW =
	"absolute inset-y-0 z-20 inline-flex w-9 items-center justify-center text-foreground transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-0";

export function Tabs({
	tabs,
	value,
	variant = "pill",
	size = "md",
	className,
	onValueChange,
	panel,
}: TabsProps) {
	const active = value || tabs[0]?.id || "";
	const root = useRef<HTMLDivElement>(null);
	const viewport = useRef<HTMLDivElement>(null);
	const list = useRef<HTMLDivElement>(null);
	const [rects, setRects] = useState<Record<string, { left: number; width: number }>>({});
	const [edges, setEdges] = useState({ overflow: false, left: false, right: false });

	const measure = useCallback(() => {
		if (!list.current || !viewport.current || !root.current) return;
		const next: Record<string, { left: number; width: number }> = {};
		for (const el of list.current.querySelectorAll<HTMLElement>("[data-tab]")) {
			const id = el.dataset.tab;
			if (id) next[id] = { left: el.offsetLeft, width: el.offsetWidth };
		}
		setRects(next);

		// Overlay arrows sit above the viewport, so they never shrink its scroll range.
		const port = viewport.current;
		const max = Math.max(0, port.scrollWidth - port.clientWidth);
		const from = Math.max(0, Math.min(max, Math.abs(port.scrollLeft)));
		setEdges({
			overflow: port.scrollWidth > root.current.clientWidth + 1,
			left: from > 1,
			right: from < max - 1,
		});
	}, []);

	useLayoutEffect(() => {
		measure();
	}, [measure]);

	useEffect(() => {
		const port = viewport.current;
		if (!root.current || !port || !list.current) return;
		const observer = new ResizeObserver(measure);
		observer.observe(root.current);
		observer.observe(list.current);
		port.addEventListener("scroll", measure, { passive: true });
		return () => {
			observer.disconnect();
			port.removeEventListener("scroll", measure);
		};
	}, [measure]);

	/** Keep the selected tab clear of the arrows that overlay the faded edges. */
	useEffect(() => {
		const el = list.current?.querySelector<HTMLElement>(
			`[data-tab="${CSS.escape(active)}"]`,
		);
		const port = viewport.current;
		if (!el || !port || !edges.overflow) return;
		const frame = port.getBoundingClientRect();
		const item = el.getBoundingClientRect();
		const left = frame.left + (edges.left ? 36 : 0);
		const right = frame.right - (edges.right ? 36 : 0);
		const delta =
			item.left < left ? item.left - left : item.right > right ? item.right - right : 0;
		if (delta) port.scrollBy({ left: delta, behavior: "smooth" });
	}, [active, edges]);

	const indicator = rects[active] ?? { left: 0, width: 0 };

	function clipFor(id: string) {
		const rect = rects[id];
		if (!rect) return "inset(0 100% 0 0)";
		const left = Math.max(0, indicator.left - rect.left);
		const right = Math.max(
			0,
			rect.left + rect.width - (indicator.left + indicator.width),
		);
		return `inset(0 ${right}px 0 ${left}px)`;
	}

	const mask = edges.overflow
		? `linear-gradient(to right, ${edges.left ? "transparent, black 40px" : "black, black 0"}, ${
				edges.right ? "black calc(100% - 40px), transparent" : "black 100%"
			})`
		: undefined;

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

	function scroll(direction: number) {
		const port = viewport.current;
		if (port)
			port.scrollBy({ left: direction * port.clientWidth * 0.8, behavior: "smooth" });
	}

	return (
		<div className={className}>
			<div
				ref={root}
				className={cn(
					"relative isolate flex w-full min-w-0 max-w-full items-center",
					edges.overflow && variant === "pill" && "rounded-full bg-card",
					edges.overflow && variant === "segment" && "rounded-lg bg-card",
				)}
			>
				{edges.overflow ? (
					<button
						type="button"
						aria-label="Scroll tabs left"
						disabled={!edges.left}
						onClick={() => scroll(-1)}
						className={cn(ARROW, "left-0 rounded-l-full")}
					>
						<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
							<path
								d="M10 3.5 5.5 8l4.5 4.5"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				) : null}

				<div
					ref={viewport}
					style={{ maskImage: mask, WebkitMaskImage: mask }}
					className={cn(
						"scrollbar-none w-full min-w-0 overflow-x-auto",
						edges.overflow && "[border-radius:inherit]",
					)}
				>
					<div
						ref={list}
						role="tablist"
						className={cn("relative inline-flex w-max items-center", LIST[variant])}
					>
						<span
							aria-hidden
							style={{
								transform: `translateX(${indicator.left}px)`,
								width: indicator.width,
							}}
							className={cn(
								"pointer-events-none absolute left-0 transition-[transform,width] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none",
								variant === "pill" && "top-1 bottom-1 rounded-full bg-primary",
								variant === "segment" && "top-0.5 bottom-0.5 rounded-md bg-primary",
								variant === "underline" && "-bottom-px h-0.5 rounded-full bg-primary",
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
									"relative z-10 inline-flex shrink-0 items-center justify-center whitespace-nowrap font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
									variant === "underline" && "aria-selected:text-foreground",
									RADIUS[variant],
									TRIGGER[size],
								)}
							>
								{tab.label}
								{variant !== "underline" ? (
									<span
										aria-hidden
										style={{ clipPath: clipFor(tab.id) }}
										className="pointer-events-none absolute inset-0 inline-flex items-center justify-center text-primary-foreground transition-[clip-path] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none"
									>
										{tab.label}
									</span>
								) : null}
							</button>
						))}
					</div>
				</div>

				{edges.overflow ? (
					<button
						type="button"
						aria-label="Scroll tabs right"
						disabled={!edges.right}
						onClick={() => scroll(1)}
						className={cn(ARROW, "right-0 rounded-r-full")}
					>
						<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
							<path
								d="M6 3.5 10.5 8 6 12.5"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				) : null}
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
