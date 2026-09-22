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
import { cn } from "../lib/cn";
import {
	type DialogSize,
	type DialogVariant,
	dialogFrame,
	dialogWidth,
} from "./variants";

export type { DialogSize, DialogVariant };

/** The <dialog> itself fades with its backdrop; allow-discrete keeps it on screen to exit. */
export const DIALOG_SURFACE = [
	"m-auto overflow-visible bg-transparent p-0 text-foreground opacity-0",
	"transition-[opacity,display,overlay] transition-discrete duration-[var(--duration-exit)] ease-[var(--ease-out)]",
	"open:opacity-100 open:duration-[var(--duration-overlay)] starting:open:opacity-0",
	"backdrop:bg-black/50 backdrop:opacity-0 backdrop:backdrop-blur-[2px]",
	"backdrop:transition-[opacity,display,overlay] backdrop:transition-discrete",
	"backdrop:duration-[var(--duration-exit)] backdrop:ease-[var(--ease-out)]",
	"open:backdrop:opacity-100 open:backdrop:duration-[var(--duration-overlay)]",
	"starting:open:backdrop:opacity-0",
].join(" ");

/** The panel scales and lifts. Only the closed state carries a transform, so nothing collides. */
export const DIALOG_PANEL = [
	"transition-[opacity,scale,translate] duration-[var(--duration-overlay)] ease-[var(--ease-out)]",
	"data-[state=closed]:opacity-0 data-[state=closed]:scale-[var(--enter-scale)]",
	"data-[state=closed]:translate-y-[var(--enter-lift)] data-[state=closed]:duration-[var(--duration-exit)]",
	"starting:data-[state=open]:opacity-0 starting:data-[state=open]:scale-[var(--enter-scale)]",
	"starting:data-[state=open]:translate-y-[var(--enter-lift)]",
	"motion-reduce:transition-none",
].join(" ");

type Ctx = {
	open: boolean;
	titleId: string;
	descriptionId: string;
	size: DialogSize;
	variant: DialogVariant;
	dismissOnBackdrop: boolean;
	setOpen: (open: boolean) => void;
	/** The rim slot below the surface; DialogFooter portals into it. */
	footerEl: HTMLDivElement | null;
	setFooterEl: (el: HTMLDivElement | null) => void;
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
	variant = "default",
	dismissOnBackdrop = true,
	onOpenChange,
}: {
	children?: ReactNode;
	open?: boolean;
	defaultOpen?: boolean;
	size?: DialogSize;
	variant?: DialogVariant;
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

	const [footerEl, setFooterEl] = useState<HTMLDivElement | null>(null);
	const ctx = useMemo(
		() => ({
			open,
			size,
			variant,
			dismissOnBackdrop,
			titleId: `${uid}-title`,
			descriptionId: `${uid}-description`,
			setOpen,
			footerEl,
			setFooterEl,
		}),
		[open, size, variant, dismissOnBackdrop, uid, setOpen, footerEl],
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
			className={DIALOG_SURFACE}
		>
			<div
				data-slot="dialog-content"
				data-state={dialog.open ? "open" : "closed"}
				data-variant={dialog.variant}
				className={cn(
					DIALOG_PANEL,
					dialogFrame({ variant: dialog.variant }).panel(),
					"w-[min(32rem,calc(100vw-2rem))]",
					dialogWidth({ size: dialog.size }),
					className,
				)}
			>
				{dialog.variant === "framed" ? (
					<>
						{/* Inset frame: the body sits on a lighter surface, the footer in the rim below it. */}
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

export function DialogHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="dialog-header"
			className={cn("flex flex-col gap-1.5 pr-8", className)}
			{...props}
		/>
	);
}

export function DialogFooter({ className, ...props }: ComponentProps<"div">) {
	const dialog = useDialog();
	const node = (
		<div
			data-slot="dialog-footer"
			className={cn(dialogFrame({ variant: dialog.variant }).footer(), className)}
			{...props}
		/>
	);
	// Rendered into the frame rim below the surface once that slot exists.
	return dialog.footerEl ? createPortal(node, dialog.footerEl) : null;
}

export function DialogTitle({ className, ...props }: ComponentProps<"h2">) {
	const dialog = useDialog();

	return (
		<h2
			id={dialog.titleId}
			data-slot="dialog-title"
			className={cn(
				"flex items-center gap-2 font-semibold text-foreground text-lg [&>svg]:size-5 [&>svg]:text-muted-foreground",
				className,
			)}
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
			className={cn("text-muted-foreground text-sm", className)}
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
				"absolute top-3 right-3 grid size-8 place-items-center rounded-md text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
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
