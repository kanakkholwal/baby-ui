"use client";

import type { KeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import { captureRows } from "../lib/flip";

export type ReorderItem = { id: string; label: string };

export interface ReorderListProps {
	items: ReorderItem[];
	label?: string;
	disabled?: boolean;
	className?: string;
	onItemsChange: (items: ReorderItem[]) => void;
}

type Session = {
	id: string;
	node: HTMLElement;
	pointerId: number;
	startY: number;
	grabOffset: number;
	centers: { id: string; center: number }[];
};

const THRESHOLD = 5;

export function ReorderList({
	items,
	label = "Reorderable list",
	disabled = false,
	className,
	onItemsChange,
}: ReorderListProps) {
	const uid = useRef(`reorder-${Math.random().toString(36).slice(2, 8)}`).current;
	const listEl = useRef<HTMLOListElement>(null);
	const session = useRef<Session | null>(null);
	const snapshot = useRef<ReorderItem[] | null>(null);
	const play = useRef<((duration?: number) => void) | null>(null);
	const [grabbed, setGrabbed] = useState<string | null>(null);
	const [dragging, setDragging] = useState<string | null>(null);
	const [spoken, setSpoken] = useState("");

	// The list has already re-rendered by here, so the captured rows can play.
	useEffect(() => {
		play.current?.();
		play.current = null;
	}, []);

	function indexOf(id: string) {
		return items.findIndex((item) => item.id === id);
	}

	function commit(next: ReorderItem[]) {
		if (listEl.current) {
			const run = captureRows(listEl.current, dragging ?? undefined);
			requestAnimationFrame(() => run());
		}
		onItemsChange(next);
	}

	function move(from: number, to: number) {
		if (to < 0 || to >= items.length || from === to) return;
		const next = [...items];
		const [moved] = next.splice(from, 1);
		if (moved) next.splice(to, 0, moved);
		commit(next);
	}

	function announce(id: string, verb: string) {
		const index = indexOf(id);
		if (index < 0) return;
		setSpoken(`${items[index]?.label}, ${verb} ${index + 1} of ${items.length}.`);
	}

	const release = useCallback(() => {
		const current = session.current;
		if (!current) return;
		current.node.style.removeProperty("translate");
		current.node.style.removeProperty("will-change");
		if (listEl.current?.hasPointerCapture(current.pointerId)) {
			listEl.current.releasePointerCapture(current.pointerId);
		}
		session.current = null;
	}, []);

	const cancel = useCallback(() => {
		const original = snapshot.current;
		const active = Boolean(session.current || grabbed);
		snapshot.current = null;
		setGrabbed(null);
		setDragging(null);
		release();
		if (original && active) {
			onItemsChange(original);
			setSpoken("Reorder cancelled, original order restored.");
		}
	}, [grabbed, onItemsChange, release]);

	function step(id: string, delta: -1 | 1) {
		const from = indexOf(id);
		move(from, from + delta);
		announce(id, "moved to position");
		requestAnimationFrame(() => {
			listEl.current
				?.querySelector<HTMLElement>(`[data-reorder-id="${CSS.escape(id)}"]`)
				?.focus({ preventScroll: true });
		});
	}

	function onKeyDown(event: KeyboardEvent, id: string) {
		if (disabled) return;
		const held = grabbed === id;
		if (event.key === " " || event.key === "Enter") {
			event.preventDefault();
			if (held) {
				setGrabbed(null);
				snapshot.current = null;
				announce(id, "dropped at position");
			} else {
				snapshot.current = [...items];
				setGrabbed(id);
				announce(id, "grabbed at position");
			}
		} else if (held && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
			event.preventDefault();
			step(id, event.key === "ArrowUp" ? -1 : 1);
		} else if (held && event.key === "Escape") {
			event.preventDefault();
			cancel();
		}
	}

	function reposition(current: Session, clientY: number) {
		const rowTop = current.node.getBoundingClientRect().top;
		const offset = Number.parseFloat(current.node.style.translate.replace("px", "")) || 0;
		current.node.style.translate = `0 ${offset + (clientY - current.grabOffset - rowTop)}px`;
	}

	function onPointerDown(event: ReactPointerEvent, id: string) {
		if (disabled || grabbed || session.current || event.button !== 0) return;
		const node = event.currentTarget as HTMLElement;
		const rect = node.getBoundingClientRect();
		snapshot.current = [...items];
		session.current = {
			id,
			node,
			pointerId: event.pointerId,
			startY: event.clientY,
			grabOffset: event.clientY - rect.top,
			centers: [
				...(listEl.current?.querySelectorAll<HTMLElement>("[data-reorder-id]") ?? []),
			].map((el) => {
				const box = el.getBoundingClientRect();
				return { id: el.dataset.reorderId ?? "", center: box.top + box.height / 2 };
			}),
		};
		event.preventDefault();
		node.focus({ preventScroll: true });
		listEl.current?.setPointerCapture(event.pointerId);
	}

	useEffect(() => {
		function onMove(event: PointerEvent) {
			const current = session.current;
			if (!current || current.pointerId !== event.pointerId) return;
			if (!dragging) {
				if (Math.abs(event.clientY - current.startY) < THRESHOLD) return;
				setDragging(current.id);
				current.node.style.setProperty("will-change", "translate");
			}
			reposition(current, event.clientY);

			// Centres were measured once, so the drop index is stable while rows animate.
			const from = items.findIndex((item) => item.id === current.id);
			const to = current.centers.filter(
				(entry) => entry.id !== current.id && event.clientY > entry.center,
			).length;
			if (from >= 0 && to !== from && to < items.length) {
				const next = [...items];
				const [moved] = next.splice(from, 1);
				if (moved) next.splice(to, 0, moved);
				if (listEl.current) {
					const run = captureRows(listEl.current, current.id);
					requestAnimationFrame(() => run());
				}
				onItemsChange(next);
			}
		}

		function onUp(event: PointerEvent) {
			const current = session.current;
			if (!current || current.pointerId !== event.pointerId) return;
			const moved = dragging === current.id;
			const id = current.id;
			setDragging(null);
			snapshot.current = null;
			release();
			if (moved) {
				const index = items.findIndex((item) => item.id === id);
				if (index >= 0) {
					setSpoken(
						`${items[index]?.label}, dropped at position ${index + 1} of ${items.length}.`,
					);
				}
			}
		}

		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", onUp);
		window.addEventListener("pointercancel", cancel);
		return () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onUp);
			window.removeEventListener("pointercancel", cancel);
		};
	}, [cancel, dragging, items, onItemsChange, release]);

	return (
		<div className={cn("w-full", className)}>
			<ol
				ref={listEl}
				aria-label={label}
				className="m-0 flex list-none flex-col gap-1.5 p-0"
			>
				{items.map((item, i) => {
					const lifted = grabbed === item.id || dragging === item.id;
					return (
						<li key={item.id} data-flip-key={item.id}>
							<button
								type="button"
								data-reorder-id={item.id}
								aria-pressed={lifted}
								aria-describedby={`${uid}-hint`}
								disabled={disabled}
								onKeyDown={(e) => onKeyDown(e, item.id)}
								onPointerDown={(e) => onPointerDown(e, item.id)}
								onDragStart={(e) => e.preventDefault()}
								className={cn(
									"relative flex w-full touch-pinch-zoom select-none items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-foreground text-sm outline-none",
									"transition-[background-color,border-color,box-shadow] duration-[var(--duration-press)] ease-[var(--ease-out)] motion-reduce:transition-none",
									"focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
									lifted
										? "z-10 cursor-grabbing border-primary bg-card shadow-lg"
										: "cursor-grab border-border bg-card hover:border-border-strong enabled:active:cursor-grabbing",
								)}
							>
								<svg
									viewBox="0 0 10 14"
									aria-hidden
									className="h-3.5 w-2.5 shrink-0 fill-current text-muted-foreground"
								>
									<circle cx="2.5" cy="2.5" r="1.2" />
									<circle cx="7.5" cy="2.5" r="1.2" />
									<circle cx="2.5" cy="7" r="1.2" />
									<circle cx="7.5" cy="7" r="1.2" />
									<circle cx="2.5" cy="11.5" r="1.2" />
									<circle cx="7.5" cy="11.5" r="1.2" />
								</svg>
								<span className="min-w-0 flex-1 truncate">{item.label}</span>
								<span className="font-mono text-[11px] text-muted-foreground tabular-nums">
									{i + 1}
								</span>
							</button>
						</li>
					);
				})}
			</ol>

			<span id={`${uid}-hint`} className="sr-only">
				Drag to reorder. With the keyboard, Space grabs the row, the arrow keys move it,
				Space drops it, and Escape restores the original order.
			</span>
			<span role="status" aria-live="polite" className="sr-only">
				{spoken}
			</span>
		</div>
	);
}
