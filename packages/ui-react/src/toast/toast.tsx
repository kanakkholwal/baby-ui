"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "../lib/cn";

/** Mirrors its entrance: --duration-exit is 120ms, which EXIT_MS has to match. */
const TOAST_MOTION =
	"transition-[opacity,translate] duration-[var(--duration-overlay)] ease-[var(--ease-out)] starting:translate-y-2 starting:opacity-0 data-[state=closed]:translate-y-2 data-[state=closed]:opacity-0 data-[state=closed]:duration-[var(--duration-exit)] motion-reduce:transition-none";

const EXIT_MS = 120;

export type ToastTone = "info" | "success" | "warning" | "error";
export type ToastVariant = "soft" | "solid" | "outline";
export type ToastPosition =
	| "top-left"
	| "top-center"
	| "top-right"
	| "bottom-left"
	| "bottom-center"
	| "bottom-right";

export type ToastItem = {
	id: string;
	title: string;
	description?: string;
	tone?: ToastTone;
	action?: { label: string; onClick: () => void };
	dismissible?: boolean;
	/** Milliseconds before it removes itself. Omit or 0 to keep it until dismissed. */
	duration?: number;
};

export interface ToastProps {
	toasts: ToastItem[];
	position?: ToastPosition;
	variant?: ToastVariant;
	max?: number;
	className?: string;
	onDismiss?: (id: string) => void;
}

const POSITION: Record<ToastPosition, string> = {
	"top-left": "top-4 left-4 items-start",
	"top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
	"top-right": "top-4 right-4 items-end",
	"bottom-left": "bottom-4 left-4 items-start",
	"bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
	"bottom-right": "bottom-4 right-4 items-end",
};

const ACCENT: Record<ToastTone, string> = {
	info: "var(--foreground)",
	success: "var(--success)",
	warning: "var(--warning)",
	error: "var(--destructive)",
};

const MARK: Record<ToastTone, string> = {
	info: "M8 5.2v.01M8 7.4v3.4",
	success: "M4.8 8.2 7 10.4l4.2-4.6",
	warning: "M8 4.8v3.6M8 10.8v.01",
	error: "m5.6 5.6 4.8 4.8M10.4 5.6l-4.8 4.8",
};

export function Toast({
	toasts,
	position = "bottom-right",
	variant = "soft",
	max = 4,
	className,
	onDismiss,
}: ToastProps) {
	const fromTop = position.startsWith("top");
	const shown = fromTop ? toasts.slice(0, max) : toasts.slice(-max);
	const [leaving, setLeaving] = useState<string[]>([]);

	// The consumer owns the list, so the exit has to play before it hears about the dismiss.
	const dismiss = useCallback(
		(id: string) => {
			setLeaving((prev) => (prev.includes(id) ? prev : [...prev, id]));
			setTimeout(() => {
				setLeaving((prev) => prev.filter((other) => other !== id));
				onDismiss?.(id);
			}, EXIT_MS);
		},
		[onDismiss],
	);

	// Opt-in only: a timer that removes text the reader is still on is hostile.
	useEffect(() => {
		const timers = shown
			.filter((toast) => toast.duration && toast.duration > 0)
			.map((toast) => setTimeout(() => dismiss(toast.id), toast.duration));
		return () => timers.forEach(clearTimeout);
	}, [shown, dismiss]);

	return (
		<div
			aria-live="polite"
			className={cn(
				"pointer-events-none fixed z-50 flex flex-col gap-2",
				POSITION[position],
				className,
			)}
		>
			{shown.map((toast) => {
				const tone = toast.tone ?? "info";
				return (
					<div
						key={toast.id}
						style={{ ["--toast-accent" as string]: ACCENT[tone] }}
						data-state={leaving.includes(toast.id) ? "closed" : "open"}
						className={cn(
							TOAST_MOTION,
							"pointer-events-auto flex w-[min(22rem,calc(100vw-2rem))] items-start gap-2.5 rounded-xl border p-3 shadow-2xl",
							variant === "soft" &&
								"border-[color-mix(in_oklch,var(--toast-accent)_30%,transparent)] bg-popover",
							variant === "outline" && "border-[var(--toast-accent)] bg-background",
							variant === "solid" &&
								"border-transparent bg-[var(--toast-accent)] text-[var(--background)]",
						)}
					>
						<svg
							viewBox="0 0 16 16"
							fill="none"
							aria-hidden
							className={cn(
								"mt-0.5 size-4 shrink-0",
								variant !== "solid" && "text-[var(--toast-accent)]",
							)}
						>
							<circle cx="8" cy="8" r="6.4" stroke="currentColor" strokeWidth="1.3" />
							<path
								d={MARK[tone]}
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>

						<div className="min-w-0 flex-1">
							<p className="font-medium text-sm">{toast.title}</p>
							{toast.description ? (
								<p
									className={cn(
										"mt-0.5 text-xs leading-relaxed",
										variant === "solid" ? "opacity-80" : "text-muted-foreground",
									)}
								>
									{toast.description}
								</p>
							) : null}
							{toast.action ? (
								<button
									type="button"
									onClick={toast.action.onClick}
									className="mt-2 font-medium text-xs underline underline-offset-4 transition-opacity hover:opacity-70"
								>
									{toast.action.label}
								</button>
							) : null}
						</div>

						{toast.dismissible !== false ? (
							<button
								type="button"
								aria-label="Dismiss"
								onClick={() => dismiss(toast.id)}
								className={cn(
									"-mr-1 shrink-0 rounded-md p-1 transition-colors",
									variant === "solid"
										? "opacity-70 hover:opacity-100"
										: "text-muted-foreground hover:text-foreground",
								)}
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
						) : null}
					</div>
				);
			})}
		</div>
	);
}
