"use client";

import { useId, useState } from "react";
import { cn } from "../lib/cn";
import { SWITCH_TRAVEL, type SwitchSize, switchThumb, switchTrack } from "./variants";

export type { SwitchSize };

export interface SwitchProps {
	checked?: boolean;
	disabled?: boolean;
	size?: SwitchSize;
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
	const id = useId();
	const [pressed, setPressed] = useState(false);
	const [shaking, setShaking] = useState(false);

	// Refusal is feedback: a disabled switch says no rather than doing nothing.
	function refuse() {
		setShaking(false);
		requestAnimationFrame(() => setShaking(true));
	}

	const control = (
		<button
			id={id}
			type="button"
			role="switch"
			aria-checked={checked}
			aria-label={label ? undefined : "Toggle"}
			aria-disabled={disabled || undefined}
			onClick={() => (disabled ? refuse() : onCheckedChange?.(!checked))}
			onPointerDown={() => setPressed(true)}
			onPointerUp={() => setPressed(false)}
			onPointerLeave={() => setPressed(false)}
			className={cn(switchTrack({ size }), !label && className)}
		>
			<span
				aria-hidden
				data-shake={shaking || undefined}
				onAnimationEnd={() => setShaking(false)}
				style={{
					transform: checked ? `translateX(${SWITCH_TRAVEL[size]})` : "translateX(0)",
					scale: pressed && !disabled ? "0.9" : "1",
				}}
				className={switchThumb({ size })}
			/>
		</button>
	);

	// Bare, so this can replace a shadcn switch; the wrapper only appears with a label.
	if (!label) return control;

	return (
		<span className={cn("inline-flex items-center gap-2.5", className)}>
			{control}
			<label
				htmlFor={id}
				className={cn("text-foreground text-sm", disabled && "opacity-50")}
			>
				{label}
			</label>
		</span>
	);
}
