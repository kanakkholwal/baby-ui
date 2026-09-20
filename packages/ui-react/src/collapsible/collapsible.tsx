"use client";

import type { ComponentProps } from "react";
import { createContext, useContext, useId, useState } from "react";
import { cn } from "../lib/cn";

type Ctx = { open: boolean; contentId: string; toggle: () => void };

const CollapsibleCtx = createContext<Ctx | null>(null);

function useCollapsible() {
	const ctx = useContext(CollapsibleCtx);
	if (!ctx) throw new Error("Collapsible parts must be used inside <Collapsible>");
	return ctx;
}

export function Collapsible({
	className,
	open: openProp,
	defaultOpen = false,
	disabled = false,
	onOpenChange,
	children,
	...props
}: ComponentProps<"div"> & {
	open?: boolean;
	defaultOpen?: boolean;
	disabled?: boolean;
	onOpenChange?: (open: boolean) => void;
}) {
	const contentId = useId();
	const [internal, setInternal] = useState(defaultOpen);
	const open = openProp ?? internal;

	function toggle() {
		if (disabled) return;
		const next = !open;
		if (openProp === undefined) setInternal(next);
		onOpenChange?.(next);
	}

	return (
		<CollapsibleCtx.Provider value={{ open, contentId, toggle }}>
			<div
				data-slot="collapsible"
				data-state={open ? "open" : "closed"}
				className={cn("w-full", className)}
				{...props}
			>
				{children}
			</div>
		</CollapsibleCtx.Provider>
	);
}

export function CollapsibleTrigger({
	className,
	children,
	...props
}: ComponentProps<"button">) {
	const { open, contentId, toggle } = useCollapsible();

	return (
		<button
			type="button"
			data-slot="collapsible-trigger"
			data-state={open ? "open" : "closed"}
			aria-expanded={open}
			aria-controls={contentId}
			onClick={toggle}
			className={cn(
				"flex w-full items-center gap-2 rounded-lg px-1 py-1.5 text-left font-medium text-foreground text-sm transition-colors hover:text-muted-foreground",
				className,
			)}
			{...props}
		>
			<svg
				viewBox="0 0 16 16"
				fill="none"
				aria-hidden
				style={{ transform: open ? "rotate(90deg)" : "none" }}
				className="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ease-[var(--ease-out)] motion-reduce:transition-none"
			>
				<path
					d="m6 4 4 4-4 4"
					stroke="currentColor"
					strokeWidth="1.4"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			{children}
		</button>
	);
}

export function CollapsibleContent({
	className,
	children,
	...props
}: ComponentProps<"div">) {
	const { open, contentId } = useCollapsible();

	// grid-template-rows animates to content height without measuring it.
	return (
		<div
			id={contentId}
			data-slot="collapsible-content"
			data-state={open ? "open" : "closed"}
			style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
			className="grid transition-[grid-template-rows] duration-200 ease-[var(--ease-out)] motion-reduce:transition-none"
			{...props}
		>
			<div className="overflow-hidden">
				<div className={cn("px-1 pb-2 text-muted-foreground text-sm", className)}>
					{children}
				</div>
			</div>
		</div>
	);
}
