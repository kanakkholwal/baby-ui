"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "../lib/cn";

/** The overlay fades both ways; each link follows on a delay set inline, so it cascades. */
const NAV_MOTION =
	"transition-[opacity,visibility] duration-[var(--duration-overlay)] ease-[var(--ease-out)] starting:opacity-0 data-[state=closed]:invisible data-[state=closed]:opacity-0 data-[state=closed]:duration-[var(--duration-exit)] motion-reduce:transition-none";

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
	const id = useId();
	const panel = useRef<HTMLDivElement>(null);
	// Kept mounted after the first open so the overlay can fade out as well as in.
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		if (!open) return;
		setMounted(true);
		panel.current?.querySelector<HTMLElement>("a")?.focus();
		const previous = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (e: globalThis.KeyboardEvent) => {
			if (e.key === "Escape") onOpenChange(false);
		};
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = previous;
			window.removeEventListener("keydown", onKey);
		};
	}, [open, onOpenChange]);

	if (!mounted) return null;

	return (
		<div
			ref={panel}
			role="dialog"
			aria-modal="true"
			aria-labelledby={id}
			data-state={open ? "open" : "closed"}
			inert={!open}
			className={cn(NAV_MOTION, "fixed inset-0 z-50 flex flex-col bg-background", className)}
		>
			<div className="flex h-14 items-center justify-between px-4 md:px-6">
				<h2 id={id} className="font-semibold text-foreground text-sm">
					{title}
				</h2>
				<button
					type="button"
					aria-label="Close"
					onClick={() => onOpenChange(false)}
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
				</button>
			</div>

			<nav className="flex flex-1 flex-col justify-center gap-2 px-6 pb-20">
				{links.map((link, i) => (
					<a
						key={link.href}
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
		</div>
	);
}
