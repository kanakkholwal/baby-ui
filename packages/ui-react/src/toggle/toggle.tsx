"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
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
	pressed,
	disabled = false,
	size = "md",
	label,
	className,
	onPressedChange,
}: ToggleProps) {
	return (
		<TogglePrimitive
			data-slot="toggle"
			pressed={pressed}
			disabled={disabled}
			aria-label={label}
			onPressedChange={onPressedChange}
			className={cn(toggleButton({ size }), className)}
		>
			{children}
		</TogglePrimitive>
	);
}
