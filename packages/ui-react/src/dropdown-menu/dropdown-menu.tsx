"use client";

import type { ComponentProps, KeyboardEvent, ReactNode } from "react";
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
import { ANCHORED, type AnchorPlacement, anchor, dismissable, rove } from "../lib/anchor";
import { cn } from "../lib/cn";

const SURFACE = "min-w-44 rounded-xl border border-border bg-popover p-1 shadow-2xl";

type Ctx = {
	open: boolean;
	contentId: string;
	setOpen: (open: boolean) => void;
	close: () => void;
	setTrigger: (el: HTMLElement | null) => void;
	setContent: (el: HTMLElement | null) => void;
};

const MenuCtx = createContext<Ctx | null>(null);

function useMenu() {
	const ctx = useContext(MenuCtx);
	if (!ctx) throw new Error("DropdownMenu parts must be used inside <DropdownMenu>");
	return ctx;
}

export function DropdownMenu({
	children,
	open: openProp,
	defaultOpen = false,
	placement = "bottom-start",
	onOpenChange,
}: {
	children?: ReactNode;
	open?: boolean;
	defaultOpen?: boolean;
	placement?: AnchorPlacement;
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

	const close = useCallback(() => {
		setOpen(false);
		triggerEl?.focus();
	}, [setOpen, triggerEl]);

	useEffect(() => {
		if (!open || !triggerEl || !contentEl) return;
		const stopAnchor = anchor(triggerEl, contentEl, { placement, gap: 6 });
		const stopDismiss = dismissable([triggerEl, contentEl], close);
		return () => {
			stopAnchor();
			stopDismiss();
		};
	}, [open, triggerEl, contentEl, placement, close]);

	const ctx = useMemo(
		() => ({ open, contentId, setOpen, close, setTrigger, setContent }),
		[open, contentId, setOpen, close],
	);

	return <MenuCtx.Provider value={ctx}>{children}</MenuCtx.Provider>;
}

export function DropdownMenuTrigger({ className, ...props }: ComponentProps<"button">) {
	const menu = useMenu();

	return (
		<button
			ref={menu.setTrigger}
			type="button"
			data-slot="dropdown-menu-trigger"
			data-state={menu.open ? "open" : "closed"}
			aria-haspopup="menu"
			aria-expanded={menu.open}
			aria-controls={menu.open ? menu.contentId : undefined}
			onClick={() => menu.setOpen(!menu.open)}
			className={cn(
				"inline-flex rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring",
				className,
			)}
			{...props}
		/>
	);
}

export function DropdownMenuContent({
	className,
	children,
	...props
}: ComponentProps<"div">) {
	const menu = useMenu();
	const el = useRef<HTMLDivElement | null>(null);
	const [index, setIndex] = useState(0);

	const rows = useCallback(
		() => [
			...(el.current?.querySelectorAll<HTMLElement>(
				"[role='menuitem']:not([disabled])",
			) ?? []),
		],
		[],
	);

	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		if (!menu.open) return;
		setMounted(true);
		setIndex(0);
		rows()[0]?.focus();
		// mounted is a dependency: the rows only exist on the render after it flips.
	}, [menu.open, mounted, rows]);

	function onKeyDown(event: KeyboardEvent) {
		const all = rows();
		const next = rove(all, index, event.key);
		if (next === null) return;
		event.preventDefault();
		setIndex(next);
		all[next]?.focus();
	}

	// Kept mounted after the first open so the surface can animate out as well as in.
	if (!mounted) return null;

	return (
		<div
			ref={(node) => {
				el.current = node;
				menu.setContent(node);
			}}
			id={menu.contentId}
			role="menu"
			tabIndex={-1}
			data-slot="dropdown-menu-content"
			data-state={menu.open ? "open" : "closed"}
			inert={!menu.open}
			onKeyDown={onKeyDown}
			className={cn(ANCHORED, SURFACE, className)}
			{...props}
		>
			{children}
		</div>
	);
}

export function DropdownMenuItem({
	className,
	destructive = false,
	onClick,
	...props
}: ComponentProps<"button"> & { destructive?: boolean }) {
	const menu = useMenu();

	return (
		<button
			type="button"
			role="menuitem"
			data-slot="dropdown-menu-item"
			onClick={(event) => {
				onClick?.(event);
				menu.close();
			}}
			className={cn(
				"flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-sm outline-none transition-colors",
				"hover:bg-foreground/[0.06] focus-visible:bg-foreground/[0.06]",
				"disabled:pointer-events-none disabled:opacity-50",
				destructive ? "text-[var(--destructive)]" : "text-foreground",
				className,
			)}
			{...props}
		/>
	);
}

export function DropdownMenuLabel({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="dropdown-menu-label"
			className={cn("px-2.5 py-1.5 font-medium text-muted-foreground text-xs", className)}
			{...props}
		/>
	);
}

export function DropdownMenuSeparator({ className, ...props }: ComponentProps<"hr">) {
	return (
		<hr
			data-slot="dropdown-menu-separator"
			className={cn("-mx-1 my-1 border-border", className)}
			{...props}
		/>
	);
}
