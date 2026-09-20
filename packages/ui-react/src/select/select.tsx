"use client";

import type { ComponentProps, KeyboardEvent, ReactNode } from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";
import { ANCHORED, type AnchorPlacement, anchor, dismissable, rove } from "../lib/anchor";
import { cn } from "../lib/cn";

type Ctx = {
	open: boolean;
	value: string;
	contentId: string;
	disabled: boolean;
	/** Item labels, registered on mount so the trigger can echo the selection. */
	labels: Record<string, string>;
	register: (value: string, label: string) => void;
	setOpen: (open: boolean) => void;
	commit: (value: string) => void;
	setTrigger: (el: HTMLElement | null) => void;
	setContent: (el: HTMLElement | null) => void;
};

const SelectCtx = createContext<Ctx | null>(null);

function useSelect() {
	const ctx = useContext(SelectCtx);
	if (!ctx) throw new Error("Select parts must be used inside <Select>");
	return ctx;
}

export function Select({
	children,
	value = "",
	placement = "bottom-start",
	disabled = false,
	onValueChange,
}: {
	children?: ReactNode;
	value?: string;
	placement?: AnchorPlacement;
	disabled?: boolean;
	onValueChange?: (value: string) => void;
}) {
	const contentId = useId();
	const [open, setOpen] = useState(false);
	const [triggerEl, setTrigger] = useState<HTMLElement | null>(null);
	const [contentEl, setContent] = useState<HTMLElement | null>(null);
	const [labels, setLabels] = useState<Record<string, string>>({});

	const close = useCallback(() => {
		setOpen(false);
		triggerEl?.focus();
	}, [triggerEl]);

	const register = useCallback((item: string, label: string) => {
		setLabels((current) =>
			current[item] === label ? current : { ...current, [item]: label },
		);
	}, []);

	const commit = useCallback(
		(next: string) => {
			onValueChange?.(next);
			close();
		},
		[onValueChange, close],
	);

	useEffect(() => {
		if (!open || !triggerEl || !contentEl) return;
		const stopAnchor = anchor(triggerEl, contentEl, {
			placement,
			gap: 6,
			matchWidth: true,
		});
		const stopDismiss = dismissable([triggerEl, contentEl], close);
		return () => {
			stopAnchor();
			stopDismiss();
		};
	}, [open, triggerEl, contentEl, placement, close]);

	const ctx = useMemo(
		() => ({
			open,
			value,
			contentId,
			disabled,
			labels,
			register,
			setOpen,
			commit,
			setTrigger,
			setContent,
		}),
		[open, value, contentId, disabled, labels, register, commit],
	);

	return <SelectCtx.Provider value={ctx}>{children}</SelectCtx.Provider>;
}

export function SelectTrigger({
	className,
	children,
	...props
}: ComponentProps<"button">) {
	const select = useSelect();

	return (
		<button
			ref={select.setTrigger}
			type="button"
			role="combobox"
			data-slot="select-trigger"
			data-state={select.open ? "open" : "closed"}
			aria-expanded={select.open}
			aria-controls={select.open ? select.contentId : undefined}
			aria-haspopup="listbox"
			disabled={select.disabled}
			onClick={() => select.setOpen(!select.open)}
			className={cn(
				"inline-flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors",
				"focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40",
				"disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		>
			{children}
			<svg
				viewBox="0 0 16 16"
				fill="none"
				aria-hidden
				style={{ transform: select.open ? "rotate(180deg)" : "none" }}
				className="size-3.5 shrink-0 text-muted-foreground transition-[transform,scale,translate] duration-200 ease-[var(--ease-out)]"
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
	);
}

export function SelectValue({
	className,
	placeholder = "Select an option",
	...props
}: ComponentProps<"span"> & { placeholder?: string }) {
	const select = useSelect();
	const label = select.labels[select.value];

	return (
		<span
			data-slot="select-value"
			className={cn(label ? "text-foreground" : "text-muted-foreground", className)}
			{...props}
		>
			{label ?? placeholder}
		</span>
	);
}

export function SelectContent({ className, children, ...props }: ComponentProps<"div">) {
	const select = useSelect();
	const el = useRef<HTMLDivElement | null>(null);
	const [index, setIndex] = useState(0);

	const rows = useCallback(
		() => [
			...(el.current?.querySelectorAll<HTMLElement>("[role='option']:not([disabled])") ??
				[]),
		],
		[],
	);

	useEffect(() => {
		if (!select.open) return;
		const all = rows();
		const start = Math.max(
			0,
			all.findIndex((row) => row.dataset.value === select.value),
		);
		setIndex(start);
		all[start]?.focus();
	}, [select.open, select.value, rows]);

	function onKeyDown(event: KeyboardEvent) {
		const all = rows();
		const next = rove(all, index, event.key);
		if (next === null) return;
		event.preventDefault();
		setIndex(next);
		all[next]?.focus();
	}

	// Never unmounted: items register their label on mount, and the trigger has to echo
	// the current one before the list has ever been opened.
	return (
		<div
			ref={(node) => {
				el.current = node;
				select.setContent(node);
			}}
			id={select.contentId}
			role="listbox"
			tabIndex={-1}
			data-slot="select-content"
			data-state={select.open ? "open" : "closed"}
			inert={!select.open}
			onKeyDown={onKeyDown}
			style={{ maxHeight: "min(16rem, var(--anchor-available-height, 16rem))" }}
			className={cn(
				ANCHORED,
				"scroll-area overflow-y-auto rounded-xl border border-border bg-popover p-1 shadow-2xl",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

export function SelectItem({
	className,
	value,
	children,
	disabled = false,
	...props
}: ComponentProps<"button"> & { value: string }) {
	const select = useSelect();
	const el = useRef<HTMLButtonElement>(null);
	const selected = select.value === value;
	const { register } = select;

	// The trigger echoes the chosen label, and the item's own text is the only source for it.
	useEffect(() => {
		if (el.current) register(value, el.current.textContent?.trim() ?? value);
	}, [register, value]);

	return (
		<button
			ref={el}
			type="button"
			role="option"
			data-slot="select-item"
			data-value={value}
			aria-selected={selected}
			disabled={disabled}
			onClick={() => select.commit(value)}
			className={cn(
				"flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-left text-foreground text-sm outline-none transition-colors",
				"hover:bg-foreground/[0.06] focus-visible:bg-foreground/[0.06]",
				"disabled:pointer-events-none disabled:opacity-50",
				className,
			)}
			{...props}
		>
			{children}
			{selected ? (
				<svg viewBox="0 0 14 14" fill="none" aria-hidden className="size-3.5 shrink-0">
					<path
						d="M3 7.4 5.6 10 11 4.2"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			) : null}
		</button>
	);
}

export function SelectGroup({ className, ...props }: ComponentProps<"div">) {
	return <div data-slot="select-group" className={cn("py-0.5", className)} {...props} />;
}

export function SelectLabel({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="select-label"
			className={cn("px-2.5 py-1.5 font-medium text-muted-foreground text-xs", className)}
			{...props}
		/>
	);
}

export function SelectSeparator({ className, ...props }: ComponentProps<"hr">) {
	return (
		<hr
			data-slot="select-separator"
			className={cn("-mx-1 my-1 border-border", className)}
			{...props}
		/>
	);
}
