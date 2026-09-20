"use client";

import { useId, useState } from "react";
import { cn } from "../lib/cn";

type Size = "sm" | "md" | "lg" | "xl";

const TRACK: Record<Size, string> = {
	sm: "h-4 w-7",
	md: "h-5 w-9",
	lg: "h-6 w-11",
	xl: "h-7 w-[3.25rem]",
};
const THUMB: Record<Size, string> = {
	sm: "size-3",
	md: "size-4",
	lg: "size-5",
	xl: "size-6",
};
const TRAVEL: Record<Size, string> = {
	sm: "0.75rem",
	md: "1rem",
	lg: "1.25rem",
	xl: "1.5rem",
};

export interface SwitchProps {
	checked?: boolean;
	disabled?: boolean;
	size?: Size;
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

	return (
		<span className={cn("inline-flex items-center gap-2.5", className)}>
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
				className={cn(
					"relative inline-flex shrink-0 items-center rounded-full border border-transparent bg-input p-0.5 transition-colors duration-[var(--duration-press)] ease-[var(--ease-out)]",
					"outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
					"aria-checked:bg-primary aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
					TRACK[size],
				)}
			>
				<span
					aria-hidden
					data-shake={shaking || undefined}
					onAnimationEnd={() => setShaking(false)}
					style={{
						transform: checked ? `translateX(${TRAVEL[size]})` : "translateX(0)",
						scale: pressed && !disabled ? "0.9" : "1",
					}}
					className={cn("switch-thumb rounded-full bg-background shadow-sm", THUMB[size])}
				/>
			</button>
			{label ? (
				<label htmlFor={id} className={cn("text-foreground text-sm", disabled && "opacity-50")}>
					{label}
				</label>
			) : null}
		</span>
	);
}
