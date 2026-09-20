"use client";

import type { ReactNode } from "react";
import { cn } from "../lib/cn";

const SIZE = {
	sm: "h-7 min-w-7 px-2 text-xs",
	md: "h-9 min-w-9 px-2.5 text-sm",
	lg: "h-10 min-w-10 px-3 text-sm",
	xl: "h-12 min-w-12 px-4 text-base",
};

export interface ToggleProps {
	children?: ReactNode;
	pressed?: boolean;
	disabled?: boolean;
	size?: "sm" | "md" | "lg" | "xl";
	label?: string;
	className?: string;
	onPressedChange?: (pressed: boolean) => void;
}

export function Toggle({
	children,
	pressed = false,
	disabled = false,
	size = "md",
	label,
	className,
	onPressedChange,
}: ToggleProps) {
	return (
		<button
			type="button"
			aria-pressed={pressed}
			aria-label={label}
			disabled={disabled}
			onClick={() => onPressedChange?.(!pressed)}
			className={cn(
				"inline-flex items-center justify-center gap-1.5 rounded-lg border border-transparent font-medium transition-[background-color,color,transform,scale,translate] duration-[var(--duration-press)] ease-[var(--ease-out)]",
				"text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground",
				"aria-pressed:border-border aria-pressed:bg-foreground/[0.08] aria-pressed:text-foreground",
				"outline-none focus-visible:ring-2 focus-visible:ring-ring",
				"active:scale-[var(--press-scale)] disabled:pointer-events-none disabled:opacity-50",
				SIZE[size],
				className,
			)}
		>
			{children}
		</button>
	);
}
