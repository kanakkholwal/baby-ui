"use client";

import type { ReactNode } from "react";
import { cn } from "../lib/cn";
import { type ToggleSize, toggleButton } from "./variants";

export type { ToggleSize };

export interface ToggleProps {
	children?: ReactNode;
	pressed?: boolean;
	disabled?: boolean;
	size?: ToggleSize;
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
			className={cn(toggleButton({ size }), className)}
		>
			{children}
		</button>
	);
}
