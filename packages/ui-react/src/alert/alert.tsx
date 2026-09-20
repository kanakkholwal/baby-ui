"use client";

import type { ComponentProps } from "react";
import { useState } from "react";
import { cn } from "../lib/cn";
import { ALERT_ROLE, type AlertVariant, alert } from "./variants";

export function Alert({
	className,
	variant = "info",
	dismissible = false,
	children,
	...props
}: ComponentProps<"div"> & { variant?: AlertVariant; dismissible?: boolean }) {
	const [open, setOpen] = useState(true);
	if (!open) return null;

	return (
		<div
			data-slot="alert"
			role={ALERT_ROLE[variant]}
			className={cn("alert-in", alert({ variant }), dismissible && "pr-10", className)}
			{...props}
		>
			{children}
			{dismissible ? (
				<button
					type="button"
					aria-label="Dismiss"
					onClick={() => setOpen(false)}
					className="absolute top-2.5 right-2.5 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
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
}

export function AlertTitle({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-title"
			className={cn(
				"col-start-2 min-h-4 font-medium text-foreground tracking-tight",
				className,
			)}
			{...props}
		/>
	);
}

export function AlertDescription({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			data-slot="alert-description"
			className={cn(
				"col-start-2 grid justify-items-start gap-1 text-muted-foreground text-sm [&_p]:leading-relaxed",
				className,
			)}
			{...props}
		/>
	);
}
