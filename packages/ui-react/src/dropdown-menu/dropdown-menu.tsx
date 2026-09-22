"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import type { ComponentProps } from "react";
import { ANCHORED, stagger, UNFOLD, UNFOLD_ITEM } from "../lib/anchor";
import { cn } from "../lib/cn";
import { MENU_SHORTCUT, MENU_SURFACE, type MenuItemVariant, menuItem } from "../lib/menu";

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

export function DropdownMenuTrigger({
	className,
	...props
}: ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
	return (
		<DropdownMenuPrimitive.Trigger
			data-slot="dropdown-menu-trigger"
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
	sideOffset = 6,
	align = "start",
	...props
}: ComponentProps<typeof DropdownMenuPrimitive.Content>) {
	return (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.Content
				data-slot="dropdown-menu-content"
				sideOffset={sideOffset}
				align={align}
				ref={(node) => {
					if (node) stagger(node.querySelectorAll<HTMLElement>("[role='menuitem']"));
				}}
				className={cn(UNFOLD, MENU_SURFACE, className)}
				{...props}
			/>
		</DropdownMenuPrimitive.Portal>
	);
}

export function DropdownMenuItem({
	className,
	destructive = false,
	inset = false,
	...props
}: ComponentProps<typeof DropdownMenuPrimitive.Item> & {
	destructive?: boolean;
	inset?: boolean;
}) {
	const variant: MenuItemVariant = destructive ? "destructive" : "default";

	return (
		<DropdownMenuPrimitive.Item
			data-slot="dropdown-menu-item"
			data-inset={inset || undefined}
			className={cn(UNFOLD_ITEM, menuItem({ variant }), className)}
			{...props}
		/>
	);
}

export function DropdownMenuShortcut({ className, ...props }: ComponentProps<"kbd">) {
	return (
		<kbd
			data-slot="dropdown-menu-shortcut"
			className={cn(MENU_SHORTCUT, className)}
			{...props}
		/>
	);
}

export function DropdownMenuLabel({
	className,
	inset = false,
	...props
}: ComponentProps<"div"> & { inset?: boolean }) {
	return (
		<div
			data-slot="dropdown-menu-label"
			data-inset={inset || undefined}
			className={cn(
				"px-2.5 py-1.5 font-medium text-muted-foreground text-xs data-[inset]:pl-8",
				className,
			)}
			{...props}
		/>
	);
}

export function DropdownMenuSeparator({
	className,
	...props
}: ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
	return (
		<DropdownMenuPrimitive.Separator
			data-slot="dropdown-menu-separator"
			className={cn("-mx-1 my-1 border-border", className)}
			{...props}
		/>
	);
}

export function DropdownMenuSubTrigger({
	className,
	inset = false,
	children,
	...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }) {
	return (
		<DropdownMenuPrimitive.SubTrigger
			data-slot="dropdown-menu-sub-trigger"
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
		</DropdownMenuPrimitive.SubTrigger>
	);
}

export function DropdownMenuSubContent({
	className,
	...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
	return (
		<DropdownMenuPrimitive.Portal>
			<DropdownMenuPrimitive.SubContent
				data-slot="dropdown-menu-sub-content"
				className={cn(ANCHORED, MENU_SURFACE, "min-w-40", className)}
				{...props}
			/>
		</DropdownMenuPrimitive.Portal>
	);
}
