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
	useRef,
	useState,
} from "react";
import { ANCHORED, type AnchorPlacement, anchor } from "../lib/anchor";
import { cn } from "../lib/cn";

type Ctx = {
	open: boolean;
	contentId: string;
	show: (immediate?: boolean) => void;
	hide: () => void;
	setTrigger: (el: HTMLElement | null) => void;
	setContent: (el: HTMLElement | null) => void;
};

const TooltipCtx = createContext<Ctx | null>(null);

function useTooltip() {
	const ctx = useContext(TooltipCtx);
	if (!ctx) throw new Error("Tooltip parts must be used inside <Tooltip>");
	return ctx;
}

// shadcn wraps tooltips in a provider; ours needs no shared state, so this exists
// only so the same markup compiles here.
export function TooltipProvider({ children }: { children?: ReactNode }) {
	return <>{children}</>;
}

export function Tooltip({
	children,
	placement = "top",
	delay = 400,
}: {
	children?: ReactNode;
	placement?: AnchorPlacement;
	delay?: number;
}) {
	const contentId = useId();
	const [open, setOpen] = useState(false);
	const [triggerEl, setTrigger] = useState<HTMLElement | null>(null);
	const [contentEl, setContent] = useState<HTMLElement | null>(null);
	const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

	// Keyboard focus skips the delay: the user has already committed to the control.
	const show = useCallback(
		(immediate = false) => {
			clearTimeout(timer.current);
			timer.current = setTimeout(() => setOpen(true), immediate ? 0 : delay);
		},
		[delay],
	);

	const hide = useCallback(() => {
		clearTimeout(timer.current);
		setOpen(false);
	}, []);

	useLayoutEffect(() => {
		if (!open || !triggerEl || !contentEl) return;
		return anchor(triggerEl, contentEl, { placement, gap: 6 });
	}, [open, triggerEl, contentEl, placement]);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);

	const ctx = useMemo(
		() => ({ open, contentId, show, hide, setTrigger, setContent }),
		[open, contentId, show, hide],
	);

	return <TooltipCtx.Provider value={ctx}>{children}</TooltipCtx.Provider>;
}

export function TooltipTrigger({ className, ...props }: ComponentProps<"span">) {
	const tooltip = useTooltip();

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: the wrapper only listens; the real control is its child
		<span
			ref={tooltip.setTrigger}
			data-slot="tooltip-trigger"
			data-state={tooltip.open ? "open" : "closed"}
			aria-describedby={tooltip.open ? tooltip.contentId : undefined}
			onPointerEnter={() => tooltip.show()}
			onPointerLeave={tooltip.hide}
			onFocus={() => tooltip.show(true)}
			onBlur={tooltip.hide}
			className={cn("inline-flex", className)}
			{...props}
		/>
	);
}

export function TooltipContent({ className, ...props }: ComponentProps<"div">) {
	const tooltip = useTooltip();
	// Kept mounted after the first open so the surface can animate out as well as in.
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		if (tooltip.open) setMounted(true);
	}, [tooltip.open]);

	if (!mounted) return null;

	return (
		<div
			ref={tooltip.setContent}
			id={tooltip.contentId}
			role="tooltip"
			data-slot="tooltip-content"
			data-state={tooltip.open ? "open" : "closed"}
			inert={!tooltip.open}
			className={cn(
				ANCHORED,
				"rounded-md border border-border bg-popover px-2 py-1 text-foreground text-xs shadow-lg",
				"data-[state=open]:pointer-events-none",
				className,
			)}
			{...props}
		/>
	);
}
