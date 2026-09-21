"use client";

import {
	type ComponentProps,
	createContext,
	useCallback,
	useContext,
	useId,
	useState,
} from "react";
import { cn } from "../lib/cn";

type AccordionType = "single" | "multiple";

type Ctx = {
	isOpen: (value: string) => boolean;
	toggle: (value: string) => void;
};
type ItemCtx = {
	value: string;
	open: boolean;
	disabled: boolean;
	triggerId: string;
	contentId: string;
};

const AccordionCtx = createContext<Ctx | null>(null);
const ItemCtx = createContext<ItemCtx | null>(null);

function useAccordion() {
	const ctx = useContext(AccordionCtx);
	if (!ctx) throw new Error("Accordion parts must be inside <Accordion>");
	return ctx;
}
function useItem() {
	const ctx = useContext(ItemCtx);
	if (!ctx) throw new Error("Accordion parts must be inside <AccordionItem>");
	return ctx;
}

export type AccordionProps = Omit<ComponentProps<"div">, "defaultValue" | "onChange"> & {
	type?: AccordionType;
	/** Single mode only: whether the open panel can be closed again. */
	collapsible?: boolean;
	/** The open item in single mode, the open items in multiple mode. */
	value?: string | string[];
	defaultValue?: string | string[];
	onValueChange?: (value: string | string[]) => void;
};

const toList = (v: string | string[] | undefined) =>
	v === undefined ? [] : Array.isArray(v) ? v : [v];

export function Accordion({
	type = "single",
	collapsible = false,
	value: valueProp,
	defaultValue,
	onValueChange,
	className,
	...props
}: AccordionProps) {
	const [internal, setInternal] = useState<string[]>(() => toList(defaultValue));
	const open = valueProp === undefined ? internal : toList(valueProp);

	const commit = useCallback(
		(next: string[]) => {
			setInternal(next);
			onValueChange?.(type === "multiple" ? next : (next[0] ?? ""));
		},
		[onValueChange, type],
	);

	const toggle = useCallback(
		(item: string) => {
			const isOpen = open.includes(item);
			if (type === "multiple") {
				commit(isOpen ? open.filter((x) => x !== item) : [...open, item]);
				return;
			}
			if (isOpen) {
				if (collapsible) commit([]);
				return;
			}
			commit([item]);
		},
		[open, type, collapsible, commit],
	);

	return (
		<AccordionCtx.Provider value={{ isOpen: (v) => open.includes(v), toggle }}>
			<div
				data-slot="accordion"
				className={cn(
					"divide-y divide-border overflow-hidden rounded-xl border border-border",
					className,
				)}
				{...props}
			/>
		</AccordionCtx.Provider>
	);
}

export function AccordionItem({
	value,
	disabled = false,
	className,
	...props
}: ComponentProps<"div"> & { value: string; disabled?: boolean }) {
	const accordion = useAccordion();
	const id = useId();
	const open = accordion.isOpen(value);
	return (
		<ItemCtx.Provider
			value={{
				value,
				open,
				disabled,
				triggerId: `${id}-trigger`,
				contentId: `${id}-content`,
			}}
		>
			<div
				data-slot="accordion-item"
				data-state={open ? "open" : "closed"}
				data-disabled={disabled || undefined}
				className={cn(className)}
				{...props}
			/>
		</ItemCtx.Provider>
	);
}

export function AccordionTrigger({
	className,
	children,
	...props
}: ComponentProps<"button">) {
	const accordion = useAccordion();
	const item = useItem();
	return (
		// shadcn wraps the button in a heading, so the panel list reads as sections.
		<h3 data-slot="accordion-header" className="flex">
			<button
				type="button"
				id={item.triggerId}
				data-slot="accordion-trigger"
				data-state={item.open ? "open" : "closed"}
				aria-expanded={item.open}
				aria-controls={item.contentId}
				disabled={item.disabled}
				onClick={() => accordion.toggle(item.value)}
				className={cn(
					"flex flex-1 items-center justify-between gap-4 px-4 py-3 text-left font-medium text-foreground text-sm outline-none transition-colors hover:bg-foreground/[0.03] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset disabled:pointer-events-none disabled:opacity-50",
					"[&>svg]:transition-[transform,scale,translate] [&>svg]:duration-[var(--duration-dropdown)] [&>svg]:ease-[var(--ease-out)] [&[data-state=open]>svg]:rotate-180 motion-reduce:[&>svg]:transition-none",
					className,
				)}
				{...props}
			>
				{children}
				<svg
					viewBox="0 0 16 16"
					fill="none"
					aria-hidden
					className="size-4 shrink-0 text-muted-foreground"
				>
					<path
						d="m4 6 4 4 4-4"
						stroke="currentColor"
						strokeWidth="1.4"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
		</h3>
	);
}

export function AccordionContent({
	className,
	children,
	...props
}: ComponentProps<"div">) {
	const item = useItem();
	return (
		// grid-template-rows animates to the content's own height, so nothing is measured.
		<section
			id={item.contentId}
			aria-labelledby={item.triggerId}
			data-slot="accordion-content"
			data-state={item.open ? "open" : "closed"}
			inert={!item.open}
			className="grid transition-[grid-template-rows] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr] motion-reduce:transition-none"
			{...props}
		>
			<div className="overflow-hidden">
				<div
					className={cn(
						"px-4 pb-3 text-muted-foreground text-sm leading-relaxed",
						className,
					)}
				>
					{children}
				</div>
			</div>
		</section>
	);
}
