"use client";

import type { ComponentProps, ReactNode } from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";
import { type AnchorPlacement, anchor } from "../lib/anchor";
import { cn } from "../lib/cn";

type Ctx = {
	open: boolean;
	contentId: string;
	schedule: (open: boolean) => void;
	setTrigger: (el: HTMLElement | null) => void;
	setContent: (el: HTMLElement | null) => void;
};

const HoverCardCtx = createContext<Ctx | null>(null);

function useHoverCard() {
	const ctx = useContext(HoverCardCtx);
	if (!ctx) throw new Error("HoverCard parts must be used inside <HoverCard>");
	return ctx;
}

export function HoverCard({
	children,
	placement = "bottom-start",
	openDelay = 300,
	closeDelay = 150,
}: {
	children?: ReactNode;
	placement?: AnchorPlacement;
	openDelay?: number;
	closeDelay?: number;
}) {
	const contentId = useId();
	const [open, setOpen] = useState(false);
	const [triggerEl, setTrigger] = useState<HTMLElement | null>(null);
	const [contentEl, setContent] = useState<HTMLElement | null>(null);
	const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	// The close delay is what lets the pointer cross the gap into the card.
	const schedule = useCallback(
		(next: boolean) => {
			clearTimeout(timer.current);
			timer.current = setTimeout(() => setOpen(next), next ? openDelay : closeDelay);
		},
		[openDelay, closeDelay],
	);

	useEffect(() => {
		if (!open || !triggerEl || !contentEl) return;
		return anchor(triggerEl, contentEl, { placement, gap: 8 });
	}, [open, triggerEl, contentEl, placement]);

	const ctx = useMemo(
		() => ({ open, contentId, schedule, setTrigger, setContent }),
		[open, contentId, schedule],
	);

	return <HoverCardCtx.Provider value={ctx}>{children}</HoverCardCtx.Provider>;
}

export function HoverCardTrigger({ className, ...props }: ComponentProps<"span">) {
	const card = useHoverCard();

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: the wrapper only listens; the real control is its child
		<span
			ref={card.setTrigger}
			data-slot="hover-card-trigger"
			data-state={card.open ? "open" : "closed"}
			aria-describedby={card.open ? card.contentId : undefined}
			onPointerEnter={() => card.schedule(true)}
			onPointerLeave={() => card.schedule(false)}
			onFocus={() => card.schedule(true)}
			onBlur={() => card.schedule(false)}
			className={cn("inline-flex", className)}
			{...props}
		/>
	);
}

export function HoverCardContent({ className, ...props }: ComponentProps<"div">) {
	const card = useHoverCard();
	if (!card.open) return null;

	return (
		<div
			ref={card.setContent}
			id={card.contentId}
			role="dialog"
			tabIndex={-1}
			data-slot="hover-card-content"
			data-state="open"
			onPointerEnter={() => card.schedule(true)}
			onPointerLeave={() => card.schedule(false)}
			className={cn(
				"anchored z-50 w-64 rounded-xl border border-border bg-popover p-3 text-sm shadow-2xl",
				className,
			)}
			{...props}
		/>
	);
}
