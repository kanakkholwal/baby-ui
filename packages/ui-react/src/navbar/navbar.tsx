"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/cn";
import { type NavbarVariant, navbar } from "./variants";

export type { NavbarVariant };

export type NavbarLink = { href: string; label: string };

export interface NavbarProps {
	links: NavbarLink[];
	active?: string;
	brand?: ReactNode;
	actions?: ReactNode;
	className?: string;
	sticky?: boolean;
	blur?: boolean;
	variant?: NavbarVariant;
}

export function Navbar({
	links,
	active,
	brand,
	actions,
	className,
	sticky = true,
	blur = true,
	variant = "solid",
}: NavbarProps) {
	const [scrolled, setScrolled] = useState(false);
	const [sheetOpen, setSheetOpen] = useState(false);
	const [pill, setPill] = useState({ left: 0, width: 0 });
	const list = useRef<HTMLDivElement>(null);
	const sheet = useRef<HTMLDivElement>(null);
	// Kept mounted after the first open so the sheet can slide out as well as in.
	const [sheetMounted, setSheetMounted] = useState(false);

	useEffect(() => {
		if (!sticky) return;
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [sticky]);

	function measure() {
		const el = list.current?.querySelector<HTMLElement>('[aria-current="page"]');
		setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : { left: 0, width: 0 });
	}

	useEffect(measure, [active, links]);

	useEffect(() => {
		if (!list.current) return;
		const observer = new ResizeObserver(measure);
		observer.observe(list.current);
		return () => observer.disconnect();
	}, []);

	// Focus moves into the sheet on open so Escape and Tab behave as the spec says.
	useEffect(() => {
		if (!sheetOpen) return;
		setSheetMounted(true);
		sheet.current?.querySelector<HTMLElement>("a")?.focus();
		const onKey = (e: globalThis.KeyboardEvent) => {
			if (e.key === "Escape") setSheetOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
		// sheetMounted is a dependency: the panel only exists on the render after it flips.
	}, [sheetOpen, sheetMounted]);

	const styles = navbar({
		variant,
		sticky,
		surface: scrolled ? (blur ? "blurred" : "opaque") : "clear",
	});

	return (
		<>
			<header
				data-slot="navbar"
				data-variant={variant}
				className={cn(styles.header(), className)}
			>
				<nav aria-label="Main" className={styles.nav()}>
					<div className="flex items-center gap-4">
						{brand}
						<div ref={list} className={styles.links()}>
							<span
								aria-hidden
								className={styles.pill()}
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
									className={styles.link()}
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
							className={styles.menuButton()}
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

			{sheetMounted ? (
				<div
					className={styles.layer()}
					data-state={sheetOpen ? "open" : "closed"}
					inert={!sheetOpen}
				>
					<button
						type="button"
						aria-label="Close menu"
						data-state={sheetOpen ? "open" : "closed"}
						onClick={() => setSheetOpen(false)}
						className={styles.veil()}
					/>
					<div
						ref={sheet}
						role="dialog"
						aria-modal="true"
						aria-label="Menu"
						data-state={sheetOpen ? "open" : "closed"}
						className={styles.sheet()}
					>
						<div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border" />
						{links.map((link) => (
							<a
								key={link.href}
								href={link.href}
								aria-current={active === link.href ? "page" : undefined}
								onClick={() => setSheetOpen(false)}
								className={styles.sheetLink()}
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
