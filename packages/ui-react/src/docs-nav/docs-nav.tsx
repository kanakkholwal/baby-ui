"use client";

import { type MouseEvent, type PointerEvent, useEffect, useRef, useState } from "react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "../collapsible/collapsible";
import { cn } from "../lib/cn";
import { revealCurrent } from "./scroll";
import { type DocsNavConnector, docsNav, MARKER_WIDTH, rowState } from "./variants";

export type { DocsNavConnector };

export interface DocsNavItem {
	href: string;
	label: string;
	/** Small pill after the label, e.g. a status like "beta". */
	badge?: string;
}

export interface DocsNavSection {
	id: string;
	label: string;
	/** Shown beside the section label, e.g. how many links it holds. */
	count?: number | string;
	items: DocsNavItem[];
}

export interface DocsNavProps {
	sections: DocsNavSection[];
	/** href of the page being viewed; that link is marked current. */
	current?: string;
	/** Ids of the expanded sections. Controlled with onOpenChange. */
	open?: string[];
	/** Uncontrolled starting sections; every section when omitted. */
	defaultOpen?: string[];
	onOpenChange?: (open: string[]) => void;
	connector?: DocsNavConnector;
	/** Fires on link click, e.g. to close a mobile drawer or route client-side. */
	onNavigate?: (href: string, event: MouseEvent<HTMLAnchorElement>) => void;
	/** Accessible name of the navigation landmark. */
	label?: string;
	className?: string;
}

/** Documentation sidebar: collapsible sections, a sliding hover pill and a tick or thread curve per link. */
export function DocsNav({
	sections,
	current,
	open: openProp,
	defaultOpen,
	onOpenChange,
	connector = "tick",
	onNavigate,
	label = "Documentation",
	className,
}: DocsNavProps) {
	const [internalOpen, setInternalOpen] = useState(
		() => defaultOpen ?? sections.map((s) => s.id),
	);
	const open = openProp ?? internalOpen;
	const root = useRef<HTMLElement>(null);
	const styles = docsNav({ connector });

	const setSection = (id: string, next: boolean) => {
		const list = next
			? [...open.filter((o) => o !== id), id]
			: open.filter((o) => o !== id);
		if (openProp === undefined) setInternalOpen(list);
		onOpenChange?.(list);
	};

	useEffect(() => {
		revealCurrent(root.current);
	}, [current]);

	return (
		<nav
			ref={root}
			aria-label={label}
			data-slot="docs-nav"
			className={cn(styles.root(), className)}
		>
			{sections.map((section) => (
				<Collapsible
					key={section.id}
					open={open.includes(section.id)}
					onOpenChange={(next) => setSection(section.id, next)}
				>
					<CollapsibleTrigger className={styles.trigger()}>
						{section.label}
						{section.count !== undefined ? (
							<span className={styles.count()}>{section.count}</span>
						) : null}
					</CollapsibleTrigger>
					<CollapsibleContent className={styles.content()}>
						<DocsNavList
							items={section.items}
							current={current}
							connector={connector}
							onNavigate={onNavigate}
						/>
					</CollapsibleContent>
				</Collapsible>
			))}
		</nav>
	);
}

function DocsNavList({
	items,
	current,
	connector,
	onNavigate,
}: {
	items: DocsNavItem[];
	current?: string;
	connector: DocsNavConnector;
	onNavigate?: DocsNavProps["onNavigate"];
}) {
	const list = useRef<HTMLDivElement>(null);
	const [hovered, setHovered] = useState<number | null>(null);
	const [pill, setPill] = useState<{ top: number; height: number } | null>(null);

	const onEnter = (event: PointerEvent<HTMLAnchorElement>, index: number) => {
		if (!list.current) return;
		const row = event.currentTarget.getBoundingClientRect();
		const box = list.current.getBoundingClientRect();
		setHovered(index);
		setPill({ top: row.top - box.top, height: row.height });
	};

	return (
		<div
			ref={list}
			className={docsNav({ connector }).list()}
			onPointerLeave={() => setHovered(null)}
		>
			{pill ? (
				<div
					aria-hidden="true"
					className={docsNav({ connector }).pill()}
					style={{ transform: `translateY(${pill.top}px)`, height: pill.height }}
				/>
			) : null}
			{items.map((item, index) => {
				const active = item.href === current;
				const state = rowState(active, hovered === index, hovered !== null);
				const styles = docsNav({ connector, state });
				return (
					<div key={item.href} className={styles.row()}>
						<span
							aria-hidden="true"
							className={styles.marker()}
							style={{ width: MARKER_WIDTH[connector][state] }}
						/>
						{connector === "curve" && index < items.length - 1 ? (
							<span aria-hidden="true" className={styles.rail()} />
						) : null}
						<a
							href={item.href}
							aria-current={active ? "page" : undefined}
							onClick={(event) => onNavigate?.(item.href, event)}
							onPointerEnter={(event) => onEnter(event, index)}
							className={styles.link()}
						>
							<span className={styles.label()}>{item.label}</span>
							{item.badge ? <span className={styles.badge()}>{item.badge}</span> : null}
						</a>
					</div>
				);
			})}
		</div>
	);
}
