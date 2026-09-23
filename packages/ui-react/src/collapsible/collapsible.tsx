"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import type { ComponentProps } from "react";
import { cn } from "../lib/cn";

export function Collapsible({
	className,
	open,
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
	return (
		<CollapsiblePrimitive.Root
			open={open}
			defaultOpen={defaultOpen}
			disabled={disabled}
			onOpenChange={onOpenChange}
			data-slot="collapsible"
			className={cn("w-full", className)}
			{...props}
		>
			{children}
		</CollapsiblePrimitive.Root>
	);
}

export function CollapsibleTrigger({
	className,
	children,
	...props
}: ComponentProps<typeof CollapsiblePrimitive.Trigger>) {
	return (
		<CollapsiblePrimitive.Trigger
			data-slot="collapsible-trigger"
			className={cn(
				"flex w-full items-center gap-2 rounded-lg px-1 py-1.5 text-left font-medium text-foreground text-sm transition-colors hover:text-muted-foreground",
				"[&>svg]:transition-[transform,scale,translate] [&>svg]:duration-[var(--duration-dropdown)] [&>svg]:ease-[var(--ease-out)] [&[data-panel-open]>svg]:rotate-90 motion-reduce:[&>svg]:transition-none",
				className,
			)}
			{...props}
		>
			<svg
				viewBox="0 0 16 16"
				fill="none"
				aria-hidden
				className="size-3.5 shrink-0 text-muted-foreground"
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
		</CollapsiblePrimitive.Trigger>
	);
}

export function CollapsibleContent({
	className,
	children,
	...props
}: ComponentProps<typeof CollapsiblePrimitive.Panel>) {
	// keepMounted still leaves a `hidden` attribute here (unlike Accordion's panel); Tailwind's
	// preflight makes `[hidden]` `!important`, so force it off to keep a prior frame to animate from.
	return (
		<CollapsiblePrimitive.Panel
			keepMounted
			hidden={false}
			data-slot="collapsible-content"
			className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] data-[open]:grid-rows-[1fr] motion-reduce:transition-none"
			{...props}
		>
			<div className="overflow-hidden">
				<div className={cn("px-1 pb-2 text-muted-foreground text-sm", className)}>
					{children}
				</div>
			</div>
		</CollapsiblePrimitive.Panel>
	);
}
