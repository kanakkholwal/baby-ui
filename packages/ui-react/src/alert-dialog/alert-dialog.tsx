"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "../lib/cn";

export interface AlertDialogProps {
	open: boolean;
	title: string;
	description: string;
	confirmLabel?: string;
	cancelLabel?: string;
	destructive?: boolean;
	className?: string;
	onOpenChange: (open: boolean) => void;
	onConfirm?: () => void;
}

export function AlertDialog({
	open,
	title,
	description,
	confirmLabel = "Confirm",
	cancelLabel = "Cancel",
	destructive = false,
	className,
	onOpenChange,
	onConfirm,
}: AlertDialogProps) {
	const uid = useId();
	const dialog = useRef<HTMLDialogElement>(null);
	const cancel = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const el = dialog.current;
		if (!el) return;
		if (open && !el.open) {
			el.showModal();
			// Focus the safe choice, never the destructive one.
			cancel.current?.focus();
		}
		if (!open && el.open) el.close();
	}, [open]);

	return (
		<dialog
			ref={dialog}
			role="alertdialog"
			aria-labelledby={`${uid}-title`}
			aria-describedby={`${uid}-desc`}
			onClose={() => onOpenChange(false)}
			onCancel={(e) => {
				e.preventDefault();
				onOpenChange(false);
			}}
			className="modal-dialog m-auto bg-transparent p-0 text-foreground backdrop:bg-black/50"
		>
			<div
				className={cn(
					"modal-panel w-[min(26rem,calc(100vw-2rem))] rounded-2xl border border-border bg-card p-6 shadow-2xl",
					className,
				)}
			>
				<h2 id={`${uid}-title`} className="font-medium text-base text-foreground">
					{title}
				</h2>
				<p
					id={`${uid}-desc`}
					className="mt-2 text-muted-foreground text-sm leading-relaxed"
				>
					{description}
				</p>

				<div className="mt-6 flex items-center justify-end gap-2">
					<button
						ref={cancel}
						type="button"
						onClick={() => onOpenChange(false)}
						className="inline-flex h-9 items-center rounded-lg border border-border px-3 font-medium text-foreground text-sm transition-colors hover:bg-foreground/[0.06]"
					>
						{cancelLabel}
					</button>
					<button
						type="button"
						onClick={() => {
							onConfirm?.();
							onOpenChange(false);
						}}
						className={cn(
							"inline-flex h-9 items-center rounded-lg px-3 font-medium text-sm transition-transform duration-[var(--duration-press)] ease-[var(--ease-out)] active:scale-[var(--press-scale)]",
							destructive
								? "bg-[var(--destructive)] text-white"
								: "bg-primary text-primary-foreground",
						)}
					>
						{confirmLabel}
					</button>
				</div>
			</div>
		</dialog>
	);
}
