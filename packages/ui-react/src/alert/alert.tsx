"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { cn } from "../lib/cn.js";
import { ALERT_ICON, ALERT_ROLE, type AlertVariant, alert } from "./variants.js";

const TONE: Record<AlertVariant, string> = {
	info: "text-muted-foreground",
	success: "text-[var(--success)]",
	warning: "text-[var(--warning)]",
	destructive: "text-[var(--destructive)]",
};

export interface AlertProps {
	children?: ReactNode;
	variant?: AlertVariant;
	title?: string;
	dismissible?: boolean;
	className?: string;
}

export function Alert({
	children,
	variant = "info",
	title,
	dismissible = false,
	className,
}: AlertProps) {
	const [open, setOpen] = useState(true);
	if (!open) return null;

	return (
		<div
			role={ALERT_ROLE[variant]}
			className={cn("alert-in", alert({ variant }), className)}
		>
			<svg
				viewBox="0 0 16 16"
				fill="none"
				aria-hidden
				className={cn("mt-px size-4 shrink-0", TONE[variant])}
			>
				<circle cx="8" cy="8" r="6.4" stroke="currentColor" strokeWidth="1.3" />
				<path
					d={ALERT_ICON[variant]}
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
			<div className="min-w-0 flex-1">
				{title ? <p className="font-medium text-foreground">{title}</p> : null}
				{children ? (
					<div className={cn("text-muted-foreground", title && "mt-1")}>{children}</div>
				) : null}
			</div>
			{dismissible ? (
				<button
					type="button"
					aria-label="Dismiss"
					onClick={() => setOpen(false)}
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
			) : null}
		</div>
	);
}
