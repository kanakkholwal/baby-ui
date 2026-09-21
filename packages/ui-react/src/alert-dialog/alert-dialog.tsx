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
import { createPortal } from "react-dom";
import { DIALOG_PANEL, DIALOG_SURFACE } from "../dialog/dialog";
import { type DialogVariant, dialogFrame } from "../dialog/variants";
import { cn } from "../lib/cn";

type Ctx = {
	open: boolean;
	titleId: string;
	descriptionId: string;
	variant: DialogVariant;
	setOpen: (open: boolean) => void;
	setCancel: (el: HTMLElement | null) => void;
	/** The rim slot below the surface; AlertDialogFooter portals into it. */
	footerEl: HTMLDivElement | null;
	setFooterEl: (el: HTMLDivElement | null) => void;
};

const AlertDialogCtx = createContext<Ctx | null>(null);

function useAlertDialog() {
	const ctx = useContext(AlertDialogCtx);
	if (!ctx) throw new Error("AlertDialog parts must be used inside <AlertDialog>");
	return ctx;
}

export function AlertDialog({
	children,
	open: openProp,
	defaultOpen = false,
	variant = "framed",
	onOpenChange,
}: {
	children?: ReactNode;
	open?: boolean;
	defaultOpen?: boolean;
	variant?: DialogVariant;
	onOpenChange?: (open: boolean) => void;
}) {
	const uid = useId();
	const [internal, setInternal] = useState(defaultOpen);
	const [cancelEl, setCancel] = useState<HTMLElement | null>(null);
	const [footerEl, setFooterEl] = useState<HTMLDivElement | null>(null);
	const open = openProp ?? internal;

	const setOpen = useCallback(
		(next: boolean) => {
			if (openProp === undefined) setInternal(next);
			onOpenChange?.(next);
		},
		[openProp, onOpenChange],
	);

	// Focus the safe choice, never the destructive one.
	useEffect(() => {
		if (open) cancelEl?.focus();
	}, [open, cancelEl]);

	const ctx = useMemo(
		() => ({
			open,
			titleId: `${uid}-title`,
			descriptionId: `${uid}-description`,
			variant,
			setOpen,
			setCancel,
			footerEl,
			setFooterEl,
		}),
		[open, uid, variant, setOpen, footerEl],
	);

	return <AlertDialogCtx.Provider value={ctx}>{children}</AlertDialogCtx.Provider>;
}

export function AlertDialogTrigger({ className, ...props }: ComponentProps<"button">) {
	const dialog = useAlertDialog();

	return (
		<button
			type="button"
			data-slot="alert-dialog-trigger"
			aria-haspopup="dialog"
			aria-expanded={dialog.open}
			onClick={() => dialog.setOpen(true)}
			className={cn("inline-flex", className)}
			{...props}
		/>
	);
}

export function AlertDialogContent({ className, children }: ComponentProps<"div">) {
	const dialog = useAlertDialog();
	const el = useRef<HTMLDialogElement>(null);

	// An alertdialog never dismisses on the backdrop: the choice has to be made.
	useEffect(() => {
		const node = el.current;
		if (!node) return;
		if (dialog.open && !node.open) node.showModal();
		if (!dialog.open && node.open) node.close();
	}, [dialog.open]);

	return (
		<dialog
			ref={el}
			role="alertdialog"
			aria-labelledby={dialog.titleId}
			aria-describedby={dialog.descriptionId}
			onClose={() => dialog.setOpen(false)}
			onCancel={(event) => {
				event.preventDefault();
				dialog.setOpen(false);
			}}
			className={DIALOG_SURFACE}
		>
			<div
				data-slot="alert-dialog-content"
				data-state={dialog.open ? "open" : "closed"}
				data-variant={dialog.variant}
				className={cn(
					DIALOG_PANEL,
					dialogFrame({ variant: dialog.variant }).panel(),
					"w-[min(26rem,calc(100vw-2rem))]",
					className,
				)}
			>
				{dialog.variant === "framed" ? (
					<>
						<div className={cn(dialogFrame({ variant: dialog.variant }).body(), "p-5")}>
							{children}
						</div>
						<div ref={dialog.setFooterEl} className="empty:hidden" />
					</>
				) : (
					<>
						{children}
						<div ref={dialog.setFooterEl} className="empty:hidden" />
					</>
				)}
			</div>
		</dialog>
	);
}

export function AlertDialogHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-dialog-header"
			className={cn("flex flex-col gap-2", className)}
			{...props}
		/>
	);
}

export function AlertDialogFooter({ className, ...props }: ComponentProps<"div">) {
	const dialog = useAlertDialog();
	const node = (
		<div
			data-slot="alert-dialog-footer"
			className={cn(dialogFrame({ variant: dialog.variant }).footer(), className)}
			{...props}
		/>
	);
	// Rendered into the frame rim below the surface once that slot exists.
	return dialog.footerEl ? createPortal(node, dialog.footerEl) : null;
}

export function AlertDialogTitle({ className, ...props }: ComponentProps<"h2">) {
	const dialog = useAlertDialog();

	return (
		<h2
			id={dialog.titleId}
			data-slot="alert-dialog-title"
			className={cn("font-medium text-foreground text-base", className)}
			{...props}
		/>
	);
}

export function AlertDialogDescription({ className, ...props }: ComponentProps<"p">) {
	const dialog = useAlertDialog();

	return (
		<p
			id={dialog.descriptionId}
			data-slot="alert-dialog-description"
			className={cn("text-muted-foreground text-sm leading-relaxed", className)}
			{...props}
		/>
	);
}

export function AlertDialogCancel({ className, ...props }: ComponentProps<"button">) {
	const dialog = useAlertDialog();

	return (
		<button
			ref={dialog.setCancel}
			type="button"
			data-slot="alert-dialog-cancel"
			onClick={() => dialog.setOpen(false)}
			className={cn(
				"inline-flex h-9 items-center rounded-lg border border-border px-3 font-medium text-foreground text-sm transition-colors hover:bg-foreground/[0.06]",
				className,
			)}
			{...props}
		/>
	);
}

export function AlertDialogAction({
	className,
	destructive = false,
	onClick,
	...props
}: ComponentProps<"button"> & { destructive?: boolean }) {
	const dialog = useAlertDialog();

	return (
		<button
			type="button"
			data-slot="alert-dialog-action"
			onClick={(event) => {
				onClick?.(event);
				dialog.setOpen(false);
			}}
			className={cn(
				"inline-flex h-9 items-center rounded-lg px-3 font-medium text-sm transition-[transform,scale,translate] duration-[var(--duration-press)] ease-[var(--ease-out)] active:scale-[var(--press-scale)]",
				destructive
					? "bg-[var(--destructive)] text-white"
					: "bg-primary text-primary-foreground",
				className,
			)}
			{...props}
		/>
	);
}
