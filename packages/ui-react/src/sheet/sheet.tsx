"use client";

import type { ComponentProps, ReactNode } from "react";
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
import { cn } from "../lib/cn";

export type SheetSide = "left" | "right" | "top" | "bottom";

const SIDE: Record<SheetSide, string> = {
	left: "inset-y-0 left-0 h-full w-[min(22rem,100vw)] border-r",
	right: "inset-y-0 right-0 h-full w-[min(22rem,100vw)] border-l",
	top: "inset-x-0 top-0 w-full max-h-[80vh] border-b",
	bottom: "inset-x-0 bottom-0 w-full max-h-[80vh] rounded-t-2xl border-t",
};

type Ctx = {
	open: boolean;
	titleId: string;
	descriptionId: string;
	setOpen: (open: boolean) => void;
};

const SheetCtx = createContext<Ctx | null>(null);

function useSheet() {
	const ctx = useContext(SheetCtx);
	if (!ctx) throw new Error("Sheet parts must be used inside <Sheet>");
	return ctx;
}

export function Sheet({
	children,
	open: openProp,
	defaultOpen = false,
	onOpenChange,
}: {
	children?: ReactNode;
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
}) {
	const uid = useId();
	const [internal, setInternal] = useState(defaultOpen);
	const open = openProp ?? internal;

	const setOpen = useCallback(
		(next: boolean) => {
			if (openProp === undefined) setInternal(next);
			onOpenChange?.(next);
		},
		[openProp, onOpenChange],
	);

	const ctx = useMemo(
		() => ({
			open,
			titleId: `${uid}-title`,
			descriptionId: `${uid}-description`,
			setOpen,
		}),
		[open, uid, setOpen],
	);

	return <SheetCtx.Provider value={ctx}>{children}</SheetCtx.Provider>;
}

export function SheetTrigger({ className, ...props }: ComponentProps<"button">) {
	const sheet = useSheet();

	return (
		<button
			type="button"
			data-slot="sheet-trigger"
			aria-haspopup="dialog"
			aria-expanded={sheet.open}
			onClick={() => sheet.setOpen(true)}
			className={cn("inline-flex", className)}
			{...props}
		/>
	);
}

export function SheetContent({
	className,
	side = "right",
	children,
}: ComponentProps<"div"> & { side?: SheetSide }) {
	const sheet = useSheet();
	const panel = useRef<HTMLDivElement>(null);
	const { open, setOpen } = sheet;

	useEffect(() => {
		if (!open) return;
		panel.current?.querySelector<HTMLElement>("button, a, input, [tabindex]")?.focus();
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, setOpen]);

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50">
			<button
				type="button"
				aria-label="Close"
				onClick={() => setOpen(false)}
				className="absolute inset-0 bg-black/50"
			/>
			<div
				ref={panel}
				role="dialog"
				aria-modal
				aria-labelledby={sheet.titleId}
				data-slot="sheet-content"
				data-side={side}
				className={cn(
					"sheet-panel absolute flex flex-col gap-4 overflow-y-auto border-border bg-background p-6",
					SIDE[side],
					className,
				)}
			>
				{children}
			</div>
		</div>
	);
}

export function SheetHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="sheet-header"
			className={cn("flex items-center justify-between gap-4", className)}
			{...props}
		/>
	);
}

export function SheetFooter({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="sheet-footer"
			className={cn("mt-auto flex items-center justify-end gap-2", className)}
			{...props}
		/>
	);
}

export function SheetTitle({ className, ...props }: ComponentProps<"h2">) {
	const sheet = useSheet();

	return (
		<h2
			id={sheet.titleId}
			data-slot="sheet-title"
			className={cn("font-semibold text-foreground text-sm", className)}
			{...props}
		/>
	);
}

export function SheetDescription({ className, ...props }: ComponentProps<"p">) {
	const sheet = useSheet();

	return (
		<p
			id={sheet.descriptionId}
			data-slot="sheet-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

export function SheetClose({ className, children, ...props }: ComponentProps<"button">) {
	const sheet = useSheet();

	return (
		<button
			type="button"
			data-slot="sheet-close"
			aria-label={children ? undefined : "Close"}
			onClick={() => sheet.setOpen(false)}
			className={cn(
				"grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-card hover:text-foreground",
				className,
			)}
			{...props}
		>
			{children ?? (
				<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
					<path
						d="m4 4 8 8M12 4l-8 8"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
				</svg>
			)}
		</button>
	);
}
