"use client";

import { cn } from "../lib/cn";

export type ToastTone = "info" | "success" | "warning" | "error";
export type ToastItem = {
	id: string;
	title: string;
	description?: string;
	tone?: ToastTone;
};

const POSITION = {
	"bottom-right": "bottom-4 right-4 items-end",
	"bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
	"top-right": "top-4 right-4 items-end",
};

const TONE: Record<ToastTone, string> = {
	info: "border-border",
	success: "border-[color-mix(in_oklch,var(--success)_35%,transparent)]",
	warning: "border-[color-mix(in_oklch,var(--warning)_35%,transparent)]",
	error: "border-[color-mix(in_oklch,var(--destructive)_35%,transparent)]",
};

export interface ToastProps {
	toasts: ToastItem[];
	position?: keyof typeof POSITION;
	className?: string;
	onDismiss?: (id: string) => void;
}

export function Toast({
	toasts,
	position = "bottom-right",
	className,
	onDismiss,
}: ToastProps) {
	return (
		<div
			aria-live="polite"
			className={cn(
				"pointer-events-none fixed z-50 flex flex-col gap-2",
				POSITION[position],
				className,
			)}
		>
			{toasts.map((toast) => (
				<div
					key={toast.id}
					className={cn(
						"toast-in pointer-events-auto flex w-[min(22rem,calc(100vw-2rem))] items-start gap-3 rounded-xl border bg-popover p-3 shadow-2xl",
						TONE[toast.tone ?? "info"],
					)}
				>
					<div className="min-w-0 flex-1">
						<p className="font-medium text-foreground text-sm">{toast.title}</p>
						{toast.description ? (
							<p className="mt-0.5 text-muted-foreground text-xs leading-relaxed">
								{toast.description}
							</p>
						) : null}
					</div>
					<button
						type="button"
						aria-label="Dismiss"
						onClick={() => onDismiss?.(toast.id)}
						className="-mr-1 shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
					>
						<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-3.5">
							<path
								d="m4 4 8 8M12 4l-8 8"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
						</svg>
					</button>
				</div>
			))}
		</div>
	);
}
