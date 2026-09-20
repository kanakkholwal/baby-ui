"use client";

import { cn } from "../lib/cn";

export interface SliderProps {
	value?: number;
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
	label?: string;
	className?: string;
	onValueChange?: (value: number) => void;
}

export function Slider({
	value = 50,
	min = 0,
	max = 100,
	step = 1,
	disabled = false,
	label,
	className,
	onValueChange,
}: SliderProps) {
	const pct = ((value - min) / (max - min || 1)) * 100;

	return (
		<div
			className={cn(
				"slider relative flex h-5 w-full items-center",
				disabled && "opacity-50",
				className,
			)}
		>
			<div className="h-1 w-full rounded-full bg-input">
				<div className="h-full rounded-full bg-primary" style={{ width: `${pct}%` }} />
			</div>
			<span
				aria-hidden
				style={{ left: `calc(${pct}% - 0.5rem)` }}
				className="slider-thumb pointer-events-none absolute size-4 rounded-full border border-border-strong bg-background shadow-sm"
			/>
			<input
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				disabled={disabled}
				aria-label={label}
				onChange={(e) => onValueChange?.(Number(e.currentTarget.value))}
				className="absolute inset-0 w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
			/>
		</div>
	);
}
