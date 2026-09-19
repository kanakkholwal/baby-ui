"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn.js";

export type NavbarLink = { href: string; label: string };

export interface NavbarProps {
	links: NavbarLink[];
	active?: string;
	brand?: ReactNode;
	actions?: ReactNode;
	className?: string;
	sticky?: boolean;
	blur?: boolean;
}

export function Navbar({
	links,
	active,
	brand,
	actions,
	className,
	sticky = true,
	blur = true,
}: NavbarProps) {
	const [scrolled, setScrolled] = useState(false);
	const [sheetOpen, setSheetOpen] = useState(false);
	const [pill, setPill] = useState({ left: 0, width: 0 });
	const list = useRef<HTMLDivElement>(null);
	const sheet = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!sticky) return;
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [sticky]);

	useEffect(() => {
		const measure = () => {
			const el = list.current?.querySelector<HTMLElement>('[aria-current="page"]');
			setPill(
				el ? { left: el.offsetLeft, width: el.offsetWidth } : { left: 0, width: 0 },
			);
		};
		measure();
		if (!list.current) return;
		const observer = new ResizeObserver(measure);
		observer.observe(list.current);
		return () => observer.disconnect();
	}, []);

	// Focus moves into the sheet on open so Escape and Tab behave as the spec says.
	useEffect(() => {
		if (!sheetOpen) return;
		sheet.current?.querySelector<HTMLElement>("a")?.focus();
		const onKey = (e: globalThis.KeyboardEvent) => {
			if (e.key === "Escape") setSheetOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [sheetOpen]);

	return (
		<>
			<header
				className={cn(
					"inset-x-0 top-0 z-40 transition-[background,border-color,backdrop-filter] duration-300",
					sticky && "sticky",
					scrolled
						? blur
							? "border-border border-b bg-background/70 backdrop-blur-xl backdrop-saturate-150"
							: "border-border border-b bg-background"
						: "border-transparent border-b bg-transparent",
					className,
				)}
			>
				<nav
					aria-label="Main"
					className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-6"
				>
					<div className="flex items-center gap-4">
						{brand}
						<div ref={list} className="relative hidden items-center gap-0.5 md:flex">
							<span
								aria-hidden
								className="pointer-events-none absolute inset-y-1 left-0 rounded-md bg-foreground/[0.06] transition-[transform,width,opacity] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none"
								style={{
									transform: `translateX(${pill.left}px)`,
									width: pill.width,
									opacity: pill.width ? 1 : 0,
								}}
							/>
							{links.map((link) => (
								<a
									key={link.href}
									href={link.href}
									aria-current={active === link.href ? "page" : undefined}
									className="relative z-10 rounded-md px-3 py-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground aria-[current=page]:text-foreground"
								>
									{link.label}
								</a>
							))}
						</div>
					</div>

					<div className="flex items-center gap-2">
						{actions}
						<button
							type="button"
							aria-label="Open menu"
							aria-expanded={sheetOpen}
							onClick={() => setSheetOpen(true)}
							className="grid size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground md:hidden"
						>
							<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
								<path
									d="M2.5 5h11M2.5 11h11"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
								/>
							</svg>
						</button>
					</div>
				</nav>
			</header>

			{sheetOpen ? (
				<div className="fixed inset-0 z-50 md:hidden">
					<button
						type="button"
						aria-label="Close menu"
						onClick={() => setSheetOpen(false)}
						className="absolute inset-0 bg-black/40"
					/>
					<div
						ref={sheet}
						role="dialog"
						aria-modal="true"
						aria-label="Menu"
						className="nav-sheet absolute inset-x-0 bottom-0 rounded-t-2xl border-border border-t bg-card p-4"
					>
						<div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border" />
						{links.map((link) => (
							<a
								key={link.href}
								href={link.href}
								aria-current={active === link.href ? "page" : undefined}
								onClick={() => setSheetOpen(false)}
								className="block rounded-lg px-3 py-2.5 text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground aria-[current=page]:bg-foreground/[0.06] aria-[current=page]:text-foreground"
							>
								{link.label}
							</a>
						))}
					</div>
				</div>
			) : null}
		</>
	);
}
