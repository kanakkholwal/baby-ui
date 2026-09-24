"use client";

import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { Menu } from "@base-ui/react/menu";
import type { ComponentProps } from "react";
import { ANCHORED, stagger } from "../lib/anchor";
import { cn } from "../lib/cn";
import { MENU_SHORTCUT, MENU_SURFACE, type MenuItemVariant, menuItem } from "../lib/menu";

export const ContextMenu = ContextMenuPrimitive.Root;
export const ContextMenuSub = Menu.SubmenuRoot;

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
	align = "start",
	alignOffset = 4,
	side = "right",
	sideOffset = 0,
	...props
}: ComponentProps<typeof ContextMenuPrimitive.Popup> &
	Pick<
		ComponentProps<typeof ContextMenuPrimitive.Positioner>,
		"align" | "alignOffset" | "side" | "sideOffset"
	>) {
	return (
		<ContextMenuPrimitive.Portal>
			<ContextMenuPrimitive.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				className="isolate z-50 outline-none"
			>
				<ContextMenuPrimitive.Popup
					data-slot="context-menu-content"
					ref={(node: HTMLDivElement | null) => {
						if (node) stagger(node.querySelectorAll<HTMLElement>("[role='menuitem']"));
					}}
					className={cn(ANCHORED, "static", MENU_SURFACE, className)}
					{...props}
				/>
			</ContextMenuPrimitive.Positioner>
		</ContextMenuPrimitive.Portal>
	);
}

export function ContextMenuItem({
	className,
	variant: variantProp,
	destructive = false,
	inset = false,
	...props
}: ComponentProps<typeof ContextMenuPrimitive.Item> & {
	variant?: MenuItemVariant;
	/** Alias for `variant="destructive"`. */
	destructive?: boolean;
	inset?: boolean;
}) {
	const variant: MenuItemVariant =
		variantProp ?? (destructive ? "destructive" : "default");

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
	closeDelay = 200,
	...props
}: ComponentProps<typeof Menu.SubmenuTrigger> & { inset?: boolean }) {
	return (
		<Menu.SubmenuTrigger
			data-slot="context-menu-sub-trigger"
			data-inset={inset || undefined}
			closeDelay={closeDelay}
			className={cn(
				menuItem({ variant: "default" }),
				"data-[open]:bg-foreground/[0.06]",
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
		</Menu.SubmenuTrigger>
	);
}

export function ContextMenuSubContent({
	className,
	align = "start",
	alignOffset = -3,
	side = "right",
	sideOffset = 0,
	...props
}: ComponentProps<typeof Menu.Popup> &
	Pick<
		ComponentProps<typeof Menu.Positioner>,
		"align" | "alignOffset" | "side" | "sideOffset"
	>) {
	return (
		<Menu.Portal>
			<Menu.Positioner
				align={align}
				alignOffset={alignOffset}
				side={side}
				sideOffset={sideOffset}
				className="isolate z-50 outline-none"
			>
				<Menu.Popup
					data-slot="context-menu-sub-content"
					className={cn(ANCHORED, "static", MENU_SURFACE, "min-w-40", className)}
					{...props}
				/>
			</Menu.Positioner>
		</Menu.Portal>
	);
}

export function ContextMenuGroup(props: ComponentProps<typeof Menu.Group>) {
	return <Menu.Group data-slot="context-menu-group" {...props} />;
}

function Check() {
	return (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-3.5">
			<path
				d="m3.5 8.5 3 3 6-7"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export function ContextMenuCheckboxItem({
	className,
	children,
	...props
}: ComponentProps<typeof Menu.CheckboxItem>) {
	return (
		<Menu.CheckboxItem
			data-slot="context-menu-checkbox-item"
			data-inset=""
			className={cn(menuItem({ variant: "default" }), className)}
			{...props}
		>
			<span className="pointer-events-none absolute left-2.5 flex size-3.5 items-center justify-center">
				<Menu.CheckboxItemIndicator>
					<Check />
				</Menu.CheckboxItemIndicator>
			</span>
			{children}
		</Menu.CheckboxItem>
	);
}

export function ContextMenuRadioGroup(props: ComponentProps<typeof Menu.RadioGroup>) {
	return <Menu.RadioGroup data-slot="context-menu-radio-group" {...props} />;
}

export function ContextMenuRadioItem({
	className,
	children,
	...props
}: ComponentProps<typeof Menu.RadioItem>) {
	return (
		<Menu.RadioItem
			data-slot="context-menu-radio-item"
			data-inset=""
			className={cn(menuItem({ variant: "default" }), className)}
			{...props}
		>
			<span className="pointer-events-none absolute left-2.5 flex size-3.5 items-center justify-center">
				<Menu.RadioItemIndicator>
					<span className="block size-1.5 rounded-full bg-current" />
				</Menu.RadioItemIndicator>
			</span>
			{children}
		</Menu.RadioItem>
	);
}
