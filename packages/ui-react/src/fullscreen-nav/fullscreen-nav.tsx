"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { useRef } from "react";
import { cn } from "../lib/cn";

/** No backdrop: the panel itself is opaque and fills the viewport. */
const NAV_POPUP = [
	"fixed inset-0 z-50 flex flex-col bg-background outline-none",
	"transition-[opacity,visibility] duration-[var(--duration-overlay)] ease-[var(--ease-out)]",
	"starting:opacity-0 data-[closed]:invisible data-[closed]:opacity-0 data-[closed]:duration-[var(--duration-exit)]",
	"motion-reduce:transition-none",
].join(" ");

/** Each link follows on a delay set inline, so it cascades; driven by our own `data-state`
 * since Base UI's open/closed attributes only apply to the popup itself. */
const NAV_LINK_MOTION =
	"transition-[opacity,translate] duration-[var(--duration-drawer)] ease-[var(--ease-out)] starting:translate-y-[0.3em] starting:opacity-0 data-[state=closed]:translate-y-[0.3em] data-[state=closed]:opacity-0 data-[state=closed]:delay-0 data-[state=closed]:duration-[var(--duration-exit)] motion-reduce:transition-none";

export type NavLink = { href: string; label: string };

export interface FullscreenNavProps {
	links: NavLink[];
	open: boolean;
	title?: string;
	className?: string;
	onOpenChange: (open: boolean) => void;
}

export function FullscreenNav({
	links,
	open,
	title = "Menu",
	className,
	onOpenChange,
}: FullscreenNavProps) {
	const firstLinkRef = useRef<HTMLAnchorElement>(null);

	return (
		<DialogPrimitive.Root open={open} onOpenChange={(next) => onOpenChange(next)}>
			<DialogPrimitive.Portal>
				<DialogPrimitive.Popup
					data-slot="fullscreen-nav"
					initialFocus={firstLinkRef}
					className={cn(NAV_POPUP, className)}
				>
					<div className="flex h-14 items-center justify-between px-4 md:px-6">
						<DialogPrimitive.Title className="font-semibold text-foreground text-sm">
							{title}
						</DialogPrimitive.Title>
						<DialogPrimitive.Close
							aria-label="Close"
							className="grid size-9 place-items-center rounded-2xl border border-border text-muted-foreground transition-colors hover:text-foreground"
						>
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

					<nav className="flex flex-1 flex-col justify-center gap-2 px-6 pb-20">
						{links.map((link, i) => (
							<a
								key={link.href}
								ref={i === 0 ? firstLinkRef : undefined}
								href={link.href}
								onClick={() => onOpenChange(false)}
								data-state={open ? "open" : "closed"}
								style={{ transitionDelay: `${60 + i * 45}ms` }}
								className={cn(
									NAV_LINK_MOTION,
									"font-heading font-semibold text-4xl text-foreground tracking-tight hover:text-muted-foreground sm:text-5xl",
								)}
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
