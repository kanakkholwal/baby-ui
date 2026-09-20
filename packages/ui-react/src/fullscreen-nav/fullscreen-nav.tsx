"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "../lib/cn";

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

	useEffect(() => {
		if (!open) return;
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

	if (!open) return null;

	return (
		<div
			ref={panel}
			role="dialog"
			aria-modal="true"
			aria-labelledby={id}
			className={cn(
				"fullscreen-nav fixed inset-0 z-50 flex flex-col bg-background",
				className,
			)}
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
						style={{ animationDelay: `${60 + i * 45}ms` }}
						className="fullscreen-nav-link font-heading font-semibold text-4xl text-foreground tracking-tight transition-colors hover:text-muted-foreground sm:text-5xl"
					>
						{link.label}
					</a>
				))}
			</nav>
		</div>
	);
}
