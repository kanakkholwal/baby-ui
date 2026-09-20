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

export type DialogSize = "sm" | "md" | "lg" | "xl";

const WIDTH: Record<DialogSize, string> = {
	sm: "max-w-sm",
	md: "max-w-lg",
	lg: "max-w-2xl",
	xl: "max-w-4xl",
};

type Ctx = {
	open: boolean;
	titleId: string;
	descriptionId: string;
	size: DialogSize;
	dismissOnBackdrop: boolean;
	setOpen: (open: boolean) => void;
};

const DialogCtx = createContext<Ctx | null>(null);

function useDialog() {
	const ctx = useContext(DialogCtx);
	if (!ctx) throw new Error("Dialog parts must be used inside <Dialog>");
	return ctx;
}

export function Dialog({
	children,
	open: openProp,
	defaultOpen = false,
	size = "md",
	dismissOnBackdrop = true,
	onOpenChange,
}: {
	children?: ReactNode;
	open?: boolean;
	defaultOpen?: boolean;
	size?: DialogSize;
	dismissOnBackdrop?: boolean;
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
			size,
			dismissOnBackdrop,
			titleId: `${uid}-title`,
			descriptionId: `${uid}-description`,
			setOpen,
		}),
		[open, size, dismissOnBackdrop, uid, setOpen],
	);

	return <DialogCtx.Provider value={ctx}>{children}</DialogCtx.Provider>;
}

export function DialogTrigger({ className, ...props }: ComponentProps<"button">) {
	const dialog = useDialog();

	return (
		<button
			type="button"
			data-slot="dialog-trigger"
			aria-haspopup="dialog"
			aria-expanded={dialog.open}
			onClick={() => dialog.setOpen(true)}
			className={cn("inline-flex", className)}
			{...props}
		/>
	);
}

export function DialogContent({ className, children }: ComponentProps<"div">) {
	const dialog = useDialog();
	const el = useRef<HTMLDialogElement>(null);

	// <dialog> owns the top layer and page inertness; syncing is all we do here.
	useEffect(() => {
		const node = el.current;
		if (!node) return;
		if (dialog.open && !node.open) node.showModal();
		if (!dialog.open && node.open) node.close();
	}, [dialog.open]);

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: Escape closes the dialog natively
		<dialog
			ref={el}
			aria-labelledby={dialog.titleId}
			aria-describedby={dialog.descriptionId}
			onClose={() => dialog.setOpen(false)}
			onCancel={(event) => {
				event.preventDefault();
				dialog.setOpen(false);
			}}
			onClick={(event) => {
				if (dialog.dismissOnBackdrop && event.target === el.current)
					dialog.setOpen(false);
			}}
			className="modal-dialog m-auto bg-transparent p-0 text-foreground backdrop:bg-black/50"
		>
			<div
				data-slot="dialog-content"
				className={cn(
					"modal-panel w-[min(32rem,calc(100vw-2rem))] rounded-2xl border border-border bg-card p-6 shadow-2xl",
					WIDTH[dialog.size],
					className,
				)}
			>
				{children}
			</div>
		</dialog>
	);
}

export function DialogHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-header"
			className={cn("flex items-start justify-between gap-4", className)}
			{...props}
		/>
	);
}

export function DialogFooter({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-footer"
			className={cn("mt-6 flex items-center justify-end gap-2", className)}
			{...props}
		/>
	);
}

export function DialogTitle({ className, ...props }: ComponentProps<"h2">) {
	const dialog = useDialog();

	return (
		<h2
			id={dialog.titleId}
			data-slot="dialog-title"
			className={cn("font-medium text-foreground text-lg", className)}
			{...props}
		/>
	);
}

export function DialogDescription({ className, ...props }: ComponentProps<"p">) {
	const dialog = useDialog();

	return (
		<p
			id={dialog.descriptionId}
			data-slot="dialog-description"
			className={cn("mt-1 text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

export function DialogClose({ className, children, ...props }: ComponentProps<"button">) {
	const dialog = useDialog();

	return (
		<button
			type="button"
			data-slot="dialog-close"
			aria-label={children ? undefined : "Close"}
			onClick={() => dialog.setOpen(false)}
			className={cn(
				"-mr-1 shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground",
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
