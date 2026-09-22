"use client";

import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import type { ComponentProps } from "react";
import { ANCHORED, stagger } from "../lib/anchor";
import { cn } from "../lib/cn";
import { MENU_SHORTCUT, MENU_SURFACE, type MenuItemVariant, menuItem } from "../lib/menu";

export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuSub = ContextMenuPrimitive.Sub;

export function ContextMenuTrigger({
	className,
	...props
}: ComponentProps<typeof ContextMenuPrimitive.Trigger>) {
	return (
		<ContextMenuPrimitive.Trigger
			data-slot="context-menu-trigger"
			className={cn("contents", className)}
			{...props}
		/>
	);
}

export function ContextMenuContent({
	className,
	...props
}: ComponentProps<typeof ContextMenuPrimitive.Content>) {
	return (
		<ContextMenuPrimitive.Portal>
			<ContextMenuPrimitive.Content
				data-slot="context-menu-content"
				ref={(node) => {
					if (node) stagger(node.querySelectorAll<HTMLElement>("[role='menuitem']"));
				}}
				className={cn(ANCHORED, MENU_SURFACE, className)}
				{...props}
			/>
		</ContextMenuPrimitive.Portal>
	);
}

export function ContextMenuItem({
	className,
	destructive = false,
	inset = false,
	...props
}: ComponentProps<typeof ContextMenuPrimitive.Item> & {
	destructive?: boolean;
	inset?: boolean;
}) {
	const variant: MenuItemVariant = destructive ? "destructive" : "default";

	return (
		<ContextMenuPrimitive.Item
			data-slot="context-menu-item"
			data-inset={inset || undefined}
			className={cn(menuItem({ variant }), className)}
			{...props}
		/>
	);
}

export function ContextMenuShortcut({ className, ...props }: ComponentProps<"kbd">) {
	return (
		<kbd
			data-slot="context-menu-shortcut"
			className={cn(MENU_SHORTCUT, className)}
			{...props}
		/>
	);
}

export function ContextMenuLabel({
	className,
	inset = false,
	...props
}: ComponentProps<"div"> & { inset?: boolean }) {
	return (
		<div
			data-slot="context-menu-label"
			data-inset={inset || undefined}
			className={cn(
				"px-2.5 py-1.5 font-medium text-muted-foreground text-xs data-[inset]:pl-8",
				className,
			)}
			{...props}
		/>
	);
}

export function ContextMenuSeparator({
	className,
	...props
}: ComponentProps<typeof ContextMenuPrimitive.Separator>) {
	return (
		<ContextMenuPrimitive.Separator
			data-slot="context-menu-separator"
			className={cn("-mx-1 my-1 border-border", className)}
			{...props}
		/>
	);
}

export function ContextMenuSubTrigger({
	className,
	inset = false,
	children,
	...props
}: ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & { inset?: boolean }) {
	return (
		<ContextMenuPrimitive.SubTrigger
			data-slot="context-menu-sub-trigger"
			data-inset={inset || undefined}
			className={cn(
				menuItem({ variant: "default" }),
				"data-[state=open]:bg-foreground/[0.06]",
				className,
			)}
			{...props}
		>
			<span className="min-w-0 flex-1 truncate text-left">{children}</span>
			<svg
				viewBox="0 0 16 16"
				fill="none"
				aria-hidden
				className="ml-2 size-3.5 shrink-0 text-muted-foreground"
			>
				<path
					d="m6 3.5 4.5 4.5L6 12.5"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</ContextMenuPrimitive.SubTrigger>
	);
}

export function ContextMenuSubContent({
	className,
	...props
}: ComponentProps<typeof ContextMenuPrimitive.SubContent>) {
	return (
		<ContextMenuPrimitive.Portal>
			<ContextMenuPrimitive.SubContent
				data-slot="context-menu-sub-content"
				className={cn(ANCHORED, MENU_SURFACE, "min-w-40", className)}
				{...props}
			/>
		</ContextMenuPrimitive.Portal>
	);
}
