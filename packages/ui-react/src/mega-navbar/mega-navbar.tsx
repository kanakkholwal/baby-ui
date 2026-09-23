"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Collapsible, CollapsibleContent } from "../collapsible/collapsible";
import { cn } from "../lib/cn";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../sheet/sheet";

export type MegaNavLink = { label: string; href: string; external?: boolean };

export type MegaMenuItem = {
	label: string;
	href: string;
	description?: string;
	icon?: ReactNode;
	external?: boolean;
};

export type MegaMenuGroup = {
	label: string;
	href: string;
	items: MegaMenuItem[];
	footer?: { label: string; href: string; hint?: string };
};

function ChevronDown({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
			<path
				d="m4 6 4 4 4-4"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function ArrowUpRight({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
			<path
				d="M5 11 11 5M6 5h5v5"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function ArrowRight({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
			<path
				d="M3 8h10M9 4l4 4-4 4"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function MenuIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
			<path
				d="M2 4.5h12M2 8h12M2 11.5h12"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
			/>
		</svg>
	);
}

function isCurrent(href: string, active?: string) {
	if (!active) return false;
	return active === href || active.startsWith(`${href}/`);
}

/** Every trigger and panel share one measured box, so the panel morphs between
 * groups instead of a fresh popover mounting per item. */
function DesktopMegaMenu({
	groups,
	active,
}: {
	groups: MegaMenuGroup[];
	active?: string;
}) {
	const [open, setOpen] = useState(-1);
	const [box, setBox] = useState({ width: 0, height: 0, left: 0 });
	const row = useRef<HTMLDivElement>(null);
	const panels = useRef<(HTMLDivElement | null)[]>([]);
	const triggers = useRef<(HTMLButtonElement | null)[]>([]);
	const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	function measure(index: number) {
		const rowEl = row.current;
		const panel = panels.current[index];
		const trigger = triggers.current[index];
		if (!rowEl || !panel || !trigger) return;
		const rowRect = rowEl.getBoundingClientRect();
		const triggerRect = trigger.getBoundingClientRect();
		const width = panel.scrollWidth;
		const ideal = triggerRect.left - rowRect.left + triggerRect.width / 2 - width / 2;
		setBox({ width, height: panel.scrollHeight, left: Math.max(0, ideal) });
	}

	useEffect(() => {
		if (open < 0) return;
		measure(open);
		const onResize = () => measure(open);
		window.addEventListener("resize", onResize);
		return () => window.removeEventListener("resize", onResize);
	}, [open]);

	function cancelClose() {
		if (closeTimer.current) clearTimeout(closeTimer.current);
		closeTimer.current = null;
	}
	function scheduleClose() {
		cancelClose();
		closeTimer.current = setTimeout(() => setOpen(-1), 140);
	}

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: hover region only; the triggers and links inside are the real controls
		<div
			ref={row}
			className="relative hidden items-center gap-1 @3xl:flex"
			onMouseLeave={scheduleClose}
			onMouseEnter={cancelClose}
		>
			{groups.map((group, index) => {
				const isOpen = open === index;
				return (
					<button
						key={group.label}
						ref={(el) => {
							triggers.current[index] = el;
						}}
						type="button"
						aria-expanded={isOpen}
						aria-controls="mega-navbar-panel"
						onMouseEnter={() => {
							cancelClose();
							setOpen(index);
						}}
						onFocus={() => {
							cancelClose();
							setOpen(index);
						}}
						onClick={() => setOpen((current) => (current === index ? -1 : index))}
						onKeyDown={(event) => {
							if (event.key === "Escape") {
								setOpen(-1);
								triggers.current[index]?.focus();
							}
						}}
						className={cn(
							"inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3.5 py-2 font-medium text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
							isOpen || isCurrent(group.href, active)
								? "text-foreground"
								: "text-muted-foreground hover:text-foreground",
						)}
					>
						{group.label}
						<ChevronDown
							className={cn(
								"size-3.5 transition-transform duration-[var(--duration-dropdown)] motion-reduce:transition-none",
								isOpen && "rotate-180",
							)}
						/>
					</button>
				);
			})}

			<div
				id="mega-navbar-panel"
				aria-hidden={open < 0}
				onMouseEnter={cancelClose}
				onMouseLeave={scheduleClose}
				className={cn(
					"absolute top-full z-50 origin-top overflow-hidden rounded-xl border border-border bg-card shadow-2xl",
					"transition-[width,height,transform,opacity] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none",
					open >= 0 ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
				)}
				style={{
					width: box.width,
					height: box.height,
					transform: `translate3d(${box.left}px, ${open >= 0 ? 8 : 2}px, 0) scale(${open >= 0 ? 1 : 0.98})`,
				}}
			>
				{groups.map((group, index) => {
					const isOpen = open === index;
					return (
						<div
							key={group.label}
							ref={(el) => {
								panels.current[index] = el;
							}}
							inert={!isOpen}
							className={cn(
								"absolute inset-x-0 top-0 w-max transition-opacity duration-[var(--duration-dropdown)] motion-reduce:transition-none",
								isOpen ? "opacity-100" : "pointer-events-none opacity-0",
							)}
						>
							<ul className="grid w-[34rem] grid-cols-2 gap-1 p-2">
								{group.items.map((item) => (
									<li key={item.href}>
										<a
											href={item.href}
											target={item.external ? "_blank" : undefined}
											rel={item.external ? "noreferrer" : undefined}
											onClick={() => setOpen(-1)}
											aria-current={isCurrent(item.href, active) ? "page" : undefined}
											className="flex gap-3 rounded-lg p-3 transition-colors hover:bg-foreground/[0.06] aria-[current=page]:bg-foreground/[0.06] motion-reduce:transition-none"
										>
											{item.icon ? (
												<span className="mt-0.5 shrink-0 text-muted-foreground [&_svg]:size-4">
													{item.icon}
												</span>
											) : null}
											<span className="min-w-0">
												<span className="flex items-center gap-1 font-medium text-foreground text-sm">
													{item.label}
													{item.external ? (
														<ArrowUpRight className="size-3 text-muted-foreground" />
													) : null}
												</span>
												{item.description ? (
													<span className="mt-0.5 block text-muted-foreground text-xs">
														{item.description}
													</span>
												) : null}
											</span>
										</a>
									</li>
								))}
							</ul>
							{group.footer ? (
								<a
									href={group.footer.href}
									onClick={() => setOpen(-1)}
									className="group/cta flex items-center justify-between gap-4 border-border border-t bg-foreground/[0.02] px-5 py-3 transition-colors hover:bg-foreground/[0.06] motion-reduce:transition-none"
								>
									<span className="font-medium text-foreground text-sm">
										{group.footer.label}
									</span>
									<span className="flex items-center gap-1.5 text-muted-foreground text-xs">
										{group.footer.hint}
										<ArrowRight className="size-3.5 transition-transform group-hover/cta:translate-x-0.5 motion-reduce:transition-none" />
									</span>
								</a>
							) : null}
						</div>
					);
				})}
			</div>
		</div>
	);
}

function MobileNav({
	open,
	onOpenChange,
	brand,
	groups,
	links,
	actions,
	active,
}: {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	brand?: ReactNode;
	groups: MegaMenuGroup[];
	links: MegaNavLink[];
	actions?: ReactNode;
	active?: string;
}) {
	const [openGroup, setOpenGroup] = useState(0);

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-sm">
				<SheetHeader className="border-border border-b px-5 py-4">
					<SheetTitle className="flex items-center gap-2.5">{brand}</SheetTitle>
				</SheetHeader>
				<nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-3">
					{groups.map((group, index) => {
						const isOpen = openGroup === index;
						return (
							<Collapsible
								key={group.label}
								open={isOpen}
								className="border-border border-b last:border-b-0"
							>
								<button
									type="button"
									aria-expanded={isOpen}
									onClick={() =>
										setOpenGroup((current) => (current === index ? -1 : index))
									}
									className="flex min-h-12 w-full items-center justify-between gap-4 px-2 text-left font-medium text-foreground"
								>
									{group.label}
									<ChevronDown
										className={cn(
											"size-4 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-dropdown)] motion-reduce:transition-none",
											isOpen && "rotate-180",
										)}
									/>
								</button>
								<CollapsibleContent className="px-0 pb-2">
									<ul>
										{group.items.map((item) => (
											<li key={item.href}>
												<a
													href={item.href}
													target={item.external ? "_blank" : undefined}
													rel={item.external ? "noreferrer" : undefined}
													onClick={() => onOpenChange(false)}
													aria-current={isCurrent(item.href, active) ? "page" : undefined}
													className={cn(
														"flex min-h-12 items-center gap-3 rounded-lg px-2 py-2 transition-colors motion-reduce:transition-none",
														isCurrent(item.href, active)
															? "bg-foreground/[0.06]"
															: "hover:bg-foreground/[0.06]",
													)}
												>
													{item.icon ? (
														<span className="shrink-0 text-muted-foreground [&_svg]:size-4">
															{item.icon}
														</span>
													) : null}
													<span className="min-w-0 flex-1">
														<span className="flex items-center gap-1 font-medium text-foreground text-sm">
															{item.label}
															{item.external ? (
																<ArrowUpRight className="size-3 text-muted-foreground" />
															) : null}
														</span>
														{item.description ? (
															<span className="mt-0.5 block text-muted-foreground text-xs">
																{item.description}
															</span>
														) : null}
													</span>
												</a>
											</li>
										))}
									</ul>
								</CollapsibleContent>
							</Collapsible>
						);
					})}
					<ul className="mt-1 pt-1">
						{links.map((link) => (
							<li key={link.href}>
								<a
									href={link.href}
									target={link.external ? "_blank" : undefined}
									rel={link.external ? "noreferrer" : undefined}
									onClick={() => onOpenChange(false)}
									aria-current={isCurrent(link.href, active) ? "page" : undefined}
									className={cn(
										"flex min-h-12 items-center rounded-lg px-2 font-medium text-foreground transition-colors motion-reduce:transition-none",
										isCurrent(link.href, active)
											? "bg-foreground/[0.06]"
											: "hover:bg-foreground/[0.06]",
									)}
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</nav>
				{actions ? (
					<div className="mt-auto flex flex-col gap-2 border-border border-t px-5 py-4">
						{actions}
					</div>
				) : null}
			</SheetContent>
		</Sheet>
	);
}

export interface MegaNavbarProps {
	brand?: ReactNode;
	groups: MegaMenuGroup[];
	links?: MegaNavLink[];
	actions?: ReactNode;
	mobileActions?: ReactNode;
	active?: string;
	sticky?: boolean;
	blur?: boolean;
	className?: string;
}

export function MegaNavbar({
	brand,
	groups,
	links = [],
	actions,
	mobileActions,
	active,
	sticky = true,
	blur = true,
	className,
}: MegaNavbarProps) {
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		if (!sticky) return;
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [sticky]);

	// Navigating from inside the sheet should leave it closed.
	useEffect(() => {
		setMobileOpen(false);
	}, [active]);

	return (
		<div
			data-slot="mega-navbar"
			className={cn(
				"@container w-full",
				sticky ? "sticky inset-x-0 top-0 z-50" : "relative",
				"border-b transition-colors duration-[var(--duration-dropdown)] motion-reduce:transition-none",
				scrolled
					? cn("border-border bg-background/85", blur && "backdrop-blur")
					: "border-transparent",
				className,
			)}
		>
			<nav
				aria-label="Primary"
				className="mx-auto flex h-16 w-full max-w-6xl items-center gap-2 px-6"
			>
				{brand ? (
					<span className="flex shrink-0 items-center gap-2.5 py-1 pr-2">{brand}</span>
				) : null}
				<div className="hidden flex-1 items-center justify-center @3xl:flex">
					<DesktopMegaMenu groups={groups} active={active} />
					<ul className="flex items-center gap-1">
						{links.map((link) => (
							<li key={link.href}>
								<a
									href={link.href}
									target={link.external ? "_blank" : undefined}
									rel={link.external ? "noreferrer" : undefined}
									aria-current={isCurrent(link.href, active) ? "page" : undefined}
									className={cn(
										"inline-flex items-center whitespace-nowrap rounded-full px-3.5 py-2 font-medium text-sm transition-colors hover:text-foreground motion-reduce:transition-none",
										isCurrent(link.href, active)
											? "text-foreground"
											: "text-muted-foreground",
									)}
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</div>
				<div className="ml-auto flex shrink-0 items-center gap-2 @3xl:ml-0">
					{actions ? (
						<span className="hidden items-center gap-2 @3xl:flex">{actions}</span>
					) : null}
					<button
						type="button"
						onClick={() => setMobileOpen(true)}
						aria-expanded={mobileOpen}
						aria-label="Open menu"
						className="grid size-9 cursor-pointer place-items-center rounded-lg text-foreground transition-colors hover:bg-foreground/[0.06] @3xl:hidden motion-reduce:transition-none"
					>
						<MenuIcon className="size-5" />
					</button>
				</div>
			</nav>

			<MobileNav
				open={mobileOpen}
				onOpenChange={setMobileOpen}
				brand={brand}
				groups={groups}
				links={links}
				actions={mobileActions ?? actions}
				active={active}
			/>
		</div>
	);
}
