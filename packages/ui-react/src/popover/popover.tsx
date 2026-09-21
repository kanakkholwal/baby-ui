"use client";

import type { ComponentProps, ReactNode } from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useId,
	useLayoutEffect,
	useMemo,
	useState,
} from "react";
import { ANCHORED, type AnchorPlacement, anchor, dismissable } from "../lib/anchor";
import { cn } from "../lib/cn";

type Ctx = {
	open: boolean;
	contentId: string;
	setOpen: (open: boolean) => void;
	setTrigger: (el: HTMLElement | null) => void;
	setContent: (el: HTMLElement | null) => void;
};

const PopoverCtx = createContext<Ctx | null>(null);

function usePopover() {
	const ctx = useContext(PopoverCtx);
	if (!ctx) throw new Error("Popover parts must be used inside <Popover>");
	return ctx;
}

export function Popover({
	children,
	open: openProp,
	defaultOpen = false,
	placement = "bottom-start",
	gap = 6,
	onOpenChange,
}: {
	children?: ReactNode;
	open?: boolean;
	defaultOpen?: boolean;
	placement?: AnchorPlacement;
	gap?: number;
	onOpenChange?: (open: boolean) => void;
}) {
	const contentId = useId();
	const [internal, setInternal] = useState(defaultOpen);
	const [triggerEl, setTrigger] = useState<HTMLElement | null>(null);
	const [contentEl, setContent] = useState<HTMLElement | null>(null);
	const open = openProp ?? internal;

	const setOpen = useCallback(
		(next: boolean) => {
			if (openProp === undefined) setInternal(next);
			onOpenChange?.(next);
		},
		[openProp, onOpenChange],
	);

	useLayoutEffect(() => {
		if (!open || !triggerEl || !contentEl) return;
		const stopAnchor = anchor(triggerEl, contentEl, { placement, gap });
		const stopDismiss = dismissable([triggerEl, contentEl], () => {
			setOpen(false);
			triggerEl.focus();
		});
		return () => {
			stopAnchor();
			stopDismiss();
		};
	}, [open, triggerEl, contentEl, placement, gap, setOpen]);

	const ctx = useMemo(
		() => ({ open, contentId, setOpen, setTrigger, setContent }),
		[open, contentId, setOpen],
	);

	return <PopoverCtx.Provider value={ctx}>{children}</PopoverCtx.Provider>;
}

export function PopoverTrigger({ className, ...props }: ComponentProps<"button">) {
	const popover = usePopover();

	return (
		<button
			ref={popover.setTrigger}
			type="button"
			data-slot="popover-trigger"
			data-state={popover.open ? "open" : "closed"}
			aria-expanded={popover.open}
			aria-controls={popover.open ? popover.contentId : undefined}
			onClick={() => popover.setOpen(!popover.open)}
			className={cn(
				"inline-flex rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring",
				className,
			)}
			{...props}
		/>
	);
}

export function PopoverContent({ className, ...props }: ComponentProps<"div">) {
	const popover = usePopover();
	// Kept mounted after the first open so the surface can animate out as well as in.
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		if (popover.open) setMounted(true);
	}, [popover.open]);

	if (!mounted) return null;

	return (
		<div
			ref={popover.setContent}
			id={popover.contentId}
			role="dialog"
			data-slot="popover-content"
			data-state={popover.open ? "open" : "closed"}
			inert={!popover.open}
			className={cn(
				ANCHORED,
				"w-72 rounded-xl border border-border bg-popover p-3 text-sm shadow-2xl",
				className,
			)}
			{...props}
		/>
	);
}
