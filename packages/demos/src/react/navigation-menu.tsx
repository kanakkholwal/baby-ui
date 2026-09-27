"use client";

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	type NavigationMenuSize,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@baby-ui/react";
import { NAV_MENU_LINKS, NAV_MENU_SAMPLE } from "../data/navigation-menu";

export function NavigationMenuDemo({ props = {} }: { props?: Record<string, unknown> }) {
	const size = (props.size as NavigationMenuSize) ?? "md";
	return (
		<div className="flex min-h-72 w-full justify-center pt-2">
			<NavigationMenu>
				<NavigationMenuList>
					{NAV_MENU_SAMPLE.map((group) => (
						<NavigationMenuItem key={group.label} value={group.label}>
							<NavigationMenuTrigger size={size}>{group.label}</NavigationMenuTrigger>
							<NavigationMenuContent>
								<ul className="grid w-80 gap-1">
									{group.links.map((link) => (
										<li key={link.href}>
											<NavigationMenuLink href={link.href}>
												<span className="font-medium text-foreground">{link.title}</span>
												<span className="text-muted-foreground text-xs">
													{link.description}
												</span>
											</NavigationMenuLink>
										</li>
									))}
								</ul>
							</NavigationMenuContent>
						</NavigationMenuItem>
					))}
					{NAV_MENU_LINKS.map((link) => (
						<NavigationMenuItem key={link.href}>
							<NavigationMenuLink
								href={link.href}
								className={navigationMenuTriggerStyle({ size })}
							>
								{link.label}
							</NavigationMenuLink>
						</NavigationMenuItem>
					))}
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}
