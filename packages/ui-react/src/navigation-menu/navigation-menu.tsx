"use client";

import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import type { ComponentProps } from "react";
import { cn } from "../lib/cn";
import {
	type NavigationMenuSize,
	navigationMenu,
	navigationMenuTriggerStyle,
} from "./variants";

export type { NavigationMenuSize };
export { navigationMenuTriggerStyle };

const styles = navigationMenu();

export function NavigationMenu({
	align = "start",
	className,
	children,
	...props
}: NavigationMenuPrimitive.Root.Props &
	Pick<NavigationMenuPrimitive.Positioner.Props, "align">) {
	return (
		<NavigationMenuPrimitive.Root
			data-slot="navigation-menu"
			className={cn(styles.root(), className)}
			{...props}
		>
			{children}
			<NavigationMenuViewport align={align} />
		</NavigationMenuPrimitive.Root>
	);
}

export function NavigationMenuList({
	className,
	...props
}: ComponentProps<typeof NavigationMenuPrimitive.List>) {
	return (
		<NavigationMenuPrimitive.List
			data-slot="navigation-menu-list"
			className={cn(styles.list(), className)}
			{...props}
		/>
	);
}

export function NavigationMenuItem({
	className,
	...props
}: ComponentProps<typeof NavigationMenuPrimitive.Item>) {
	return (
		<NavigationMenuPrimitive.Item
			data-slot="navigation-menu-item"
			className={cn(styles.item(), className)}
			{...props}
		/>
	);
}

export function NavigationMenuTrigger({
	className,
	children,
	size,
	...props
}: NavigationMenuPrimitive.Trigger.Props & { size?: NavigationMenuSize }) {
	return (
		<NavigationMenuPrimitive.Trigger
			data-slot="navigation-menu-trigger"
			className={cn(navigationMenuTriggerStyle({ size }), className)}
			{...props}
		>
			{children}
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
				className={styles.chevron()}
			>
				<path d="m6 9 6 6 6-6" />
			</svg>
		</NavigationMenuPrimitive.Trigger>
	);
}

export function NavigationMenuContent({
	className,
	...props
}: NavigationMenuPrimitive.Content.Props) {
	return (
		<NavigationMenuPrimitive.Content
			data-slot="navigation-menu-content"
			className={cn(styles.content(), className)}
			{...props}
		/>
	);
}

/** The shared panel: the Positioner slides it between triggers and the Popup resizes to the open content. */
export function NavigationMenuViewport({
	className,
	side = "bottom",
	sideOffset = 6,
	align = "start",
	alignOffset = 0,
	...props
}: NavigationMenuPrimitive.Positioner.Props) {
	return (
		<NavigationMenuPrimitive.Portal>
			<NavigationMenuPrimitive.Positioner
				side={side}
				sideOffset={sideOffset}
				align={align}
				alignOffset={alignOffset}
				className={cn(
					"isolate z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width)",
					"transition-[top,left,right,bottom] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] data-instant:transition-none motion-reduce:transition-none",
					className,
				)}
				{...props}
			>
				<NavigationMenuPrimitive.Popup
					data-slot="navigation-menu-viewport"
					className={cn(
						styles.viewport(),
						"h-(--popup-height) w-(--popup-width) origin-(--transform-origin)",
						"data-[starting-style]:scale-[var(--enter-scale)] data-[starting-style]:opacity-0",
						"data-[ending-style]:scale-[var(--enter-scale)] data-[ending-style]:opacity-0 data-[ending-style]:duration-[var(--duration-exit)]",
					)}
				>
					<NavigationMenuPrimitive.Viewport className="relative size-full overflow-hidden" />
				</NavigationMenuPrimitive.Popup>
			</NavigationMenuPrimitive.Positioner>
		</NavigationMenuPrimitive.Portal>
	);
}

export function NavigationMenuLink({
	className,
	...props
}: NavigationMenuPrimitive.Link.Props) {
	return (
		<NavigationMenuPrimitive.Link
			data-slot="navigation-menu-link"
			className={cn(styles.link(), className)}
			{...props}
		/>
	);
}

export function NavigationMenuIndicator({
	className,
	...props
}: ComponentProps<typeof NavigationMenuPrimitive.Icon>) {
	return (
		<NavigationMenuPrimitive.Icon
			data-slot="navigation-menu-indicator"
			className={cn(styles.indicator(), className)}
			{...props}
		>
			<div className={styles.indicatorArrow()} />
		</NavigationMenuPrimitive.Icon>
	);
}
