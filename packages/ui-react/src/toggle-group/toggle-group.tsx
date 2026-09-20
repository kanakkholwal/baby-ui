"use client";

import { cn } from "../lib/cn";

export type ToggleOption = { value: string; label: string; disabled?: boolean };

export interface ToggleGroupProps {
	options: ToggleOption[];
	value?: string | string[];
	multiple?: boolean;
	disabled?: boolean;
	label?: string;
	className?: string;
	onValueChange?: (value: string | string[]) => void;
}

export function ToggleGroup({
	options,
	value = "",
	multiple = false,
	disabled = false,
	label = "Options",
	className,
	onValueChange,
}: ToggleGroupProps) {
	function isOn(option: string) {
		return multiple ? (value as string[]).includes(option) : value === option;
	}

	function toggle(option: string) {
		if (!multiple) {
			onValueChange?.(value === option ? "" : option);
			return;
		}
		const list = value as string[];
		onValueChange?.(
			list.includes(option) ? list.filter((v) => v !== option) : [...list, option],
		);
	}

	return (
		// biome-ignore lint/a11y/useSemanticElements: fieldset would add a border and a legend requirement
		<div
			role="group"
			aria-label={label}
			className={cn(
				"inline-flex items-center gap-0.5 rounded-xl border border-border bg-card p-1",
				disabled && "opacity-50",
				className,
			)}
		>
			{options.map((option) => (
				<button
					key={option.value}
					type="button"
					aria-pressed={isOn(option.value)}
					disabled={disabled || option.disabled}
					onClick={() => toggle(option.value)}
					className="inline-flex h-7 items-center rounded-lg px-2.5 font-medium text-muted-foreground text-xs outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring aria-pressed:bg-foreground/[0.08] aria-pressed:text-foreground disabled:pointer-events-none disabled:opacity-50"
				>
					{option.label}
				</button>
			))}
		</div>
	);
}
