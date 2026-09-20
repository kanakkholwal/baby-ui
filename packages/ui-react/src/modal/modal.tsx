"use client";

import type { ReactNode } from "react";
import { useEffect, useId, useRef } from "react";
import { cn } from "../lib/cn";

const WIDTH = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl" };

export interface ModalProps {
	children?: ReactNode;
	footer?: ReactNode;
	open: boolean;
	title: string;
	description?: string;
	size?: "sm" | "md" | "lg";
	dismissOnBackdrop?: boolean;
	className?: string;
	onOpenChange: (open: boolean) => void;
}

export function Modal({
	children,
	footer,
	open,
	title,
	description,
	size = "md",
	dismissOnBackdrop = true,
	className,
	onOpenChange,
}: ModalProps) {
	const id = useId();
	const dialog = useRef<HTMLDialogElement>(null);

	// <dialog> owns the top layer and page inertness; syncing is all we do here.
	useEffect(() => {
		const el = dialog.current;
		if (!el) return;
		if (open && !el.open) el.showModal();
		if (!open && el.open) el.close();
	}, [open]);

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: Escape closes the dialog natively
		<dialog
			ref={dialog}
			aria-labelledby={id}
			onClose={() => onOpenChange(false)}
			onCancel={(e) => {
				e.preventDefault();
				onOpenChange(false);
			}}
			onClick={(e) => {
				if (dismissOnBackdrop && e.target === dialog.current) onOpenChange(false);
			}}
			className="modal-dialog m-auto bg-transparent p-0 text-foreground backdrop:bg-black/50"
		>
			<div
				className={cn(
					"modal-panel w-[calc(100vw-2rem)] rounded-2xl border border-border bg-card p-6 shadow-2xl",
					WIDTH[size],
					className,
				)}
			>
				<div className="flex items-start justify-between gap-4">
					<div className="min-w-0">
						<h2 id={id} className="font-medium text-foreground text-lg">
							{title}
						</h2>
						{description ? (
							<p className="mt-1 text-muted-foreground text-sm">{description}</p>
						) : null}
					</div>
					<button
						type="button"
						aria-label="Close"
						onClick={() => onOpenChange(false)}
						className="-mr-1 shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
					>
						<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
							<path
								d="m4 4 8 8M12 4l-8 8"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
						</svg>
					</button>
				</div>

				{children ? (
					<div className="mt-4 text-muted-foreground text-sm">{children}</div>
				) : null}
				{footer ? (
					<div className="mt-6 flex items-center justify-end gap-2">{footer}</div>
				) : null}
			</div>
		</dialog>
	);
}
