"use client";

import { cn } from "../lib/cn.js";

const TRACK = { sm: "h-4 w-7", md: "h-5 w-9" };
const THUMB = { sm: "size-3", md: "size-4" };
const TRAVEL = { sm: "0.75rem", md: "1rem" };

export interface SwitchProps {
	checked?: boolean;
	disabled?: boolean;
	size?: "sm" | "md";
	label?: string;
	className?: string;
	onCheckedChange?: (checked: boolean) => void;
}

export function Switch({
	checked = false,
	disabled = false,
	size = "md",
	label,
	className,
	onCheckedChange,
}: SwitchProps) {
	return (
		<button
			type="button"
			role="switch"
			aria-checked={checked}
			aria-label={label}
			disabled={disabled}
			onClick={() => onCheckedChange?.(!checked)}
			className={cn(
				"relative inline-flex shrink-0 items-center rounded-full border border-transparent bg-input transition-colors duration-[var(--duration-press)] ease-[var(--ease-out)]",
				"outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
				"aria-checked:bg-primary disabled:cursor-not-allowed disabled:opacity-50",
				TRACK[size],
				className,
			)}
		>
			<span
				aria-hidden
				style={{ transform: checked ? `translateX(${TRAVEL[size]})` : "translateX(2px)" }}
				className={cn(
					"rounded-full bg-background shadow-sm transition-transform duration-[var(--duration-press)] ease-[var(--ease-out)] motion-reduce:transition-none",
					THUMB[size],
				)}
			/>
		</button>
	);
}
