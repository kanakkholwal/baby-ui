"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { useRef } from "react";
import { cn } from "../lib/cn";
import { type FullscreenNavVariant, fullscreenNav } from "./variants";

export type { FullscreenNavVariant };

export type NavLink = { href: string; label: string };

export interface FullscreenNavProps {
	links: NavLink[];
	open: boolean;
	title?: string;
	variant?: FullscreenNavVariant;
	className?: string;
	onOpenChange: (open: boolean) => void;
}

export function FullscreenNav({
	links,
	open,
	title = "Menu",
	variant = "fade",
	className,
	onOpenChange,
}: FullscreenNavProps) {
	const firstLinkRef = useRef<HTMLAnchorElement>(null);
	const styles = fullscreenNav({ variant });

	return (
		<DialogPrimitive.Root open={open} onOpenChange={(next) => onOpenChange(next)}>
			<DialogPrimitive.Portal>
				<DialogPrimitive.Popup
					data-slot="fullscreen-nav"
					data-variant={variant}
					initialFocus={firstLinkRef}
					className={cn(styles.popup(), className)}
				>
					<div className={styles.header()}>
						<DialogPrimitive.Title className={styles.title()}>
							{title}
						</DialogPrimitive.Title>
						<DialogPrimitive.Close aria-label="Close" className={styles.close()}>
							<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
								<path
									d="m4 4 8 8M12 4l-8 8"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
							</svg>
						</DialogPrimitive.Close>
					</div>

					<nav className={styles.nav()}>
						{links.map((link, i) => (
							<a
								key={link.href}
								ref={i === 0 ? firstLinkRef : undefined}
								href={link.href}
								onClick={() => onOpenChange(false)}
								data-state={open ? "open" : "closed"}
								style={{ transitionDelay: `${60 + i * 45}ms` }}
								className={styles.link()}
							>
								{link.label}
							</a>
						))}
					</nav>
				</DialogPrimitive.Popup>
			</DialogPrimitive.Portal>
		</DialogPrimitive.Root>
	);
}
