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
import { dismissable } from "../lib/anchor";
import { cn } from "../lib/cn";

const SURFACE =
	"anchored z-50 min-w-44 rounded-xl border border-border bg-popover p-1 shadow-2xl";

type Ctx = {
	open: boolean;
	contentId: string;
	point: { x: number; y: number };
	openAt: (x: number, y: number) => void;
	close: () => void;
};

const ContextMenuCtx = createContext<Ctx | null>(null);

function useContextMenu() {
	const ctx = useContext(ContextMenuCtx);
	if (!ctx) throw new Error("ContextMenu parts must be used inside <ContextMenu>");
	return ctx;
}

export function ContextMenu({ children }: { children?: ReactNode }) {
	const contentId = useId();
	const [open, setOpen] = useState(false);
	const [point, setPoint] = useState({ x: 0, y: 0 });

	const openAt = useCallback((x: number, y: number) => {
		setPoint({ x, y });
		setOpen(true);
	}, []);

	const close = useCallback(() => setOpen(false), []);

	const ctx = useMemo(
		() => ({ open, contentId, point, openAt, close }),
		[open, contentId, point, openAt, close],
	);

	return <ContextMenuCtx.Provider value={ctx}>{children}</ContextMenuCtx.Provider>;
}

export function ContextMenuTrigger({ children }: { children?: ReactNode }) {
	const menu = useContextMenu();

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: a context menu is opened by the platform gesture, not a control
		<div
			data-slot="context-menu-trigger"
			className="contents"
			onContextMenu={(event) => {
				event.preventDefault();
				menu.openAt(event.clientX, event.clientY);
			}}
		>
			{children}
		</div>
	);
}

export function ContextMenuContent({
	className,
	children,
	...props
}: ComponentProps<"div">) {
	const menu = useContextMenu();
	const el = useRef<HTMLDivElement>(null);

	// Positioned from a point rather than an element, so it clamps rather than flips.
	useEffect(() => {
		const node = el.current;
		if (!menu.open || !node) return;
		const rect = node.getBoundingClientRect();
		const x = Math.min(menu.point.x, window.innerWidth - rect.width - 8);
		const y = Math.min(menu.point.y, window.innerHeight - rect.height - 8);
		node.style.transform = `translate(${Math.max(8, x)}px, ${Math.max(8, y)}px)`;
		return dismissable([node], menu.close);
	}, [menu.open, menu.point, menu.close]);

	if (!menu.open) return null;

	return (
		<div
			ref={el}
			id={menu.contentId}
			role="menu"
			tabIndex={-1}
			data-slot="context-menu-content"
			data-state="open"
			style={{ position: "fixed", left: 0, top: 0, transformOrigin: "top left" }}
			className={cn(SURFACE, className)}
			{...props}
		>
			{children}
		</div>
	);
}

export function ContextMenuItem({
	className,
	destructive = false,
	onClick,
	...props
}: ComponentProps<"button"> & { destructive?: boolean }) {
	const menu = useContextMenu();

	return (
		<button
			type="button"
			role="menuitem"
			data-slot="context-menu-item"
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

export function ContextMenuLabel({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="context-menu-label"
			className={cn("px-2.5 py-1.5 font-medium text-muted-foreground text-xs", className)}
			{...props}
		/>
	);
}

export function ContextMenuSeparator({ className, ...props }: ComponentProps<"hr">) {
	return (
		<hr
			data-slot="context-menu-separator"
			className={cn("-mx-1 my-1 border-border", className)}
			{...props}
		/>
	);
}
