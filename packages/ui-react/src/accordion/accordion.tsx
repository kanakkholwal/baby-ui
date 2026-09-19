"use client";

import { useId, useState } from "react";
import { cn } from "../lib/cn.js";

export type AccordionItemData = { id: string; title: string; content: string };

export interface AccordionProps {
	items: AccordionItemData[];
	multiple?: boolean;
	collapsible?: boolean;
	className?: string;
}

export function Accordion({
	items,
	multiple = false,
	collapsible = true,
	className,
}: AccordionProps) {
	const [open, setOpen] = useState<string[]>([]);

	function toggle(id: string) {
		setOpen((prev) => {
			const isOpen = prev.includes(id);
			if (multiple) return isOpen ? prev.filter((x) => x !== id) : [...prev, id];
			if (isOpen) return collapsible ? [] : prev;
			return [id];
		});
	}

	return (
		<div
			className={cn(
				"divide-y divide-border overflow-hidden rounded-xl border border-border",
				className,
			)}
		>
			{items.map((item) => (
				<AccordionRow
					key={item.id}
					title={item.title}
					content={item.content}
					open={open.includes(item.id)}
					onToggle={() => toggle(item.id)}
				/>
			))}
		</div>
	);
}

function AccordionRow({
	title,
	content,
	open,
	onToggle,
}: { title: string; content: string; open: boolean; onToggle: () => void }) {
	const id = useId();

	return (
		<div>
			<button
				type="button"
				aria-expanded={open}
				aria-controls={id}
				onClick={onToggle}
				className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left font-medium text-foreground text-sm transition-colors hover:bg-foreground/[0.03]"
			>
				{title}
				<svg
					viewBox="0 0 16 16"
					fill="none"
					aria-hidden
					style={{ transform: open ? "rotate(180deg)" : undefined }}
					className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-[var(--ease-out)] motion-reduce:transition-none"
				>
					<path d="m4 6 4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</button>

			<div
				id={id}
				className="grid transition-[grid-template-rows] duration-200 ease-[var(--ease-out)] motion-reduce:transition-none"
				style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
			>
				<div className="overflow-hidden">
					<p className="px-4 pb-3 text-muted-foreground text-sm leading-relaxed">{content}</p>
				</div>
			</div>
		</div>
	);
}
